import {load} from 'cheerio';
import {tinyHttp, TinyHttpClient} from 'hanif-tiny-http';
import type {PassThrough} from 'node:stream';
import {OtakUtil, signal} from '..';

export const getAnimeStream = async (req: TinyHttpClient, url: string):
Promise<PassThrough | undefined> => {
  try {
    if (!OtakUtil.validateDownloadUrl(url)) return undefined;
    else if (/batch/gi.test(url)) {
      throw new TypeError('Batch video isn\'t supported on this method');
    }

    const response = await req.get(url);

    const $ = load(response.getContent());
    const desuStream = $(
        '.player-embed > .responsive-embed-stream > iframe',
    ).attr('src');

    // getting desu video
    const responseDesu = await tinyHttp.get(desuStream as string);
    const $desu = load(responseDesu.getContent());
    const aaa = await tinyHttp.get(
        $desu('#mediaplayer > source').attr('src') as string, {
          stream: true,
        });
    return aaa.stream;
  } catch (err) {
    signal.emit('error', err);
    return undefined;
  }
};
