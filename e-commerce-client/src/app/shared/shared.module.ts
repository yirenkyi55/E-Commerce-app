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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { ModalComponent } from './components/modal/modal.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { BrowseModeComponent } from './components/browse-mode/browse-mode.component';
import { InspectModeComponent } from './components/inspect-mode/inspect-mode.component';
import { EditModeComponent } from './components/edit-mode/edit-mode.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { BrowseContentComponent } from './components/browse-content/browse-content.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListComponent } from './components/list/list.component';
import { InspectDataComponent } from './components/inspect-data/inspect-data.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { UploadComponent } from './components/upload/upload.component';

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
  NzLayoutModule,
  NzAvatarModule,
  NzPopoverModule,
  NzTableModule,
  FontAwesomeModule,
  NzListModule,
  NgScrollbarModule,
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
    SearchBoxComponent,
    FilterButtonComponent,
    BrowseContentComponent,
    PaginatorComponent,
    ListComponent,
    InspectDataComponent,
    TextAreaComponent,
    DropDownComponent,
    UploadComponent,
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
    DropDownComponent,
    TextAreaComponent,
    UploadComponent,
  ],
})
export class SharedModule {}
