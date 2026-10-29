(function () {
  "use strict";

  var priorityData = {
  "decision": {
    "chapter": "03",
    "title": "What is happening in your market?",
    "description": "A growth opportunity, a warehouse location or a network that needs to change. We work with you to compare the options and understand what they mean for your business.",
    "outcomes": [
      "Market research and outlook studies.",
      "Network design and location analysis.",
      "Transport costs, operations and policy."
    ],
    "serviceUrl": "/en/consultoria/",
    "serviceCta": "Explore our consulting services",
    "category": "A look at our work",
    "product": "Explore the analysis for yourself",
    "productDescription": "Open a report to explore its maps, routes and indicators. See one of the ways we make an analysis available for you to use.",
    "productImage": "/assets/images/blog/reportes-vivos/sicetac-variacion-junio-2h-logisticas.png",
    "productAlt": "Example of a SICETAC report showing changes by route",
    "productUrl": "/en/reportes/",
    "productCta": "Explore the reports",
    "proof": [
      "Maps and indicators",
      "Analysis you can explore"
    ]
  },
  "data": {
    "chapter": "01",
    "title": "Work with data for your routes.",
    "description": "We organize your transport data, match your routes to SICETAC and help you compare values and understand changes across your network.",
    "outcomes": [
      "A lookup for one route.",
      "A dataset for working with many routes.",
      "An index to track changes in your network."
    ],
    "serviceUrl": "/en/inteligencia-planeacion-transporte/",
    "serviceCta": "See how we work"
  },
  "ai": {
    "chapter": "02",
    "title": "AI training and project support",
    "description": "We train your team to build its own agents, test them and document how they work. We support its projects so the knowledge and ability to keep improving stay within your company.",
    "outcomes": [
      "Learn through your own task.",
      "Build your own agents together.",
      "Document and keep going."
    ],
    "serviceUrl": "/en/formacion/profe-bruno-ia-aplicada/",
    "serviceCta": "Explore the training",
    "category": "Practical AI training",
    "product": "AI capabilities for your team",
    "productDescription": "Your team retains a method, sources, instructions and review criteria to apply to new projects. ATIEMPPO supports learning and future challenges within the agreed scope.",
    "productImage": "/assets/images/servicios-2026/capacitacion-ia-ficha-en.png",
    "productAlt": "AI training to build, test and document your team’s own agents",
    "productUrl": "/en/acompanamiento-ia/",
    "productCta": "Explore the program for companies",
    "proof": [
      "Practice and documentation",
      "Knowledge your team retains"
    ]
  }
};

  var portalOfferElement = document.getElementById("portal-offer-data");
  if (portalOfferElement) {
    Object.assign(priorityData.data, JSON.parse(portalOfferElement.textContent));
  }

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".journey-card"));
  var panel = document.getElementById("recommended-chapter");

  function selectTab(tab, focus) {
    var data = priorityData[tab.getAttribute("data-priority")];
    if (!data || !panel) return;
    tabs.forEach(function (item) {
      var selected = item === tab;
      item.setAttribute("aria-selected", selected ? "true" : "false");
      item.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    panel.querySelector("[data-chapter-number]").textContent = data.chapter;
    panel.querySelector("[data-chapter-title]").textContent = data.title;
    panel.querySelector("[data-chapter-description]").textContent = data.description;
    panel.querySelector("[data-service-link]").href = data.serviceUrl;
    panel.querySelector("[data-service-link-text]").textContent = data.serviceCta;
    panel.querySelector("[data-product-category]").textContent = data.category;
    panel.querySelector("[data-product-title]").textContent = data.product;
    panel.querySelector("[data-product-description]").textContent = data.productDescription;
    panel.querySelector("[data-product-link]").href = data.productUrl;
    panel.querySelector("[data-product-link-text]").textContent = data.productCta;
    var image = panel.querySelector("[data-product-image]");
    image.src = data.productImage;
    image.alt = data.productAlt;
    panel.querySelector("[data-chapter-outcomes]").innerHTML = data.outcomes.map(function (item) {
      return '<li><span class="material-symbols-rounded" aria-hidden="true">check</span>' + item + "</li>";
    }).join("");
    panel.querySelector("[data-product-proof]").innerHTML = data.proof.map(function (item) { return "<span>" + item + "</span>"; }).join("");
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { selectTab(tab, false); });
    tab.addEventListener("keydown", function (event) {
      var nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex !== index) { event.preventDefault(); selectTab(tabs[nextIndex], true); }
    });
  });

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", open ? "false" : "true");
      navToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      navToggle.querySelector(".material-symbols-rounded").textContent = open ? "menu" : "close";
      nav.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-open", !open);
    });
    nav.addEventListener("click", function (event) {
      if (event.target.tagName !== "A" || window.innerWidth > 820) return;
      navToggle.click();
    });
  }

})();
