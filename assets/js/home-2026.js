(function () {
  "use strict";

  var priorityData = {
    decision: {
      chapter: "01",
      title: "Consultoría para decidir mejor.",
      description: "Convertimos preguntas complejas de transporte en decisiones sustentadas con datos, método y criterio experto.",
      outcomes: ["Decisiones con más claridad y menos riesgo.", "Análisis que conectan datos, contexto y criterio.", "Planes de acción realistas y priorizados."],
      serviceUrl: "#servicios",
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
      description: "Integramos soluciones listas para consultar información, analizar la operación y convertir datos de transporte en decisiones más claras.",
      outcomes: ["Aplicaciones para consultas y tareas operativas.", "Reportes para entender cambios, riesgos y oportunidades.", "Bases estructuradas y cálculo del Índice de Red."],
      serviceUrl: "#product-catalog",
      category: "Ecosistema ATIEMPPO",
      product: "Aplicaciones, reportes, bases e índices",
      productDescription: "Accede a aplicaciones como SICETAC al Instante, Reportes Vivos, bases de datos estructuradas y el cálculo del Índice de Red según las necesidades de tu área de transporte.",
      productImage: "/assets/images/atiemppo/cover-base.png",
      productAlt: "Servicios, aplicaciones y datos de ATIEMPPO para las áreas de transporte",
      productUrl: "#product-catalog",
      productCta: "Ver soluciones",
      proof: ["Datos para decidir", "Soluciones disponibles"]
    },
    ai: {
      chapter: "03",
      title: "Incorporar IA y aprender a trabajar con agentes.",
      description: "Combinamos conocimiento especializado en transporte con aprendizaje práctico de inteligencia artificial para que el equipo resuelva tareas reales de su operación y desarrolle capacidades propias.",
      outcomes: ["Agente Especialista en Transporte para resolver consultas y tareas con contexto del sector.", "Profe Bruno para aprender IA aplicada al transporte y construir agentes.", "Capacidades propias para continuar y escalar."],
      serviceUrl: "#servicios",
      category: "Transporte e IA",
      product: "Agente Especialista en Transporte + Profe Bruno",
      productDescription: "El Agente Especialista en Transporte apoya consultas y tareas de la operación con contexto del sector. Profe Bruno acompaña al equipo a aprender IA aplicada y a construir sus propios agentes.",
      productImage: "/assets/images/atiemppo/mesa-trabajo-ia.png",
      productAlt: "Mesa de trabajo con un Agente Especialista en Transporte y Profe Bruno",
      productUrl: "/formacion/profe-bruno-ia-aplicada/",
      productCta: "Ver aprendizaje",
      proof: ["Agente Especialista", "Profe Bruno"]
    }
  };

  var serviceData = {
    consulting: {
      eyebrow: "Servicio 01",
      title: "Consultoría para decidir mejor",
      description: "Una pregunta compleja se convierte en una respuesta explicable, con fuentes, supuestos, límites y una ruta de acción.",
      capabilities: ["Pregunta de decisión", "Evidencia trazable", "Activación con el equipo"],
      image: "/assets/images/blog/reportes-vivos/sicetac-variacion-junio-2h-logisticas.png",
      alt: "Reporte vivo para una decisión de transporte",
      url: "/reportes/"
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
  var catalog = document.getElementById("product-catalog");
  if (catalogToggle && catalog) {
    function setCatalogExpanded(expanded) {
      catalogToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      catalog.hidden = !expanded;
      catalogToggle.firstChild.nodeValue = expanded ? "Ocultar fichas " : "Ver todas las fichas ";
    }

    catalogToggle.addEventListener("click", function () {
      var expanded = catalogToggle.getAttribute("aria-expanded") === "true";
      setCatalogExpanded(!expanded);
    });

    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href="#product-catalog"]');
      if (!link) return;
      event.preventDefault();
      setCatalogExpanded(true);
      window.requestAnimationFrame(function () {
        catalog.scrollIntoView({ behavior: "smooth", block: "start" });
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
