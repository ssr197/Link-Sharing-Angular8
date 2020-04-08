import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TagsInputComponent } from '../tags-input/tags-input.component';
import { TextBoxComponent } from '../input/input.component';
import { CustomComponent } from '../custom/custom.component';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { Select2Component } from '../select2/select2.component';
import { DateComponent } from '../date/date.component';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { FileComponent } from '../file/file.component';
import { FieldConfig } from '../../../field.interface';

const componentMapper = {
  input: TextBoxComponent,
  tagsinput: TagsInputComponent,
  button: ButtonComponent,
  custom: CustomComponent,
  select: SelectComponent,
  select2: Select2Component,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  textarea: TextareaComponent,
  file: FileComponent
};

@Directive({
  selector: '[dynamicField]'
})

export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() formlayout: any;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.formlayout = this.formlayout;
  }
}
