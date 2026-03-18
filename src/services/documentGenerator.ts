import { ProjectData } from "../types";

export const LOGO_SVG = `
<svg viewBox="0 0 240 52" xmlns="http://www.w3.org/2000/svg" style="height:38px;display:block">
  <text x="0"   y="38" font-family="Arial Black,sans-serif" font-size="40" font-weight="900" fill="#7B5EA7">/</text>
  <text x="26" y="38" font-family="Arial Black,sans-serif" font-size="29" font-weight="900" fill="#1A1A2E"><tspan>hiuman</tspan><tspan>lab</tspan></text>
  <text x="170" y="22" font-family="Arial,sans-serif"       font-size="9"                    fill="#1A1A2E">®</text>
  <text x="26"  y="50" font-family="Arial,sans-serif"       font-size="7.5"                  fill="#888888">Creating Technology Together</text>
</svg>
`;

export const FOOTER_HTML = (_client: string) => `
<footer class="page-footer">
  <div class="footer-col footer-col--logo">
    <svg viewBox="0 0 160 34" style="height:22px;margin-bottom:4px">
      <text x="0"  y="24" font-family="Arial Black,sans-serif" font-size="24" font-weight="900" fill="#7B5EA7">/</text>
      <text x="16" y="24" font-family="Arial,sans-serif"       font-size="11" font-weight="700" fill="#1A1A2E">iucorporation</text>
    </svg>
    <span>www.<em>iucorporation</em>.com</span>
    <span><em>info</em>@iucorporation.com</span>
  </div>
  <div class="footer-col footer-col--contact">
    <strong>¡Contáctanos!</strong>
    <span>www.<em>iucorporation</em>.com</span>
    <span><em>info</em>@iucorporation.com</span>
  </div>
  <div class="footer-col footer-col--cdmx">
    <strong>CDMX</strong>
    <span>⊙ Insurgentes Sur 933, 4 Piso, Nápoles, CP. 03810</span>
    <span>✆ +52 (55) 5523.7063 &nbsp;|&nbsp; +52 (55) 6800.2226</span>
    <span>✉ Info@iucorporation.com</span>
  </div>
  <div class="footer-col footer-col--mid">
    <strong>MID</strong>
    <span>⊙ Calle 15 No. 122 por 24 y 26 Calle México CP. 97125</span>
    <span>✆ +52 (999) 666.0350</span>
    <span>✉ <em>contacto</em>@hiumanlab.com</span>
  </div>
  <div class="footer-col footer-social">
    <span>f</span>
    <span>in</span>
    <span>⊙</span>
  </div>
</footer>
`;

export function generateFullHTML(data: ProjectData): string {
  const terms = [
    `<strong>Exclusión de Costos de Infraestructura:</strong> Esta propuesta no incluye costos asociados a infraestructura tecnológica, plataformas de terceros, servicios en la nube ni cualquier otro dispositivo de hardware o software requerido por el cliente. ${data.tituloCliente} es quien debe cubrir con los costos adicionales de plataformas a integrar.`,
    `<strong>Alcance del Proyecto:</strong> El alcance del proyecto abarca únicamente las actividades de análisis, diagnóstico, propuesta y desarrollo de la solución descritas en el documento. Cualquier solicitud adicional será considerada como un cambio de alcance y requerirá una nueva estimación y presupuesto.`,
    `<strong>Precios e Impuestos:</strong> Todos los precios expresados en esta propuesta están en pesos mexicanos y no incluyen ningún tipo de impuesto.`,
    `<strong>Confidencialidad:</strong> Ambas partes se comprometen a mantener la confidencialidad de la información compartida durante el proyecto, sin divulgar detalles a terceros sin autorización previa.`,
    `<strong>Tiempos de Entrega:</strong> Los plazos de cada fase están sujetos a la disponibilidad de información por parte del cliente.`,
    `<strong>Responsable del Proyecto:</strong> El cliente deberá designar un responsable del proyecto que facilite la comunicación, el seguimiento y la ejecución de las actividades descritas en esta propuesta.`,
    `<strong>Responsabilidades del Cliente:</strong> El cliente deberá proporcionar acceso oportuno a la información y al personal necesario para realizar el análisis, así como los insumos necesarios. La falta de colaboración puede impactar en los tiempos de entrega y calidad del diagnóstico.`,
    `<strong>Dependencia de Insumos del Cliente:</strong> Los tiempos de implementación están sujetos a la entrega oportuna de los insumos requeridos por parte del cliente, como documentos estratégicos, aprobaciones y datos específicos.`,
    `<strong>Limitación de Responsabilidad:</strong> El proveedor no se hace responsable de decisiones comerciales o de implementación basadas en el informe y propuestas entregadas. La implementación de cualquier recomendación será responsabilidad del cliente.`,
    `<strong>Cambios en el Alcance:</strong> Si durante el análisis surgen nuevos requisitos o se identifican necesidades adicionales, estas se considerarán cambios de alcance y se presupuestará como proyectos independientes.`,
    `<strong>Garantía de Servicios:</strong> El proveedor garantiza que el análisis se realizará de acuerdo con los estándares de calidad acordados. Se ofrecerá una revisión final para aclarar cualquier duda o ajuste solicitado por el cliente dentro del alcance inicial. Además, se ofrece una garantía de 30 días tras la entrega que cubre las correcciones de defectos derivados del desarrollo. No incluye cambios en los requisitos iniciales ni nuevas funcionalidades.`,
    `<strong>Resolución de disputas:</strong> Cualquier disputa derivada del proyecto se resolverá mediante negociación entre las partes. Si no se llega a un acuerdo, se someterá a un proceso de mediación conforme a la jurisdicción aplicable.`,
    `<strong>Cumplimiento Normativo:</strong> El análisis y la propuesta de solución buscarán el cumplimiento con las normativas y regulaciones locales aplicables, especialmente en cuanto a protección de datos y privacidad.`,
    `<strong>Rescisión del Contrato:</strong> Cualquiera de las partes podrá rescindir el contrato si la otra incumple con los términos establecidos, con un aviso previo de 15 días. Los pagos realizados hasta la fecha no serán reembolsables en caso de rescisión por parte del cliente.`,
    `<strong>Viáticos:</strong> Los costos relacionados con viáticos, desplazamientos o cualquier gasto asociado a visitas presenciales no están incluidos en esta propuesta. En caso de que se requieran actividades presenciales, dichos gastos serán cubiertos por el cliente previa aprobación.`,
    `<strong>Impuestos:</strong> Los precios detallados no incluyen el Impuesto al Valor Agregado (IVA) ni ningún otro impuesto aplicable. En caso de que proceda, estos serán agregados de acuerdo con la legislación fiscal vigente al momento de la facturación.`,
    `<strong>Vigencia de la Propuesta:</strong> Esta propuesta tiene una vigencia de quince (15) días naturales a partir de la fecha de emisión. Pasado este período, los términos, condiciones y precios podrán estar sujetos a revisión y ajuste, de ser necesario.`,
    `<strong>Contratos:</strong> Es necesaria la firma del contrato para la ejecución de cualquiera de los proyectos.`,
    `<strong>Requerimientos Funcionales:</strong> Los requerimientos especificados en este documento son de naturaleza funcional y no evolutiva. Se entiende que la implementación cubrirá únicamente las funcionalidades descritas en el alcance del proyecto, sin incluir mejoras o evoluciones futuras del sistema.`,
    `<strong>Calendarización de Sesiones:</strong> Se establecerán reuniones semanales de seguimiento del proyecto, en las cuales la hora y días serán determinadas en el proceso del KickOff. Las sesiones tendrán una duración máxima de 60 minutos y serán realizadas de manera virtual. Cualquier cambio en la calendarización será comunicado con al menos 24 horas de anticipación.`,
    `<strong>Responsabilidad de Proveedores Externos y cliente:</strong> El proveedor no se hace responsable por fallas, interrupciones o problemas derivados de servicios de proveedores externos o proceso del cliente, incluyendo pero no limitado a servicios de hosting, bases de datos, APIs de terceros, servicios de autenticación o cualquier otra infraestructura tecnológica que no esté bajo el control directo del proveedor.`,
    `<strong>Exclusiones del Alcance - Alertas y Notificaciones:</strong> Esta propuesta no incluye la implementación de sistemas de alertas, notificaciones push, emails automáticos, SMS o cualquier otro mecanismo de comunicación automática. El alcance se limita a la funcionalidad de los módulos descritos en la propuesta según aplique.`,
    `<strong>Funcionamiento Online:</strong> La aplicación web funcionará únicamente en modo online, requiriendo conexión a internet para el acceso y funcionamiento de todas las funcionalidades. No se incluye la implementación de funcionalidades offline o sincronización de datos en modo desconectado.`
  ];

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Propuesta - ${data.tituloProyecto}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'base',
      themeVariables: {
        primaryColor: '#7B5EA7',
        primaryTextColor: '#FFFFFF',
        primaryBorderColor: '#5A4080',
        lineColor: '#7B5EA7',
        secondaryColor: '#E8980A',
        tertiaryColor: '#EEE8F8'
      }
    });
  </script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; color: #1A1A2E; background: #f0eeff; }

    .page {
      width: 21cm; min-height: 29.7cm;
      margin: 20px auto; padding: 1.4cm 2.2cm 3.0cm;
      background: white; position: relative;
      box-shadow: 0 4px 24px rgba(123,94,167,0.10);
    }

    .page-header { margin-bottom: 1.2cm; padding-bottom: 0.4cm; border-bottom: 1.5px solid #e5e7eb; }

    .page-footer {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 0.4cm 2.2cm 0.35cm;
      border-top: 1.5px solid #e5e7eb;
      display: flex; gap: 1.2rem; align-items: flex-start;
      font-size: 0.56rem; color: #9ca3af; font-family: 'DM Sans', sans-serif;
    }
    .footer-col { display: flex; flex-direction: column; gap: 2px; flex: 1; }
    .footer-col--logo    { flex: 0 0 auto; min-width: 110px; }
    .footer-col--contact { flex: 0 0 auto; min-width: 120px; }
    .footer-col--cdmx    { flex: 1.4; }
    .footer-col--mid     { flex: 1.2; }
    .footer-col strong { color: #1A1A2E; font-weight: 700; margin-bottom: 2px; font-size: 0.60rem; }
    .footer-col em { color: #7B5EA7; font-style: normal; font-weight: 600; }
    .footer-social {
      flex: 0 0 auto;
      display: flex; flex-direction: column;
      gap: 4px; align-items: center;
      color: #7B5EA7; font-size: 0.9rem; font-weight: 700;
      justify-content: center;
    }

    /* Portada */
    .cover-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 5rem; line-height: 1; color: #1A1A2E;
      text-align: center; margin: 2.5cm 0 0.5cm;
    }
    .cover-title span { background: #E8980A; padding: 0 12px; display: inline-block; }
    .cover-subtitle { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; color: #1A1A2E; text-align: center; }
    .cover-meta { text-align: center; margin: 1.2cm 0; font-family: 'Montserrat', sans-serif; }
    .cover-meta p { font-size: 0.85rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #555; }
    .cover-date { display: inline-block; background: #E8980A; padding: 2px 12px; font-weight: 700; margin-top: 6px; }
    .version-table { margin: 1.2cm auto; border-collapse: collapse; border: 2px solid #1A1A2E; }
    .version-table td { padding: 8px 24px; font-family: 'Montserrat', sans-serif; font-weight: 700; border: 1px solid #1A1A2E; }
    .version-table td:last-child { background: white; }

    /* Secciones */
    .section-title {
      font-family: 'Montserrat', sans-serif; font-weight: 800;
      font-size: 1.25rem; text-transform: uppercase; color: #1A1A2E;
      border-left: 5px solid #7B5EA7; padding-left: 12px;
      margin: 1rem 0 0.6rem;
    }
    .section-hero {
      font-family: 'Bebas Neue', sans-serif; font-size: 2rem;
      letter-spacing: 3px; text-align: center; color: #1A1A2E;
      margin: 0.8rem 0 0.2rem;
    }
    .section-divider { border: none; border-top: 2px solid #7B5EA7; margin: 0.5rem 0 1rem; }

    .subsection-title {
      font-family: 'Montserrat', sans-serif; font-weight: 700;
      font-size: 1rem; color: #7B5EA7; margin: 0.8rem 0 0.3rem;
    }
    p { font-size: 0.88rem; line-height: 1.65; margin-bottom: 0.5rem; }
    .highlight-orange { background: #E8980A; padding: 1px 6px; font-weight: 700; }
    .text-purple { color: #7B5EA7; font-weight: 700; }
    .text-orange { color: #E8980A; font-weight: 700; }

    /* Tablas */
    table.styled { width: 100%; border-collapse: collapse; margin: 0.6rem 0; font-size: 0.83rem; }
    table.styled thead tr { background: #7B5EA7; color: white; }
    table.styled th { font-family: 'Montserrat', sans-serif; font-weight: 700; text-transform: uppercase; padding: 9px 13px; font-size: 0.78rem; text-align: left; }
    table.styled td { padding: 8px 13px; border-bottom: 1px solid #ede9fe; vertical-align: top; }
    table.styled tr:nth-child(even) td { background: #faf9ff; }
    table.styled td.module-name { font-weight: 700; color: #1A1A2E; width: 28%; }
    table.styled td .label { color: #E8980A; font-weight: 700; font-size: 0.78rem; display: block; margin-bottom: 3px; }

    /* Tabla de tiempos - celdas semana */
    .week-active { background: #C4B5FD !important; }
    .week-cell { text-align: center; width: 40px; }

    /* Tabla económica */
    .total-row td { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 1rem; }
    .total-row td:last-child { color: #E8980A; font-size: 1.1rem; }

    /* Diagrama Mermaid */
    .diagram-block { margin: 0.8rem 0; }
    .diagram-label { font-family: 'Montserrat', sans-serif; font-weight: 700; color: #7B5EA7; font-size: 0.88rem; margin-bottom: 0.5rem; text-align: center; }
    .mermaid { background: #faf9ff; border: 1px solid #ede9fe; border-radius: 8px; padding: 1rem; }

    /* Columnas de principios */
    .cols-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.8rem; margin: 0.6rem 0; }
    .col-card { background: #faf9ff; border-left: 3px solid #7B5EA7; padding: 0.75rem; border-radius: 0 6px 6px 0; }
    .col-card h5 { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 0.8rem; color: #7B5EA7; margin-bottom: 0.4rem; text-transform: uppercase; }
    .col-card p { font-size: 0.8rem; margin: 0; }

    /* Términos */
    .terms-list { list-style: none; counter-reset: terms; }
    .terms-list li { counter-increment: terms; display: flex; gap: 0.5rem; margin-bottom: 0.35rem; font-size: 0.75rem; line-height: 1.5; }
    .terms-list li::before { content: counter(terms) "."; font-weight: 800; color: #7B5EA7; min-width: 20px; }
    .terms-list li strong { color: #1A1A2E; }

    /* Condiciones de pago */
    .payment-list { list-style: none; }
    .payment-list li { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.88rem; align-items: baseline; }
    .payment-list li .pay-num { font-weight: 800; color: #7B5EA7; min-width: 55px; font-family: 'Montserrat', sans-serif; }

    @media print {
      body { background: white; }
      .page { margin: 0; box-shadow: none; page-break-after: always; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>

  <!-- PÁGINA 1: PORTADA -->
  <div class="page">
    <div class="page-header">${LOGO_SVG}</div>
    <h1 class="cover-title"><span>${data.tituloProyecto}</span></h1>
    <h2 class="cover-subtitle">${data.tituloCliente}</h2>
    <div class="cover-meta">
      <p>ACTA ENTENDIMIENTO Y PROPUESTA ECONÓMICA</p>
      <div class="cover-date">${data.fechaProyecto}</div>
    </div>
    <table class="version-table">
      <tr>
        <td>Versión No</td>
        <td>1.0</td>
      </tr>
    </table>
    ${FOOTER_HTML(data.tituloCliente)}
  </div>

  <!-- PÁGINA 2: DESCRIPCIÓN Y PROPUESTA -->
  <div class="page">
    <div class="page-header">${LOGO_SVG}</div>
    <h3 class="section-title">DESCRIPCIÓN DEL REQUERIMIENTO</h3>
    <p>${data.descripcionProyecto}</p>
    
    <h3 class="section-title">NUESTRA PROPUESTA</h3>
    <p>${data.laPropuesta}</p>
    
    <h4 class="subsection-title">Objetivo de la Propuesta</h4>
    <p>${data.objetivoPropuesta}</p>
    
    <div class="cols-3">
      <div class="col-card">
        <h5>Principios de Diseño</h5>
        <p>${data.principiosDisenio}</p>
      </div>
      <div class="col-card">
        <h5>Principios Técnicos</h5>
        <p>${data.principiosTecnicos}</p>
      </div>
      <div class="col-card">
        <h5>Principios de Seguridad</h5>
        <p>${data.principiosSeguridad}</p>
      </div>
    </div>
    ${FOOTER_HTML(data.tituloCliente)}
  </div>

  <!-- PÁGINA 3: ARQUITECTURA Y MÓDULOS -->
  <div class="page">
    <div class="page-header">${LOGO_SVG}</div>
    <h4 class="subsection-title">Arquitectura propuesta</h4>
    <p>${data.arquitecturaPropuesta}</p>
    
    <h4 class="subsection-title">Metodología de trabajo</h4>
    <p>${data.metodologiaTrabajo}</p>
    
    <h4 class="subsection-title">Entregables</h4>
    <p>${(Array.isArray(data.entregables) ? data.entregables : [data.entregables ?? '']).join(", ")}</p>
    
    <h2 class="section-hero">ALCANCES FUNCIONALES</h2>
    <hr class="section-divider">
    
    <table class="styled">
      <thead>
        <tr>
          <th>Módulo</th>
          <th>Objetivo + Actividades</th>
        </tr>
      </thead>
      <tbody>
        ${(data.modulos ?? []).map(m => `
          <tr>
            <td class="module-name">${m.titulo}</td>
            <td>
              <span class="label">Objetivo:</span>
              <p>${m.objetivo}</p>
              <span class="label">Actividades:</span>
              <p>${(Array.isArray(m.actividades) ? m.actividades : [m.actividades ?? '']).join("<br>")}</p>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    ${FOOTER_HTML(data.tituloCliente)}
  </div>

  <!-- PÁGINA 4: DIAGRAMAS -->
  <div class="page">
    <div class="page-header">${LOGO_SVG}</div>
    <h2 class="section-hero">DIAGRAMAS</h2>
    <hr class="section-divider">
    
    <div class="diagram-block">
      <div class="diagram-label">Arquitectura General</div>
      <div class="mermaid">${data.diagramas.arquitectura}</div>
    </div>
    
    <div class="diagram-block">
      <div class="diagram-label">Diagrama de Flujo de Información</div>
      <div class="mermaid">${data.diagramas.flujo}</div>
    </div>
    
    <div class="diagram-block">
      <div class="diagram-label">Diagrama de Roles</div>
      <div class="mermaid">${data.diagramas.roles}</div>
    </div>
    ${FOOTER_HTML(data.tituloCliente)}
  </div>

  <!-- PÁGINA 5: CRITERIOS Y EXCLUSIONES -->
  <div class="page">
    <div class="page-header">${LOGO_SVG}</div>
    <h3 class="section-title">CRITERIOS DE ACEPTACIÓN</h3>
    <p>${data.criteriosAceptacionGeneral}</p>
    
    <table class="styled">
      <thead>
        <tr>
          <th>Módulo</th>
          <th>Reglas de Negocio + Aceptación</th>
        </tr>
      </thead>
      <tbody>
        ${(data.criteriosPorModulo ?? []).map(c => `
          <tr>
            <td class="module-name">${c.titulo}</td>
            <td>
              <span class="label">Reglas de Negocio:</span>
              <p>${c.reglasNegocio}</p>
              <span class="label">Criterios de Aceptación:</span>
              <p>${c.criteriosAceptacion}</p>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    
    <h3 class="section-title">EXCLUSIONES EXPLÍCITAS</h3>
    <p>${(Array.isArray(data.exclusionesExplicitas) ? data.exclusionesExplicitas : [data.exclusionesExplicitas ?? '']).join("<br>")}</p>
    
    <h3 class="section-title">ROLES Y RESPONSABILIDADES</h3>
    <p>${data.rolesResponsabilidades}</p>
    ${FOOTER_HTML(data.tituloCliente)}
  </div>

  <!-- PÁGINA 6: TIEMPO DE ENTREGA -->
  <div class="page">
    <div class="page-header">${LOGO_SVG}</div>
    <h2 class="section-hero">TIEMPO DE ENTREGA.</h2>
    <hr class="section-divider">
    
    <p>${data.principiosResponsabilidad}</p>
    
    <table class="styled">
      <thead>
        <tr>
          <th>Fase</th>
          <th>Detalles</th>
          ${[1, 2, 3, 4, 5, 6, 7].map(s => `<th class="week-cell">S${s}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="module-name">Levantamiento</td>
          <td>${data.tiempos.levantamiento.dias} días / ${data.tiempos.levantamiento.hrs} hrs</td>
          ${[1, 2, 3, 4, 5, 6, 7].map(s => `<td class="week-cell ${data.tiempos.levantamiento.semanas.includes(s) ? 'week-active' : ''}"></td>`).join("")}
        </tr>
        <tr>
          <td class="module-name">Maquetación</td>
          <td>${data.tiempos.maqueta.dias} días / ${data.tiempos.maqueta.hrs} hrs</td>
          ${[1, 2, 3, 4, 5, 6, 7].map(s => `<td class="week-cell ${data.tiempos.maqueta.semanas.includes(s) ? 'week-active' : ''}"></td>`).join("")}
        </tr>
        <tr>
          <td class="module-name">Desarrollo</td>
          <td>
            ${(data.modulos ?? []).map(m => `• ${m.titulo}`).join("<br>")}
            <br>
            ${data.tiempos.desarrollo.dias} días / ${data.tiempos.desarrollo.hrs} hrs
          </td>
          ${[1, 2, 3, 4, 5, 6, 7].map(s => `<td class="week-cell ${data.tiempos.desarrollo.semanas.includes(s) ? 'week-active' : ''}"></td>`).join("")}
        </tr>
        <tr>
          <td class="module-name">QA</td>
          <td>${data.tiempos.qa.dias} días / ${data.tiempos.qa.hrs} hrs</td>
          ${[1, 2, 3, 4, 5, 6, 7].map(s => `<td class="week-cell ${data.tiempos.qa.semanas.includes(s) ? 'week-active' : ''}"></td>`).join("")}
        </tr>
      </tbody>
    </table>
    
    <p style="font-style: italic; margin-top: 1rem;">“Los tiempos pueden ajustarse en función de la entrega oportuna de insumos por parte del cliente.”</p>
    ${FOOTER_HTML(data.tituloCliente)}
  </div>

  <!-- PÁGINA 7: PROPUESTA ECONÓMICA -->
  <div class="page">
    <div class="page-header">${LOGO_SVG}</div>
    <h2 class="section-hero">PROPUESTA ECONÓMICA.</h2>
    <hr class="section-divider">
    
    <table class="styled">
      <thead>
        <tr>
          <th>Requerimiento</th>
          <th>Inversión (MXN)*</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Levantamiento de Requerimientos</td>
          <td>$${data.precios.levantamiento.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Diseño de Maquetación con Figma (UI/UX)</td>
          <td>$${data.precios.maqueta.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Desarrollo de la plataforma</td>
          <td>$${data.precios.desarrollo.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Pruebas de funcionalidad UAT</td>
          <td>$${data.precios.qa.toLocaleString()}</td>
        </tr>
        <tr class="total-row">
          <td>TOTAL</td>
          <td>$${data.precios.total.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
    <p style="font-size: 0.75rem; color: #666;">*Precios más IVA</p>
    
    <p style="margin-top: 2rem;">Esta propuesta establece una evolución clara, controlada y escalable de la plataforma y los módulos, alineada a las vistas actuales del sistema y enfocada en resolver necesidades reales de coordinación de logística del negocio.</p>
    <p>Cualquier ampliación futura deberá tratarse como una nueva fase de evolución del producto.</p>
    ${FOOTER_HTML(data.tituloCliente)}
  </div>

  <!-- PÁGINA 8: CONDICIONES Y TÉRMINOS -->
  <div class="page">
    <div class="page-header">${LOGO_SVG}</div>
    <h2 class="section-hero">CONDICIONES DE PAGO.</h2>
    <hr class="section-divider">
    
    <ul class="payment-list">
      <li><span class="pay-num">Pago 1.</span> Se deberá realizar un pago del 33% del monto total como anticipo para el inicio de las actividades del proyecto.</li>
      <li><span class="pay-num">Pago 2.</span> El 33% al llevar la mitad del proyecto.</li>
      <li><span class="pay-num">Pago 3.</span> El 33% restante deberá ser abonado al momento de completar el 100% del alcance del proyecto y entregar los entregables acordados.</li>
    </ul>
    
    <h2 class="section-hero" style="margin-top: 2rem;">TÉRMINOS Y CONDICIONES.</h2>
    <hr class="section-divider">
    
    <ol class="terms-list">
      ${(terms ?? []).map(t => `<li>${t}</li>`).join("")}
    </ol>
    ${FOOTER_HTML(data.tituloCliente)}
  </div>

</body>
</html>
  `;
}
