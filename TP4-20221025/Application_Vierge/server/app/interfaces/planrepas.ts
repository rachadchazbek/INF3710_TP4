export class PlanRepas {
    numeroplan: string;
    categorie: string;
    frequence: string;
    nbrpersonnes: number;
    nbrcalories: number;
    prix: number;
    numerofournisseur: string;
    contructor( numeroplan: string,
        categorie: string,
        frequence: string,
        nbrpersonnes: number,
        nbrcalories: number,
        prix: number,
        numerofournisseur: string){
            this.numeroplan = numeroplan
            this.categorie = categorie;
            this.frequence = frequence;
            this.nbrpersonnes = nbrpersonnes;
            this.nbrcalories = nbrcalories;
            this.prix = prix;
            this.numerofournisseur = numerofournisseur;
        }
}


export type values = [string, string, string, number, number, number, string];

// type Categorie = "";// TODO Add all categories
// type Frequence = "";// TODO Add all frequence