import { OtakudesuInstance } from '../instance';

describe('getExtraAnime test', () => {
    let slug: string = '';

    const otaku = new OtakudesuInstance();
    it('Getting anime slug', async () => {
        const data = await otaku.getAnime('Angel Beats!');
        expect(data).not.toBeUndefined();
        expect(data).toHaveLength(1);

        slug = data.at(0)?.slug!;
        expect(slug).not.toHaveLength(0);
    });

    it('getExtraAnime should return an object', async () => {
        const extra = await otaku.getExtraAnime(slug);
        expect(extra).not.toBeUndefined();
        expect(extra?.name).not.toBeUndefined();
        expect(extra?.name).not.toHaveLength(0);
        expect(extra?.synopsis).not.toHaveLength(0);
        expect(extra?.details).not.toBeUndefined();
        expect(extra?.details).not.toEqual({});
        expect(extra?.episodes).not.toHaveLength(0);
        expect(extra?.image).not.toBeUndefined();
    });

    it('getExtraAnime should return invalid object', async () => {
        const extra = await otaku.getExtraAnime(slug.concat('-invalid'));
        expect(extra?.image).toBeUndefined();
        expect(extra?.episodes).toHaveLength(0);
        expect(extra?.details).toEqual({});
    });
});
