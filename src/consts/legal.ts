// Identificação do responsável pelo site.
// Decreto 7.962/2013, art. 2º, I e II: quem oferta serviços pela internet deve informar,
// em local de destaque, nome, CPF/CNPJ (quando houver) e endereço físico e eletrônico.
// LGPD (Lei 13.709/2018), art. 9º, III e IV: identificação e contato do controlador.
export const OWNER = {
  name: "Jefferson da Silva Santos",
  // Preencha com o CNPJ (MEI) ou CPF para atender ao Decreto 7.962/2013, art. 2º, I.
  // Enquanto estiver vazio, a linha do documento não aparece no rodapé.
  document: "",
  city: "Limoeiro – PE, Brasil",
  email: "jefferson.santos.dev8051@gmail.com",
  whatsappUrl: "https://wa.me/558199367426",
};

// Data da última revisão do aviso de privacidade
export const PRIVACY_UPDATED_AT = "2026-11-17";

// Abre o aviso de privacidade de qualquer lugar (rodapé, formulário de contato)
export const openPrivacyPolicy = () => window.dispatchEvent(new Event("open-privacy"));
