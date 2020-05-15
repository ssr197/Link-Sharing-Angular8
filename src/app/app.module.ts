import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule,NgbModalModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
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
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { PageSpinnerComponent } from './components/spinner/page-spinner/page-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { LsLoginComponent } from './components/ls-login/ls-login.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
};

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
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    HttpClientModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider,
    ValidationService, PageTitleService, MenuItems],
  bootstrap: [AppComponent]
})
export class AppModule { }
