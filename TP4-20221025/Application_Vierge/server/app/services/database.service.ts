import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { PlanRepas, values } from "../interfaces/planrepas";
import { DATABASE_CONFIG } from "./database.config";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = DATABASE_CONFIG;

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // === Debug ===
  public async poolDemo(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT NOW();`);
    console.log(res);
    client.release();
    return res;
  }

  // === PlanRepas ===
  public async getPlanRepas(numeroplan: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const values: string[] = [numeroplan.toString()];
    const queryText: string = `SELECT * FROM planrepas WHERE numeroplan = $1;`;

    const res = await client.query(queryText, values);
    client.release();

    return res;
  }

  // === get all planrepas ===
  public async getAllPlanRepas(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const res = await client.query(`SELECT * FROM Planrepas;`);
    client.release();

    return res;
  }

  // === update planrepas ===
  public async updatePlanRepas(planrepas: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const values: values = [planrepas.numeroplan, planrepas.categorie, planrepas.frequence, planrepas.nbrpersonnes, planrepas.nbrcalories, planrepas.prix, planrepas.numerofournisseur];
    const queryText: string = `UPDATE planrepas SET categorie = $2, frequence = $3, nbrpersonnes = $4, nbrcalories = $5, prix = $6, numerofournisseur = $7 WHERE numeroplan = $1;`;

    const res = await client.query(queryText, values);
    client.release();

    return res;
  }

  // === delete planrepas ===
  public async deletePlanRepas(numeroplan: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const values: string[] = [numeroplan];
    const queryText: string = `DELETE FROM planrepas WHERE numeroplan = $1;`;

    const res = await client.query(queryText, values);
    client.release();

    return res;
  }

  // === create planrepas ===
  public async createPlanRepas(planrepas: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const values = [planrepas.numeroplan, planrepas.categorie, planrepas.frequence, planrepas.nbrpersonnes, planrepas.nbrcalories, planrepas.prix, planrepas.numerofournisseur];
    const queryText: string = `INSERT INTO Planrepas VALUES($1,$2,$3,$4,$5,$6,$7);`;
    const res = await client.query(queryText, values);
    client.release();

    return res;
  }

  // === Fournisseur ===
  public async getAllFournisseurs(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const res = await client.query(`SELECT * FROM Fournisseur;`);
    client.release();

    return res;
  }
}