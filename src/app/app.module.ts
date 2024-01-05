import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { CopyRightComponent } from './components/copy-right/copy-right.component';
import { createStore } from './store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(createStore()),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
    HeaderComponent,
    FooterComponent,
    ListComponent,
    ItemComponent,
    CopyRightComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
