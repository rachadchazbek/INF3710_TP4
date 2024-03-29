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
        res.status(HTTP_OK).json(allPlanRepas.rows);
      }
      catch (error) {
        res.status(HTTP_ERROR).json(error);
      }
    });

    this.router.get('/fournisseurs', async (req, res) => {
      try {
        const allFournisseurs = await this.databaseService.getAllFournisseurs();
        console.log(allFournisseurs);
        res.status(HTTP_OK).json(allFournisseurs.rows);
      }
      catch (error) {
        res.status(HTTP_ERROR).json(error);
      }
    });

    this.router.get('/:numeroplan', async (req, res) => {
      try {
        const planRepas = await this.databaseService.getPlanRepas(req.params.numeroplan);
        res.status(HTTP_OK).json(planRepas.rows);
      }
      catch (error) {
        res.status(HTTP_ERROR);
      }
    });

    this.router.post('/', async (req, res) => {
      try {
        await this.databaseService.createPlanRepas(req.body).then(() => { res.status(HTTP_CREATED).json() });
      }
      catch {
        res.status(HTTP_ERROR);
      }

    });

    this.router.patch('/', async (req, res) => {
      try {
        await this.databaseService.updatePlanRepas(req.body).then(() => { res.status(HTTP_CREATED).json() });
        res.status(HTTP_CREATED);
      }
      catch {
        res.status(HTTP_ERROR);
      }
    });

    this.router.delete('/:numeroplan', (req, res) => {
      this.databaseService.deletePlanRepas(req.params.numeroplan).then(() => { res.status(HTTP_OK).json() }).catch((error) => { res.status(HTTP_ERROR).json(error) });
    });

    this.router.get('/debug', async (req, res) => {
      try {
        await this.databaseService.poolDemo();
        res.status(HTTP_OK);
      }
      catch {
        res.status(HTTP_ERROR);
      }

    });
  }
}
