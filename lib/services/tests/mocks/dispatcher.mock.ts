import stream from 'stream';
import type { Dispatcher } from 'undici';

const duplex = new stream.Duplex();

export const dispatcherMock: Dispatcher = {
  dispatch: () => true,
  pipeline: () => duplex,
  connect: (
    options: Dispatcher.ConnectOptions,
  ): Promise<Dispatcher.ConnectData> => {
    const { opaque } = options;
    const connectData: Dispatcher.ConnectData = {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      socket: duplex,
      opaque: opaque,
    };
    return Promise.resolve(connectData);
  },
  request: (
    options: Dispatcher.RequestOptions,
  ): Promise<Dispatcher.ResponseData> => {
    const { opaque } = options;
    const responseData: Dispatcher.ResponseData = {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: null,
      trailers: {},
      opaque: opaque,
      context: {},
    };
    return Promise.resolve(responseData);
  },
  stream: (
    options: Dispatcher.RequestOptions,
    factory: Dispatcher.StreamFactory,
  ): Promise<Dispatcher.StreamData> => {
    const { opaque } = options;
    const streamData: Dispatcher.StreamData = {
      opaque: opaque,
      trailers: {} as Record<string, string>,
    };
    void factory;
    return Promise.resolve(streamData);
  },
  upgrade: (
    options: Dispatcher.UpgradeOptions,
  ): Promise<Dispatcher.UpgradeData> => {
    void options;
    const upgradeData: Dispatcher.UpgradeData = {
      headers: {
        'content-type': 'application/json',
      },
      socket: duplex,
      opaque: null,
    };
    return Promise.resolve(upgradeData);
  },
  close: (): Promise<void> => {
    return Promise.resolve();
  },
  destroy: (): Promise<void> => {
    return Promise.resolve();
  },
  addListener: (
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): Dispatcher => {
    void eventName;
    void listener;
    return this;
  },
  on: (
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): Dispatcher => {
    void eventName;
    void listener;
    return this;
  },
  once: (
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): Dispatcher => {
    void eventName;
    void listener;
    return this;
  },
  removeListener: (
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): Dispatcher => {
    void eventName;
    void listener;
    return this;
  },
  off: (
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): Dispatcher => {
    void eventName;
    void listener;
    return this;
  },
  removeAllListeners: (event?: string | symbol): Dispatcher => {
    void event;
    return this;
  },
  setMaxListeners: (n: number): Dispatcher => {
    void n;
    return this;
  },
  getMaxListeners: (): number => {
    return 0;
  },
  listeners: (eventName: string | symbol): any[] => {
    void eventName;
    return [this];
  },
  rawListeners: (eventName: string | symbol): any[] => {
    void eventName;
    return [this];
  },
  emit: (eventName: string | symbol, ...args: any[]): boolean => {
    void eventName;
    void args;
    return true;
  },
  listenerCount: (eventName: string | symbol): number => {
    void eventName;
    return 0;
  },
  prependListener: (
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): Dispatcher => {
    void eventName;
    void listener;
    return this;
  },
  prependOnceListener: (
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): Dispatcher => {
    void eventName;
    void listener;
    return this;
  },
  eventNames: (): (string | symbol)[] => {
    return [];
  },
};
