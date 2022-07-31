import {load} from 'cheerio';
import * as phin from 'phin';

import {ListEndpoint} from '../constants';
import type {OngoingAnime} from '../types';
import {OtakUtil} from '../util';

export const getOngoingList = async (requestUrl: string):
Promise<OngoingAnime[]> => {
  const response = await phin({
    url: new URL(ListEndpoint.ongoing, requestUrl),
  });
  const $ = load(response.body.toString('utf8'));

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
