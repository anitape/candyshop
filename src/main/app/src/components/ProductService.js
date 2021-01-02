import axios from 'axios'
const baseUrl = 'http://localhost:8080/cart';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = newObject => {
    const request = axios.post(baseUrl+"Add", newObject);
    return request.then(response => response.data);
};
//if id is ¨all¨ then the whole table is emptied
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
};

const removeAll = () => {
    const request = axios.delete(baseUrl+"/all");
    return request.then(response => response.data);
};

export default {
    getAll: getAll,
    create: create,
    remove: remove,
    removeAll: removeAll
};

