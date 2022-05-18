import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const getData = () => axios.get(API_BASE_URL + "/data");

export default {
  getData,
};
