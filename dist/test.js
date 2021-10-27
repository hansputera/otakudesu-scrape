"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const ins = new instance_1.OtakudesuInstance();
ins.getAnime('Boruto').then((animes) => {
    ins.getExtraAnime(animes[0].slug).then((extra) => {
        ins.getDownloadsByUrl(extra === null || extra === void 0 ? void 0 : extra.episodes[0].url).then((dl) => {
            console.log(dl.map((x) => x.links));
        });
    });
});
