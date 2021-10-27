"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const ins = new instance_1.OtakudesuInstance();
ins.listHomeUpdate().then(console.log);
