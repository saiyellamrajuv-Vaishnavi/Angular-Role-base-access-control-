import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface AccessControl {
  cat: string;
  sub: string;
  field: string;
  access: string;
  mask: string;
}

const ALL_DATA: AccessControl[] = [
  { cat: 'NRI', sub: 'Address Update', field: 'Address', access: 'No Access', mask: 'XXXX XXXX XXXX...XXXX' },
  { cat: 'NRI', sub: 'Address Update', field: 'Aadhaar Number', access: 'No Access', mask: 'XXXX XXXX XXXX' },
  { cat: 'NRI', sub: 'Address Update', field: 'Account Number', access: 'No Access', mask: 'XXXX XXXX XXXX XXXX' },
  { cat: 'NRI', sub: 'Address Update', field: 'Related Party', access: 'No Access', mask: 'XXXXXXXXXX' },
  { cat: 'Corporate', sub: 'Stop Check', field: 'Name', access: 'No Access', mask: 'XXXX XXXXX XXXXX' },
  { cat: 'Corporate', sub: 'Stop Check', field: 'DOB', access: 'No Access', mask: 'XX-XX-XXXX' },
  { cat: 'Corporate', sub: 'Stop Check', field: 'Aadhar Number', access: 'No Access', mask: 'XXXX XXXX XXXX' },
  { cat: 'Corporate', sub: 'Stop Check', field: 'Phone Number', access: 'No Access', mask: 'XX XXXXX XXXXX' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchForm: FormGroup;
  showResults = false;
  tableData: AccessControl[] = [];
  displayedColumns = ['cat', 'sub', 'field', 'access', 'mask', 'actions'];

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  caseCategories: string[] = ['NRI', 'Corporate'];
  caseSubCategories: string[] = ['Address Update', 'Stop Check'];

  accessControlTypes = [
    { value:'field','label':'Field Level'},
    { value:'menu','label':'Menu Level'},
    {value:'action','label':'Action level'},
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      role: ['Branch Manager', Validators.required],
      accessControlType: ['field', Validators.required],
    });
  }

  addCategory(event:MatChipInputEvent):void {
  const value = (event.value || '').trim();
  if(value) this.caseCategories.push(value);
  event.chipInput!.clear();
  }

  removeCategory(cat:string):void{
    const idx = this.caseCategories.indexOf(cat);
    if(idx>=0) this.caseCategories.splice(idx,1);
  }

  addSubCategory(event:MatChipInputEvent):void{
    const value = (event.value || '').trim();
   if(value) this.caseSubCategories.push(value);
   event.chipInput!.clear();
  }

  removeSubCategory(sub:string):void {
  const idx = this.caseSubCategories.indexOf(sub);
  if(idx >= 0) this.caseSubCategories.splice(idx,1);
  }


  onSearch():void{
    if(this.searchForm.invalid){
      this.searchForm.markAllAsTouched();
    return;
  }
  this.tableData = ALL_DATA.filter(
    (row)=>
      this.caseCategories.includes(row.cat) && this.caseSubCategories.includes(row.sub)
  );
  this.showResults = true;
  }

  onClear():void {
    this.searchForm.reset({role:'',accessControlTypes:''});
    this.caseCategories = [];
    this.caseSubCategories = [];
    this.tableData = [];
    this.showResults = false;
  }

  onView(row: AccessControl): void {
    alert(`Viewing: ${row.field}`);
  }

  onEdit(row: AccessControl): void {
    alert(`Editing: ${row.field}`);
  }
}