(function () {
  "use strict";

  var priorityData = {
  "decision": {
    "chapter": "01",
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
    "chapter": "02",
    "title": "Work with data for your routes.",
    "description": "Look up a transport reference value, use the SICETAC database in your analysis or track changes in your network costs. Choose the service you need.",
    "outcomes": [
      "A lookup for one route.",
      "A dataset for working with many routes.",
      "An index to track changes in your network."
    ],
    "serviceUrl": "#soluciones",
    "serviceCta": "Choose a SICETAC service",
    "category": "For your own analysis",
    "product": "SICETAC Database",
    "productDescription": "Structured data to match with your company routes and use in your own analysis. Request a one-time or recurring delivery.",
    "productImage": "/assets/images/atiemppo/cover-base.png",
    "productAlt": "ATIEMPPO SICETAC Database overview",
    "productUrl": "/en/?servicio=base-sicetac#contacto",
    "productCta": "Request the database",
    "proof": [
      "One-time or recurring delivery",
      "Match data to your routes"
    ]
  },
  "ai": {
    "chapter": "03",
    "title": "Bring a task you want to improve.",
    "description": "Prepare a report, analyze a file or find information. With Profe Bruno and our workshops, you learn to use AI on something from your own work.",
    "outcomes": [
      "Profe Bruno for guided learning.",
      "Workshops built around a task from your team.",
      "Sessions for executives exploring where to start."
    ],
    "serviceUrl": "#experiencias",
    "serviceCta": "Explore learning options",
    "category": "Applied learning",
    "product": "Profe Bruno",
    "productDescription": "Learn to explain what you need, work with your materials and check the result. From there, we can explore how an agent could repeat the task.",
    "productImage": "/assets/images/atiemppo/mesa-trabajo-ia.png",
    "productAlt": "Illustration of a workspace with artificial intelligence tools",
    "productUrl": "/en/?servicio=profe-bruno#contacto",
    "productCta": "Learn with Profe Bruno",
    "proof": [
      "A task of your own",
      "Guided practice"
    ]
  }
};

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

  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    var serviceSelect = contactForm.querySelector('[name="servicio"]');
    var requestedService = new URLSearchParams(window.location.search).get("servicio");
    if (serviceSelect && requestedService && Array.prototype.some.call(serviceSelect.options, function (option) { return option.value === requestedService; })) {
      serviceSelect.value = requestedService;
    }
    // The existing receiver stores mensaje; include the selected service there too.
    contactForm.addEventListener("formdata", function (event) {
      if (!serviceSelect || !serviceSelect.value) return;
      var serviceLabel = serviceSelect.options[serviceSelect.selectedIndex].text;
      var message = event.formData.get("mensaje") || "";
      event.formData.set("mensaje", "Service: " + serviceLabel + "\n\n" + message);
    });
    var endpoint = contactForm.dataset.googleScriptUrl;
    var userAgentField = contactForm.querySelector('input[name="user_agent"]');
    var submitButton = contactForm.querySelector('button[type="submit"]');
    if (userAgentField) userAgentField.value = navigator.userAgent || "";
    if (endpoint) contactForm.action = endpoint;
    contactForm.addEventListener("submit", function () {
      if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Sending..."; }
    });
  }
})();
