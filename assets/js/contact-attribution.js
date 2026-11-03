(function () {
  "use strict";
  // Keep campaign codes only for this tab session. Never retain the full URL,
  // query, referrer or any values entered into the contact form.
  var storageKey = "atiemppo-campaign-v1";
  var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  var code = /^[a-zA-Z0-9][a-zA-Z0-9._~-]{0,79}$/;
  var params = new URLSearchParams(window.location.search);
  var campaign = {};
  var incoming = {};
  keys.forEach(function (key) {
    var value = params.get(key);
    if (value && code.test(value)) incoming[key] = value;
  });
  try {
    var saved = JSON.parse(window.sessionStorage.getItem(storageKey) || "{}");
    keys.forEach(function (key) {
      if (typeof saved[key] === "string" && code.test(saved[key])) campaign[key] = saved[key];
    });
    if (typeof saved.landing === "string" && /^\/[a-zA-Z0-9/_-]*$/.test(saved.landing)) campaign.landing = saved.landing.slice(0, 180);
  } catch (error) {
    // Storage may be disabled. Direct campaign links still work.
  }
  if (Object.keys(incoming).length) {
    campaign = incoming;
    campaign.landing = window.location.pathname.slice(0, 180);
    try { window.sessionStorage.setItem(storageKey, JSON.stringify(campaign)); } catch (error) { /* Optional storage. */ }
  }
  window.atiemppoContactOrigin = function () {
    var parts = ["atiemppo.com" + window.location.pathname];
    if (campaign.landing) parts.push("landing=" + campaign.landing);
    keys.forEach(function (key) { if (campaign[key]) parts.push(key + "=" + campaign[key]); });
    return parts.join(" | ");
  };
})();
