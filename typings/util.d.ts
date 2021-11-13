/// <reference types="node" />
import { Util } from 'hanif-tiny-http/dist/util';
import { EventEmitter } from 'node:events';
export declare const monthsDefined: {
    okt: string;
    mar: string;
    dec: string;
    ags: string;
    apr: string;
    may: string;
    nov: string;
    jan: string;
    sep: string;
    jul: string;
    jun: string;
    feb: string;
};
export declare const daysDefined: {
    senin: string;
    selasa: string;
    rabu: string;
    kamis: string;
    jumat: string;
    sabtu: string;
    minggu: string;
};
export declare const signal: EventEmitter;
export interface ResolvedReleaseDate {
    date: number;
    day: string;
    month: string;
}
/**
 * @class OtakUtil
 */
export declare class OtakUtil extends Util {
    /**
       * @description OtakUtil constructor
       */
    constructor();
    /**
     * @description Resolve release date
     * @param {String} date - (eg. 23 Okt Minggu)
     * @return {ResolvedReleaseDate}
     */
    static resolveReleaseDate(date: string): ResolvedReleaseDate;
    /**
     * @param {String} url - Validate Download URL
     * @return {Boolean}
     */
    static validateDownloadUrl(url: string): boolean;
}
export declare const handleException: <T extends Function>(__: object, _: string, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;
