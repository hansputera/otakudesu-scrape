/**
 * Typings for otakudesu
 */
import { ResolvedReleaseDate } from './util';
export interface Genre {
    name: string;
    url: string;
}
export interface Anime {
    name: string;
    image: string;
    meta: Record<string, string | string[]>;
    url: string;
    /** used for getting anime information and download(s) url */
    slug: string;
}
export interface Episode {
    title: string;
    url: string;
    date: string;
}
export interface DownloadLink {
    name: string;
    url: string;
}
export interface Download {
    resolution: string;
    links: DownloadLink[];
    title?: string;
}
export declare type OngoingAnime = Omit<Anime, 'meta'> & {
    releaseAt: ResolvedReleaseDate;
    episode: number;
};
export declare type ExtraAnime = Omit<Anime, 'meta' | 'slug'> & {
    synopsis: string;
    details: Record<string, string | string[]>;
    episodes: Episode[];
};
