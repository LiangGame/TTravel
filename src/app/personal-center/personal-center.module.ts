import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PersonalCenterComponent } from '../personal-center/personal-center.component';
import { NavComponent } from './nav/nav.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { FootprintComponent } from './footprint/footprint.component';
import { WantToGoComponent } from './want-to-go/want-to-go.component';
import { NotesComponent } from './notes/notes.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { SettingComponent } from './setting/setting.component';
import { MessageBoardComponent } from './message-board/message-board.component';

// 导入路由模块
import {PersonalCenterRoutingModule} from './personal-center-routing.module';
@NgModule({
  declarations: [
    PersonalCenterComponent,
    NavComponent,
    UserIndexComponent,
    FootprintComponent,
    WantToGoComponent,
    NotesComponent,
    PhotoAlbumComponent,
    SettingComponent,
    MessageBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalCenterRoutingModule
  ],
  providers: [],
  bootstrap: [PersonalCenterComponent]
})
export class PersonalCenterModule { }
