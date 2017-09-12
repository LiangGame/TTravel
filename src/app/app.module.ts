import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './root/app.component';
import { IndexComponent } from './index/index.component';
// import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { ScenicComponent } from './scenic/scenic.component';
import { TravelsComponent } from './travel-notes/travels.component';
import { TravelStrategyComponent } from './travel-strategy/travel-strategy.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// 导入路由模块
import {AppRoutingModule} from './app-routing.module';
// 导入子模块
import { PersonalCenterModule } from './personal-center/personal-center.module';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    // PersonalCenterComponent,
    ScenicComponent,
    TravelsComponent,
    TravelStrategyComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalCenterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
