<template>
<div class="home pa-6">
    <v-text-field
        v-model="newTaskTitle"
        dense
        height="30"
        label="Add a Task"
        clear-icon="mdi-close-circle"
        clearable
        append-icon="mdi-plus"
        @click:append="addTask"
        @keyup.enter="addTask"
    ></v-text-field>
    <v-btn
        small
        :color = "!disableDraggable ? 'green lighten-1': ''"
        @click="disableDraggable=!disableDraggable"
      >
       {{disableDraggable ? "Disabled Draggable" : "Enabled Draggable"}}
    </v-btn>
    <v-list
    >
     <v-list-item-group
        v-model="settings"
        multiple
      >
        <draggable  :options="{disabled : disableDraggable}" :list="newList">
            <div
                v-for="(task, index) in newList"
                :key="task.id"
            >
                <v-list-item
                    :id="task.id"
                    :inactive="true"
                    :class = "{'blue lighten-5':task.done}"
                    @click="doneTask(task.id)"
                >
                    <template>
                        <v-list-item-action>
                        <v-checkbox
                            :input-value="task.done"
                            color="primary"
                        ></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                        <v-list-item-title :class="{'text-decoration-line-through' : task.done}">{{task.title}}</v-list-item-title>
                        </v-list-item-content>
                    
                        <v-list-item-action>
                            <v-btn icon
                                :id="task.id"
                                :key="index"
                                @click="deleteTask(task.id)"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>

                    </template>
                </v-list-item>

            </div>
        </draggable>
      </v-list-item-group>
    </v-list>
    
    <v-fab-transition>
      <v-btn
        v-if="user"
        :loading="loading"
        :disabled="loading"
        color="primary"
        fixed
        bottom
        right
        fab
        @click="saveTasks"
      >
        <v-progress-circular
          indeterminate
          color="white"
          v-if="loading"
        ></v-progress-circular>
        <v-icon
          :disabled="loading"
        >mdi-content-save</v-icon>
      </v-btn>
    </v-fab-transition>
    
</div>
</template>

<script>
import axios from 'axios';
import store from "../store/store";
import draggable from 'vuedraggable';

export default {
    components: {
      draggable
    },
    data: () => ({
        newTaskTitle: "",
        pageTitle: "Vue Todo",
        newList: [],
        deletedTasks: [],
        disableDraggable: false,
        currentPage: 0,
        basePagi: 10,
        alert: {
            success: 'test'
        },
        tasks: [
            {
                id: 1,
                title : "This",
                done: false,
                category: "todo"
            },
            {
                id: 2,
                title : "is",
                done: false,
                category: "todo"
            },
            {
                id: 3,
                title : "demo",
                done: true,
                category: "todo"
            },
                {
                id: 4,
                title : "for guest",
                done: false,
                category: "todo"
            }
        ],
        settings: [],
        loading: false,
        category: "todo",
    }),
    created() {
        axios.get('http://localhost:8000/api/tasks',{
                withCredentials: true,
                credentials: 'same-origin',
            }).then(response => {
                if (response.data.message == 'success') {
                    this.tasks = response.data.tasks;
                    this.newList = this.tasks.filter( (category) => {  return category.category === this.category});
                    this.newList.sort(function (a, b) {
                        return a.listOrder - b.listOrder;
                        });
                }
            }) 
            .catch(function (error) {
                // handle error
                console.log(error);
                // return store.commit('wauth/LOG_OUT');
            });
    },
    computed: {
        user () {
            return this.$store.state.wauth.user
        },
        options () {
            return {
                disabled: false
            }
        }
    },
    methods: {
        sortData(data) {
            const output = [...data];
            for (let i=0; i < data.length; i++){
                const item = data[i];
                if (item.listOrder) {
                    const t = data[item.listOrder];
                    output[item.listOrder] = item;
                    output[i] = t;
                }
            }
            return output;
        },
        onEnd(evt) {
            if (evt.item.firstChild.id){
                let task = this.tasks.filter(task=>task.id===evt.item.firstChild.id)[0];
                task.listOrder = evt.newIndex;
            }
        },
        addTask() {
            if (this.newTaskTitle !== "" && this.newTaskTitle !== null) {
                let newTask = {
                    id: Date.now(),
                    title: this.newTaskTitle,
                    done: false,
                    category: this.category
                }
                this.newList.push(newTask);
                this.newTaskTitle = "";
            }
        },
        doneTask(id) {
            let task = this.newList.filter(task => task.id === id)[0];
            task.done = !task.done
        },
        deleteTask(id) {
            this.newList = this.newList.filter(task => task.id !== id);
            this.deletedTasks.push(id);
        },
        saveTasks() {
            this.newList.map((item,index)=>{item.listOrder=this.currentPage*this.basePagi + index; return item});
            var data = {
                "tasks": this.updateTasks(),
                withCredentials: true
            };
            this.loading = true;
            axios.post('http://localhost:8000/api/tasks',data, {withCredentials: true})
            .then( () => {
                this.loading = false;
                store.commit('alert/messageSuccess', "Saved Tasks");
                setTimeout(()=>{
                    store.commit('alert/messageSuccess', null);
                },1000);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        },
        updateTasks() {
            const mergedArray = [...this.newList, ...this.tasks];
            // mergedArray have duplicates, lets remove the duplicates using Set
            let set = new Set();
            let unionArray = mergedArray.filter(item => {
            if (!set.has(item.id) && this.deletedTasks.indexOf(item.id) == -1) {
                set.add(item.id);
                return true;
            }
            return false;
            }, set);
            return unionArray;
        }

    }
}
</script>