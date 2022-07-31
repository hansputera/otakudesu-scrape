import { PassThrough } from 'node:stream';
export declare const getAnimeStream: (requestUrl: string, url: string) => Promise<PassThrough | undefined>;
