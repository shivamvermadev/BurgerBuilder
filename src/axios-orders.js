import axios from 'axios';

const instance = axios.create({
    baseURL: "https://myburger-b6fec-default-rtdb.firebaseio.com/"
});

export default instance;