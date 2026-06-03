import { Incident } from '../models/incident.model';

export const mockIncidents: Incident[] = [
  {
    id: 'INC-1001',
    title: 'Payment processing delays',
    service: 'Payments',
    status: 'Investigating',
    severity: 'High',
    description: 'Transactions are taking longer than expected for credit card payments.',
    createdAt: '2026-06-02T10:15:00Z',
    owner: 'Lina Chen',
    impact: 'Affects checkout experience for all web customers.'
  },
  {
    id: 'INC-1002',
    title: 'Authentication error for some users',
    service: 'Authentication',
    status: 'New',
    severity: 'Critical',
    description: 'A subset of users receive invalid token errors when logging in.',
    createdAt: '2026-06-02T12:30:00Z',
    owner: 'Raj Patel',
    impact: 'May prevent user login on mobile and web platforms.'
  },
  {
    id: 'INC-1003',
    title: 'Notification delivery slowed',
    service: 'Messaging',
    status: 'Monitoring',
    severity: 'Medium',
    description: 'Messages are delayed by up to 2 minutes for push notifications.',
    createdAt: '2026-06-01T18:45:00Z',
    owner: 'Alicia Gomez',
    impact: 'Delayed notifications for mobile alerts and support tickets.'
  },
  {
    id: 'INC-1004',
    title: 'Storage write timeout',
    service: 'Storage',
    status: 'Resolved',
    severity: 'High',
    description: 'File uploads sometimes fail with a timeout during peak traffic.',
    createdAt: '2026-05-31T09:20:00Z',
    owner: 'Mark Johnson',
    impact: 'Intermittent storage failures for media uploads.'
  },
  {
    id: 'INC-1005',
    title: 'Profile update form validation issue',
    service: 'User Profile',
    status: 'New',
    severity: 'Low',
    description: 'Some fields are rejected even when input appears valid.',
    createdAt: '2026-06-02T14:10:00Z',
    owner: 'Priya Menon',
    impact: 'Small set of users unable to save profile changes.'
  }
];
