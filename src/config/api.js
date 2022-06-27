import axios from "axios";

const baseUrl =
process.env.REACT_APP_SERVER_URL ||
'https://waysbeans34.herokuapp.com/api/v1' ||
'https://localhost:5000/api/v1';

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};