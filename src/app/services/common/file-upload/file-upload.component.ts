import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../alertify.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService, private router: Router) { }
  public files: NgxFileDropEntry[] = [];
  fileData: FormData = new FormData();

  @Input() options: Partial<FileUploadOptions>
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        this.fileData.append(_file.name, _file, file.relativePath)
      });
    }
  }
  save() {
    const isConfirmed = window.confirm('Gerçekten silmek istiyor musunuz?');
    if (isConfirmed) {
      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, this.fileData).subscribe(data => {
        this.alertifyService.message("Başarılı", {
          messageType: AlertifyMessageType.Success,
          position: AlertifyPosition.TopRight
        })
      }, (errorResponse: HttpErrorResponse) => {
        this.alertifyService.message("Hataaaa", {
          messageType: AlertifyMessageType.Error,
          position: AlertifyPosition.TopRight
        })
      })
    }
    setTimeout(() => { location.reload(); }, 1500)
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  description?: string;
  accept?: string;
}