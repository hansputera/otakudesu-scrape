import { TinyHttpClient } from 'hanif-tiny-http';
import type { OngoingAnime } from '../types';
export declare const getOngoingList: (request: TinyHttpClient) => Promise<OngoingAnime[]>;
