import axios from 'axios';

export const getAllTasks = () =>{
    return axios.get('http://localhost:4000/api/tasks');
}

export const addTask = (obj) => {
    obj.status = 'Todo';
    return axios.post('http://localhost:4000/api/tasks/add',obj);
}

export const editTask = (obj) => {
    console.log(obj);
    // obj.status= 'edit';
    return axios.put(`http://localhost:4000/api/tasks/edit/${obj.id}`, obj);
}

export const deleteTask = (obj) => {
    // obj.status='delete'
    return axios.delete(`http://localhost:4000/api/tasks/${obj.id}`, obj);
}

export const updateTaskStatus = (obj) => {
    // console.log(id, status);
    // let obj = { status };
    return axios.put(`http://localhost:4000/api/tasks/edit/${obj.id}`, obj);
  };