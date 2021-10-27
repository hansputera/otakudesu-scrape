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
export declare type OngoingAnime = Omit<Anime, 'meta'> & {
    releaseAt: ResolvedReleaseDate;
    episode: number;
};
