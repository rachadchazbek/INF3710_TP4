import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { PlanRepas, values } from "../interfaces/planrepas";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {

    user: "postgres",
    database: "TP4_Livraison",
    password: "",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "localhost",
    keepAlive: true
  };

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

    if (!numeroplan)
      throw new Error("Invalid get planrepas values");

    const values: string[] = [numeroplan.toString()];
    const queryText: string = `SELECT * FROM planrepas WHERE numéroplan = $1;`;

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

    if (!planrepas.numeroplan || !planrepas.categorie || !planrepas.frequence || !planrepas.nbrpersonnes || !planrepas.nbrcalories || !planrepas.prix || !planrepas.numerofournisseur)
      throw new Error("Invalid update planrepas values");

    const values: values = [planrepas.numeroplan, planrepas.categorie, planrepas.frequence, planrepas.nbrpersonnes, planrepas.nbrcalories, planrepas.prix, planrepas.numerofournisseur];
    const queryText: string = `UPDATE planrepas SET catégorie = $2, fréquence = $3, nbrpersonnes = $4, nbrcalories = $5, prix = $6, numérofournisseur = $7 WHERE numéroplan = $1;`;

    const res = await client.query(queryText, values);
    client.release();

    return res;
  }

  // === delete planrepas ===
  public async deletePlanRepas(planrepas: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    if (!planrepas.numeroplan)
      throw new Error("Invalid delete planrepas values");

    const values: string[] = [planrepas.numeroplan.toString()];
    const queryText: string = `DELETE FROM planrepas WHERE numéroplan = $1;`;

    const res = await client.query(queryText, values);
    client.release();

    return res;
  }

  // === create planrepas ===
  public async createPlanRepas(planrepas: PlanRepas): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    console.log("avant le if ");
    console.log(planrepas);
    console.log(!planrepas.nbrpersonnes);
    // if (!planrepas.numeroplan || !planrepas.categorie || !planrepas.frequence || !planrepas.nbrpersonnes.toString() || !planrepas.nbrcalories.toString() || !planrepas.prix.toString() || !planrepas.numerofournisseur){
    //   console.log("rentre dans le throw");
    //   throw new Error("Invalid create planrepas values");
    // }

    const values = [planrepas.numeroplan, planrepas.categorie.toString(), planrepas.frequence, planrepas.nbrpersonnes, planrepas.nbrcalories, planrepas.prix, planrepas.numerofournisseur];
    const queryText: string = `INSERT INTO TP4.Planrepas VALUES($1,$2,$3,$4,$5,$6,$7);`;
    console.log("Values", values);
    console.log(queryText)
    const res = await client.query(queryText, values);
    client.release();

    return res;
  }
}