import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4_Livraison",
    password: "root",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);
  
  public async get(): Promise<pg.QueryResult> { 
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * from Client; `); 
    console.log(res);
    client.release();
    return res;
  }

}

