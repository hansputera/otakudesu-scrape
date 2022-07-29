import {load} from 'cheerio';
import {TinyHttpClient} from 'hanif-tiny-http';

import {getAnimeEndpoint} from '../constants';
import type {Episode, ExtraAnime} from '../types';
import {OtakUtil} from '../util';

export const getExtraAnime = async (request: TinyHttpClient, slug: string):
Promise<ExtraAnime | undefined> => {
  const response = await request.get(getAnimeEndpoint(slug));
  if (!response.isOk) return undefined;
  const $ = load(response.getContent());

  const details = $('.infozingle > p').map((_, el) => {
    const value = $(el).text().split(':')[1].trim();
    return {
      key: $(el).text().split(':')[0].trim().toLowerCase(),
      value: value.split(',').length > 3 ? value.split(', ') : value,
    };
  }).toArray().reduce((x: Record<string, string | string[]>, y) => {
    x[y.key] = y.value;
    return x;
  }, {});

  const episodes = $('.episodelist > ul > li').map((_, el) => ({
    title: $(el).find('span > a').text().trim(),
    url: $(el).find('span > a').attr('href'),
    date: $(el).find('.zeebr').text().trim(),
  }) as Episode).toArray();

  return {
    episodes,
    details,
    synopsis: $('.sinopc').text(),
    image: $('.fotoanime > img').attr('src') as string,
    name: slug,
    url: OtakUtil.resolveUri(getAnimeEndpoint(slug), request).href,
  };
};
