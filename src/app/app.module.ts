import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './root/app.component';
import { IndexComponent } from './index/index.component';
// import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { ScenicComponent } from './scenic/scenic.component';
import { TravelNotesComponent } from './travel-notes/travel-notes.component';
import { TravelStrategyComponent } from './travel-strategy/travel-strategy.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ScenicSearchComponent } from './scenic-search/scenic-search.component';
import { ScenicResultComponent } from './scenic-result/scenic-result.component';
// 导入路由模块
import {AppRoutingModule} from './app-routing.module';
// 导入子模块
import { PersonalCenterModule } from './personal-center/personal-center.module';
import { NotesChildComponent } from './notes-child/notes-child.component';
import { StrategyChildComponent } from './travel-strategy/strategy-child/strategy-child.component';

// 导入服务
import {GlobalPropertyService} from './services/global-property.service';

import { TravelAlbumComponent } from './travel-album/travel-album.component';
// import { EditorComponent } from './editor/editor.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    // PersonalCenterComponent,
    ScenicComponent,
    TravelNotesComponent,
    TravelStrategyComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent,
    NotesChildComponent,
    StrategyChildComponent,
    ScenicSearchComponent,
    ScenicResultComponent,
    TravelAlbumComponent,
    // EditorComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalCenterModule,
    AppRoutingModule
  ],
  providers: [GlobalPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
