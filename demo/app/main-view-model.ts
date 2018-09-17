import { Observable } from 'tns-core-modules/data/observable';
import { WebSocketClient, WebSocketServer } from 'nativescript-betterwebsockets';

export class HelloWorldModel extends Observable {
  public message: string;
  private client: WebSocketClient;
  private server: WebSocketServer;

  constructor() {
    super();

    /* this.client = new WebSocketClient('wss://echo.websocket.org');
    this.client.on('open', (handshake) => {
      console.log('WEBSOCKET IS OPEN!!');
      this.main();
    });
    this.client.on('message', (message) => {
      console.log('New message: ' + message);
    });
    this.client.connect(); */

    let port = 3000;
    this.server = new WebSocketServer(port);
    this.server.on('start', () => {
      console.log('Server started on port ' + port);
    });
    this.server.on('open', (conn, handshake) => {
      console.log('New Conenction');
      conn.send('Te has conectado!');
    });
    this.server.on('message', (conn, message) => {
      console.log(message);
    });
    this.server.start();
  }

  main() {
    this.client.send('Oh yeah!');
  }

}
