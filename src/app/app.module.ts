import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from './register/equal-validator.directive';

import { AppComponent } from './root/app.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';

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
import {CreateNotesComponent} from './create-notes/create-notes.component';
import { EditorComponent } from './editor/editor.component';

// 导入路由模块
import {AppRoutingModule} from './app-routing.module';
// 导入子模块
import { PersonalCenterModule } from './personal-center/personal-center.module';
import { NotesChildComponent } from './notes-child/notes-child.component';
import { StrategyChildComponent } from './strategy-child/strategy-child.component';

// 导入服务
import {GlobalPropertyService} from './services/global-property.service';

import { TravelAlbumComponent } from './travel-album/travel-album.component';
import { LoopImgComponent } from './loop-img/loop-img.component';
import { IndexScenicPipe } from './Pipes/index-scenic.pipe';
import { ThemeStringPipe } from './Pipes/theme-string.pipe';
import { IndexNotesPipe } from './Pipes/index-notes.pipe';
import { TopicStringPipe } from './Pipes/topic-string.pipe';


// import { RoutingDirective } from './Directives/routing.directive';

// 导入指令
// import { RoutingDirective } from './../Directives/routing.directive';



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
    // RoutingDirective,
    EditorComponent,
    EqualValidator,
    LoopImgComponent,
    CreateNotesComponent,
    IndexScenicPipe,
    ThemeStringPipe,
    IndexNotesPipe,
    TopicStringPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalCenterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GlobalPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
