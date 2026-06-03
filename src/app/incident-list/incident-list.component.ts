import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IncidentService } from '../services/incident.service';
import { Incident, IncidentSeverity, IncidentStatus } from '../models/incident.model';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss']
})
export class IncidentListComponent {
  incidents: Incident[] = [];
  searchQuery = '';
  filterStatus = 'All';
  filterSeverity = 'All';
  filterService = 'All';

  readonly statusOptions = ['All', 'New', 'Investigating', 'Monitoring', 'Resolved'] as const;
  readonly severityOptions = ['All', 'Critical', 'High', 'Medium', 'Low'] as const;
  readonly serviceOptions = ['All', 'Payments', 'Authentication', 'Messaging', 'Storage', 'User Profile'] as const;

  readonly incidents$ = null as unknown as import('rxjs').Observable<Incident[]>;
  readonly loading$ = null as unknown as import('rxjs').Observable<boolean>;
  readonly error$ = null as unknown as import('rxjs').Observable<string | null>;

  constructor(private incidentService: IncidentService) {
    this.incidents$ = this.incidentService.incidents$;
    this.loading$ = this.incidentService.loading$;
    this.error$ = this.incidentService.error$;

    this.incidentService.incidents$.subscribe((items) => {
      this.incidents = items;
    });
  }

  get filteredIncidents(): Incident[] {
    const query = this.searchQuery.trim().toLowerCase();

    return this.incidents.filter((incident) => {
      const matchesStatus = this.filterStatus === 'All' || incident.status === this.filterStatus;
      const matchesSeverity = this.filterSeverity === 'All' || incident.severity === this.filterSeverity;
      const matchesService = this.filterService === 'All' || incident.service === this.filterService;
      const matchesSearch =
        !query ||
        incident.title.toLowerCase().includes(query) ||
        incident.id.toLowerCase().includes(query);

      return matchesStatus && matchesSeverity && matchesService && matchesSearch;
    });
  }

  updateStatus(incident: Incident, status: IncidentStatus): void {
    this.incidentService.updateIncidentStatus(incident.id, status);
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.filterStatus = 'All';
    this.filterSeverity = 'All';
    this.filterService = 'All';
  }

  reload(): void {
    this.incidentService.reload();
  }
}
