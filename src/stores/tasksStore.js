import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

export const useTasksStore = defineStore('tasks', () => {
    const tasks= reactive(JSON.parse(localStorage.getItem('tasks')) || []); 

    let filterBy = ref('');

    let modalIsActive = ref(false);

    const setFilter = value => {
        filterBy.value = value;
    };

    const filteredTasks = computed(() => {
        switch(filterBy.value) {
          case 'todo':
            return tasks.filter(task => !task.completed);
          case 'done':
            return tasks.filter(task => task.completed);
          default: 
            return tasks;
        }
    });

    const addTask = newTask => {
        if(newTask.name && newTask.description) {
          newTask.id = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
          tasks.push(newTask);
          closeModal()
        } else {
          alert('Please enter the title and description for the task');
        }
    };
      
    const toggleCompleted = id => {
        const selectedTask = tasks.find(task => task.id === id);
        selectedTask.completed = !selectedTask.completed;
    }

    const openModal = () => {
        modalIsActive.value = true;
    }

    const closeModal = () => {
        modalIsActive.value = false;
    }

    return { tasks, filterBy, setFilter, filteredTasks, addTask, toggleCompleted, openModal, closeModal, modalIsActive };
});