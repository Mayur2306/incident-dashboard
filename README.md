# Incident Dashboard

A small Angular 19 incident management UI with:

- incident list view
- status / severity / service filters
- search by title or ID
- incident details route
- local status updates against mocked data
- loading, empty, and error UI states

## Approach

This app uses a small, local state service as the single source of truth for mocked incident data. The list and detail views are implemented as standalone components that consume the same service and keep UI state simple and observable.

Key design decisions:

- `IncidentService` manages mocked incidents, load state, and local status updates
- standalone components simplify routing and reduce module boilerplate
- the list view supports search and multi-dimensional filtering
- details view uses route parameters and updates status locally
- accessibility is considered through labels, `aria-live`, and semantic HTML

## Run locally

From the project folder:

```bash
cd incident-dashboard
npm install
npm start
```

Open `http://localhost:4200` in your browser.

## What I would improve next

- add real API integration with HTTP client and retry/backoff
- introduce a typed state store or entity cache for larger incident datasets
- move filters into a dedicated component for separation of concerns
- support pagination, sorting, and bulk actions
- add visual status chips and keyboard navigation improvements
- create a mobile-first responsive design with better spacing

## Testing strategy

- unit tests for `IncidentService` to verify loading, error, and update flows
- component tests for list filtering and detail route rendering
- integration tests for search/filter combinations and status updates
- end-to-end tests that simulate the full incident lifecycle through the UI
