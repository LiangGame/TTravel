
import {Component, OnInit, ElementRef, Renderer, Output, EventEmitter } from '@angular/core';
import * as wangEditor from '../../assets/js/wangEditor.min.js';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  private editor: any;
  @Output() onPostData = new EventEmitter();
  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    let editordom = this.el.nativeElement.querySelector('#editorElem');
    this.editor = new wangEditor(editordom);
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.showLinkImg = false;
    // this.editor.customConfig.uploadImgServer = '/addNotes';
    this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    this.editor.customConfig.uploadImgMaxLength = 10;
    // this.editor.customConfig.uploadFileName = '';
    this.editor.customConfig.uploadImgTimeout = 3000;
    this.editor.customConfig.uploadImgParams = true;
    // this.editor.customConfig.uploadImgHooks = {
    //   before: function (xhr, editor, files) {
    //     // 图片上传之前触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
    //
    //     // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
    //     // return {
    //     //     prevent: true,
    //     //     msg: '放弃上传'
    //     // }
    //   },
    //   success: function (xhr, editor, result) {
    //     // 图片上传并返回结果，图片插入成功之后触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //   },
    //   fail: function (xhr, editor, result) {
    //     // 图片上传并返回结果，但图片插入错误时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //   },
    //   error: function (xhr, editor) {
    //     // 图片上传出错时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    //   },
    //   timeout: function (xhr, editor) {
    //     // 图片上传超时时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    //   },
    //
    //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    //   customInsert: function (insertImg, result, editor) {
    //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
    //
    //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
    //     var url = result.url
    //     insertImg(url)
    //
    //     // result 必须是一个 JSON 格式字符串！！！否则报错
    //   }
    // }

    this.editor.create();
  }

  clickHandle(): any {
    let data = this.editor.txt.html();
    return data;
  }
}
