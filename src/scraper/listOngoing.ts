import {load} from 'cheerio';
import {TinyHttpClient} from 'hanif-tiny-http';

import {ListEndpoint} from '../constants';
import type {OngoingAnime} from '../types';
import {OtakUtil} from '../util';

export const getOngoingList = async (request: TinyHttpClient):
Promise<OngoingAnime[]> => {
  const response = await request.get(ListEndpoint.ongoing);
  const $ = load(response.getContent());

  return $('.venz > ul > li').map((_, element) => ({
    episode: parseInt($(element).find('.detpost > .epz').text()
        .replace(/[a-z]/gi, '').trim()),
    releaseAt: OtakUtil.resolveReleaseDate(
        $(element).find('.detpost > .newnime').text().trim() +
        ' ' + $(element).find('.detpost > .epztipe').text().trim()),
    image: $(element).find('.detpost > .thumb > a > .thumbz > img')
        .attr('src') as string,
    name: $(element).find('.detpost > .thumb > a > .thumbz > .jdlflm')
        .text().trim(),
    url: $(element).find('.detpost > .thumb > a').attr('href') as string,
    slug: ($(element).find('.detpost > .thumb > a').attr('href') as string)
        .split('/').filter((s) => s.length).pop() as string,
  })).toArray<OngoingAnime>();
};
