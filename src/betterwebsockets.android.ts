declare var org: any;
declare var java: any;
declare var global: any;

/** Java WebSockets implementation for Nativescript (https://github.com/TooTallNate/Java-WebSocket) */
export class WebSocketClient extends (org.java_websocket.client.WebSocketClient as { new(uri): any; }) {

    private _events = {
        'open': {callback: function(...args: any[]) {}},
        'message': {callback: function(...args: any[]) {}},
        'close': {callback: function(...args: any[]) {}},
        'error': {callback: function(...args: any[]) {}}
    };

    constructor(serverURI: string) {
        super(new java.net.URI(serverURI));
        return global.__native(this);
    }

    /**
     * Called after an opening handshake has been performed and the given websocket is ready to be written on.
     * @param handshakedata The handshake of the websocket instance
     */
    onOpen(handshakedata) {
        this._events.open.callback(handshakedata);
    }

    /**
     * Callback for string messages received from the remote host
     * @param message The UTF-8 decoded message that was received.
     */
    onMessage(message: string) {
        this._events.message.callback(message);
    }

    /**
	 * Called after the websocket connection has been closed.
	 * @param code The codes can be looked up here: https://static.javadoc.io/org.java-websocket/Java-WebSocket/1.3.9/org/java_websocket/framing/CloseFrame.html
	 * @param reason Additional information string
	 * @param remote Returns whether or not the closing of the connection was initiated by the remote host.
	 **/
    onClose(code: number, reason: string, remote: boolean ) {
        this._events.close.callback(code, reason, remote);
    }

    /**
	 * Called when errors occurs. If an error causes the websocket connection to fail onClose(int, String, boolean) will be called additionally.
	 * This method will be called primarily because of IO or protocol errors.
	 * If the given exception is an RuntimeException that probably means that you encountered a bug.
	 * @param ex The exception causing this error
	 **/
    onError(ex) {
        this._events.error.callback(ex);
    }

    /**
     * Attach an event to this webSocket
     * @param event Event Type ("message", "open", "close", "error")
     * @param callback the function to run on the event
     */
    on(event: string, callback: Function) {
        if (this._events[event]) {
            this._events[event].callback = callback;
        }
    }

}

export class WebSocketServer extends (org.java_websocket.server.WebSocketServer as { new(port): any; }) {

    private _events = {
        'open': {callback: function(...args: any[]) {}},
        'message': {callback: function(...args: any[]) {}},
        'close': {callback: function(...args: any[]) {}},
        'error': {callback: function(...args: any[]) {}},
        'start': {callback: function(...args: any[]) {}}
    };

    constructor(port: number) {
        super(new java.net.InetSocketAddress(port));
        return global.__native(this);
    }

    /** Called after an opening handshake has been performed and the given websocket is ready to be written on.
	 * @param conn The WebSocket instance this event is occuring on.
	 * @param handshake The handshake of the websocket instance
	 */
    onOpen(conn, handshake) {
        this._events.open.callback(conn, handshake);
    }

    /**
	 * Callback for string messages received from the remote host
	 * @param conn The WebSocket instance this event is occuring on.
	 * @param message The UTF-8 decoded message that was received.
	 **/
    onMessage(conn, message: string) {
        this._events.message.callback(conn, message);
    }

    /**
	 * Called after the websocket connection has been closed.
	 * @param conn The WebSocket instance this event is occuring on.
	 * @param code The codes can be looked up here: https://static.javadoc.io/org.java-websocket/Java-WebSocket/1.3.9/org/java_websocket/framing/CloseFrame.html
	 * @param reason Additional information string
	 * @param remote Returns whether or not the closing of the connection was initiated by the remote host.
	 **/
    onClose(conn, code: number, reason: string, remote: boolean ) {
        this._events.close.callback(conn, code, reason, remote);
    }

    /**
	 * Called when errors occurs. If an error causes the websocket connection to fail onClose(WebSocket, int, String, boolean) will be called additionally.
	 * This method will be called primarily because of IO or protocol errors.
	 * If the given exception is an RuntimeException that probably means that you encountered a bug.
	 * @param conn Can be null if there error does not belong to one specific websocket. For example if the servers port could not be bound.
	 * @param ex The exception causing this error
     **/
    onError(conn, ex) {
        this._events.error.callback(conn, ex);
    }

    /**
	 * Called when the server started up successfully.
	 * If any error occured, onError is called instead.
	 */
    onStart() {
        this._events.start.callback();
    }

    /**
     * Attach a server event
     * @param event Event Type ("message", "open", "close", "error", "start")
     * @param callback the function to run on the event
     */
    on(event: string, callback: Function) {
        if (this._events[event]) {
            this._events[event].callback = callback;
        }
    }

}
