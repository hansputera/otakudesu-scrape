import {OtakudesuInstance} from './instance';

const ins = new OtakudesuInstance();

ins.getAnime('Boruto').then(console.log);
ins.listOngoing().then(console.log);
