"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtakUtil = exports.daysDefined = exports.monthsDefined = void 0;
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
;
/**
 * @class OtakUtil
 */
class OtakUtil {
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
        return /^(http(s)?):\/\/(.*)\.(.*)\/[a-zA-Z0-9].+(\/)?/gi
            .test(url);
    }
}
exports.OtakUtil = OtakUtil;
