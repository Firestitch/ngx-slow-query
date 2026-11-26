import { SlowQuerySourceType } from '../enums/slow-query-source-type.enum';


export const SlowQuerySourceTypes = [
  { name: 'Operation', value: SlowQuerySourceType.Operation, background: '#dbeafe' },
  { name: 'Route', value: SlowQuerySourceType.Route, background: '#e0f2fe' },
  { name: 'Cron', value: SlowQuerySourceType.Cron, background: '#ede9fe' },
  { name: 'Process', value: SlowQuerySourceType.Process, background: '#fef3c7' },
  { name: 'Command', value: SlowQuerySourceType.Command, background: '#f3f4f6' },
];
