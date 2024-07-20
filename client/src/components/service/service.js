import axios from 'axios';

export const getAllTasks = () =>{
    return axios.get('https://task-manager-393ajfpq3-dinesh-ps-projects-8763556b.vercel.app/api/tasks');
}

export const addTask = (obj) => {
    obj.status = 'Todo';
    return axios.post('https://task-manager-393ajfpq3-dinesh-ps-projects-8763556b.vercel.app/api/tasks/add',obj);
}

export const editTask = (obj) => {
    console.log(obj);
    // obj.status= 'edit';
    return axios.put(`https://task-manager-393ajfpq3-dinesh-ps-projects-8763556b.vercel.app/api/tasks/edit/${obj.id}`, obj);
}

export const deleteTask = (obj) => {
    // obj.status='delete'
    return axios.delete(`https://task-manager-393ajfpq3-dinesh-ps-projects-8763556b.vercel.app/api/tasks/${obj.id}`, obj);
}

export const updateTaskStatus = (obj) => {
    // console.log(id, status);
    // let obj = { status };
    return axios.put(`https://task-manager-393ajfpq3-dinesh-ps-projects-8763556b.vercel.app/api/tasks/edit/${obj.id}`, obj);
  };