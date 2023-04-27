export interface Movie {
    original_title : string;
    title : string;
    language : LanguageE;
    category : CategoryE;
    realease_date : Date;
    runtime : number;
    vote_average : number;
    vote_count : number;
    overview : string;
}


export enum CategoryE{
    action = 'Action',
    comedy = 'Comédie',
    romantic = 'Romantique'
}

export enum LanguageE{
    fr = 'Français',
    en = 'Anglais'
}