(function () {
  "use strict";

  var priorityData = {
  "decision": {
    "chapter": "01",
    "title": "¿Qué está pasando en tu mercado?",
    "description": "Una oportunidad de crecimiento, una bodega por ubicar o una red que necesita cambiar. Investigamos contigo para comparar opciones y entender qué implican para tu empresa.",
    "outcomes": [
      "Estudios de mercado y prospectiva.",
      "Diseño de redes y alternativas de localización.",
      "Costos, operación y política de transporte."
    ],
    "serviceUrl": "/consultoria/",
    "serviceCta": "Encuentra tu consultoría",
    "category": "Un ejemplo de nuestro trabajo",
    "product": "Los datos también se pueden recorrer",
    "productDescription": "Abre un reporte y explora sus mapas, rutas e indicadores. Así puedes conocer una de las formas en que presentamos un análisis.",
    "productImage": "/assets/images/blog/reportes-vivos/sicetac-variacion-junio-2h-logisticas.png",
    "productAlt": "Ejemplo de un reporte SICETAC con variaciones por ruta",
    "productUrl": "/reportes/",
    "productCta": "Explorar los reportes",
    "proof": [
      "Mapas e indicadores",
      "Análisis para consultar"
    ]
  },
  "data": {
    "chapter": "02",
    "title": "Trabaja con los datos de tus rutas.",
    "description": "Consulta una referencia de transporte, lleva la base SICETAC a tus análisis o sigue los cambios en los costos de tu red. Elige el servicio que necesitas.",
    "outcomes": [
      "Una consulta para una ruta.",
      "Una base para trabajar con muchas rutas.",
      "Un índice para seguir los cambios de tu red."
    ],
    "serviceUrl": "#soluciones",
    "serviceCta": "Elegir un servicio SICETAC",
    "category": "Para trabajar con tus datos",
    "product": "Base SICETAC",
    "productDescription": "Información estructurada para cruzar con las rutas de tu empresa y preparar tus propios análisis. Puedes solicitar una entrega puntual o recurrente.",
    "productImage": "/assets/images/atiemppo/cover-base.png",
    "productAlt": "Presentación de la Base SICETAC de ATIEMPPO",
    "productUrl": "/?servicio=base-sicetac#contacto",
    "productCta": "Solicitar la base",
    "proof": [
      "Entrega puntual o recurrente",
      "Cruce con tus rutas"
    ]
  },
  "ai": {
    "chapter": "03",
    "title": "Trae una tarea que quieras hacer mejor.",
    "description": "Preparar un informe, analizar un archivo o encontrar información. Con Profe Bruno y nuestros talleres aprendes a usar la IA sobre algo que forma parte de tu trabajo.",
    "outcomes": [
      "Profe Bruno para aprender con acompañamiento.",
      "Talleres para trabajar sobre un caso de tu equipo.",
      "Sesiones para gerentes que quieren explorar dónde empezar."
    ],
    "serviceUrl": "#experiencias",
    "serviceCta": "Conocer las opciones para aprender",
    "category": "Aprendizaje aplicado",
    "product": "Profe Bruno",
    "productDescription": "Aprende a explicar lo que necesitas, trabajar con tus materiales y revisar el resultado. A partir de ahí podemos explorar cómo repetir una tarea con un agente.",
    "productImage": "/assets/images/atiemppo/mesa-trabajo-ia.png",
    "productAlt": "Ilustración de una mesa de trabajo con herramientas de inteligencia artificial",
    "productUrl": "/?servicio=profe-bruno#contacto",
    "productCta": "Quiero aprender con Profe Bruno",
    "proof": [
      "Una tarea propia",
      "Práctica acompañada"
    ]
  }
};

  var serviceData = {
    consulting: {
      eyebrow: "Servicio 01",
      title: "Consultoría para decidir mejor",
      description: "Convertimos preguntas de transporte, logística y supply chain en decisiones sustentadas con datos, escenarios comparables, fuentes especializadas y revisión humana.",
      capabilities: ["Redes, costos y escenarios", "Mercados, nodos y corredores", "Salida ejecutiva y soporte técnico"],
      image: "/assets/images/blog/reportes-vivos/sicetac-variacion-junio-2h-logisticas.png",
      alt: "Reporte vivo para una decisión de transporte",
      url: "/consultoria/"
    },
    training: {
      eyebrow: "Servicio 02",
      title: "Capacitación para la era de la IA",
      description: "El equipo pasa de conversar con una IA a dirigir agentes sobre tareas de transporte con propósito, fuentes, límites y revisión.",
      capabilities: ["Caso real del equipo", "Práctica acompañada", "Capacidad transferible"],
      image: "/assets/images/atiemppo/mesa-trabajo-ia.png",
      alt: "Mesa de trabajo de capacitación con inteligencia artificial",
      url: "/formacion/profe-bruno-ia-aplicada/"
    },
    factory: {
      eyebrow: "Servicio 03",
      title: "Fábrica de Agentes",
      description: "Diseñamos y construimos agentes especializados para una operación concreta, con criterios de aceptación y control humano.",
      capabilities: ["Caso y alcance", "Fuentes y herramientas", "Prueba y trazabilidad"],
      image: "/assets/images/blog/bruno-openclaw/bruno-discord-hq-orquestador.png",
      alt: "Centro de orquestación de agentes de Bruno",
      url: "/agentes/"
    },
    bruno: {
      eyebrow: "Servicio 04",
      title: "Bruno / OpenClaw",
      description: "Nuestro orquestador conecta agentes, memoria, contexto y herramientas para ejecutar con coherencia y seguimiento.",
      capabilities: ["Memoria", "Criterio", "Ejecución"],
      image: "/assets/images/atiemppo/bruno-openclaw.png",
      alt: "Bruno y OpenClaw como capa de orquestación",
      url: "/ia-que-ejecuta-bruno-openclaw/"
    },
    platform: {
      eyebrow: "Servicio 05",
      title: "Plataforma ATIEMPPO",
      description: "La capa tecnológica que integra datos, agentes e indicadores con seguridad, gobierno y una experiencia consistente.",
      capabilities: ["Fuentes conectadas", "Gobierno y permisos", "Indicadores de resultado"],
      image: "/assets/images/generated/atiemppo-capa-agentica-bruno.png",
      alt: "Plataforma ATIEMPPO conectando fuentes, memoria y agentes",
      url: "/enfoque/"
    }
  };

  function setupTabs(selector, dataAttribute, activate) {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!tabs.length) return;

    function select(tab, focus) {
      tabs.forEach(function (item) {
        var selected = item === tab;
        item.setAttribute("aria-selected", selected ? "true" : "false");
        item.tabIndex = selected ? 0 : -1;
      });
      activate(tab.getAttribute(dataAttribute), tab);
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (event) {
        var nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex !== index) {
          event.preventDefault();
          select(tabs[nextIndex], true);
        }
      });
    });
  }

  setupTabs(".journey-card", "data-priority", function (key, tab) {
    var data = priorityData[key];
    var panel = document.getElementById("recommended-chapter");
    if (!data || !panel) return;
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
  });

  setupTabs(".service-node", "data-service", function (key, tab) {
    var data = serviceData[key];
    var panel = document.getElementById("service-focus");
    if (!data || !panel) return;
    panel.setAttribute("aria-labelledby", tab.id);
    panel.querySelector("[data-service-eyebrow]").textContent = data.eyebrow;
    panel.querySelector("[data-service-title]").textContent = data.title;
    panel.querySelector("[data-service-description]").textContent = data.description;
    panel.querySelector("[data-service-capabilities]").innerHTML = data.capabilities.map(function (item) { return "<li>" + item + "</li>"; }).join("");
    var image = panel.querySelector("[data-service-image]");
    image.src = data.image;
    image.alt = data.alt;
    panel.querySelector("[data-service-media-link]").href = data.url;
  });

  var catalogToggle = document.querySelector(".catalog-toggle");
  var catalogs = Array.prototype.slice.call(document.querySelectorAll(".catalog-section"));
  if (catalogToggle && catalogs.length) {
    function updateCatalogToggle() {
      var expanded = catalogs.some(function (section) { return !section.hidden; });
      catalogToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      catalogToggle.firstChild.nodeValue = expanded ? "Ocultar fichas " : "Ver todas las fichas ";
    }

    catalogToggle.addEventListener("click", function () {
      var expanded = catalogToggle.getAttribute("aria-expanded") === "true";
      catalogs.forEach(function (section) { section.hidden = expanded; });
      updateCatalogToggle();
    });

    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href="#product-catalog"], a[href="#agent-catalog"]');
      if (!link) return;
      event.preventDefault();
      var target = document.querySelector(link.getAttribute("href"));
      catalogs.forEach(function (section) { section.hidden = section !== target; });
      updateCatalogToggle();
      window.requestAnimationFrame(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", open ? "false" : "true");
      navToggle.setAttribute("aria-label", open ? "Abrir navegación" : "Cerrar navegación");
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
      event.formData.set("mensaje", "Servicio: " + serviceLabel + "\n\n" + message);
    });
    var endpoint = contactForm.dataset.googleScriptUrl;
    var userAgentField = contactForm.querySelector('input[name="user_agent"]');
    var submitButton = contactForm.querySelector('button[type="submit"]');
    if (userAgentField) userAgentField.value = navigator.userAgent || "";
    if (endpoint) contactForm.action = endpoint;
    contactForm.addEventListener("submit", function () {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
      }
    });
  }
})();
