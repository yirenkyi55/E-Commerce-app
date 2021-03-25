import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { BrowseModeComponent } from './components/browse-mode/browse-mode.component';
import { InspectModeComponent } from './components/inspect-mode/inspect-mode.component';
import { EditModeComponent } from './components/edit-mode/edit-mode.component';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  NzInputModule,
  NzDropDownModule,
  NzCheckboxModule,
  NzInputNumberModule,
  NzUploadModule,
  NzToolTipModule,
  NzModalModule,
  NzProgressModule,
  NzPopconfirmModule,
  NzNotificationModule,
  NzIconModule,
  NzPaginationModule,
  NzRadioModule,
  NzEmptyModule,
  NzMessageModule,
  NzDatePickerModule,
  NzSelectModule,
  NzTagModule,
  NgxGalleryModule,
  CommonModule,
  NzFormModule,
];

@NgModule({
  declarations: [
    ModalComponent,
    ButtonComponent,
    InputComponent,
    TableComponent,
    BrowseModeComponent,
    InspectModeComponent,
    EditModeComponent,
  ],
  imports: [...modules],
  exports: [
    ...modules,
    ModalComponent,
    ButtonComponent,
    InputComponent,
    TableComponent,
    BrowseModeComponent,
    InspectModeComponent,
    EditModeComponent,
  ],
})
export class SharedModule {}
