import { SlowQuery, SlowQuerySourceType } from '@firestitch/package';


/** Two days of slow queries, as GET system/logs/slowqueries answers them, in place of a host. */
export const PlaygroundSlowQueries: SlowQuery[] = [
  {
    id: 3,
    hash: '8f14e45fceea167a5a36dedd4bea2543c3a2b1c9',
    seenDate: '2026-11-21',
    sourceType: SlowQuerySourceType.Route,
    source: 'GET portal/reports/summary',
    query: 'SELECT clients.*, (SELECT MIN(tracking_conversions.conversion_date) FROM tracking_conversions WHERE tracking_conversions.client_id = clients.client_id AND tracking_conversions.measure IN (?+)) AS first_ftd_date FROM clients WHERE clients.client_id = ?',
    count: 4,
    totalDuration: 30.12,
    maxDuration: 12.4,
    averageDuration: 7.53,
    createDate: '2026-11-21T11:43:02+00:00',
    modifyDate: '2026-11-21T14:02:51+00:00',
    path: '/api/portal/reports/summary',
    caller: 'backend/Lib/Portal/Service/PortalSummaryService.php:88',
    parameters: [
      { column: 'tracking_conversions.measure', value: 'ftd' },
      { column: 'clients.client_id', value: 11100 },
    ],
  },
  {
    id: 2,
    hash: 'c9f0f895fb98ab9159f51fd0297e236d1a2b3c4d',
    seenDate: '2026-11-21',
    sourceType: SlowQuerySourceType.Cron,
    source: 'Campaigns',
    query: 'UPDATE ad_campaigns SET modify_date = ? WHERE ad_account_id = ?',
    count: 1,
    totalDuration: 5.2,
    maxDuration: 5.2,
    averageDuration: 5.2,
    createDate: '2026-11-21T03:00:12+00:00',
    modifyDate: '2026-11-21T03:00:12+00:00',
    path: null,
    caller: 'backend/Lib/AdCampaign/Service/AdCampaignSyncService.php:212',
    parameters: [],
  },
];
