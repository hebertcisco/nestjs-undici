import BodyReadable from 'undici/types/readable';

export const bodyMock = {
  bodyUsed: false,
  arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  blob: () => Promise.resolve(new Blob()),
  formData: () => Promise.reject(new Error('Method not implemented.')),
  json: () =>
    Promise.resolve({
      test: 'test',
    }),
  text: () => Promise.resolve('test'),
  body: new BodyReadable({
    resume() {
      return;
    },
    abort() {
      return;
    },
  }),
} as any;
