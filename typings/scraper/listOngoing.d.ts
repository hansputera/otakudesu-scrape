import { TinyHttpClient } from 'hanif-tiny-http';
import { OngoingAnime } from '../types';
export declare const getOngoingList: (request: TinyHttpClient) => Promise<OngoingAnime[]>;
