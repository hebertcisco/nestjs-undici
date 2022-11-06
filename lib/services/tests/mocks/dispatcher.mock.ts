import stream from 'stream';
import type { Dispatcher } from "undici";

const duplex = new stream.Duplex();

export const dispatcherMock: Dispatcher = {
    dispatch: () => true,
    pipeline: () => duplex,
    connect: (options: Dispatcher.ConnectOptions): Promise<Dispatcher.ConnectData> => {
        const { opaque } = options;
        const connectData: Dispatcher.ConnectData = {
            statusCode: 200,
            headers: {
                "content-type": "application/json"
            },
            socket: duplex,
            opaque: opaque
        };
        return Promise.resolve(connectData);
    },
    request: (options: Dispatcher.RequestOptions): Promise<Dispatcher.ResponseData> => {
        const { opaque } = options;
        const responseData: Dispatcher.ResponseData = {
            statusCode: 200,
            headers: {
                "content-type": "application/json"
            },
            body: null,
            trailers: {},
            opaque: opaque,
            context: {}
        };
        return Promise.resolve(responseData);
    },
    stream: (options: Dispatcher.RequestOptions, factory: Dispatcher.StreamFactory): Promise<Dispatcher.StreamData> => {
        const { opaque } = options;
        const streamData: Dispatcher.StreamData = {
            opaque: opaque,
            trailers: {} as Record<string, string>
        };
        void factory;
        return Promise.resolve(streamData);
    },
    upgrade: function (options: Dispatcher.UpgradeOptions): Promise<Dispatcher.UpgradeData> {
        void options;
        const upgradeData: Dispatcher.UpgradeData = {
            headers: {
                "content-type": "application/json"
            },
            socket: duplex,
            opaque: null
        };
        return Promise.resolve(upgradeData);
    },
    close: function (): Promise<void> {
        return Promise.resolve();
    },
    destroy: function (): Promise<void> {
        return Promise.resolve();
    },
    addListener: function (eventName: string | symbol, listener: (...args: any[]) => void): Dispatcher {
        return this;
    },
    on: function (eventName: string | symbol, listener: (...args: any[]) => void): Dispatcher {
        return this;
    },
    once: function (eventName: string | symbol, listener: (...args: any[]) => void): Dispatcher {
        return this;
    },
    removeListener: function (eventName: string | symbol, listener: (...args: any[]) => void): Dispatcher {
        return this;
    },
    off: function (eventName: string | symbol, listener: (...args: any[]) => void): Dispatcher {
        return this;
    },
    removeAllListeners: function (event?: string | symbol): Dispatcher {
        return this;
    },
    setMaxListeners: function (n: number): Dispatcher {
        return this;
    },
    getMaxListeners: function (): number {
        return 0;
    },
    listeners: function (eventName: string | symbol): Function[] {
        return [];
    },
    rawListeners: function (eventName: string | symbol): Function[] {
        return [];
    },
    emit: function (eventName: string | symbol, ...args: any[]): boolean {
        return true;
    },
    listenerCount: function (eventName: string | symbol): number {
        return 0;
    },
    prependListener: function (eventName: string | symbol, listener: (...args: any[]) => void): Dispatcher {
        return this;
    },
    prependOnceListener: function (eventName: string | symbol, listener: (...args: any[]) => void): Dispatcher {
        return this;
    },
    eventNames: function (): (string | symbol)[] {
        return [];
    }
};