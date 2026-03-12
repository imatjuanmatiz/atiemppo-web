const SHEET_NAME = 'Leads Web';
const RECIPIENT_EMAIL = 'juanmatiz@atiemppo.co';

function doPost(e) {
  try {
    const data = normalizePayload_(e);
    appendLead_(data);
    notifyByEmail_(data);
    return successResponse_(data);
  } catch (error) {
    return errorResponse_(error);
  }
}

function normalizePayload_(e) {
  const params = (e && e.parameter) || {};
  const honeypot = (params._honey || '').trim();

  if (honeypot) {
    throw new Error('Spam detectado.');
  }

  const payload = {
    timestamp: new Date(),
    origen: (params.origen || 'atiemppo.com').trim(),
    nombre: (params.nombre || '').trim(),
    email: (params.email || '').trim(),
    empresa: (params.empresa || '').trim(),
    telefono: (params.telefono || '').trim(),
    mensaje: (params.mensaje || '').trim(),
    userAgent: (params.user_agent || '').trim(),
    successRedirect: (params.success_redirect || '').trim()
  };

  if (!payload.nombre || !payload.email || !payload.mensaje) {
    throw new Error('Faltan campos requeridos.');
  }

  return payload;
}

function appendLead_(data) {
  const sheet = getOrCreateSheet_();
  sheet.appendRow([
    data.timestamp,
    data.origen,
    data.nombre,
    data.email,
    data.empresa,
    data.telefono,
    data.mensaje,
    data.userAgent
  ]);
}

function notifyByEmail_(data) {
  const subject = 'Nuevo lead desde atiemppo.com';
  const body = [
    'Llegó un nuevo contacto desde la página web.',
    '',
    'Nombre: ' + data.nombre,
    'Correo: ' + data.email,
    'Empresa: ' + (data.empresa || '-'),
    'Teléfono / WhatsApp: ' + (data.telefono || '-'),
    'Origen: ' + data.origen,
    '',
    'Mensaje:',
    data.mensaje
  ].join('\n');

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: subject,
    body: body,
    replyTo: data.email
  });
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Fecha',
      'Origen',
      'Nombre',
      'Correo',
      'Empresa',
      'Telefono',
      'Mensaje',
      'User Agent'
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function successResponse_(data) {
  if (data.successRedirect) {
    return HtmlService.createHtmlOutput(
      '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=' +
      escapeHtml_(data.successRedirect) +
      '"></head><body></body></html>'
    );
  }

  return HtmlService.createHtmlOutput('OK');
}

function errorResponse_(error) {
  const message = escapeHtml_(error.message || 'Error procesando el formulario.');
  return HtmlService.createHtmlOutput(
    '<!DOCTYPE html><html><body><p>' + message + '</p></body></html>'
  );
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
