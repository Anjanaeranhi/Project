import axios from "axios";

export const userapi = axios.create({
    baseURL : "http://localhost:8080"
})

userapi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("userToken") || null
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const api = axios.create({
    baseURL : "http://localhost:8080"
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("access_token") || null
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const sellerapi = axios.create({
    baseURL : "http://localhost:8080"
})

sellerapi.interceptors.request.use((config)=>{
    const token = localStorage.getItem("sellerToken") || null
    config.headers.Authorization = `Bearer ${token}`
    return config
})