(function () {
  "use strict";

  var priorityData = {
  "data": {
    "chapter": "01",
    "title": "Inteligencia y planeación de transporte",
    "description": "Organizamos tus datos de transporte, relacionamos tus rutas con SICETAC y te ayudamos a comparar valores y entender la evolución de tu red.",
    "outcomes": [
      "Base SICETAC actualizada.",
      "Homologación e Índice de Red.",
      "Sesiones especializadas y servicios de agentes."
    ],
    "serviceUrl": "/inteligencia-planeacion-transporte/",
    "serviceCta": "Conoce cómo trabajamos"
  },
  "ai": {
    "chapter": "02",
    "title": "Experiencias con IA",
    "description": "Capacitamos a tu equipo para crear sus propios agentes, probarlos y documentarlos. Acompañamos sus proyectos para que el conocimiento y la capacidad de seguir mejorando se queden en la empresa.",
    "outcomes": [
      "Aprende con una tarea propia.",
      "Construyan sus propios agentes.",
      "Documenten y continúen."
    ],
    "serviceUrl": "/formacion/profe-bruno-ia-aplicada/",
    "serviceCta": "Conocer la capacitación",
    "category": "Capacitación práctica en IA",
    "product": "Capacidades propias para tu equipo",
    "productDescription": "Tu equipo conserva un método, fuentes, instrucciones y criterios de revisión que puede aplicar en nuevos proyectos. ATIEMPPO acompaña el aprendizaje y los siguientes retos según el alcance acordado.",
    "productImage": "/assets/images/servicios-2026/capacitacion-ia-ficha-es.png",
    "productAlt": "Capacitación para crear agentes propios, probarlos y documentarlos",
    "productUrl": "/acompanamiento-ia/",
    "productCta": "Conocer el programa para empresas",
    "proof": [
      "Práctica y documentación",
      "Continuidad del conocimiento"
    ]
  },
  "decision": {
    "chapter": "03",
    "title": "Consultoría especializada",
    "description": "Experiencia sectorial, investigación, datos, herramientas y agentes para convertir preguntas complejas en decisiones sustentadas.",
    "outcomes": [
      "Estudios de mercado y prospectiva.",
      "Redes, localización y costos.",
      "Evidencia, alternativas y hoja de ruta."
    ],
    "serviceUrl": "/consultoria/",
    "serviceCta": "Conversar sobre mi reto",
    "category": "Capacidad transversal",
    "product": "Análisis acelerado, criterio humano",
    "productDescription": "Combinamos el conocimiento de ATIEMPPO con herramientas y agentes para investigar, contrastar y recomendar un camino.",
    "productImage": "/assets/images/generated/atiemppo-lectura-mercado.png",
    "productAlt": "Territorio y escenarios de mercado",
    "productUrl": "/consultoria/",
    "productCta": "Explorar la consultoría",
    "proof": [
      "Fuentes trazables",
      "Resultados revisados"
    ]
  }
};

  var portalOfferElement = document.getElementById("portal-offer-data");
  if (portalOfferElement) {
    Object.assign(priorityData.data, JSON.parse(portalOfferElement.textContent));
  }

  var serviceData = {
    consulting: {
      eyebrow: "Servicio 01",
      title: "Consultoría especializada",
      description: "Convertimos preguntas de transporte, logística y supply chain en decisiones sustentadas con datos, escenarios comparables, fuentes especializadas y revisión humana.",
      capabilities: ["Redes, costos y escenarios", "Mercados, nodos y corredores", "Salida ejecutiva y soporte técnico"],
      image: "/assets/images/blog/reportes-vivos/sicetac-variacion-junio-2h-logisticas.png",
      alt: "Reporte vivo para una decisión de transporte",
      url: "/consultoria/"
    },
    training: {
      eyebrow: "Servicio 02",
      title: "Experiencias con IA",
      description: "Capacitamos al equipo para crear, probar y documentar sus propios agentes. Acompañamos sus nuevos proyectos para conservar y ampliar lo aprendido.",
      capabilities: ["Aprendizaje práctico", "Agentes propios y documentación", "Acompañamiento a nuevos proyectos"],
      image: "/assets/images/servicios-2026/capacitacion-ia-ficha-es.png",
      alt: "Capacitación, agentes propios, documentación y nuevos proyectos",
      url: "/acompanamiento-ia/"
    },
    factory: {
      eyebrow: "Servicio 03",
      title: "ATIEMPPO Agéntica",
      description: "Aplicamos nuestra experiencia con agentes al análisis, la formación y la consultoría. El desarrollo técnico se acuerda como alcance adicional.",
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

  var reportShortcut = document.querySelector(".service-shortcuts article:nth-child(2)");
  if (reportShortcut && !reportShortcut.querySelector('[href="/reportes/para-empresas/"]')) {
    var reportSalesLink = document.createElement("a");
    reportSalesLink.className = "text-link";
    reportSalesLink.href = "/reportes/para-empresas/";
    reportSalesLink.textContent = "Quiero un reporte para mi empresa →";
    reportShortcut.appendChild(reportSalesLink);
  }

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

})();
