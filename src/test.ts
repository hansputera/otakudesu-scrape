import {OtakudesuInstance} from './instance';

const ins = new OtakudesuInstance();

ins.getAnime('Boruto').then((animes) => {
  console.log(animes);
});
