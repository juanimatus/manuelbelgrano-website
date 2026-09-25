(function () {
  'use strict';

  var CFG = Object.assign({ modoDemo: false, formEndpoint: '', fechaLimite: '', proximaApertura: '', cuposActualizado: '' }, window.SITE_CONFIG || {});
  var DATA = window.OFICIOS;
  var AREAS = DATA.areas;
  var PER_PAGE = 9;
  var DEMO_PROXIMAMENTE = ['Formación profesional de guardavidas', 'Robótica (inicial)'];
  var SIN_CUPOS = CFG.modoDemo && /[?&]sincupos=1/.test(window.location.search);

  var state = { area: 'Todos', q: '', showAll: false, oficioId: '' };

  function $(id) { return document.getElementById(id); }
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  var SKIP = /^(de|del|la|el|en|y|para|a)$/i;
  function codeOf(t) {
    var w = t.replace(/[()]/g, '').split(' ').filter(function (x) { return x.length > 1 && !SKIP.test(x); });
    var a = w[0] || t;
    return ((a[0] || '') + (w[1] ? w[1][0] : (a[1] || ''))).toUpperCase();
  }

  var all = DATA.items.map(function (it, i) {
    var soon = it.proximamente === true || (CFG.modoDemo && DEMO_PROXIMAMENTE.indexOf(it.titulo) !== -1);
    var total = null;
    var left = null;
    if (it.cupos) {
      total = it.cupos.total;
      left = Math.max(total - it.cupos.ocupados, 0);
    } else if (CFG.modoDemo && !soon) {
      total = 30;
      left = SIN_CUPOS ? 0 : Math.max(total - Math.min(total, (i * 7) % 33), 0);
    }
    var known = left !== null;
    var c = {
      id: 'o' + i,
      title: it.titulo,
      kind: it.tipo,
      inst: it.dicta,
      areaName: AREAS[it.area],
      code: codeOf(it.titulo),
      opens: it.abre || '',
      isSoon: soon,
      isKnown: known,
      isFull: !soon && known && left === 0,
      isLast: !soon && known && left > 0 && left <= 5,
      isOpen: !soon && known && left > 5,
      isUnknown: !soon && !known
    };
    c.canApply = c.isOpen || c.isLast || c.isUnknown;
    if (c.isOpen) c.statusText = 'Cupos disponibles: ' + left + ' de ' + total;
    else if (c.isLast) c.statusText = left === 1 ? 'Último cupo' : 'Últimos cupos: quedan ' + left;
    else if (c.isFull) c.statusText = 'Cupos completos';
    else if (c.isSoon) c.statusText = 'Próximamente';
    else c.statusText = 'Cupos por confirmar';
    c.haystack = norm(c.title + ' ' + c.inst + ' ' + c.areaName);
    return c;
  });

  function byId(id) { return all.filter(function (c) { return c.id === id; })[0]; }

  var elChips = $('chips');
  var elCards = $('cards');
  var elCount = $('conteo');
  var elEmpty = $('sin-resultados');
  var elMoreWrap = $('mas-wrap');
  var elMoreBtn = $('mas-btn');

  function statusHTML(c) {
    var base = 'display:inline-flex;align-items:center;gap:8px;font-size:13.5px;font-weight:800;border-radius:999px;padding:5px 12px;';
    var dot = function (color) { return '<span style="width:8px;height:8px;border-radius:999px;background:' + color + ';"></span>'; };
    if (c.isOpen) return '<span style="' + base + 'color:#14532D;background:#DDF3E6;border:1.5px solid #14532D;">' + dot('#14532D') + esc(c.statusText) + '</span>';
    if (c.isLast) return '<span style="' + base + 'color:#5C4400;background:#FFF4CC;border:1.5px solid #5C4400;">' + dot('#B58100') + esc(c.statusText) + '</span>';
    if (c.isFull) return '<span style="' + base + 'color:#FFFFFF;background:var(--navy);border:1.5px solid var(--navy);">' + dot('#FFFFFF') + esc(c.statusText) + '</span>';
    return '<span style="' + base + 'color:var(--navy);background:#E3F2FB;border:1.5px dashed var(--navy);">' + esc(c.statusText) + '</span>';
  }

  function actionHTML(c) {
    var out = '';
    if (c.canApply) {
      out += '<a href="#preinscripcion" class="btn" data-elegir="' + c.id + '" style="background: var(--action); color: var(--navy); box-shadow: 4px 4px 0 var(--navy); font-size: 15px; padding: 12px 20px;">Preinscribirme</a>';
    }
    if (c.isFull) {
      out += '<a href="#preinscripcion" class="btn" data-elegir="' + c.id + '" style="background: #FFFFFF; color: var(--navy); font-size: 15px; padding: 12px 20px;">Anotarme en lista de espera</a>';
    }
    if (c.isSoon && c.opens) {
      out += '<span style="font-size: 14.5px; font-weight: 700; color: #5B6B7B;">Abre el ' + esc(c.opens) + '</span>';
    }
    return out;
  }

  function cardHTML(c) {
    return '<article style="display: flex; flex-direction: column; background: #FFFFFF; border: 2px solid var(--navy); border-radius: 4px;">' +
      '<div style="display: flex; align-items: center; gap: 12px; padding: 20px 20px 0;">' +
      '<div aria-hidden="true" style="flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: var(--navy); color: var(--accent); font-family: \'Montserrat\', sans-serif; font-weight: 900; font-size: 19px; border-radius: 4px;">' + esc(c.code) + '</div>' +
      '<span style="font-size: 13px; font-weight: 700; background: #E3F2FB; padding: 4px 10px; border-radius: 999px;">' + esc(c.kind) + '</span>' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; gap: 8px; padding: 16px 20px 22px; flex-grow: 1;">' +
      '<h3 style="font-size: 19px; line-height: 1.15; letter-spacing: -0.025em;">' + esc(c.title) + '</h3>' +
      '<span style="font-size: 14px; font-weight: 700; color: var(--accent-dark);">' + esc(c.areaName) + '</span>' +
      '<div style="font-size: 13.5px; line-height: 1.4; color: #5B6B7B;"><span style="font-weight: 700; color: #4A5A6A;">Dicta:</span> <span>' + esc(c.inst) + '</span></div>' +
      '<div style="flex-grow: 1;"></div>' +
      '<div style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px; margin-top: 8px;">' + statusHTML(c) + actionHTML(c) + '</div>' +
      '</div></article>';
  }

  function renderChips() {
    var focused = document.activeElement && document.activeElement.getAttribute ? document.activeElement.getAttribute('data-area') : null;
    elChips.innerHTML = ['Todos'].concat(AREAS).map(function (a) {
      var n = a === 'Todos' ? all.length : all.filter(function (c) { return c.areaName === a; }).length;
      var on = a === state.area;
      return '<button type="button" class="chip" data-area="' + esc(a) + '" aria-pressed="' + on + '" style="background: ' + (on ? 'var(--navy)' : '#FFFFFF') + '; color: ' + (on ? '#FFFFFF' : 'var(--navy)') + ';">' + esc(a) + ' (' + n + ')</button>';
    }).join('');
    if (focused !== null) {
      var again = elChips.querySelector('[data-area="' + focused.replace(/"/g, '\\"') + '"]');
      if (again) again.focus();
    }
  }

  function renderCatalog() {
    var q = norm(state.q.trim());
    var filtered = all.filter(function (c) {
      return (state.area === 'Todos' || c.areaName === state.area) && (q === '' || c.haystack.indexOf(q) !== -1);
    });
    var shown = state.showAll ? filtered : filtered.slice(0, PER_PAGE);
    var n = filtered.length;
    elCards.innerHTML = shown.map(cardHTML).join('');
    elCount.textContent = n === 0 ? 'Sin resultados' : 'Mostrando ' + shown.length + ' de ' + n + (n === 1 ? ' oficio' : ' oficios');
    elEmpty.hidden = n !== 0;
    elMoreWrap.hidden = n <= PER_PAGE;
    elMoreBtn.textContent = state.showAll ? 'Ver menos oficios' : 'Ver los ' + n + ' oficios';
    renderChips();
  }

  function renderPromo() {
    var known = all.filter(function (c) { return c.isKnown; });
    var openCount = all.filter(function (c) { return c.isKnown && c.canApply; }).length;
    var hasCupos = known.length === 0 || openCount > 0;
    $('promo-cupos').hidden = !hasCupos;
    $('promo-sin-cupos').hidden = hasCupos;
    $('promo-titulo').textContent = known.length === 0 ? 'Elegí tu oficio' : 'Hay cupos en ' + openCount + (openCount === 1 ? ' oficio' : ' oficios');
    $('promo-fecha').hidden = !CFG.fechaLimite;
    $('promo-fecha-valor').textContent = CFG.fechaLimite;
    $('promo-apertura').hidden = !CFG.proximaApertura;
    $('promo-apertura-valor').textContent = CFG.proximaApertura;

    var nota = CFG.modoDemo ? 'Cupos de ejemplo, no son reales.' : (CFG.cuposActualizado ? 'Cupos actualizados el ' + CFG.cuposActualizado : '');
    ['cupos-actualizado-hero', 'cupos-actualizado-form'].forEach(function (id) {
      $(id).textContent = nota;
      $(id).hidden = !nota;
    });
  }

  function renderChosen() {
    var c = byId(state.oficioId);
    $('oficio-elegido').hidden = !c;
    $('oficio-ninguno').hidden = !!c;
    $('nota-espera').hidden = !(c && c.isFull);
    $('form-enviar').textContent = c && c.isFull ? 'Anotarme en lista de espera' : 'Enviar preinscripción';
    if (c) {
      $('oficio-titulo').textContent = c.title;
      $('oficio-meta').textContent = c.kind + ', dicta ' + c.inst + '. ' + c.statusText + '.';
    }
  }

  function showError(msg) {
    var el = $('form-error');
    el.textContent = msg;
    el.hidden = false;
  }

  function showOk(c) {
    var waitlist = c.isFull;
    $('ok-titulo').textContent = waitlist ? 'Quedaste en lista de espera' : 'Recibimos tu preinscripción';
    $('ok-mensaje').textContent = (waitlist ? 'Te anotamos en la lista de espera de ' : 'Registramos tu preinscripción en ') + c.title + '. Te avisamos por el teléfono o el correo que cargaste.';
    $('form-preinscripcion').hidden = true;
    $('form-ok').hidden = false;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    $('form-error').hidden = true;
    var c = byId(state.oficioId);
    var nombre = $('f-nombre').value.trim();
    var dni = $('f-dni').value.trim();
    var tel = $('f-tel').value.trim();
    var mail = $('f-mail').value.trim();
    if (!nombre || !/^[0-9.]{7,10}$/.test(dni) || !tel || !c) {
      showError('Completá tu nombre y apellido, un DNI válido y un teléfono, y elegí un oficio.');
      return;
    }
    if (mail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      showError('Revisá el correo: parece que le falta algo.');
      return;
    }
    var payload = {
      oficio: c.title,
      dicta: c.inst,
      listaDeEspera: c.isFull,
      nombre: nombre,
      dni: dni,
      telefono: tel,
      correo: mail,
      enviadoEl: new Date().toISOString()
    };
    if (CFG.formEndpoint) {
      var btn = $('form-enviar');
      btn.disabled = true;
      fetch(CFG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); showOk(c); })
        .catch(function () { showError('No pudimos enviar tu preinscripción. Probá de nuevo en unos minutos.'); })
        .then(function () { btn.disabled = false; });
    } else if (CFG.modoDemo) {
      showOk(c);
    } else {
      showError('El formulario todavía no está conectado. Por ahora podés escribirnos por WhatsApp para consultas.');
    }
  }

  $('f-buscar').addEventListener('input', function (e) { state.q = e.target.value; state.showAll = false; renderCatalog(); });
  elChips.addEventListener('click', function (e) {
    var b = e.target.closest('[data-area]');
    if (!b) return;
    state.area = b.getAttribute('data-area');
    state.showAll = false;
    renderCatalog();
  });
  elCards.addEventListener('click', function (e) {
    var a = e.target.closest('[data-elegir]');
    if (!a) return;
    state.oficioId = a.getAttribute('data-elegir');
    $('form-ok').hidden = true;
    $('form-preinscripcion').hidden = false;
    $('form-error').hidden = true;
    renderChosen();
  });
  elMoreBtn.addEventListener('click', function () { state.showAll = !state.showAll; renderCatalog(); });
  $('limpiar-filtros').addEventListener('click', function () {
    state.area = 'Todos';
    state.q = '';
    state.showAll = false;
    $('f-buscar').value = '';
    renderCatalog();
  });
  $('form-preinscripcion').addEventListener('submit', onSubmit);
  $('form-otra').addEventListener('click', function () {
    state.oficioId = '';
    $('form-preinscripcion').reset();
    $('form-ok').hidden = true;
    $('form-preinscripcion').hidden = false;
    renderChosen();
  });

  $('demo-banner').hidden = !CFG.modoDemo;
  renderCatalog();
  renderPromo();
  renderChosen();
})();
