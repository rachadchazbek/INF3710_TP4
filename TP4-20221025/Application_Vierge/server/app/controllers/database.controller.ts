import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";


const HTTP_OK = 200;
// const HTTP_CREATED = 201;
// const HTTP_ERROR = 404;
// const HTTP_BAD_REQUEST = 400;

@injectable()
export class DatabaseController {
  router: Router;
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {
    this.configureRouter();
  }
  
  // public get router(): Router {
  //   const router: Router = Router();
  //   return router;
  // }
  private configureRouter(): void {
        this.router = Router();
  
  
        this.router.get('/planrepas', (req, res) => {
            console.log("GET /");
            // this.databaseService.poolDemo();
            res.status(200);
            // res.status(HTTP_OK).json(this.databaseService.poolDemo());
        });
        this.router.post('/planRepas', (req, res) => {
          res.status(HTTP_OK).json(this.databaseService);
        });
       this.router.delete('/', (req, res) => {
        res.status(HTTP_OK).json(this.databaseService);
        });
  }
}
