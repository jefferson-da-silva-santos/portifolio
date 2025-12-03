import { useTranslation } from 'react-i18next';
import { Formik, Form, type FormikHelpers } from 'formik';
import FormField from '../../components/FormField';
import { contactFormSchema } from '../../utils/validationUtilities';
import type { ContactFormValues } from './types';
import useTheme from '../../hooks/useTheme';
import objectTheme from '../../assets/theme.json';
import { containerStyle, inputStyle, titleStyle } from './styles';
import { getFirstLetterTitle, getRestOfTitle } from '../../utils/textUtilites';
import emailjs from "emailjs-com";
import { showNotyf } from '../../utils/notyf';
import { useState } from 'react';

const SERVICE_ID = 'service_ykwz0ni';
const TEMPLATE_ID = 'template_h37bm6s';
const PUBLIC_KEY = 'LkWLwIyTgUZFuaPa1';
const MY_EMAIL = "jefferson.santos.dev8051@gmail.com";

const Contato = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const initialValues: ContactFormValues = {
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  };

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: FormikHelpers<ContactFormValues>
  ) => {
    setLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,        
        TEMPLATE_ID,     
        {
          from_name: values.nome,
          reply_to: values.email,
          subject: values.assunto,
          message: values.mensagem,
          to_email: MY_EMAIL,
          time: new Date().toLocaleString("pt-BR")
        },
        PUBLIC_KEY      
      );

      showNotyf("success", "Email enviado com sucesso!");
      resetForm();

    } catch (error) {
      console.error(error);
      showNotyf("error", "Ocorreu um erro ao enviar o email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="groupContact" style={containerStyle(theme, objectTheme)}>
      <section className="contato" id="contact">
        <article className="groupContact-primary">
          <div className="linhas"></div>
          <div className="linhas"></div>
          <div className="linhas"></div>
          <h2 className="titleContact" style={titleStyle(theme, objectTheme)}>
            &#8249; <span className="letraMonoton">{getFirstLetterTitle(t("contact.title"))}</span>{getRestOfTitle(t("contact.title"))} &#8260;
            &#8250;
          </h2>
        </article>

        <article className="groupContact-secundary" data-aos="fade-right">
          <Formik
            initialValues={initialValues}
            validationSchema={contactFormSchema}
            onSubmit={handleSubmit}
          >
            <Form className="form" id="form-contato">
              <FormField id="nome" name="nome" placeholder={t("contact.namePlaceholder")} />
              <FormField id="email" name="email" type="email" placeholder={t("contact.emailPlaceholder")} />
              <FormField id="assunto" name="assunto" placeholder={t("contact.subjectPlaceholder")} />
              <FormField id="mensagem" name="mensagem" type="textarea" placeholder={t("contact.messagePlaceholder")} />

              <button
                style={inputStyle(theme, objectTheme)}
                role="button"
                aria-label={t("contact.sendButtonAria")}
                type="submit"
                id="enviar"
              >
                {!loading && t("contact.sendButton")}
                {loading && <i className='bx bx-loader-alt bx-spin' ></i>}
              </button>
            </Form>
          </Formik>
        </article>

        <div className="groupContact-terciary" data-aos="fade-left">
          <div className="circle-2"></div>
          <img
            loading="lazy"
            src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/jefferson-image.jpeg"
            alt="Foto do dono do portifólio"
          />
        </div>
      </section>
    </div>
  );
};

export default Contato;
