import {IRes} from "../types";
import {IResGenre} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const genreService = {
    getAll:():IRes<IResGenre>=>apiService.get(urls.genres)
}

export {
    genreService
}