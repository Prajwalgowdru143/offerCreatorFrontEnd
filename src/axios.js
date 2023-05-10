import axios from "axios";

const instance = axios.create({
    baseURL:"https://offer-creator.vercel.app/"
});

export default instance;
