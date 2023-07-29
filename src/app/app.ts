// import express from 'express';
// import { router } from '../Routes/router';

// export class App {
//     static listen() {
//         throw new Error("Method not implemented.");
//     }
//     public server: express.Application;

//     constructor() {
//         this.server = express();
//         this.middleware();
//         this.router();
//     }

//     private middleware() {
//         this.server.use(express.json());
//     }

//     private router() {
//         this.server.use(router);
//     }
// }


import express from 'express';
import { router } from '../Routes/router';

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    private middleware() {
        this.server.use(express.json());
    }

    private router() {
        this.server.use(router);
    }

    public listen(port: number, callback: () => void): void {
        this.server.listen(port, callback);
    }
}
