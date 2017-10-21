import {Component, OnInit} from '@angular/core';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {GlobalPropertyService} from './../../services/global-property.service';
import {PersonalCenterService} from './../../services/personal-center.service'
import {AuthGuard} from "../../services/auth-guard.service";

// import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import * as $ from './../../../assets/js/up-img-js/imgUp.js';
declare var $: any;
@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.css'],
  providers: [PersonalCenterService,AuthGuard]
})
export class PhotoAlbumComponent implements OnInit {
  userId: any;
  images: any = [];
  user: any = JSON.parse(sessionStorage.getItem('user'));

  constructor(private glo: GlobalPropertyService,
              private perSer: PersonalCenterService,) {
    $(function () {
      var delParent;
      var defaults = {
        fileType: ["jpg", "png", "bmp", "jpeg"],   // 上传文件的类型
        fileSize: 1024 * 1024 * 10                  // 上传文件的大小 10M
      };
      /*点击图片的文本框*/
      $(".file").change(function () {
        var idFile = $(this).attr("id");
        var file = document.getElementById(idFile);
        var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素
        var fileList: any = (<HTMLInputElement>file).files; //获取的图片文件11111
        // console.log(fileList + "======filelist=====");
        var input = $(this).parent();//文本框的父亲元素
        var imgArr = [];
        //遍历得到的图片文件
        var numUp = imgContainer.find(".up-section").length;
        var totalNum = numUp + fileList.length;  //总的数量
        if (fileList.length > 99) {
          alert("上传图片数目不可以超过5个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
        }
        else if (numUp < 99) {
          fileList = validateUp(fileList);
          for (var i = 0; i < fileList.length; i++) {
            var imgUrl = window.URL.createObjectURL(fileList[i]);
            imgArr.push(imgUrl);
            var $section = $("<section class='up-section fl loading'>");
            imgContainer.prepend($section);
            var $span = $("<span class='up-span'>");
            $span.appendTo($section);

            var $img0 = $("<img class='close-upimg'>").on("click", function (event) {
              event.preventDefault();
              event.stopPropagation();
              $(".works-mask").show();
              delParent = $(this).parent();
            });
            $img0.attr("src", "../../../assets/user-img/a7.png").appendTo($section);
            var $img = $("<img class='up-img up-opcity'>");
            $img.attr("src", imgArr[i]);
            $img.appendTo($section);
            var $p = $("<p class='img-name-p'>");
            $p.html(fileList[i].name).appendTo($section);
            var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
            $input.appendTo($section);
            var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
            $input2.appendTo($section);

          }
        }
        setTimeout(function () {
          $(".up-section").removeClass("loading");
          $(".up-img").removeClass("up-opcity");
        }, 450);
        numUp = imgContainer.find(".up-section").length;
        if (numUp >= 99) {
          $(this).parent().hide();
        }

        //input内容清空
        $(this).val("");
      });


      $(".z_photo").delegate(".close-upimg", "click", function () {
        $(".works-mask").show();
        delParent = $(this).parent();
      });

      $(".wsdel-ok").click(function () {
        $(".works-mask").hide();
        var numUp = delParent.siblings().length;
        if (numUp < 99) {
          delParent.parent().find(".z_file").show();
        }
        delParent.remove();

      });

      $(".wsdel-no").click(function () {
        $(".works-mask").hide();
      });

      function validateUp(files) {
        var arrFiles = [];//替换的文件数组
        for (var i = 0, file; file = files[i]; i++) {
          //获取文件上传的后缀名
          var newStr = file.name.split("").reverse().join("");
          if (newStr.split(".")[0] != null) {
            var type = newStr.split(".")[0].split("").reverse().join("");
            // console.log(type + "===type===");
            if ($.inArray(type, defaults.fileType) > -1) {
              // 类型符合，可以上传
              if (file.size >= defaults.fileSize) {
                alert(file.size);
                alert('您这个"' + file.name + '"文件大小过大');
              } else {
                // 在这里需要判断当前所有文件中
                arrFiles.push(file);
              }
            } else {
              alert('您这个"' + file.name + '"上传类型不符合');
            }
          } else {
            alert('您这个"' + file.name + '"没有类型, 无法识别');
          }
        }
        return arrFiles;
      }
    });


    this.getuserImg();
  }

  uploader: FileUploader = new FileUploader({
    url: this.glo.serverUrl + "/users/upImgs",
    method: "POST",
    itemAlias: "uploadedfile",
  })

  ngOnInit() {
  }

  getuserImg() {
    let that = this;
    that.userId = {userId: that.user.id};
    that.perSer.getUserImages(that.userId, function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          // console.log(result[0].url);
          that.images[i] = `<img src="${that.glo.serverUrl}/userImgs/${result[i].url}" alt="" class="pull-left" style="margin: 15px" width="190" height="180">`;
        }
        // that.images = result;
        // console.log(that.images);
      }
    })
  }

  upload() {
    let that = this;
    // that.Icon = `<img src='http://localhost:8889/uploads/${tempRes.icon}' width="100" height="100">`;
    that.uploader.queue[0].onSuccess = (response, status, headers) => {
      // 上传文件成功
      if (status == 200) {
        that.uploader.clearQueue();
        // alert('上传文件成功')
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        // console.log(tempRes);
        if (tempRes.affectedRows == 1) {
          that.getuserImg();
          // that.Icon = `<img src='http://127.0.0.1:8889/uploads/${tempRes.icon}' width="100" height="100">`;
        }
        // console.log(that.Icon);
      } else {
        // 上传文件后获取服务器返回的数据错误
      }
    };
    that.uploader.onBuildItemForm = that.buildItemForm;
    that.uploader.queue[0].upload(); // 开始上传
  };

  buildItemForm(fileItem: any, form: any): any {
    let that = this;
    if (!fileItem["realFileName"]) {
      that.userId = JSON.parse(sessionStorage.getItem("user")).id;
      // console.log("上传之前");
      // console.log(fileItem);
      form.append("userId", that.userId);
    }
  };
}
