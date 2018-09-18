import { ItemEventData } from "ui/list-view"
import { Component, OnInit, NgZone } from "@angular/core";
import { WebSocketClient, WebSocketServer } from 'nativescript-betterwebsockets';
import * as application from "tns-core-modules/application";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    connectClientSelected = false;
    message;
    address;
    running = false;
    whatsRunning;
    messages = [];
    clients = [];

    client: WebSocketClient;
    server: WebSocketServer;

    clientStuff() {
        this.client = new WebSocketClient(this.address);
        // Open Event
        this.client.on('open', (handshake) => {
            this.messages.push({ name: 'Client', message: 'You are now connected!' });
            this.running = true;
        });
        // Message Event
        this.client.on('message', (message) => {
            this.messages.push({ name: 'Server', message });
        });
        // Close Event
        this.client.on('close', function(code, reason, remote){
            console.log('Closed!');
            this.client.close();
            this.running = false;
        });
        // Error Event
        this.client.on('error', function(ex){
            console.log('Error!');
            this.client.close();
            this.running = false;
        });
        // Connect (Do after setting the events!)
        this.client.connect();
    }

    serverStuff() {

    }

    clientSelected() {
        this.connectClientSelected = true;
    }

    cancelClient() {
        this.connectClientSelected = false;
    }

    start(what) {
        this.whatsRunning = what;
        if (what === 'client') {
            this.connectClientSelected = false;
            this.clientStuff();
        } else {
            this.serverStuff();
        }
    }

    stop() {
        if (this.whatsRunning === 'client') {
            this.client.close();
        } else {
            this.server.stop();
        }
        this.running = false;
    }

    send() {
        this.messages.push({ name: 'You', message: this.message });
        this.client.send(this.message);
        this.message = '';
    }

    constructor(private zone: NgZone) {}

    ngOnInit(): void {
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
             if (this.running) {
                this.zone.run(() => {
                    this.stop();
                });
                args.cancel = true;
            } else {
                args.cancel = false;
            }
        });
    }
}
