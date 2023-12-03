import {IMovie} from "./movieInterface";

export interface IResMovie{
    page:number,
    results:IMovie[],
    total_pages:number,
    total_results:number
}