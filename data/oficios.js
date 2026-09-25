(function () {
  var DGE = 'Dirección General de Escuelas';
  var ANUAL = 'Curso anual';
  var SEMESTRAL = 'Curso semestral';
  var IES1 = 'IES 9-001 San Martín';
  var PD = 'Punto Digital';
  var SUPERIOR = 'Formación profesional superior';

  // area: posición en "areas". cupos (opcional): { total: 30, ocupados: 12 }
  // Campos opcionales para la ficha de cada curso (si faltan, la ficha no muestra esa sección):
  //   resumen: 'Una frase que cuenta qué vas a poder hacer.'
  //   detalle: ['Párrafo sobre la formación.', 'Otro párrafo.']   (texto o lista de párrafos)
  //   aplicacion: 'Dónde podés trabajar al egresar.'              (texto o lista de párrafos)
  //   requisitos: ['Requisito 1', 'Requisito 2']
  //   horarios: 'Martes y jueves de 18 a 21 h'
  //   duracion: '4 meses'    (reemplaza la duración deducida del tipo de curso)
  window.OFICIOS = {
    areas: [
      'Construcción y carpintería',
      'Electricidad y energía',
      'Mecánica, metal y agro',
      'Refrigeración y climatización',
      'Moda, calzado y estética',
      'Gastronomía y alimentos',
      'Informática y tecnología',
      'Idiomas y comunicación',
      'Seguridad y salud'
    ],
    items: [
      { titulo: 'Soldadura y herrería', area: 2, tipo: ANUAL, dicta: DGE },
      { titulo: 'Tornería', area: 2, tipo: ANUAL, dicta: DGE },
      { titulo: 'Electricidad FP', area: 1, tipo: ANUAL, dicta: DGE },
      { titulo: 'Electricidad domiciliaria', area: 1, tipo: ANUAL, dicta: DGE },
      { titulo: 'Textil', area: 4, tipo: ANUAL, dicta: DGE },
      { titulo: 'Inglés (Nivel III)', area: 7, tipo: ANUAL, dicta: DGE },
      { titulo: 'Gastronomía', area: 5, tipo: ANUAL, dicta: DGE },
      { titulo: 'Inglés (Nivel II)', area: 7, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Tecnología de los materiales y proceso de fabricación textil', area: 4, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Labores a mano (tejido a dos agujas)', area: 4, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Peluquería', area: 4, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Auxiliar electricista', area: 1, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'AutoCAD', area: 6, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Construcción en seco', area: 0, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Refrigeración domiciliaria', area: 3, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Operario de bodega', area: 5, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Operario de calderas', area: 2, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Mecánica', area: 2, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Energías renovables', area: 1, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Marketing digital para microemprendedores', area: 7, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Programación (Nivel I)', area: 6, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Programación (Nivel II) y diseño de páginas web', area: 6, tipo: SEMESTRAL, dicta: DGE },
      { titulo: 'Carpintería de aluminio y vidriería (avanzado)', area: 0, tipo: 'Curso', dicta: 'UNCuyo' },
      { titulo: 'Carpintería en MDF', area: 0, tipo: 'Curso', dicta: 'UNCuyo' },
      { titulo: 'Mantenimiento, reparación e instalación de aires acondicionados (avanzado)', area: 3, tipo: 'Curso', dicta: 'UNCuyo' },
      { titulo: 'Tapicería del automotor', area: 2, tipo: 'Curso', dicta: 'UNCuyo' },
      { titulo: 'Zapatería', area: 4, tipo: 'Curso', dicta: 'UNCuyo' },
      { titulo: 'Soldadura (principiante, intermedio y avanzado)', area: 2, tipo: 'Curso', dicta: 'UTN' },
      { titulo: 'Tecnicatura en redes y telecomunicaciones', area: 6, tipo: 'Tecnicatura de 2 años', dicta: 'ITU' },
      { titulo: 'Instalador de sistemas solares fotovoltaicos', area: 1, tipo: SUPERIOR, dicta: IES1 },
      { titulo: 'Instalador de sistemas solares térmicos para agua caliente sanitaria (ISST)', area: 1, tipo: SUPERIOR, dicta: IES1 },
      { titulo: 'Higiene y seguridad en contexto minero', area: 8, tipo: SUPERIOR, dicta: IES1 },
      { titulo: 'Prácticas profesionalizantes en gastronomía', area: 5, tipo: 'Práctica profesionalizante', dicta: 'IES 9-021 Junín' },
      { titulo: 'Formación profesional de guardavidas', area: 8, tipo: 'Formación profesional', dicta: 'Instituto de Educación Física' },
      { titulo: 'Informática básica', area: 6, tipo: 'Taller', dicta: PD },
      { titulo: 'Notebook ML', area: 6, tipo: 'Taller', dicta: PD },
      { titulo: 'Robótica (inicial)', area: 6, tipo: 'Taller', dicta: PD },
      { titulo: 'Inteligencia artificial (1 y 2)', area: 6, tipo: 'Taller', dicta: PD },
      { titulo: 'Impresión 3D (inicial y avanzado)', area: 6, tipo: 'Taller', dicta: PD },
      { titulo: 'Manejo de drones', area: 6, tipo: 'Taller', dicta: PD },
      { titulo: 'Python con análisis de datos y bivecoding', area: 6, tipo: 'Taller', dicta: PD },
      { titulo: 'Taller de audiovisual y redes sociales', area: 7, tipo: 'Taller', dicta: PD },
      { titulo: 'Higiene y seguridad en el trabajo', area: 8, tipo: 'Taller', dicta: PD },
      { titulo: 'Manicuría (básica)', area: 4, tipo: 'Taller', dicta: PD },
      { titulo: 'Taller de inteligencia emocional', area: 7, tipo: 'Taller', dicta: PD },
      { titulo: 'Tractorista de mecanización agrícola', area: 2, tipo: 'Curso', dicta: 'INTA, ISCAMEN y Agrocosecha' }
    ]
  };
})();
