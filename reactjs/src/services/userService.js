import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUserApi = (inputId) => {
  return axios.get(`/api/get-list-user?id=${inputId}`);
};
const getAllCodeApi = (inputId) => {
  return axios.get(`/api/get-all-code?type=${inputId}`);
};
const createNewUserApi = (data) => {
  return axios.post(`/api/create-new-user`, data);
};
const editUserApi = (data) => {
  return axios.put(`/api/edit-user`, data);
};
const deleteUserApi = (userId) => {
  return axios.delete(`/api/delete-user?id=${userId}`);
};

export {
  handleLoginApi,
  getAllUserApi,
  createNewUserApi,
  editUserApi,
  deleteUserApi,
  getAllCodeApi,
};
