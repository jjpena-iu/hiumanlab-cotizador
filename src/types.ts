/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectData {
  tituloProyecto: string;
  tituloCliente: string;
  fechaProyecto: string;
  descripcionProyecto: string;
  laPropuesta: string;
  objetivoPropuesta: string;
  principiosDisenio: string;
  principiosTecnicos: string;
  principiosSeguridad: string;
  arquitecturaPropuesta: string;
  metodologiaTrabajo: string;
  entregables: string[];
  modulos: Array<{
    titulo: string;
    objetivo: string;
    actividades: string[];
  }>;
  criteriosAceptacionGeneral: string;
  criteriosPorModulo: Array<{
    titulo: string;
    reglasNegocio: string;
    criteriosAceptacion: string;
  }>;
  exclusionesExplicitas: string[];
  rolesResponsabilidades: string;
  principiosResponsabilidad: string;
  tiempos: {
    levantamiento: { dias: number; hrs: number; semanas: number[] };
    maqueta: { dias: number; hrs: number; semanas: number[] };
    desarrollo: { dias: number; hrs: number; semanas: number[] };
    qa: { dias: number; hrs: number; semanas: number[] };
  };
  precios: {
    levantamiento: number;
    maqueta: number;
    desarrollo: number;
    qa: number;
    total: number;
  };
  diagramas: {
    arquitectura: string;
    flujo: string;
    roles: string;
  };
}
