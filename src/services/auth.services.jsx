import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const login = async (data) => {
  return axios.post(`${API_BASE}/login`, data);
};

export const register = async (data) => {
  return axios.post(`${API_BASE}/register`, data);
};

export const confirmEmail = async (token) => {
  return axios.get(`${API_BASE}/confirm?token=${token}`);
};

export const resendConfirmation = async (email) => {
  return axios.post(`${API_BASE}/resend-confirmation`, { email });
};
