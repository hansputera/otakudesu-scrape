import { TinyHttpClient } from 'hanif-tiny-http';
import { Download } from '../types';
export declare const getDownloads: (request: TinyHttpClient, url: string) => Promise<Download[]>;
