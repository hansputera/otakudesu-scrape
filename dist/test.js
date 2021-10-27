"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const ins = new instance_1.OtakudesuInstance();
ins.getAnime('Boruto').then(console.log);
ins.listOngoing().then(console.log);
