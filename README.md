
#  BetterWebsockets for Nativescript

[Java WebSockets](https://github.com/TooTallNate/Java-WebSocket) Library implementation for Nativescript. Allows you to create a WebSocket Client and Server on Android.

[![PayPal Donation](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg)](https://www.paypal.me/JCAguilera) [![Bitcoin Donation](https://img.shields.io/badge/Donate-Bitcoin-orange.svg)](https://juankyapps.com/bitcoin.html)

## Requirements
  
This plugin works on Android only!

## Installation

To install this plugin:
```javascript
tns plugin add nativescript-betterwebsockets
```
## Usage
```javascript
import { WebSocketClient, WebSocketServer } from 'nativescript-betterwebsockets';  
```
**WebSocketClient:**
```javascript
/** Inside your page component **/
let url = 'wss://echo.websocket.org';
this.client = new WebSocketClient(url);
// Open Event
this.client.on('open', function(handshake){
	console.log('Opened!');
	this.main(); // Do everything else here
});
// Message Event
this.client.on('message', function(message){ 
	console.log('New message: ' + message);
});
// Close Event
this.client.on('close', function(code, reason, remote){
	console.log('Closed!');
});
// Error Event
this.client.on('error', function(ex){
	console.log('Error!');
});
// Connect (Do after setting the events!).
this.client.connect();
```
```javascript
// This will be executed after the open event.
main() {
	this.client.send('Hey!');
	this.client.close(); // Close the client :(
}
```
**WebSocketServer:**
```javascript
let port = 3000;
this.server  =  new  WebSocketServer(port);
// Start Event (Server Started successfully)
this.server.on('start', () => {
	console.log('Server listening on *:'  +  port);
});
// Open Event (Someone connects)
this.server.on('open', (conn, handshake) => {
	console.log('New Conenction!');
	conn.send('You are connected!'); // Send message to socket
});
// Message Event
this.server.on('message', (conn, message) => {
	console.log('New message: ' + message);
});
// Close event
this.server.on('close', (conn, code, reason, remote) => {
	console.log('Someone left!');
});
// Error event
this.server.on('error', (conn, ex) => {
	console.log('Error!');
});
// Starts the server
this.server.start();
```
## License

MIT License - see [LICENSE](LICENSE) for more details.