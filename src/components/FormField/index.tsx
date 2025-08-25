
import { useFormikContext, Field, ErrorMessage } from 'formik';
import type { FormFieldProps, FormikContextValues } from './types';
import { inputStyle } from './styles';
import useTheme from '../../hooks/useTheme';
import objectTheme from '../../assets/theme.json';

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  placeholder,
  type = 'text',
}) => {
  const {theme} = useTheme();
  const { errors, touched } = useFormikContext<FormikContextValues>();

  const isTextArea = type === 'textarea';
  const isInput = !isTextArea && type !== 'submit';
  
  const hasError = errors[name] && touched[name];
  const inputClassName = `inputsFormContato ${hasError ? 'input-error' : ''}`;

  return (
    <div className='group-input'>
      {isInput && (
        <Field
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={inputClassName}
          aria-required="true"
          role="textbox"
          aria-label={placeholder}
          required
          style={inputStyle(theme, objectTheme)}
        />
      )}
      {isTextArea && (
        <Field
          as="textarea"
          id={id}
          name={name}
          placeholder={placeholder}
          className={inputClassName}
          aria-required="true"
          role="textbox"
          aria-label={placeholder}
          required
          style={inputStyle(theme, objectTheme)}
        />
      )}
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default FormField;