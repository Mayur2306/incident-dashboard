export type IncidentStatus = 'New' | 'Investigating' | 'Monitoring' | 'Resolved';
export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Incident {
  id: string;
  title: string;
  service: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  description: string;
  createdAt: string;
  owner: string;
  impact: string;
}
