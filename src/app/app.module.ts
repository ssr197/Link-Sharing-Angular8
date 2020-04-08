import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { SidebarModule } from 'ng-sidebar';
import { Select2Module } from 'ng2-select2';
import 'hammerjs';
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
import { ButtonComponent } from './components/form/button/button.component';
import { CustomComponent } from './components/form/custom/custom.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { DateComponent } from './components/form/date/date.component';
import { FileComponent } from './components/form/file/file.component';
import { TextBoxComponent } from './components/form/input/input.component';
import { RadiobuttonComponent } from './components/form/radiobutton/radiobutton.component';
import { SelectComponent } from './components/form/select/select.component';
import { Select2Component } from './components/form/select2/select2.component';
import { TextareaComponent } from './components/form/textarea/textarea.component';
import { DynamicFieldDirective } from './components/form/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/form/dynamic-form/dynamic-form.component';
import { PvgfpAddFormComponent } from './components/pvgfp-add-form/pvgfp-add-form.component';
import { PvgfpListFormsComponent } from './components/pvgfp-list-forms/pvgfp-list-forms.component';
import { PvgfpTestFormComponent } from './components/pvgfp-test-form/pvgfp-test-form.component';
import { ErrorMessageComponent } from './components/form/error-message/error-message.component';
import { PvgfpUploadFormComponent } from './components/pvgfp-upload-form/pvgfp-upload-form.component';
import { PvgfpAnnotationListComponent } from './components/pvgfp-annotation-list/pvgfp-annotation-list.component';
import { PvgfpGroupOperationsComponent } from './components/pvgfp-group-operations/pvgfp-group-operations.component';
import { PvgfpGroupDataStringComponent } from './components/pvgfp-group-data-string/pvgfp-group-data-string.component';
import { PvgfpGroupDataElementsComponent } from './components/pvgfp-group-data-elements/pvgfp-group-data-elements.component';
import { PvgfpGroupListComponent } from './components/pvgfp-group-list/pvgfp-group-list.component';
import { PvgfpElementListComponent } from './components/pvgfp-element-list/pvgfp-element-list.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PvgfpAnnotationTypeModalComponent } from './components/pvgfp-annotation-type-modal/pvgfp-annotation-type-modal.component';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { LoginComponent } from './components/login';
import { AlertComponent } from './components/alert/alert.component';
import { PageSpinnerComponent } from './components/spinner/page-spinner/page-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalKeymapComponent } from './components/modal-keymap/modal-keymap.component';
import { PvgfpMatchingParentElementComponent } from './components/pvgfp-matching-parent-element/pvgfp-matching-parent-element.component';
import { SecondaryAssociationComponent } from './components/secondary-association/secondary-association.component';
import { PvgfpMatrixCoordinatesComponent } from './components/pvgfp-matrix-coordinates/pvgfp-matrix-coordinates.component';
import { PvfgpShortcutToolsComponent } from './components/pvfgp-shortcut-tools/pvfgp-shortcut-tools.component';
import { TagsInputComponent } from './components/form/tags-input/tags-input.component';
import { PvgfpFormSummaryComponent } from './components/pvgfp-form-summary/pvgfp-form-summary.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
};

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CustomComponent,
    CheckboxComponent,
    DateComponent,
    FileComponent,
    TextBoxComponent,
    RadiobuttonComponent,
    SelectComponent,
    Select2Component,
    TextareaComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    ErrorMessageComponent,
    PvgfpAddFormComponent,
    PvgfpListFormsComponent,
    PvgfpTestFormComponent,
    PvgfpUploadFormComponent,
    PvgfpAnnotationListComponent,
    PvgfpGroupOperationsComponent,
    PvgfpGroupDataStringComponent,
    PvgfpGroupDataElementsComponent,
    PvgfpGroupListComponent,
    PvgfpElementListComponent,
    PvgfpAnnotationTypeModalComponent,
    LoginComponent,
    AlertComponent,
    PageSpinnerComponent,
    ModalKeymapComponent,
    PvgfpMatchingParentElementComponent,
    SecondaryAssociationComponent,
    PvgfpMatrixCoordinatesComponent,
    PvfgpShortcutToolsComponent,
    TagsInputComponent,
    PvgfpFormSummaryComponent
  ],
  entryComponents: [
    TextBoxComponent,
    CustomComponent,
    ButtonComponent,
    SelectComponent,
    Select2Component,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextareaComponent,
    TagsInputComponent,
    FileComponent,
    ErrorMessageComponent
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
    Select2Module,
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
