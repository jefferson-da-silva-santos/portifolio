export interface FormFieldProps {
  id: string;
  name: string;
  placeholder: string;
  type?: 'text' | 'email' | 'textarea' | 'submit';
}

export interface FormikContextValues {
  [key: string]: any;
}
