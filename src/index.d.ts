declare var org: any;
export declare class WebSocketClient extends org.java_websocket.client.WebSocketClient {
    private _events;
    constructor(serverURI: string);
    onOpen(handshakedata: any): void;
    onMessage(message: string): void;
    onClose(code: number, reason: string, remote: boolean): void;
    onError(ex: any): void;
    on(event: string, callback: Function): void;
}
export declare class WebSocketServer extends org.java_websocket.server.WebSocketServer {
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