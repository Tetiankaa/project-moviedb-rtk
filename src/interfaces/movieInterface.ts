import {IGenre} from "./genreInterface";

export interface IMovie {
    id:number,
    original_title:string,
    poster_path:string,
    release_date:string,
    overview:string,
    vote_average:number,
    vote_count:number,
    budget:number,
    genres:IGenre[],
    runtime:number,
    production_countries:[{name:string}] | []
}