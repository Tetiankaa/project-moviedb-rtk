import {IRes} from "../types";
import {IMovie, IResMovie} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const moviesService = {
    getAll:(page:number | string, genreId?:string):IRes<IResMovie>=>apiService.get(urls.movies.base,{params:{page,with_genres:genreId}}),
    getById:(id:number | string):IRes<IMovie>=>apiService.get(urls.movies.byId(id))
}

export {
    moviesService
}