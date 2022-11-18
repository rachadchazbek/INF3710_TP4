export interface PlanRepas {
    numeroplan: string;
    categorie: string;
    frequence: string; // TODO make a Type for frequence
    nbrpersonnes: number;
    nbrcalories: number;
    prix: number;
    numerofournisseur: string;
}

export type values = [string, string, string, number, number, number, string];

// type Categorie = "";// TODO Add all categories
// type Frequence = "";// TODO Add all frequence