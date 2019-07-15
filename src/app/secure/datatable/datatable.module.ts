import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableComponent } from './ngx-datatable/ngx-datatable.component';

@NgModule({
  declarations: [ NgxDatatableComponent ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ]
})
export class DatatableModule { }
