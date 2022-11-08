import {OtakudesuInstance} from '../instance';

describe('get_anime test', () => {
  const otaku = new OtakudesuInstance();

  it('Should return an empty array', async () => {
    await expect(otaku.getAnime('this title doesn\'t exists!!!!!'))
        .resolves.toEqual([]);
  });

  it('Should return an array with 1 item', async () => {
    await expect(otaku.getAnime('Boruto')).resolves.toHaveLength(1);
  });
});
