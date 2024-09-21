import axios from "axios";

console.log("process.env",process.env)
export const axiosClient = axios.create({
    //  baseURL: 'http://localhost:8080',
   baseURL:"https://api.easybadwork.com/baemin/",


  });