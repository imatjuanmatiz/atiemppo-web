(function () {
  "use strict";

  var priorityData = {
    decision: {
      chapter: "01",
      title: "Consulting for better decisions.",
      description: "We turn complex transport questions into decisions supported by data, method and expert judgment.",
      outcomes: ["Clearer decisions with lower risk.", "Analysis connecting data, context and judgment.", "Realistic, prioritized action plans."],
      serviceUrl: "/en/consultoria/",
      serviceCta: "Explore consulting",
      category: "Consulting",
      product: "Living Reports",
      productDescription: "Browsable analyses, maps and indicators that turn a transport question into evidence for decision-making.",
      productImage: "/assets/images/blog/reportes-vivos/sicetac-variacion-junio-2h-logisticas.png",
      productAlt: "Living Reports reference",
      productUrl: "/en/reportes/",
      productCta: "Explore the reports",
      proof: ["Traceable evidence", "Actionable recommendation"]
    },
    data: {
      chapter: "02",
      title: "Use ATIEMPPO services, applications and data to strengthen transport teams.",
      description: "We bring together applications, databases, indexes, reports and information sources so teams can query operations and turn transport data into clearer decisions.",
      outcomes: ["Applications for queries and operational tasks.", "Datasets, indexes and reports for comparing scenarios.", "Sector information for asking better questions."],
      serviceUrl: "#soluciones",
      serviceCta: "See applications",
      category: "ATIEMPPO ecosystem",
      product: "Applications, reports, bases and indexes",
      productDescription: "SICETAC al Instante, SICETAC Base, Network Index, Living Reports, SICETAC API and upcoming solutions such as the Transport Quote Calculator.",
      productImage: "/assets/images/atiemppo/cover-base.png",
      productAlt: "ATIEMPPO applications, services and data for transport teams",
      productUrl: "#soluciones",
      productCta: "See applications",
      proof: ["Data for decisions", "Available solutions"]
    },
    ai: {
      chapter: "03",
      title: "Learn to work with agents.",
      description: "We prepare people, business owners, executives and teams to turn artificial intelligence into a way of working through practice, direction and context.",
      outcomes: ["Profe Bruno for learning applied AI on real tasks.", "ATIEMPPO Lab for workshops and live business cases.", "Executive sessions and agentic experiences for teams."],
      serviceUrl: "#experiencias",
      serviceCta: "See learning experiences",
      category: "Learning and agents",
      product: "Profe Bruno + ATIEMPPO Lab",
      productDescription: "Profe Bruno supports applied learning. ATIEMPPO Lab, executive sessions and the Agentic Experience take that learning into workshops, management decisions and business cases.",
      productImage: "/assets/images/atiemppo/mesa-trabajo-ia.png",
      productAlt: "ATIEMPPO learning and agentic workbench",
      productUrl: "#experiencias",
      productCta: "See learning cards",
      proof: ["Applied practice", "Business cases"]
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
