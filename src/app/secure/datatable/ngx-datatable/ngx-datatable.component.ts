import { Component, OnInit, ElementRef, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

const _clone = (d) => JSON.parse(JSON.stringify(d));

@Component({
  selector: 'app-ngx-datatable',
  templateUrl: './ngx-datatable.component.html',
  styleUrls: ['./ngx-datatable.component.scss']
})
export class NgxDatatableComponent implements OnInit {
  @ViewChild('improvementActivityName') inputEl: ElementRef;

  SubjectList = [];                  // array of subject name and id


  editing = {};                       // set cell mode
  rows = [];                          // set rows to the datatable
  rowsFilter = [];                    // set rows to filter
  temp = [];                          // set filter result rows
  timeout: any;                      
  isEditable = {};                    // set flag to row is edit mode
  selected = [];                      // get the selected subject object from multielect-dropdown
  selectedItems = [];                 // set the selected subjects to multielect-dropdown
  isAdd: boolean = true;              // is row addeed 
  isRowEditing = false;               // is row in edit mode
  //validations flag
  requiredSubject = false;            // show/hide validatin message for subject selection
  isEndDateValid = false;             // show/hide validatin message for end date

  ddValue = new Date();               // get the todays date.

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('myTable') tableExp: any;


  constructor(private el: ElementRef,public router: Router) {
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }

  updateValue(event, improvementActivityName, documentationDate, startDate, endDate, comment, rowIndex) {
    this.IsEditRow(rowIndex , false);   // disabled the edit mode and show the labels
    this.rows = [...this.rows];  // update the datatable
    this.isAdd = true; // endabled add button.
  }

  ngOnInit() {
  
    //set data to the datatable
    this.rows = [
      { StudentId: 'Austin', ClassId: 1, Subject: 'Mathematics' ,  SubjectId: 1,
      startDate: '2019-01-01', endDate: '2019-02-01',documentationDate: '2019-05-01' },
      { StudentId: 'Austin', ClassId: 1, Subject: 'Bio' ,  SubjectId: 2,
      startDate: '2019-03-01', endDate: '2019-08-01',documentationDate: '2019-10-01' },
      { StudentId: 'Austin', ClassId: 1, Subject: 'English' ,  SubjectId: 3,
      startDate: '2019-06-01', endDate: '2019-09-01',documentationDate: '2019-12-01' },
    ];

    //set data to the ngx-multiselect dropdonw
    this.SubjectList = [
      { SubjectId: 1, Subject: 'Mathematics' },
      { SubjectId: 2, Subject: 'Bio' },
      { SubjectId: 3, Subject: 'English' },
      { SubjectId: 4, Subject: 'Marathi' },
      { SubjectId: 5, Subject: 'Hindi' }
    ];
  }

 
  // set configuration of ngx-multiselect dropdown
  config = {
    singleSelection: false,                      //  multiselect mode on
    idField: 'SubjectId',                        //  value field
    textField: 'Subject',                        //  text field       
    itemsShowLimit: 1500,                        //  number of records shown in drodown 
    allowSearchFilter: true,                     //  allow search 
    clearSearchFilter: true,                     //  after search clear text 
    enableCheckAll: true,                        //  select all enabled 
    maxHeight: 100                               // height in pixcel 
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return (d.tinNumber.toLowerCase().indexOf(val) !== -1 ||
        !val);
    });

    // update the rows
    this.rowsFilter = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  // Selection


  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

  readonly headerHeight = 50;
  readonly rowHeight = 75;
  readonly pageLimit = 10;

  isLoading: boolean;

  // Save row
  save(row, rowIndex) {
    // row - will get the all the componets data in a row
    // rowIndex - current row index
    this.isEditable[rowIndex] = !this.isEditable[rowIndex];
  }


  
  addRow() {
    if (this.rows.length == 0 || !this.isEditable[0]) {
      let rowData = [] // empty row data.
      this.ddValue = new Date(); // get the todays date.
      this.rows.splice(0, 0, rowData); 
      this.rows = [...this.rows];  // update the ngx-datatable.
      this.selectedItems = [];  // set the slected items empty.
      this.isEditable[0] = true; // make the 0th row editable.
      this.rows[0]['documentationDate'] = this.ddValue; // this us used for set the todays date.
      this.IsEditRow(0, true); // Call a function for set the row is editable.
      this.isAdd = false;   // flag for add button click event.
      this.isRowEditing = true; // editable row is in edit mode.
    }
  }

  OnItemDeSelectSubject(ev, row) {
  }

  Cancel(rowIndex, row) {
    //this fucntion will disable all row edit mode
    this.DisableEditMode();
    //enable the add/edit/delete icons 
    this.isRowEditing = false;
    this.isAdd = true;
    this.requiredSubject = false;
    this.isEndDateValid = false;
  }

  EnabledEditMode(rowIndex, row) {
    this.isRowEditing = true;
    this.isAdd = false;
    this.selectedItems = [{ SubjectId: row.SubjectId, Subject: row.SubjectId + " - " + row.Subject }];
    this.IsEditRow(rowIndex, true);
    this.isEditable[rowIndex] = !this.isEditable[rowIndex]
  }

  DisableEditMode() {
    this.rows.forEach(row => {
      this.IsEditRow(this.rows.indexOf(row), false);
      this.isEditable[this.rows.indexOf(row)] = false;
    });
  }

  delete(row, rowIndex) {
    // row - will get the all the componets data in a row
    // rowIndex - current row index
    this.rows.splice(0, rowIndex, row); 
    this.rows = [...this.rows];  // update the ngx-datatable.
  }


  validateImprovementActivity(ev, improvementActivityName, documentationDate, startDate, endDate, comment, row, rowIndex) {
    let isValidationOccur = false;
    if (this.selectedItems.length === 0) {
      this.requiredSubject = true;
      isValidationOccur = true;
    }
    else {
      this.requiredSubject = false;
    }

    if (row.startDate > row.endDate) {
      this.isEndDateValid = true;
      isValidationOccur = true;
    } else {
      this.isEndDateValid = false;
    }


    if (isValidationOccur) {
      return;
    }
    this.updateValue(event, improvementActivityName, documentationDate, startDate, endDate, comment, rowIndex);
    this.save(row, rowIndex);
  }


  BindData() {
   
  }

  //function for set the edit mode on and off
  IsEditRow(rowIndex, value:boolean){
    this.editing[rowIndex + '-Subject'] = value;
    this.editing[rowIndex + '-documentationDate'] = value;
    this.editing[rowIndex + '-startDate'] = value;
    this.editing[rowIndex + '-endDate'] = value;
    this.editing[rowIndex + '-comment'] = value;
  }

}
