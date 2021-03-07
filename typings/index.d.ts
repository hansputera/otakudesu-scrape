interface Anime {
    name: string;
    picture: string;
    url: string;
    release: string;
    episode: number;
}

interface Animes {
    index: number;
    title: string;
    url: string;
}

interface searchAnime {
    name: string;
    image: string;
    meta: string;
    url: string;
    parse_name: string;
}

interface GenreAnime {
    name: string;
    url: string;
    studio: string;
    date: string;
    eps: number;
    rate: number;
    genres: string[];
    image: string;
    synopsis: string;
}

interface AnimeInfo {
    title: string;
    synopsis: string;
    details: {
        [detail_key: string]: string;
    };
    episodes: {
        title: string;
        url: string;
        date: string;
    }[];
}

interface Download {
    title?: string;
    resolution: string;
    links: {
        [media_download: string]: string;
    };
}

interface Genre {
    genre: string;
    url: string;
}

declare class OtakuDesu {
    constructor(isRaw?: boolean);
    public genreList: Genre[];
    public home(): Promise<Anime[] | string>;
    public animes(): Promise<Animes[] | string>;
    public ongoing(): Promise<Anime[] | string>;
    public genreAnimes(genre: string): Promise<GenreAnime[] | undefined | string>;
    public searchAnime(anime: string): Promise<searchAnime[] | string>;
    public downloads(): Promise<Download[] | undefined | string>;
    public anime(anime_parse: string): Promise<AnimeInfo | string>;
    public genres(): Promise<Genre[] | string>;
}

export = OtakuDesu;