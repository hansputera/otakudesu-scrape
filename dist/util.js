"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleException = exports.OtakUtil = exports.signal = exports.daysDefined = exports.monthsDefined = void 0;
const util_1 = require("hanif-tiny-http/dist/util");
const node_events_1 = require("node:events");
exports.monthsDefined = {
    'okt': 'October',
    'mar': 'March',
    'dec': 'December',
    'ags': 'August',
    'apr': 'April',
    'may': 'May',
    'nov': 'November',
    'jan': 'January',
    'sep': 'September',
    'jul': 'July',
    'jun': 'June',
    'feb': 'February',
};
exports.daysDefined = {
    'senin': 'Monday',
    'selasa': 'Tuesday',
    'rabu': 'Wednesday',
    'kamis': 'Thursday',
    'jumat': 'Friday',
    'sabtu': 'Saturday',
    'minggu': 'Sunday',
};
exports.signal = new node_events_1.EventEmitter({
    'captureRejections': true,
});
;
/**
 * @class OtakUtil
 */
class OtakUtil extends util_1.Util {
    /**
       * @description OtakUtil constructor
       */
    constructor() {
        super();
    }
    /**
     * @description Resolve release date
     * @param {String} date - (eg. 23 Okt Minggu)
     * @return {ResolvedReleaseDate}
     */
    static resolveReleaseDate(date) {
        const skat = date.split(/\s/); // split every space in string.
        const numDate = skat.find((x) => /[0-9]/g.test(x));
        const month = exports.monthsDefined[skat[1].toLowerCase()];
        const day = skat.pop();
        return {
            date: numDate ? parseInt(numDate) : 0,
            day: (day === 'None' && Number.isNaN(day) ? 'Random' : (day !== 'None' &&
                !Number.isNaN(day) ? 'Maybe time: ' + (day === null || day === void 0 ? void 0 : day.toString()) :
                exports.daysDefined[day === null || day === void 0 ? void 0 : day.toLowerCase()])),
            month,
        };
    }
    /**
     * @param {String} url - Validate Download URL
     * @return {Boolean}
     */
    static validateDownloadUrl(url) {
        return /^(http(s)?):\/\/otakudesu((.)vip|moe|tv)\/[a-zA-Z0-9].+(\/)?/gi
            .test(url) && this.validateURL(url);
    }
}
exports.OtakUtil = OtakUtil;
const handleException = (__, _, descriptor) => {
    return {
        configurable: true,
        get() {
            var _a;
            try {
                const bound = (_a = descriptor.value) === null || _a === void 0 ? void 0 : _a.bind(this);
                Object.defineProperty(this, _, {
                    value: bound,
                    configurable: true,
                    writable: true,
                });
                exports.signal.emit('executed', { t: bound, timestamp: Date.now() });
                return bound;
            }
            catch (err) {
                exports.signal.emit('error', err);
                return undefined;
            }
        },
    };
};
exports.handleException = handleException;
