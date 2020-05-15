import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule,NgbModalModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { TagInputModule } from 'ngx-chips';
import { ValidationService } from './service/validation.service';
import { PageTitleService } from './core/page-title/page-title.service';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import {HttpClientModule } from '@angular/common/http';
import { PageSpinnerComponent } from './components/spinner/page-spinner/page-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { LsLoginComponent } from './components/ls-login/ls-login.component';


@NgModule({
  declarations: [
    AppComponent,
    PageSpinnerComponent,
    LsLoginComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SidebarModule.forRoot(),
    MenuToggleModule,
    HttpModule,
    RouterModule.forRoot(routes),
    DataTablesModule,
    TagInputModule,
    NgxMyDatePickerModule.forRoot(),
    NgbModalModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    ValidationService, PageTitleService, MenuItems],
  bootstrap: [AppComponent]
})
export class AppModule { }
