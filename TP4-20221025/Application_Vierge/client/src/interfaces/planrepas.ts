export class PlanRepas {
    numéroplan: string;
    catégorie: string;
    fréquence: string; 
    nbrpersonnes: number;
    nbrcalories: number;
    prix: number;
    numérofournisseur: string;
    public constructor(init?: Partial<PlanRepas>) {
              Object.assign(this, init);
          }
      }

