import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistoryPageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class HistoryModule { }
