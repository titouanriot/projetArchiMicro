export interface Movie {
    id_movie:number;
    original_title : string;
    title : string;
    language : string;
    category : string;
    realease_date : Date;
    runtime : number;
    vote_average : number;
    vote_count : number;
    overview : string;
    poster_path : string;
}