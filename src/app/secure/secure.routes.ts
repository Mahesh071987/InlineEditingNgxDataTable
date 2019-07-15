import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableComponent } from '../../../src/app/secure/datatable/ngx-datatable/ngx-datatable.component';



export const SECURE_ROUTES: Routes = [
    {
        path: '',
        component: NgxDatatableComponent,
    }
];