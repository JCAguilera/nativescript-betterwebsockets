declare const WebSocketClient_base: new (uri: any) => any;
export declare class WebSocketClient extends WebSocketClient_base {
    private _events;
    constructor(serverURI: string);
    onOpen(handshakedata: any): void;
    onMessage(message: string): void;
    onClose(code: number, reason: string, remote: boolean): void;
    onError(ex: any): void;
    on(event: string, callback: Function): void;
}
declare const WebSocketServer_base: new (port: any) => any;
export declare class WebSocketServer extends WebSocketServer_base {
    private _events;
    constructor(port: number);
    onOpen(conn: any, handshake: any): void;
    onMessage(conn: any, message: string): void;
    onClose(conn: any, code: number, reason: string, remote: boolean): void;
    onError(conn: any, ex: any): void;
    onStart(): void;
    on(event: string, callback: Function): void;
}
export {};