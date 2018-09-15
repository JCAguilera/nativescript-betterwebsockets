import { Observable } from 'tns-core-modules/data/observable';
import { Betterwebsockets } from 'nativescript-betterwebsockets';

export class HelloWorldModel extends Observable {
  public message: string;
  private betterwebsockets: Betterwebsockets;

  constructor() {
    super();

    this.betterwebsockets = new Betterwebsockets();
    this.message = this.betterwebsockets.message;
  }
}
