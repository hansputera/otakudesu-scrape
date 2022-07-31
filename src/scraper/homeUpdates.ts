import {load} from 'cheerio';
import * as phin from 'phin';

import {HomeAnimeUpdate} from '../types';
import {OtakUtil} from '../util';

export const getHomeUpdates = async (requestUrl: string):
Promise<HomeAnimeUpdate[]> => {
  const response = await phin({
    url: requestUrl,
  });
  const $ = load(response.body.toString('utf8'));

  return $('.venz > ul > li').map((_, el) => ({
    name: $(el).find('.thumb > a > .thumbz > .jdlflm').text().trim(),
    image: $(el).find('.thumb > a > .thumbz > img').attr('src') as string,
    releaseAt: OtakUtil.resolveReleaseDate(
        $(el).find('.newnime').text().trim() + ' ' +
            $(el).find('.epztipe').text().trim(),
    ),
    url: $(el).find('.thumb > a').attr('href') as string,
    slug: $(el).find('.thumb > a').attr('href')?.split('/')
        .filter((s) => s.length).pop(),
  }) as HomeAnimeUpdate).toArray();
};
