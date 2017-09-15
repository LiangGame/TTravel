/**
 * Created by WWL on 2017/9/7.
 */
// 导入模块
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// 导入组件
import { IndexComponent } from './index/index.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { ScenicComponent } from './scenic/scenic.component';
import { TravelAlbumComponent } from './travel-album/travel-album.component';
import { TravelNotesComponent } from './travel-notes/travel-notes.component';
import { TravelStrategyComponent } from './travel-strategy/travel-strategy.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScenicSearchComponent } from './scenic-search/scenic-search.component';
import { ScenicResultComponent } from './scenic-result/scenic-result.component';
import { NotesChildComponent } from './notes-child/notes-child.component';

// 配置路由表
const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'personal-center', component: PersonalCenterComponent},
  {path: 'scenic', component: ScenicComponent},
  {path: 'travel-album', component: TravelAlbumComponent},
  {path: 'travels', component: TravelNotesComponent},
  {path: 'strategy', component: TravelStrategyComponent},
  {path: 'noteschild', component: NotesChildComponent},
  {path: 'scenic_search', component: ScenicSearchComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
