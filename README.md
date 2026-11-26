# @firestitch/slow-query

Screens for the framework's slow query log (`framework/SlowQuery`): every statement that ran at least
the threshold long, counted by statement, what ran it and day (UTC).

`<fs-slow-queries>` lists them, the latest day first and within it the one that took longest
altogether, with a keyword search over the statement, what ran it, the path and the caller, a filter by
what ran it and by day, and every number column sortable. Each statement links to its row's id,
relative to the list's route, where the host mounts `FsSlowQueryComponent` as a routed dialog: the
statement, its runs that day (count, total, average, slowest, first and last), what ran it, the request
path, the caller and the values of its latest run.

Both read the framework's `SlowQueriesView`, which the host mounts at `/api/system/logs/slowqueries`
and gates through its `SlowQueryProvider`.

```ts
const routes: Routes = [
  {
    path: 'slowqueries',
    component: SlowQueriesComponent, // <fs-slow-queries></fs-slow-queries><router-outlet></router-outlet>
    children: [
      fsDialogRoute({ path: ':slowQueryId', component: FsSlowQueryComponent }, { width: '1000px', autoFocus: false }),
    ],
  },
];
```
