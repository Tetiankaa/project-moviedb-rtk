import {IRes} from "../types";
import {IResReview} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const reviewService = {
    getById:(id:number):IRes<IResReview>=>apiService.get(urls.reviews.byId(id))
}

export {
    reviewService
}