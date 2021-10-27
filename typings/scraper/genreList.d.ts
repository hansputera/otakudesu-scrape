import type { TinyHttpClient } from 'hanif-tiny-http';
import type { Genre } from '../types';
export declare const getGenreList: (request: TinyHttpClient) => Promise<Genre[]>;
