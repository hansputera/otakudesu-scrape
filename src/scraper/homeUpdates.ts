import {load} from 'cheerio';
import {TinyHttpClient} from 'hanif-tiny-http';

import {HomeAnimeUpdate} from '../types';
import {OtakUtil} from '../util';

export const getHomeUpdates = async (request: TinyHttpClient):
Promise<HomeAnimeUpdate[]> => {
  const response = await request.get('./');
  const $ = load(response.getContent());

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
