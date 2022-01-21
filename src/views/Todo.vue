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

    <v-list
    >
     <v-list-item-group
        v-model="settings"
        multiple
      >
        <div
            v-for="task in tasks"
            :key="task.id"
        >
            <v-list-item
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
                            @click="deleteTask(task.id)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-list-item-action>

                    <v-menu
                        bottom
                        left
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                        </template>

                        <v-list>
                        <v-list-item
                            @click="deleteTask(task.id)"
                        >
                             <v-btn icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-list-item-title>tét</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                   
                </template>
            </v-list-item>

            <v-divider></v-divider>

        </div>
      </v-list-item-group>
    </v-list>
</div>
</template>

<script>
    export default {
        data: () => ({
            newTaskTitle: "",
            pageTitle: "Vue Todo",
            settings: [],
            tasks : [
                {
                    id: 1,
                    title : "Wake Up",
                    done: false,
                },
                {
                    id: 2,
                    title : "coffee",
                    done: false
                },
                {
                    id: 3,
                    title : "work",
                    done: true
                }
            ]
        }),
        methods: {
            addTask() {
                if (this.newTaskTitle !== "" && this.newTaskTitle !== null) {
                    let newTask = {
                        id: Date.now(),
                        title: this.newTaskTitle,
                        done: false
                    }
                    this.tasks.push(newTask);
                    this.newTaskTitle = "";
                }
            },
            doneTask(id) {
                let task = this.tasks.filter(task => task.id === id)[0];
                task.done = !task.done
            },
            deleteTask(id) {
                this.tasks = this.tasks.filter(task => task.id !== id);
            }
        }
    }
</script>