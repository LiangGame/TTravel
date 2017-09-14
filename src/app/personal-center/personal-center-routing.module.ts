/**
 * Created by WWL on 2017/9/7.
 */
// 导入模块
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// 导入组件
import { PersonalCenterComponent } from './personal-center.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { FootprintComponent } from './footprint/footprint.component';
import { WantToGoComponent } from './want-to-go/want-to-go.component';
import { NotesComponent } from './notes/notes.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { SettingComponent } from './setting/setting.component';
// 配置路由表
const routes: Routes = [
  {path: 'personal-center',
    component: PersonalCenterComponent,
    children: [
      {path: 'index', component: UserIndexComponent},
      {path: 'footprint', component: FootprintComponent},
      {path: 'WantToGo', component: WantToGoComponent},
      {path: 'Notes', component: NotesComponent},
      {path: 'PhotoAlbum', component: PhotoAlbumComponent},
      {path: 'Setting', component: SettingComponent},
      {path: '', component: UserIndexComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalCenterRoutingModule {
}
