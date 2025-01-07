class SocketsConfiguration {
    constructor(io) {
        this.io = io;
    }

    socketEvents() {
        this.io.on("connection", (socket) => {
            socket.on("mensaje-to-server", (data) => {
                console.log(data);
                this.io.emit("mensaje-from-server", data);
            });
        });
    }
}
export { SocketsConfiguration }