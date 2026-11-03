/* Synthetic DOM checks: no browser, network call or form submission. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const base = path.resolve(__dirname, '..');
const attribution = fs.readFileSync(path.join(base, 'assets/js/contact-attribution.js'), 'utf8');
const contact = fs.readFileSync(path.join(base, 'assets/js/contact.js'), 'utf8');
let checks = 0;
function equal(actual, expected) { assert.deepEqual(actual, expected); checks++; }
function ok(value) { assert.ok(value); checks++; }
const storageData = new Map();
const storage = { getItem: key => storageData.get(key), setItem: (key, value) => storageData.set(key, value) };
function page(url, session = storage) {
  const location = new URL(url);
  const window = { location, sessionStorage: session, addEventListener() {} };
  const context = { window, URL, URLSearchParams, navigator: { userAgent: 'Synthetic test' } };
  vm.runInNewContext(attribution, context);
  return context;
}
let landing = page('https://atiemppo.com/workshop/?utm_source=email&utm_campaign=rrhh-202611&utm_content=version-a&email=private@example.com&token=secret');
ok(landing.window.atiemppoContactOrigin().includes('utm_campaign=rrhh-202611'));
const saved = storageData.get('atiemppo-campaign-v1');
ok(!saved.includes('private') && !saved.includes('token') && !saved.includes('?'));
equal(JSON.parse(saved).landing, '/workshop/');
let destination = page('https://atiemppo.com/contacto/?servicio=taller-equipo&nombre=Private');
ok(destination.window.atiemppoContactOrigin().includes('landing=/workshop/'));
ok(destination.window.atiemppoContactOrigin().startsWith('atiemppo.com/contacto/'));
ok(!destination.window.atiemppoContactOrigin().includes('Private'));
let invalid = page('https://atiemppo.com/?utm_source=a%40private.com&utm_campaign='+ 'x'.repeat(81), { getItem() { return null; }, setItem() { throw Error('unexpected retention'); } });
equal(invalid.window.atiemppoContactOrigin(), 'atiemppo.com/');
let blocked = page('https://atiemppo.com/conferencias/?utm_source=email', { getItem() { throw Error('disabled'); }, setItem() { throw Error('disabled'); } });
ok(blocked.window.atiemppoContactOrigin().includes('utm_source=email'));
let malformed = page('https://atiemppo.com/', { getItem() { return '{bad JSON'; }, setItem() {} });
equal(malformed.window.atiemppoContactOrigin(), 'atiemppo.com/');

function mount(context, lang = 'es') {
  const events = {};
  const serviceEvents = {};
  const options = [
    { value: '', text: 'Quiero orientación' },
    { value: 'profe-bruno', text: 'Sesión personalizada con IA' },
    { value: 'taller-equipo', text: 'Workshop para mi equipo' },
    { value: 'conferencias', text: 'Conferencia para mi evento' },
    { value: 'acompanamiento-ia', text: 'Acompañamiento a mi equipo con IA' }
  ];
  const service = { options, selectedIndex: 0,
    get value() { return options[this.selectedIndex].value; },
    set value(value) { this.selectedIndex = options.findIndex(o => o.value === value); },
    appendChild(option) { options.push(option); },
    addEventListener(name, handler) { serviceEvents[name] = handler; }
  };
  const message = { placeholder: 'Start with a question.' };
  const help = {};
  const origin = { value: 'atiemppo.com/home' };
  const userAgent = {};
  const submit = { disabled: false, textContent: 'Send' };
  const languageLink = { href: 'https://atiemppo.com' + (lang === 'es' ? '/en/contacto/' : '/contacto/'), addEventListener() {} };
  const bruno = { href: 'https://wa.me/573188022396?text=General' };
  const nodes = { '[name="servicio"]': service, '[name="mensaje"]': message,
    '[name="origen"]': origin, 'input[name="user_agent"]': userAgent, 'button[type="submit"]': submit };
  const form = { dataset: { googleScriptUrl: 'https://receiver.example/exec' },
    querySelector: selector => nodes[selector], addEventListener(name, handler) { events[name] = handler; } };
  context.document = { documentElement: { lang },
    getElementById: id => id === 'contactForm' ? form : id === 'contact-message-help' ? help : null,
    querySelector: selector => selector === '.global-language' ? languageLink : null,
    querySelectorAll: selector => selector === '.bruno-link' ? [bruno] : [], createElement: () => ({}) };
  vm.runInNewContext(contact, context);
  return { form, service, serviceEvents, events, message, help, origin, submit, languageLink, bruno };
}
const test = mount(destination);
equal(test.service.value, 'taller-equipo');
equal(test.submit.textContent, 'Solicitar propuesta de workshop');
ok(test.message.placeholder.includes('tarea'));
equal(new URL(test.languageLink.href).pathname, '/en/contacto/');
equal(new URL(test.languageLink.href).search, '?servicio=taller-equipo');
ok(new URL(test.bruno.href).searchParams.get('text').includes('Workshop para mi equipo'));
equal(test.form.action, 'https://receiver.example/exec');
ok(test.origin.value.startsWith('atiemppo.com/contacto/'));
const submitted = new Map([['mensaje', 'My own task'], ['nombre', 'Private name'], ['email', 'private@example.com']]);
test.events.formdata({ formData: submitted });
equal(submitted.get('mensaje'), 'Servicio: Workshop para mi equipo\n\nMy own task');
equal(submitted.get('nombre'), 'Private name');
equal(submitted.get('email'), 'private@example.com');
ok(submitted.get('origen').includes('utm_content=version-a'));
test.service.value = '';
test.serviceEvents.change();
equal(test.bruno.href, 'https://wa.me/573188022396?text=General');
equal(test.message.placeholder, 'Start with a question.');
equal(test.submit.textContent, 'Send');
const unknown = mount(page('https://atiemppo.com/contacto/?servicio=unsupported&email=private@example.com'));
equal(unknown.service.value, '');
equal(new URL(unknown.languageLink.href).search, '');
const english = mount(page('https://atiemppo.com/en/contacto/?servicio=conferencias'), 'en');
equal(new URL(english.languageLink.href).pathname, '/contacto/');
ok(new URL(english.bruno.href).searchParams.get('text').startsWith('Hi Bruno'));
english.events.formdata({ formData: new Map([['mensaje', 'A public event']]) });
console.log(JSON.stringify({ checks, errors: [], mode: 'synthetic-dom', network_calls: 0, forms_submitted: 0 }));
