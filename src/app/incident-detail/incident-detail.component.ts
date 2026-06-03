import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IncidentService } from '../services/incident.service';
import { Incident, IncidentStatus } from '../models/incident.model';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss']
})
export class IncidentDetailComponent {
  readonly statusOptions = ['New', 'Investigating', 'Monitoring', 'Resolved'] as const;
  readonly loading$!: Observable<boolean>;
  readonly incident$!: Observable<Incident | undefined>;
  incident: Incident | undefined;
  selectedStatus = '';

  constructor(private incidentService: IncidentService, private route: ActivatedRoute, private router: Router) {
    this.loading$ = this.incidentService.loading$;
    this.incident$ = this.route.paramMap.pipe(
      map((params) => params.get('id') ?? ''),
      switchMap((id) => this.incidentService.getIncidentById(id)),
      tap((incident) => {
        if (incident) {
          this.incident = incident;
          this.selectedStatus = incident.status;
        }
      })
    );
  }

  updateStatus(status: IncidentStatus): void {
    if (this.incident) {
      this.selectedStatus = status;
      this.incidentService.updateIncidentStatus(this.incident.id, status);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
