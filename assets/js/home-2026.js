(function () {
  "use strict";

  var priorityData = {
    decision: {
      chapter: "01",
      title: "Consultoría para decidir mejor.",
      description: "Convertimos preguntas complejas de transporte en decisiones sustentadas con datos, método y criterio experto.",
      outcomes: ["Decisiones con más claridad y menos riesgo.", "Análisis que conectan datos, contexto y criterio.", "Planes de acción realistas y priorizados."],
      serviceUrl: "/consultoria/",
      serviceCta: "Conocer la consultoría",
      category: "Consultoría",
      product: "Reportes Vivos",
      productDescription: "Análisis, mapas e indicadores navegables que convierten una pregunta de transporte en evidencia para decidir.",
      productImage: "/assets/images/blog/reportes-vivos/sicetac-variacion-junio-2h-logisticas.png",
      productAlt: "Ficha de Reportes Vivos",
      productUrl: "/reportes/",
      productCta: "Abrir ficha",
      proof: ["Evidencia trazable", "Recomendación accionable"]
    },
    data: {
      chapter: "02",
      title: "Usar los servicios, aplicaciones y datos de ATIEMPPO para mejorar las áreas de transporte.",
      description: "Integramos aplicaciones, bases, índices, reportes y fuentes de información para consultar la operación y convertir datos de transporte en decisiones más claras.",
      outcomes: ["Aplicaciones para consultas y tareas operativas.", "Bases, índices y reportes para comparar escenarios.", "Información sectorial para formular mejores preguntas."],
      serviceUrl: "#soluciones",
      serviceCta: "Ver soluciones",
      category: "Ecosistema ATIEMPPO",
      product: "Aplicaciones, reportes, bases e índices",
      productDescription: "Accede a SICETAC al Instante, Base SICETAC, Índice de la Red, Reportes Vivos, API SICETAC y soluciones a medida como un cotizador de transporte.",
      productImage: "/assets/images/atiemppo/cover-base.png",
      productAlt: "Servicios, aplicaciones y datos de ATIEMPPO para las áreas de transporte",
      productUrl: "#soluciones",
      productCta: "Ver soluciones",
      proof: ["Datos para decidir", "Soluciones disponibles"]
    },
    ai: {
      chapter: "03",
      title: "Aprender a trabajar con agentes.",
      description: "Preparamos a personas, empresarios, gerentes y equipos para convertir la inteligencia artificial en una forma de trabajo con práctica, dirección y contexto.",
      outcomes: ["Profe Bruno para aprender IA aplicada sobre tareas reales.", "ATIEMPPO Lab para talleres y casos vivos con empresarios.", "Sesiones ejecutivas y experiencias agénticas para equipos."],
      serviceUrl: "#experiencias",
      serviceCta: "Ver experiencias",
      category: "Especialización y agentes",
      product: "Profe Bruno + ATIEMPPO Lab",
      productDescription: "Profe Bruno acompaña el aprendizaje aplicado. ATIEMPPO Lab, las sesiones ejecutivas y la Experiencia Agéntica llevan ese aprendizaje a talleres, decisiones gerenciales y casos empresariales.",
      productImage: "/assets/images/atiemppo/mesa-trabajo-ia.png",
      productAlt: "Mesa de trabajo de aprendizaje y experiencias agénticas ATIEMPPO",
      productUrl: "#experiencias",
      productCta: "Ver fichas de agentes",
      proof: ["Práctica aplicada", "Casos empresariales"]
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
