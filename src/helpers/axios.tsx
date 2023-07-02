import axios from "axios"

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

// axiosApi.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("access")}`