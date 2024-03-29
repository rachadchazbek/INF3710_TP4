import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import { DatabaseController } from "./controllers/database.controller";
import Types from "./types";

@injectable()
export class Application {
  private readonly internalError: number = 500;
  public app: express.Application;

  public constructor(@inject(Types.DatabaseController) private databaseController: DatabaseController) {
    this.app = express();
    this.config();
    this.bindRoutes();
  }

  private config(): void {
    // Middlewares configuration
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  public bindRoutes(): void {
    // Notre application utilise le routeur de notre API
    this.app.use("/planRepas", this.databaseController.router);
    this.errorHandeling();
  }

  private errorHandeling(): void {

    // Gestion des erreurs
    this.app.use((_req: express.Request, _res: express.Response, next: express.NextFunction) => {
      const err: Error = new Error("Not Found");
      (err as any).status = 404;
      next(err);
    });
    this.app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      res.status(err.status || this.internalError);
      res.send({
        message: err.message,
        error: err,
      });
    });
  }
}
