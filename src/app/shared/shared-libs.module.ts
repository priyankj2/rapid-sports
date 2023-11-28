import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormFieldModule, InputsModule, NumericTextBoxModule, SwitchModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule, DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { AutoCompleteModule, ComboBoxModule, DropDownListModule, MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { PagerModule } from '@progress/kendo-angular-pager';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { FileSelectModule } from '@progress/kendo-angular-upload';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { DialogModule, DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { EditorModule } from '@progress/kendo-angular-editor';

@NgModule({
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    NgJhipsterModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule,
    GridModule,
    FormFieldModule,
    TextBoxModule,
    LabelModule,
    DatePickerModule,
    MultiSelectModule,
    DropDownListModule,
    ProgressBarModule,
    PagerModule,
    SchedulerModule,
    AutoCompleteModule,
    TextBoxModule,
    ComboBoxModule,
    NumericTextBoxModule,
    SwitchModule,
    GaugesModule,
    LayoutModule,
    NotificationModule,
    LabelModule,
    ScrollViewModule,
    PDFExportModule,
    DateInputsModule,
    FileSelectModule,
    ChartsModule,
    IconsModule,
    ListViewModule,
    DialogModule,
    InputsModule,
    DialogsModule,
    WindowModule,
    EditorModule
  ]
})
export class RapidSharedLibsModule {}
