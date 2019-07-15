import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from '../secure/secure.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SECURE_ROUTES } from './secure.routes';
import { MenuService } from '../core/menu/menu.service';
import { menu } from './menu';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatatableModule } from './datatable/datatable.module';

@NgModule({
  declarations: [SecureComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgxDatatableModule,
    DatatableModule,
    RouterModule.forRoot(SECURE_ROUTES),
  ], exports: [RouterModule]
})
export class SecureModule {
  constructor(public menuService: MenuService) {
    menuService.addMenu(menu);
  }
}
