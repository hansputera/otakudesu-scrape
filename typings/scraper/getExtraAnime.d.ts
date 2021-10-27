import { TinyHttpClient } from 'hanif-tiny-http';
import type { ExtraAnime } from '../types';
export declare const getExtraAnime: (request: TinyHttpClient, slug: string) => Promise<ExtraAnime | undefined>;
