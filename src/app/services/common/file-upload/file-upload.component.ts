import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../alertify.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService) { }
  public files: NgxFileDropEntry[] = [];
  @Input() options: Partial<FileUploadOptions>
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      });
    }
    console.log(this.options)
    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(data => {
      this.alertifyService.message("Başarılı", {
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.TopRight
      })
    }, (errorResponse: HttpErrorResponse) => {
      this.alertifyService.message("Hata", {
        messageType: AlertifyMessageType.Error,
        position: AlertifyPosition.TopRight
      })
    })
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  description?: string;
  accept?: string;
}