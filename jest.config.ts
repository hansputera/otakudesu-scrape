import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        'verbose': true,
        'clearMocks': true,
        'detectLeaks': true,
        'detectOpenHandles': true,
        'logHeapUsage': true,
        'transform': {
            '\\.((j|t)s)': 'ts-jest',
        }
    };
};