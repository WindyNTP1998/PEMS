export interface Dictionary<T> {
    [index: string | number | symbol]: T;
}
