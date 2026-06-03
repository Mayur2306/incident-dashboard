import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, first, map, Observable, of, throwError, tap } from 'rxjs';
import { Incident } from '../models/incident.model';
import { mockIncidents } from '../data/mock-incidents';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private incidentsSubject = new BehaviorSubject<Incident[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  readonly incidents$ = this.incidentsSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  constructor() {
    this.reload();
  }

  reload(shouldFail = false): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const source$ = shouldFail ? throwError(() => new Error('Unable to load incidents.')) : of(mockIncidents);

    source$
      .pipe(
        delay(600),
        tap((incidents) => {
          this.incidentsSubject.next(incidents);
          this.loadingSubject.next(false);
        }),
        catchError((error) => {
          const message = error instanceof Error ? error.message : 'Unknown error';
          this.errorSubject.next(message);
          this.loadingSubject.next(false);
          return of([] as Incident[]);
        })
      )
      .subscribe();
  }

  updateIncidentStatus(id: string, status: Incident['status']): void {
    const updates = this.incidentsSubject.value.map((incident) =>
      incident.id === id ? { ...incident, status } : incident
    );

    this.incidentsSubject.next(updates);
  }

  getIncidentById(id: string): Observable<Incident | undefined> {
    return this.incidents$.pipe(
      map((incidents) => incidents.find((incident) => incident.id === id)),
      first()
    );
  }
}
