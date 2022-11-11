export interface PlanRepas {
    numeroplan: number;
    categorie: Categorie; 
    frequence: Frequence; // TODO make a Type for frequence
    nbpersonnes: number;
    nbcalories: number;
    prix: number;
    numerofournisseur: string;
}

type Categorie = "";// TODO Add all categories
type Frequence = "";// TODO Add all frequence