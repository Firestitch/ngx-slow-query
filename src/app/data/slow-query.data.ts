import { Injectable, inject } from '@angular/core';

import { FsApi, RequestConfig } from '@firestitch/api';

import { Observable } from 'rxjs';

import { SlowQuery } from '../interfaces';


/**
 * The framework's slow queries (Framework\SlowQuery\Api\SlowQueriesView),
 * under [basePath]: "system/logs/slowqueries", where an application mounts
 * the view in its System area.
 */
@Injectable({
  providedIn: 'root',
})
export class FsSlowQueryData {

  public basePath = 'system/logs/slowqueries';

  private _api = inject(FsApi);

  /** A page of slow queries: with key: null, the whole answer, its paging included. */
  public gets(query: Record<string, unknown> = {}, config: RequestConfig = {}): Observable<any> {
    return this._api.get(
      this.basePath,
      query,
      { key: 'slowQueries', ...config },
    );
  }

  public get(slowQueryId: number, query: Record<string, unknown> = {}, config: RequestConfig = {}): Observable<SlowQuery> {
    return this._api.get(
      `${this.basePath}/${slowQueryId}`,
      query,
      { key: 'slowQuery', ...config },
    );
  }
}
