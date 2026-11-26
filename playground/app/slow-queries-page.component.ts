import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FsSlowQueriesComponent } from '@firestitch/package';


/** The host's page: the list, and the outlet its routed dialog opens in. */
@Component({
  template: '<fs-slow-queries></fs-slow-queries><router-outlet></router-outlet>',
  standalone: true,
  imports: [FsSlowQueriesComponent, RouterOutlet],
})
export class SlowQueriesPageComponent {
}
