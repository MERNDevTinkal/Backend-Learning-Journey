import type ShellInstanceState from './shell-instance-state';
import { ShellApiClass } from './decorators';
declare const instanceStateSymbol: unique symbol;
export declare class ShellLog extends ShellApiClass {
    [instanceStateSymbol]: ShellInstanceState;
    get _instanceState(): ShellInstanceState;
    constructor(instanceState: ShellInstanceState);
    getPath(): string | undefined;
    info(message: string, attr?: unknown): void;
    warn(message: string, attr?: unknown): void;
    error(message: string, attr?: unknown): void;
    fatal(message: string, attr?: unknown): void;
    debug(message: string, attr?: unknown, level?: 1 | 2 | 3 | 4 | 5): void;
}
export {};
