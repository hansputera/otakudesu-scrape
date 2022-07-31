import {load} from 'cheerio';
import * as phin from 'phin';
import {Download} from '../types';
import {OtakUtil} from '../util';

export const getDownloads = async (requestUrl: string, url: string):
Promise<Download[]> => {
  if (!OtakUtil.validateDownloadUrl(url)) return [];

  const response = await phin({
    url: new URL(url, requestUrl),
  });
  const $ = load(response.body.toString('utf8'));

  if (!$('title').text().trim().match(/otaku/gi)) return [];

  const downloads = $(
      url.match(/batch/gi) ? '.batchlink > ul > li' :
        '#venkonten > .venser > .venutama > .download > ul > li',
  ).map((_, el) => ({
    resolution: $(el).find('strong').text().trim(),
    links: $(el).find('a').map((_, el2) => ({
      name: $(el2).text().trim(),
      url: $(el2).attr('href') as string,
    })).toArray(),
  })).toArray<Download>();

  if (url.match(/lengkap/gi) && new Set(downloads).size !== downloads.length) {
    $('#venkonten > .download > h4').each((index, element) => {
      downloads[index]['title'] = $(element).text().trim();
    });
  }

  return downloads;
};
