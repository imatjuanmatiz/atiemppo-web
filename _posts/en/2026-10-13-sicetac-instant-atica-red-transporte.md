---
layout: post-en
title: "SICETAC al Instante evolves toward analysis of your transport network"
description: "4,743 recorded queries and 428 querying contacts: from WhatsApp to maps, your own rates and a network index. Explore ATICA's development and create your free account."
date: 2026-10-13 09:05:00 -0500
last_modified_at: 2026-10-21
author: "Juan Pablo Matiz"
lab: "SICETAC al Instante"
emoji: "🗺️"
tags: [sicetac, atica, transport, analytics, network-index, whatsapp]
image: /assets/images/blog/sicetac-instant-atica/01-centro-servicios.png
lang: en
permalink: /en/blog/sicetac-instant-atica-red-transporte/
translations:
  es: /blog/sicetac-instant-atica-red-transporte/
  en: /en/blog/sicetac-instant-atica-red-transporte/
ai_content_declaration: ai-assisted
portal_featured: true
---

> **Update — 21 October 2026:** free registration is now available through the [ATIEMPPO portal](https://clientes.atiemppo.com/registro). The figures, screenshots and stages of development described below reflect the service on 13 October. See the portal for current access conditions. The portal and screenshots are in Spanish.

Looking up the value for a route is a useful starting point. To manage a company's transport, we also need to understand how that reference changes, how it compares with the negotiated rate and how much weight the route carries in the operation.

That is the next step we are building at ATIEMPPO through SICETAC al Instante.

![ATICA service center with transport portal, live reports and SICETAC files; interface in Spanish](/assets/images/blog/sicetac-instant-atica/01-centro-servicios.png)

*ATICA service center. Screenshot from 13 October 2026; the cover map is illustrative. Source: ATIEMPPO.*

## A tool that already has users

As of 13 October, the operational database records **4,743 route queries**. **428 contacts** have at least one counted query, and **282** have queried twice or more. **725 queries** were recorded in the preceding thirty days.

These figures give us a usage base for continued development. They include academic and internal activity and represent operational records, not client companies or paid subscriptions. Repeat use shows that some contacts return to the service; we still need to study what each person needs to work more effectively with the information.

## Connecting a quick query to the company's work

SICETAC al Instante retains its WhatsApp function: access to available SICETAC and market-rate references. Querying this public information does not require membership of a company in the portal.

We are developing **ATICA**, a service center where a company can upload its routes and data, manage access and analyze its network on the web.

The map provides the entry point. It helps the company recognize the network, select a route and review related values and historical series. From there, it can compare references with its negotiated freight rate and, for a transport company with the appropriate permission, the amount it pays the carrier.

Each figure retains its period. If the latest available market rate belongs to a different month from the current SICETAC reference, the analysis must show that. The same applies to units, configurations and logistics hours: a difference helps a decision only when we understand what is being compared.

![Map of an ATIEMPPO demonstration network with route list and side menu; interface in Spanish](/assets/images/blog/sicetac-instant-atica/02-mapa-red.png)

*Published view of the demonstration network, captured on 8 October 2026. The 243 combinations and their activity are test data; they do not represent a client's operation. Basemap: OpenStreetMap. Source: ATIEMPPO.*

## A free account to start with your own network

Our aim is to let a person create an account and start with a small network without ATIEMPPO having to open the space manually. The free-account design envisages **one authorized person and tracking for up to ten route combinations**, along with queries for any SICETAC route with coverage.

A combination distinguishes origin, destination and vehicle configuration, together with the dimensions used by the platform. Tracking ten combinations does not mean the public catalog is limited to ten routes.

The goal is for a person to enter their first information, see the network on the map and return later to review its references and trends. A monthly plan is envisaged for additional combinations or people. Downloads of SICETAC Excel files belong to the paid account.

**Status on 13 October 2026:** this option was being validated and was not yet open to the public. We were completing sign-in, email verification and activation. Registration is now available, as explained in the update at the beginning of this article.

## Company teams can also query through WhatsApp

The company manages who may query its information. The process begins by uploading and activating its data in the portal, then assigning permissions. Each person links their WhatsApp identity through a verification code.

When that person queries a combination covered by the company's data, SICETAC al Instante can add authorized company information to the public references. For a shipper, the analysis includes its negotiated freight rate. For a transport company, it can also include the amount payable to the carrier if the person has that permission.

Access is revoked through the company's administration. Writing from a known number, having a similar name or knowing the organization's name does not grant access to its rates. People querying public references directly can continue without a company account.

The intention is for a quick query and a detailed analysis to use the same information, periods and permissions. WhatsApp supports the immediate question; the platform makes it possible to examine the whole network and retain its history.

## Questions we can ask about our network

The platform aims to support questions that often require assembling several files:

- How has the SICETAC reference for this route and configuration changed over the past year?
- What is the difference between that reference, the market rate and our negotiated freight rate?
- Which routes account for more trips or tonnes and deserve closer attention?
- How does the analysis change when we include our logistics hours and the authorized carrier payment?

Uploads can therefore start with a route master, a trip history or a monthly summary. Actual activity helps distinguish the route that changes most from the one that matters most to the operation. The period and the measure used for weighting must be explicit.

Each company's data remains separate. Its own information can also accompany a WhatsApp query when the person has been linked and authorized. Public references remain available.

## The network index connects change with the operation

For a route and configuration, the index tracks the change in the SICETAC reference relative to a base period. **In a hypothetical example, an index rising from 100 to 120 means a 20% increase from that base**, provided the parameters are comparable.

When analyzing the whole network, each combination's share also matters. We can use trips or tonnes from the selected period to construct a comparable basket and identify which routes carry more weight. Coverage and weights must be preserved: a new route or one without a historical reference cannot be treated as having zero cost or a known change.

The index measures changes in the SICETAC reference. Charts for market rates, freight and carrier payments support comparisons with other values, but do not turn that change into the actual change in all of a company's costs. Changes in the mix of trips, units, periods or configurations require separate analysis.

If a new month retains earlier values and only adds routes, network coverage has increased; the existing routes do not register an increase simply because the month changed. This helps distinguish a database update from a change that may affect a decision.

![Route detail with SICETAC, market-rate, carrier-payment and freight series, a base-100 index and activity; interface in Spanish](/assets/images/blog/sicetac-instant-atica/03-tendencias-indice.jpg)

*Route detail from an interface test on 7 October 2026. Amounts, trips and the index belong to a simulated scenario. The chart compares series in COP per trip and the table retains the base period. Source: ATIEMPPO.*

## Data prepared for work with agents

We are preparing this infrastructure so companies can connect their own agents. A read interface already exists through MCP, a protocol that allows an agent to use tools and query authorized information.

The aim is to preserve a common basis for analysis: identifiable sources, verifiable calculations and permissions. A future ChatGPT connection and side panel belong to the next stage; as of the article's original date, they were not a connector available to everyone.

We want companies to have transport information at hand: a query on a phone, their network on the web and a foundation for deeper analysis with authorized agents.

**What question about your network would you like to answer without rebuilding the analysis in Excel each time?**

## Create your free account in the portal

You can **[create your free ATIEMPPO account](https://clientes.atiemppo.com/registro)** and start with your personal network. The portal presents the access conditions and the verification and activation steps.

If you need to work with company data or explore an analysis further, [tell us what you need](/en/?servicio=indice-red#contacto). We will agree on the scope with you.

Our [service center](https://clientes.atiemppo.com/) brings together the available entry points. Public queries remain available through [SICETAC al Instante on WhatsApp](https://wa.me/573134503694?text=Hello%2C%20I%20would%20like%20to%20query%20SICETAC%20al%20Instante.%20My%20route%20is%3A). These services may respond in Spanish.

*Source of the figures: ATIEMPPO operational records, as of 13 October 2026 at 08:23, Colombia. Queries mean recorded route events; contacts do not equal companies or fully reconciled unique individuals. Academic and internal activity is included.*
