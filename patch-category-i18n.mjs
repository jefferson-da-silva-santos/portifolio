// patch-category-i18n.mjs
//
// COMO USAR:
// 1. Coloque este arquivo e category-i18n.json na raiz do projeto.
// 2. Rode: node patch-category-i18n.mjs
//
// Ele injeta project.filtersAriaLabel, project.emptyState, project.groups e
// project.categories em cada locale — sem tocar em project.list,
// project.title ou project.textButton, que já existem e estão corretos.

import fs from "fs";
import path from "path";

const LOCALES_DIR = "./src/i18n/locales"; // ajuste se necessário
const LANGS = ["pt", "en", "es", "it", "fr"];

const categoryData = JSON.parse(fs.readFileSync("./category-i18n.json", "utf-8"));

for (const lang of LANGS) {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} não encontrado, pulando.`);
    continue;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const patch = categoryData[lang];

  if (!patch) {
    console.warn(`⚠️  Sem dados de categoria para "${lang}", pulando.`);
    continue;
  }

  if (!data.project) {
    console.warn(`⚠️  ${lang}.json não tem chave "project", pulando.`);
    continue;
  }

  data.project.filtersAriaLabel = patch.filtersAriaLabel;
  data.project.emptyState = patch.emptyState;
  data.project.groups = patch.groups;
  data.project.categories = patch.categories;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ ${lang}.json: chaves de categoria adicionadas.`);
}

console.log("Concluído.");
