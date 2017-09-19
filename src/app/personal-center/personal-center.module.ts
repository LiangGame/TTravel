import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

import { PersonalCenterComponent } from '../personal-center/personal-center.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { FootprintComponent } from './footprint/footprint.component';
import { WantToGoComponent } from './want-to-go/want-to-go.component';
import { NotesComponent } from './notes/notes.component';
import { PhotoAlbumComponent } from './photo-album/photo-album.component';
import { SettingComponent } from './setting/setting.component';
import { EditorComponent } from './../editor/editor.component';

// 导入路由模块
import {PersonalCenterRoutingModule} from './personal-center-routing.module';
@NgModule({
  declarations: [
    PersonalCenterComponent,
    UserIndexComponent,
    FootprintComponent,
    WantToGoComponent,
    NotesComponent,
    PhotoAlbumComponent,
    SettingComponent,
    EditorComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    FileUploadModule,
    PersonalCenterRoutingModule
  ],
  providers: [],
  bootstrap: [PersonalCenterComponent]
})
export class PersonalCenterModule { }
