export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  displayCode?: string;
  fieldName?: string;
  fieldWidth?: any;
  isVisibleByDefault?: boolean;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  defaultValue?: any;
  validations?: Validator[];
}
