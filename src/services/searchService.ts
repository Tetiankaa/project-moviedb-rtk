import {IRes} from "../types";
import {IResMovie} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const searchService = {
    getAll: (query: string, page: string | number):IRes<IResMovie>=>apiService.get(urls.search, {params:{query, page}})
}

export {
    searchService
}