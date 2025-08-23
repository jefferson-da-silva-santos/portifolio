
import * as Yup from 'yup';

export const contactFormSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(50, 'O nome deve ter no máximo 50 caracteres.')
    .required('O nome é obrigatório.'),
  email: Yup.string()
    .email('Formato de e-mail inválido.')
    .required('O e-mail é obrigatório.'),
  assunto: Yup.string()
    .required('O assunto é obrigatório.'),
  mensagem: Yup.string()
    .required('A mensagem é obrigatória.'),
});