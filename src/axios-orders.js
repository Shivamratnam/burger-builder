import axios from 'axios';
const instance = axios.create({
    baseURL: "https://st-burger-builder.firebaseio.com/"
});

export default instance;
