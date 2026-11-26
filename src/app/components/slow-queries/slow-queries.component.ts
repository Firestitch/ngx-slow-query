import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FsChipModule } from '@firestitch/chip';
import { FsDateModule } from '@firestitch/date';
import { ItemType } from '@firestitch/filter';
import { FsListConfig, FsListModule, PaginationStrategy } from '@firestitch/list';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SlowQuerySourceTypes } from '../../consts';
import { FsSlowQueryData } from '../../data';
import { indexByValue } from '../../helpers';
import { SlowQuery } from '../../interfaces';


/**
 * The queries that ran slow, one row per statement, what ran it and day
 * (UTC), the latest day first and within it the one that took longest
 * altogether, unless a column is sorted. Searched by a keyword over the
 * statement, what ran it, the path and the caller, and narrowed by what kind
 * of thing ran it and by day.
 *
 * Each statement links to its row's id, relative to this list's route: the
 * host mounts FsSlowQueryComponent there as a routed dialog
 * (fsDialogRoute({ path: ':slowQueryId', component: FsSlowQueryComponent })),
 * with a <router-outlet> beside this list.
 */
@Component({
  selector: 'fs-slow-queries',
  templateUrl: './slow-queries.component.html',
  styleUrls: ['./slow-queries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    FsChipModule,
    FsDateModule,
    FsListModule,
  ],
})
export class FsSlowQueriesComponent {

  public SlowQuerySourceTypes = indexByValue(SlowQuerySourceTypes);

  public listConfig: FsListConfig = {
    paging: {
      strategy: PaginationStrategy.Many,
    },
    noResults: {
      message: 'No query ran slow',
    },
    filters: [
      {
        type: ItemType.Keyword,
        name: 'keyword',
        label: 'Search',
      },
      {
        type: ItemType.Select,
        name: 'sourceType',
        label: 'Ran by',
        multiple: true,
        values: SlowQuerySourceTypes,
      },
      {
        type: ItemType.DateRange,
        name: 'seenDate',
        label: 'Day',
      },
    ],
    fetch: (query) => this._fetch(query),
  };

  private _slowQueryData = inject(FsSlowQueryData);

  private _fetch(query: Record<string, unknown>): Observable<{ data: SlowQuery[]; paging: unknown }> {
    return this._slowQueryData.gets({ ...query, averageDurations: true }, { key: null })
      .pipe(
        map((response) => ({ data: response.slowQueries, paging: response.paging })),
      );
  }
}
