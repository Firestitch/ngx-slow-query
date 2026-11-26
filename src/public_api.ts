/*
 * Public API Surface of @firestitch/slow-query
 *
 * Screens for the framework's slow query log (Framework\SlowQuery): a list of
 * the queries that ran slow, filtered and sorted (FsSlowQueriesComponent),
 * and a dialog with everything kept of one (FsSlowQueryComponent). Both read
 * the framework's SlowQueriesView, which the host mounts at
 * /api/system/logs/slowqueries (FsSlowQueryData.basePath).
 */
export { FsSlowQueriesComponent } from './app/components/slow-queries/slow-queries.component';
export { FsSlowQueryComponent } from './app/components/slow-query/slow-query.component';
export { SlowQuerySourceTypes } from './app/consts';
export { FsSlowQueryData } from './app/data/slow-query.data';
export * from './app/enums';
export * from './app/interfaces';
