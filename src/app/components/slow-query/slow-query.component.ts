import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { FsChipModule } from '@firestitch/chip';
import { FsClipboardModule } from '@firestitch/clipboard';
import { FsDateModule } from '@firestitch/date';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';
import { FsListConfig, FsListModule } from '@firestitch/list';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SlowQuerySourceTypes } from '../../consts';
import { FsSlowQueryData } from '../../data';
import { indexByValue } from '../../helpers';
import { SlowQuery } from '../../interfaces';


/**
 * Everything kept of one slow query: the statement, what ran it and how, its
 * runs that day, and from its latest run the request path, the line of code
 * and the values it ran with, so it can be run again by hand. Opened by its
 * id: the route's :slowQueryId when it is a routed dialog, or
 * { slowQueryId } as the dialog's data.
 */
@Component({
  templateUrl: './slow-query.component.html',
  styleUrls: ['./slow-query.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DecimalPipe,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    FsChipModule,
    FsClipboardModule,
    FsDateModule,
    FsDialogModule,
    FsLabelModule,
    FsListModule,
    FsSkeletonModule,
  ],
})
export class FsSlowQueryComponent {

  public slowQuery = signal<SlowQuery | null>(null);
  public SlowQuerySourceTypes = indexByValue(SlowQuerySourceTypes);

  public sourceType = computed(() => {
    const slowQuery = this.slowQuery();

    return slowQuery ? this.SlowQuerySourceTypes[slowQuery.sourceType] : null;
  });

  public parametersListConfig: FsListConfig = {
    paging: false,
    reload: false,
    status: false,
    noResults: {
      message: 'It ran with no values',
    },
    fetch: () => of({ data: (this.slowQuery()?.parameters ?? []).map((parameter, index) => ({ ...parameter, position: index + 1 })) }),
  };

  private _route = inject(ActivatedRoute);
  private _data = inject<{ slowQueryId?: number } | null>(MAT_DIALOG_DATA, { optional: true });
  private _slowQueryData = inject(FsSlowQueryData);
  private _destroyRef = inject(DestroyRef);

  constructor() {
    this._init();
  }

  private _init(): void {
    const slowQueryId = Number(this._route.snapshot.paramMap.get('slowQueryId') ?? this._data?.slowQueryId);

    this._slowQueryData.get(slowQueryId, { averageDurations: true })
      .pipe(
        tap((slowQuery) => this.slowQuery.set(slowQuery)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
