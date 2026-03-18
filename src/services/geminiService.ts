import { GoogleGenAI, Type } from "@google/genai";
import { ProjectData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function processProjectInput(input: string, fileData?: { data: string; mimeType: string }): Promise<ProjectData> {
  const model = ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [
      {
        parts: [
          {
            text: `Eres el experto analista de hiumanlab. Tu tarea es extraer y estructurar la información de un proyecto para generar una propuesta formal.
            
            Si falta información, infiérela razonablemente basándote en proyectos de software similares y márcala con "⚠️ [pendiente confirmar]".
            
            Genera un objeto JSON que cumpla exactamente con esta estructura:
            {
              "tituloProyecto": "NOMBRE DEL SISTEMA EN MAYÚSCULAS",
              "tituloCliente": "Nombre de la Empresa",
              "fechaProyecto": "DD/MM/AAAA",
              "descripcionProyecto": "Descripción detallada",
              "laPropuesta": "Introducción a la solución",
              "objetivoPropuesta": "Objetivo principal",
              "principiosDisenio": "3-4 principios UX/UI",
              "principiosTecnicos": "3-4 principios técnicos",
              "principiosSeguridad": "3-4 principios de seguridad",
              "arquitecturaPropuesta": "Stack tecnológico (React, Node, Cloud Run, etc.)",
              "metodologiaTrabajo": "Scrum/Kanban",
              "entregables": ["Lista de entregables"],
              "modulos": [
                { "titulo": "Módulo X", "objetivo": "...", "actividades": ["..."] }
              ],
              "criteriosAceptacionGeneral": "...",
              "criteriosPorModulo": [
                { "titulo": "Módulo X", "reglasNegocio": "...", "criteriosAceptacion": "..." }
              ],
              "exclusionesExplicitas": ["..."],
              "rolesResponsabilidades": "...",
              "principiosResponsabilidad": "...",
              "tiempos": {
                "levantamiento": { "dias": 5, "hrs": 40, "semanas": [1] },
                "maqueta": { "dias": 10, "hrs": 80, "semanas": [2, 3] },
                "desarrollo": { "dias": 20, "hrs": 160, "semanas": [3, 4, 5, 6] },
                "qa": { "dias": 5, "hrs": 40, "semanas": [7] }
              },
              "precios": {
                "levantamiento": 15000,
                "maqueta": 25000,
                "desarrollo": 85000,
                "qa": 15000,
                "total": 140000
              },
              "diagramas": {
                "arquitectura": "Código Mermaid para arquitectura general",
                "flujo": "Código Mermaid para flujo de información",
                "roles": "Código Mermaid para roles"
              }
            }

            IMPORTANTE PARA DIAGRAMAS MERMAID:
            - Usa 'graph TD' o 'graph LR'.
            - Usa los colores del tema: #8747ED (primario), #F5A623 (acento).
            - Deben ser diagramas profesionales y completos.

            Contexto del usuario:
            ${input}`
          },
          ...(fileData ? [{ inlineData: fileData }] : [])
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
    }
  });

  const response = await model;
  return JSON.parse(response.text || "{}") as ProjectData;
}
