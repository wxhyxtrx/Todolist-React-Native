import axios from 'axios'

export const API = axios.create({
    baseURL: "https://api.kontenbase.com/query/api/v1/d05d66cd-7de0-476b-bf98-a151463d7c1d"
})

export function setAuthorization(token) {
    if (!token) {
        delete API.defaults.headers.common;
        return;
    }
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}