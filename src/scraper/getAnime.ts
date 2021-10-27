import {load} from 'cheerio';
import {TinyHttpClient} from 'hanif-tiny-http';

import {getSearchAnimeEndpoint} from '../constants';
import type {Anime} from '../types';

export const getAnime = async (request: TinyHttpClient, q: string):
Promise<Anime[]> => {
  const response = await request.get(getSearchAnimeEndpoint(q));
  const $ = load(response.getContent());

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
  })).toArray<Anime>();
};
