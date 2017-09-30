import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
declare var $: any;
@Component({
  selector: 'app-lv',
  templateUrl: './lv.component.html',
  styleUrls: ['./lv.component.css'],
  providers: [UserService]
})
export class LvComponent implements OnInit {
  _number: any;
  user: any;
  credits:number;

  constructor(private userSer: UserService) {
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    this.getCredits(this.user.telephone);
  }

  getCredits(userId) {
    if (userId) {
      let that = this;
      that.userSer.getCredits({telephone: userId}, function (result) {
        if (result) {
          if (result != '' || result != null) {
            that.credits = +result[0].userlv;
            that._number= +result[0].userlv;
            $(function () {
              var mamture_progress = $('#mamture_progress');
              var progress_content = $('#progress_content');
              var l = 0;
              var timer = null;
              var pro = 0;
              //---->>>v1
              if (that._number < 100) {
                lad(that._number, 100, '.progress-box-1', function () {
                  $('.progress-box-1').append('<span>距离升级还剩' + (100 - that._number) + '时光</span>');
                });
              }
              ;
              //---->>>v2
              if (that._number >= 100 && that._number < 500) {
                lad(100, 100, '.progress-box-1', function () {
                  mamture_progress.addClass('v1');
                  lad(that._number - 100, 500 - 100, '.progress-box-2', function () {
                    $('.progress-box-2').addClass('active');
                    $('.progress-box-2').append('<span>距离升级还剩' + (500 - that._number) + '时光</span>');
                  });
                });
              }
              ;
              //---->>>v3
              if (that._number >= 500 && that._number < 1500) {
                lad(100, 100, '.progress-box-1', function () {
                  mamture_progress.addClass('v1')
                  lad(500, 500, '.progress-box-2', function () {
                    mamture_progress.addClass('v2');
                    lad(that._number - 500, 1500 - 500, '.progress-box-3', function () {
                      $('.progress-box-3').addClass('active');
                      $('.progress-box-3').append('<span>距离升级还剩' + (1500 - that._number) + '时光</span>');
                    })
                  });
                });
              }
              ;
              //---->>>v4
              if (that._number >= 1500 && that._number < 3000) {
                lad(100, 100, '.progress-box-1', function () {
                  mamture_progress.addClass('v1')
                  lad(500, 500, '.progress-box-2', function () {
                    mamture_progress.addClass('v2')
                    lad(1500, 1500, '.progress-box-3', function () {
                      mamture_progress.addClass('v3')
                      lad(that._number - 1500, 3000 - 1500, '.progress-box-4', function () {
                        $('.progress-box-4').addClass('active');
                        $('.progress-box-4').append('<span>距离升级还剩' + (3000 - that._number) + '时光</span>');
                      })
                    })
                  });
                });
              }
              ;
              //---->>>v5
              if (that._number >= 3000 && that._number < 5000) {
                lad(100, 100, '.progress-box-1', function () {
                  mamture_progress.addClass('v1')
                  lad(500, 500, '.progress-box-2', function () {
                    mamture_progress.addClass('v2')
                    lad(1500, 1500, '.progress-box-3', function () {
                      mamture_progress.addClass('v3')
                      lad(3000, 3000, '.progress-box-4', function () {
                        mamture_progress.addClass('v4')
                        lad(that._number - 3000, 5000, '.progress-box-5', function () {
                          $('.progress-box-5').addClass('active');
                          $('.progress-box-5').append('<span>距离升级还剩' + (5000 - that._number) + '时光</span>');
                        })
                      })
                    })
                  });
                });
              }
              ;
              if (that._number >= 5000) {
                lad(100, 100, '.progress-box-1', function () {
                  mamture_progress.addClass('v1')
                  lad(500, 500, '.progress-box-2', function () {
                    mamture_progress.addClass('v2')
                    lad(1500, 1500, '.progress-box-3', function () {
                      mamture_progress.addClass('v3')
                      lad(3000, 3000, '.progress-box-4', function () {
                        mamture_progress.addClass('v4')
                        lad(5000, 5000, '.progress-box-5', function () {
                          mamture_progress.addClass('v5')
                          lad(that._number - 5000, 10000, '.progress-box-6', function () {
                            mamture_progress.addClass('v6')
                            $('.progress-box-5').append('<span>恭喜你成功登上富豪榜</span>');
                          });
                        });
                      });
                    });
                  });
                });
              }
              ;
              /*
               @number : 成长值
               @max : 最大值
               @callback : 回调方法
               */
              function lad(number, max, cls, callback) {
                l = 0;
                timer = setInterval(function () {
                  if (number <= 100) {
                    l++;
                  } else if (number > 100 && number <= 500) {
                    l += 5;
                  } else if (number > 500 && number <= 1500) {
                    l += 10;
                  } else if (number > 3000 && number <= 5000) {
                    l += 20;
                  } else if (number > 5000 && number <= 10000) {
                    l += 30;
                  } else {
                    l += 40;
                  }
                  ;

                  pro = (l / max) * 120;				//100为  div的长度
                  if (l >= number) {
                    clearInterval(timer);
                    if (callback) callback();   //回调
                  }
                  ;
                  $(cls).css({
                    width: pro + 'px'
                  })
                }, 1)
              }
            });
            console.log(that._number);
            console.log('==========获取数据成功---->>>getCredits=========');
          }
        }
      });
    }
  }

  ngOnInit() {}

}
