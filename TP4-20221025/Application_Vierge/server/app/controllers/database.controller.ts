import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";


const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_ERROR = 404;
// const HTTP_BAD_REQUEST = 400;
@injectable()
export class DatabaseController {
  router: Router;
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {
    this.configureRouter();

  }

  private configureRouter(): void {
    this.router = Router();
    this.router.get('/', async (req, res) => {
      try {
        const allPlanRepas = await this.databaseService.getAllPlanRepas();
        console.log(allPlanRepas.rows);
        res.status(HTTP_OK).json(allPlanRepas.rows);
      }
      catch {
        console.log("Catch")
        res.status(HTTP_ERROR);
      }
    });

        this.router.post('/', async (req, res) => {
          try{
            this.databaseService.createPlanRepas(req.body).then(()=>{res.status(HTTP_CREATED)});
          }
          catch {
            res.status(HTTP_ERROR);
          }
           
        });

    this.router.patch('/', (req, res) => {
      try {
        this.databaseService.updatePlanRepas(req.body).then(()=>{res.status(HTTP_CREATED)});
        res.status(HTTP_CREATED);
      }
      catch {
        res.status(HTTP_ERROR);
      }
    });

    this.router.delete('/', (req, res) => {
      this.databaseService.deletePlanRepas(req.body);
      res.status(HTTP_OK);
    });


    this.router.get('/debug', (req, res) => {
      try {
        this.databaseService.poolDemo();
        res.status(HTTP_OK);
      }
      catch {
        res.status(HTTP_ERROR);
      }

    });
  }
}
