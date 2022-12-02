export class PlanRepas {
    numeroplan: string;
    categorie: string;
    frequence: string; 
    nbrpersonnes: number;
    nbrcalories: number;
    prix: number;
    numerofournisseur: string;
    public constructor(init?: Partial<PlanRepas>) {
              Object.assign(this, init);
          }
      }

export class Fournisseur {
    numerofournisseur: string;
    nomfournisseur: string;
    adressefournisseur: string;
    public constructor(init?: Partial<Fournisseur>) {
        Object.assign(this, init);
    }
}

