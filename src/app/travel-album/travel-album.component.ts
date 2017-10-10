import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import {TravelAlbumService} from './../services/travel-album.service';

@Component({
  selector: 'app-travel-album',
  templateUrl: './travel-album.component.html',
  styleUrls: ['./travel-album.component.css'],
  providers: [TravelAlbumService]
})
export class TravelAlbumComponent implements OnInit {
  // images: any = [];
  notes: any;  reg: any = /<img\s+.*?>/g;


  constructor(private albumSer: TravelAlbumService,
              private route: ActivatedRoute,
              private router: Router,) {
    let that = this;
    that.albumSer.show_notes(function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if ((result[i].content).match(that.reg)) {
            result[i].content = ((result[i].content).match(that.reg)[0]);
          }
        }
        that.notes = result;
        // console.log(that.notes);
      }
    })
  }

  ngOnInit() {
    window.scrollTo(0,0);
  }

  getNotesItem(notesId) {
    if (notesId) {
      this.router.navigate(['/noteschild'], {queryParams: {'key': notesId}});
    }
  }

}
