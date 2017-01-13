export class QuestionBase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
export class SelectQuestion extends QuestionBase<string> {
  controlType = 'select';
  options: string[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
export class DatabaseQuestion extends QuestionBase<string> {
  controlType = 'database';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    console.log(options['database']);
    this.options = options['database'].map(item=>{
        return {
          key: ""+item.db_id,
          value: item.db_name
        }
      }) || [];
  }
}
export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
export class FilelistQuestion extends QuestionBase<string> {
  controlType = 'filelist';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    console.log(options['filelist']);
    this.options = options['filelist'].map(item=>{
      return {
        key: ""+item.file_id,
        value: item.file_name
      }
      }) || [];
  }
}


// export class PasswordQuestion extends QuestionBase<string> {
//   controlType = 'password';
//   typ
// }
