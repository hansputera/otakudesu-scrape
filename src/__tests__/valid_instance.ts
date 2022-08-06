import {OtakudesuInstance} from '../instance';

describe('\'otaku\' property validation', () => {
  const otaku = new OtakudesuInstance();
  it('Variable \'otaku\' should be OtakudesuInstance', (done) => {
    expect(otaku).not.toBeUndefined();
    expect(otaku).toBeInstanceOf(OtakudesuInstance);
    done();
  });

  it('Should have getAnime method', (done) => {
    expect(otaku?.getAnime).not.toBeUndefined();
    expect(typeof otaku.getAnime).toEqual('function');
    done();
  });

  it('Should have listHomeUpdate method', (done) => {
    expect(otaku?.listHomeUpdate).not.toBeUndefined();
    expect(typeof otaku.listHomeUpdate).toEqual('function');
    done();
  });

  it('Should have listGenre method', (done) => {
    expect(otaku?.listGenre).not.toBeUndefined();
    expect(typeof otaku.listGenre).toEqual('function');
    done();
  });

  it('Should have listOngoing method', (done) => {
    expect(otaku?.listOngoing).not.toBeUndefined();
    expect(typeof otaku.listOngoing).toEqual('function');
    done();
  });

  it('Should have getExtraAnime method', (done) => {
    expect(otaku?.getExtraAnime).not.toBeUndefined();
    expect(typeof otaku.getExtraAnime).toEqual('function');
    done();
  });

  it('Should have getStream method', (done) => {
    expect(otaku?.getStream).not.toBeUndefined();
    expect(typeof otaku.getStream).toEqual('function');
    done();
  });

  it('Should have getDownloadsByUrl method', (done) => {
    expect(otaku?.getDownloadsByUrl).not.toBeUndefined();
    expect(typeof otaku.getDownloadsByUrl).toEqual('function');
    done();
  });
});
