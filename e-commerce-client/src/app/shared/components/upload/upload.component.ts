import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  NzUploadChangeParam,
  NzUploadFile,
  UploadFilter,
} from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';

import { faFolderOpen, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnChanges {
  @Input() multiUpload = false;
  @Input() fileTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
  @Input() fileSizeInMB = 2;
  @Input() formDataKey = 'file';
  @Input() loading: boolean;
  @Input() completed: boolean;
  @Input() showUploadButton = true;
  @Input() clearList = false;
  @Input() filter: UploadFilter[] = [];
  @Input() imageToDisplay: string;

  @Output() upload = new EventEmitter<FormData>();
  @Output() hasFile = new EventEmitter<boolean>();

  faFolderOpen = faFolderOpen;
  faUpload = faUpload;

  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor(private msg: NzMessageService) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { clearList } = changes;
    if (clearList && clearList.currentValue) {
      this.fileList = [];
      this.hasFile.emit(false);
    }
  }
  ngOnInit(): void {}

  beforeUpload = (file: NzUploadFile) => {
    return new Observable((observer: Observer<boolean>) => {
      // We validate the format of the file

      const isValidFormat = this.fileTypes.includes(file.type);

      if (!isValidFormat) {
        this.msg.error(
          'You can only upload files of type: ' + this.fileTypes.join(', ')
        );
        observer.complete();
        return;
      }

      // We need to validate the size of the file
      const isValidFileSize = file.size! / 1024 / 1024 < this.fileSizeInMB;

      if (!isValidFileSize) {
        this.msg.error(`File must be smaller than ${this.fileSizeInMB}MB`);
        observer.complete();
        return;
      }

      // We receive the uploaded file from this point
      this.fileList = this.fileList.concat(file);

      // If we are uploading a single file, then we select only the current file
      if (!this.multiUpload) {
        this.fileList = this.fileList.slice(-1);
      }

      observer.complete();
      this.hasFile.emit(true);

      if (!this.showUploadButton) {
        this.handleUpload();
      }

      return;
    });
  };

  handleUpload(): void {
    const formData = new FormData();

    // Append the file to the form data
    this.fileList.forEach((file: any) => {
      formData.append(this.formDataKey, file);
    });

    // Emit the form data
    this.upload.emit(formData);

    if (!this.loading && this.completed) {
      this.fileList = [];
    }
  }

  onUpload(event: any) {}

  onChange(change: NzUploadChangeParam): void {
    if (change.type === 'removed') {
      if (change.fileList.length === 0) {
        this.hasFile.emit(false);
      }
    }
  }
}
