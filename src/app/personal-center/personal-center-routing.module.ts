/**
 * Created by WWL on 2017/9/7.
 */
// 导入模块
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// 导入组件
import {PersonalCenterComponent} from './personal-center.component';
import {UserIndexComponent} from './user-index/user-index.component';
import {FootprintComponent} from './footprint/footprint.component';
import {WantToGoComponent} from './want-to-go/want-to-go.component';
import {NotesComponent} from './notes/notes.component';
import {PhotoAlbumComponent} from './photo-album/photo-album.component';
import {SettingComponent} from './setting/setting.component';
// import { CreateNotesComponent } from '../create-notes/create-notes.component';
import {AuthGuard} from './../services/auth-guard.service'
// 配置路由表
const routes: Routes = [
  {
    path: 'personal-center',
    component: PersonalCenterComponent,
    canActivate: [AuthGuard],  //注意这里****
    children: [
      {path: 'index', component: UserIndexComponent},
      {path: 'footprint', component: FootprintComponent},
      {path: 'WantToGo', component: WantToGoComponent},
      {path: 'Notes', component: NotesComponent},
      {path: 'PhotoAlbum', component: PhotoAlbumComponent},
      {path: 'Setting', component: SettingComponent},
      // {path: 'CreateNotes', component: CreateNotesComponent},
      {path: '', component: UserIndexComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class PersonalCenterRoutingModule {
}
