import {load} from 'cheerio';
import * as phin from 'phin';
import {OtakUtil} from '..';
import {PassThrough} from 'node:stream';

export const getAnimeStream = async (requestUrl: string, url: string):
Promise<PassThrough | undefined> => {
  try {
    if (!OtakUtil.validateDownloadUrl(url)) return undefined;
    else if (/batch/gi.test(url)) {
      throw new TypeError('Batch video isn\'t supported on this method');
    }

    const response = await phin({
      url: new URL(url, requestUrl),
    });

    const $ = load(response.body.toString('utf8'));
    const desuStream = $(
        '.player-embed > .responsive-embed-stream > iframe',
    ).attr('src');

    // getting desu video
    const responseDesu = await phin(desuStream!);
    const desuStreamRes = await phin({
      url: load(responseDesu.body.toString('utf8'))(
          '#mediaplayer > source').attr('src')!,
      stream: true,
    });

    return desuStreamRes.stream.pipe(new PassThrough());
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
