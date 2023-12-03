import {IRes} from "../types";
import {IResPoster} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const posterService = {
    getBaseUrl:():IRes<IResPoster>=>apiService.get(urls.configuration)
}

export {
    posterService
}