const { ErrorCode } = require("./lib/ErrorCode");

(async () => {
    const App = require("./class/App");

    const app = new App({
        port: 3000,
        useBodyParser: true,
        urlEncodedExtended: false,
        sendDebug: false,
        mongodb: {
            connection: true,
            url: "your mongodb url"
        }
    });

    app.create();

    app.addRoute({ url: "/", path: "./routes/index.js" });
    app.addRoute({ url: "/auth", path: "./routes/auth.js" });
    app.addRoute({ url: "/api", path: "./routes/api.js" });
    app.addRoute({ url: "/user", path: "./routes/user.js" });
})();