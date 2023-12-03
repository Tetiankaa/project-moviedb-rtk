import axios from "axios";

import {baseURL} from "../constants";

const apiService = axios.create({baseURL});

apiService.interceptors.request.use(request=>{
    request.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTU1NTNjNmRlMzUxZjMyYjE1MjAxMWFjYjY2OGQ4MiIsInN1YiI6IjYzZjFmYjA5Y2FhY2EyMDA4NTc3ZGI1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MEN70joNjD46GGyCrQ1byY0u5egDVE6d_EuUFreVDmo`;

    return request
})

export {
    apiService
}