import {load} from 'cheerio';
import type {TinyHttpClient} from 'hanif-tiny-http';
import {Util} from 'hanif-tiny-http/dist/util';

import {ListEndpoint} from '../constants';
import type {Genre} from '../types';

export const getGenreList = async (request: TinyHttpClient):
Promise<Genre[]> => {
  const response = await request.get(ListEndpoint.genreList);
  const $ = load(response.getContent());

  return $('.venser > ul.genres > li > a')
      .map((_, genEl) =>
        ({name: $(genEl).text().trim(),
          url: Util.resolveUri($(genEl).attr('href')!,
              request,
          ).href,
        })).toArray<Genre>();
};
