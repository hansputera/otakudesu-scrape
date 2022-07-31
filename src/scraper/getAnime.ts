import {load} from 'cheerio';
import * as phin from 'phin';

import {getExtraAnime} from '.';
import type {ExtraAnime} from '..';

import {getSearchAnimeEndpoint} from '../constants';
import type {Anime} from '../types';

export const getAnime = async (requestUrl: string, q: string, ext = false):
Promise<Anime[]> => {
  const response = await phin({
    url: new URL(getSearchAnimeEndpoint(q), requestUrl),
  });
  const $ = load(response.body.toString());

  return $('ul.chivsrc > li').map((_, element) => ({
    name: $(element).find('h2').text().trim(),
    image: $(element).find('img').attr('src') as string,
    meta: $(element).find('.set').map((_, metaElement) => {
      const text = $(metaElement).text().trim();
      return {
        key: text.split(':')[0].trim().toLowerCase(),
        value: text.split(':')[1].replace(/\s/, '').toLowerCase(),
      };
    }).toArray<{ key: string; value: string; }>()
        .reduce((x: Record<string, string | string[]>, y) => {
          x[y.key] = y.value.split(',').length > 1 ? y.value.split(','):y.value;
          return x;
        }, {}),
    url: $(element).find('h2 > a').attr('href') as string,
    slug: $(element).find('h2 > a').attr('href')?.split('/')
        .filter((s) => s.length).pop() as string,
    extra: () => getExtraAnime(requestUrl,
        $(element).find('h2 > a').attr('href')?.split('/')
            .filter((s) => s.length).pop() as string,
    ) as Promise<ExtraAnime>,
  })).toArray<Anime>();
};
