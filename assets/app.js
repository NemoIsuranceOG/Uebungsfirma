const contentFields = document.querySelectorAll("[data-content]");
const serviceList = document.querySelector("[data-list='services']");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

async function loadSiteData() {
  try {
    const response = await fetch("data/site.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Content request failed: ${response.status}`);
    }

    const data = await response.json();
    applyTextContent(data);
    renderServices(data.services || []);
  } catch (error) {
    console.warn("Site content could not be loaded.", error);
    renderServices([]);
  }
}

function applyTextContent(data) {
  contentFields.forEach((element) => {
    const key = element.dataset.content;
    const value = data[key];

    if (typeof value !== "string") {
      return;
    }

    if (element instanceof HTMLAnchorElement && key === "contactEmail") {
      element.href = `mailto:${value}`;
    }

    element.textContent = value;
  });
}

function renderServices(services) {
  if (!serviceList) {
    return;
  }

  const items = services.length > 0
    ? services
    : [
        {
          title: "Inhalte folgen",
          text: "Die Website ist vorbereitet. Die konkreten Anweisungen koennen als naechstes eingepflegt werden."
        }
      ];

  serviceList.replaceChildren(
    ...items.map((item) => {
      const card = document.createElement("article");
      const title = document.createElement("h3");
      const text = document.createElement("p");

      card.className = "card";
      title.textContent = item.title || "Eintrag";
      text.textContent = item.text || "";

      card.append(title, text);
      return card;
    })
  );
}

loadSiteData();
