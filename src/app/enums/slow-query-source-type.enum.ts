/** What ran a slow query: the framework's SlowQuerySourceTypeEnum. */
export enum SlowQuerySourceType {
  Operation = 'operation',
  Cron = 'cron',
  Process = 'process',
  Route = 'route',
  Command = 'command',
}
