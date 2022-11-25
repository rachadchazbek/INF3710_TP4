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

