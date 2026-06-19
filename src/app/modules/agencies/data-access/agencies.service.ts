import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Agency } from '../../models';

@Injectable({ providedIn: 'root' })
export class AgenciesService {
  private readonly http = inject(HttpClient);

  getAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>('data/agencies.json');
  }

  getAgencyById(id: number): Observable<Agency | undefined> {
    return this.getAgencies().pipe(map((agencies) => agencies.find((agency) => agency.id === id)));
  }
}
