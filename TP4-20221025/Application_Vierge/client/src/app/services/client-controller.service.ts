import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanRepas } from 'src/interfaces/planrepas';

@Injectable({
    providedIn: 'root',
})
const END_POINT = environment.serverUrl + 'planPepas';
export class ClientControllerService {
    constructor(private readonly http: HttpClient) {}

    getPlanRepas(numeroPlan: number): Observable<PlanRepas> {
        return this.http.get<PlanRepas>(environment.serverUrl + 'planRepas/${numeroPlan}' ).pipe(catchError(this.handleError<PlanRepas>('basicGet')));;
    }


    getAllPlanRepas(): Observable<PlanRepas[]> {
        return this.http.get<PlanRepas[]>(environment.serverUrl + 'planPepas').pipe(catchError(this.handleError<PlanRepas[]>('basicGet')));
    }

    insertPlanRepas(planRepas: PlanRepas): Observable<void> {
        return this.http.post<void>(END_POINT, planRepas).pipe(catchError(this.handleError<void>('planRepas')));
    }

    addPlanrepas(planRepas: PlanRepas): Observable<void> {
        return this.http.post<void>(END_POINT, planRepas).pipe(catchError(this.handleError<void>('planRepas')));
    }
    deletePlanrepas(numeroPlan: number ): Observable<void>{
        return this.http.delete<void>(END_POINT+ '/' + numeroPlan).pipe(catchError(this.handleError<void>('planRepas')));
    }    
    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return () => of(result as T);
    }
