import {IRes} from "../types";
import {IVideo} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const videoService ={
    getById:(id:number):IRes<IVideo>=>apiService.get(urls.videos.byId(id))
}

export {
    videoService
}