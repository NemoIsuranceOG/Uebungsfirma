const productRoot = document.querySelector("[data-products]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const wizardForm = document.querySelector("[data-wizard-form]");
const contactForm = document.querySelector("[data-contact-form]");

const state = {
  products: [],
  currentStep: 0
};

initNavigation();
loadSiteData();
initWizard();
initContactForm();

async function loadSiteData() {
  try {
    const response = await fetch("data/site.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);

    const data = await response.json();
    state.products = Array.isArray(data.products) ? data.products : [];
    renderProducts(state.products);
  } catch (error) {
    console.warn("Site content could not be loaded.", error);
    renderProducts([]);
  }
}

function initNavigation() {
  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function renderProducts(products) {
  if (!productRoot) return;

  const fallback = [
    {
      name: "Produkte werden geladen",
      slogan: "NEMO Insurance",
      description: "Die Produktdaten werden direkt aus GitHub geladen.",
      type: "shield",
      tariffs: []
    }
  ];

  productRoot.replaceChildren(...(products.length ? products : fallback).map(createProductCard));
}

function createProductCard(product) {
  const card = document.createElement("article");
  const visual = document.createElement("div");
  const content = document.createElement("div");
  const kicker = document.createElement("p");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const table = document.createElement("table");
  const note = document.createElement("p");
  const action = document.createElement("button");

  card.className = "product-card";
  visual.className = `product-visual product-visual-${product.type || "default"}`;
  content.className = "product-content";
  kicker.className = "product-kicker";
  table.className = "product-table";
  note.className = "product-note";
  action.className = "button button-primary";
  action.type = "button";

  visual.setAttribute("aria-hidden", "true");
  kicker.textContent = product.slogan || "Versicherungsschutz";
  title.textContent = product.name || "Produkt";
  description.textContent = product.description || "Flexible Versicherungslösung von NEMO Insurance.";
  table.innerHTML = buildTariffTable(product.tariffs || []);
  note.textContent = "Preis und Versicherungssummen abhängig von Gerät und Tarif.";
  action.textContent = "Anfragen";
  action.addEventListener("click", () => selectProduct(product.name));

  content.append(kicker, title, description, table, note, action);
  card.append(visual, content);
  return card;
}

function buildTariffTable(tariffs) {
  const rows = tariffs.map((tariff) => `
    <tr>
      <td data-label="Tarif">${escapeHtml(tariff.name)}</td>
      <td data-label="Leistung">${escapeHtml(tariff.coverage)}</td>
      <td data-label="Selbstbehalt">${escapeHtml(tariff.deductible)}</td>
      <td data-label="Prämie">${escapeHtml(tariff.premium)}</td>
    </tr>
  `).join("");

  return `
    <thead>
      <tr><th>Tarif</th><th>Leistung</th><th>Selbstbehalt</th><th>Prämie</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  `;
}

function selectProduct(productName) {
  const select = document.querySelector("[data-product-select]");
  if (select instanceof HTMLSelectElement && productName) {
    select.value = productName;
  }

  document.querySelector("#antrag")?.scrollIntoView({ behavior: "smooth", block: "start" });
  setStep(0);
}

function initWizard() {
  if (!wizardForm) return;

  wizardForm.querySelector("[data-prev]")?.addEventListener("click", () => setStep(state.currentStep - 1));
  wizardForm.querySelector("[data-next]")?.addEventListener("click", () => {
    if (validateCurrentStep()) setStep(state.currentStep + 1);
  });

  wizardForm.querySelectorAll("[data-step-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextStep = Number(button.dataset.stepJump || 0);
      if (nextStep <= state.currentStep || validateCurrentStep()) setStep(nextStep);
    });
  });

  wizardForm.addEventListener("input", updateSummary);
  wizardForm.addEventListener("change", updateSummary);
  wizardForm.addEventListener("submit", () => {
    const success = wizardForm.querySelector("[data-form-success]");
    window.setTimeout(() => {
      if (success) success.hidden = false;
      wizardForm.reset();
      setStep(0);
    }, 500);
  });

  setStep(0);
}

function setStep(step) {
  if (!wizardForm) return;

  const steps = Array.from(wizardForm.querySelectorAll("[data-step]"));
  const max = steps.length - 1;
  state.currentStep = Math.max(0, Math.min(step, max));

  steps.forEach((element, index) => element.classList.toggle("active", index === state.currentStep));
  wizardForm.querySelectorAll("[data-step-jump]").forEach((button, index) => {
    button.classList.toggle("active", index === state.currentStep);
  });

  const prev = wizardForm.querySelector("[data-prev]");
  if (prev instanceof HTMLButtonElement) prev.disabled = state.currentStep === 0;

  wizardForm.classList.toggle("is-final", state.currentStep === max);
  updateSummary();
}

function validateCurrentStep() {
  if (!wizardForm) return true;

  const current = wizardForm.querySelector(`.form-step[data-step="${state.currentStep}"]`);
  if (!current) return true;

  const fields = Array.from(current.querySelectorAll("input, select, textarea"));
  return fields.every((field) => field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement ? field.reportValidity() : true);
}

function updateSummary() {
  if (!wizardForm) return;

  const summary = wizardForm.querySelector("[data-summary]");
  if (!summary) return;

  const data = new FormData(wizardForm);
  const product = data.get("Produkt") || "noch nicht gewählt";
  const tariff = data.get("Tarif") || "noch nicht gewählt";
  const name = [data.get("Vorname"), data.get("Nachname")].filter(Boolean).join(" ") || "noch nicht angegeben";
  const device = [data.get("Hersteller"), data.get("Modell")].filter(Boolean).join(" ") || "noch nicht angegeben";
  const price = data.get("Kaufpreis") || "noch nicht angegeben";

  summary.innerHTML = `
    <strong>Zusammenfassung</strong><br>
    Produkt: ${escapeHtml(product)}<br>
    Tarif: ${escapeHtml(tariff)}<br>
    Kunde: ${escapeHtml(name)}<br>
    Gerät: ${escapeHtml(device)}<br>
    Kaufpreis: ${escapeHtml(price)} €
  `;
}

function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", () => {
    const success = contactForm.querySelector("[data-contact-success]");
    window.setTimeout(() => {
      if (success) success.hidden = false;
      contactForm.reset();
    }, 500);
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
