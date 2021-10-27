import {load} from 'cheerio';
import {TinyHttpClient} from 'hanif-tiny-http';

import {ListEndpoint} from '../constants';
import type {AnimeListItem} from '../types';

export const getListAnime = async (request: TinyHttpClient):
Promise<AnimeListItem[]> => {
  const response = await request.get(ListEndpoint.animeList);
  const $ = load(response.getContent());

  return $('#abtext > .bariskelom').map((_, el) => ({
    _index: parseInt($(el).find('.barispenz').text().trim()),
    name: $(el).find('.hodebgst').attr('title'),
    url: $(el).find('.hodebgst').attr('href'),
    slug: $(el).find('.hodebgst').attr('href')?.split('/')
        .filter((s) => s.length).pop(),
  }) as AnimeListItem).toArray();
};
