import { SlowQuerySourceType } from '../enums/slow-query-source-type.enum';

import { SlowQueryParameter } from './slow-query-parameter';


/**
 * One slow query, from one source, on one day (UTC): every slow run of the
 * same statement, counted together. Durations are in seconds.
 */
export interface SlowQuery {
  id: number;
  hash: string;
  seenDate: string;
  sourceType: SlowQuerySourceType;
  source: string;
  query: string;
  count: number;
  totalDuration: number;
  maxDuration: number;
  createDate: string;
  modifyDate: string;
  path: string | null;
  caller: string | null;
  parameters: SlowQueryParameter[] | null;
  averageDuration?: number;
}
