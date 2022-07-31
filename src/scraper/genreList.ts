import {load} from 'cheerio';
import * as phin from 'phin';

import {ListEndpoint} from '../constants';
import type {Genre} from '../types';

export const getGenreList = async (requestUrl: string):
Promise<Genre[]> => {
  const response = await phin({
    'url': new URL(ListEndpoint.genreList, requestUrl),
  });

  const $ = load(response.body.toString('utf8'));

  return $('.venser > ul.genres > li > a')
      .map((_, genEl) =>
        ({name: $(genEl).text().trim(),
          url: new URL($(genEl).attr('href')!,
              requestUrl,
          ).href,
        })).toArray<Genre>();
};
