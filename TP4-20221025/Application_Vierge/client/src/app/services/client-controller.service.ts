import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fournisseur, PlanRepas } from 'src/interfaces/planrepas';

const END_POINT = environment.serverUrl + 'planRepas';
@Injectable({
  providedIn: 'root'
})
export class ClientControllerService {

    constructor(private readonly http: HttpClient) {}

    getPlanRepas(numeroPlan: PlanRepas): Observable<PlanRepas[]> {
        return this.http.get<PlanRepas[]>(END_POINT+ `/${numeroPlan}` ).pipe(catchError(this.handleError<PlanRepas[]>('basicGet')));
    }

    getAllPlanRepas(): Observable<PlanRepas[]> {
        return this.http.get<PlanRepas[]>(END_POINT).pipe(catchError(this.handleError<PlanRepas[]>('basicGet')));
    }

    getAllFournisseurs(): Observable<Fournisseur[]> {
        return this.http.get<Fournisseur[]>(END_POINT).pipe(catchError(this.handleError<Fournisseur[]>('basicGet')));
    }

    updatePlanRepas(planRepas: PlanRepas): Observable<void> {
        return this.http.patch<void>(END_POINT, planRepas).pipe(catchError(this.handleError<void>('planRepas')));
    }

    addPlanrepas(planRepas: PlanRepas): Observable<void> {
        return this.http.post<void>(END_POINT, planRepas).pipe(catchError(this.handleError<void>('planRepas')));
    }
    deletePlanrepas(numeroPlan: string ): Observable<void>{
        return this.http.delete<void>(END_POINT+ `/${numeroPlan}`).pipe(catchError(this.handleError<void>('planRepas')));
    }    
    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return () => of(result as T);
    }
  }