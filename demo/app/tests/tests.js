var Betterwebsockets = require("nativescript-betterwebsockets").Betterwebsockets;
var betterwebsockets = new Betterwebsockets();

describe("greet function", function() {
    it("exists", function() {
        expect(betterwebsockets.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(betterwebsockets.greet()).toEqual("Hello, NS");
    });
});