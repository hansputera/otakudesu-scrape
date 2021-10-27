import {OtakudesuInstance} from './instance';

const ins = new OtakudesuInstance();

ins.getAnime('Boruto').then((animes) => {
  ins.getExtraAnime(animes[0].slug).then((extra) => {
    ins.getDownloadsByUrl(extra?.episodes[0].url as string).then((dl) => {
      console.log(dl.map((x) => x.links));
    });
  });
});
