declare type Environment = {
    production: boolean;
    baseApiUrl: string;
    enableServiceWorker: boolean;
};

declare let module: NodeModule;

interface NodeModule {
    id: string;
}

declare interface Dictionary<T> {
    [index: string]: T;
}
