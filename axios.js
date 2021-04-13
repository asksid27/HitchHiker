import axios from "axios";

const instance = axios.create({
  //   baseURL: "http://192.168.1.10:5001/hitchhiker-d9542/us-central1/api",
  baseURL: "http://192.168.1.10:3000",
});

export default instance;
