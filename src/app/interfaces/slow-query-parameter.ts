/** One value of a slow query's latest run, with the column it was compared with or written to: null when that cannot be told. */
export interface SlowQueryParameter {
  column: string | null;
  value: string | number | boolean | null;
}
