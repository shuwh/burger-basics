import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-84126.firebaseio.com/'
})

export default instance;