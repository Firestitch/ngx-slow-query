import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { FsApiModule } from '@firestitch/api';
import { fsDialogRoute } from '@firestitch/dialog';
import { FsListModule } from '@firestitch/list';
import { FsSlowQueryComponent, FsSlowQueryData } from '@firestitch/package';

import { of } from 'rxjs';

import { AppComponent } from './app/app.component';
import { PlaygroundSlowQueries } from './app/playground-slow-queries';
import { SlowQueriesPageComponent } from './app/slow-queries-page.component';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FsApiModule.forRoot(), FsListModule.forRoot()),
    // What GET system/logs/slowqueries answers, in place of a host
    {
      provide: FsSlowQueryData,
      useValue: {
        gets: () => of({ slowQueries: PlaygroundSlowQueries, paging: { records: PlaygroundSlowQueries.length, limit: 25, offset: 0 } }),
        get: (slowQueryId: number) => of(PlaygroundSlowQueries.find((slowQuery) => slowQuery.id === Number(slowQueryId))),
      },
    },
    provideRouter([
      {
        path: '',
        component: SlowQueriesPageComponent,
        children: [
          fsDialogRoute({ path: ':slowQueryId', component: FsSlowQueryComponent }, { width: '1000px', autoFocus: false }),
        ],
      },
    ]),
    provideAnimations(),
  ],
})
  .catch((err) => console.error(err));
