import * as pg from "pg";

export const CONNEXTION_CONFIG: pg.ConnectionConfig = {

    user: "postgres",
    database: "TP4_Livraison",
    password: "0000",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "localhost",
    keepAlive: true
};