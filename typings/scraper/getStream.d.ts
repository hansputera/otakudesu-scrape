import { TinyHttpClient } from 'hanif-tiny-http';
import type { PassThrough } from 'node:stream';
export declare const getAnimeStream: (req: TinyHttpClient, url: string) => Promise<PassThrough | undefined>;
