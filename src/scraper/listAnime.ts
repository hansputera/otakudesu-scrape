import {load} from 'cheerio';
import * as phin from 'phin';

import {ListEndpoint} from '../constants';
import type {AnimeListItem} from '../types';

export const getListAnime = async (requestUrl: string):
Promise<AnimeListItem[]> => {
  const response = await phin({
    url: new URL(ListEndpoint.animeList, requestUrl),
  });
  const $ = load(response.body.toString('utf8'));

  return $('#abtext > .bariskelom').map((_, el) => ({
    _index: parseInt($(el).find('.barispenz').text().trim()),
    name: $(el).find('.hodebgst').attr('title'),
    url: $(el).find('.hodebgst').attr('href'),
    slug: $(el).find('.hodebgst').attr('href')?.split('/')
        .filter((s) => s.length).pop(),
  }) as AnimeListItem).toArray();
};
