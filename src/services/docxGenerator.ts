import { ProjectData } from "../types";

const BACKEND_URL = "https://hiumanlab-docx-backend-production.up.railway.app";

export async function generateDocx(data: ProjectData): Promise<void> {
  console.log("Iniciando generación de DOCX en:", `${BACKEND_URL}/generate-docx`);
  try {
    const response = await fetch(`${BACKEND_URL}/generate-docx`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(err.error || `Error del servidor: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const filename = `Acta_${data.tituloCliente}_${data.tituloProyecto}`
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_\-]/g, "")
      .substring(0, 80);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("DOCX Generation Error:", error);
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("No se pudo conectar con el servidor de generación. Esto suele deberse a que el servidor en Railway está apagado o no permite conexiones desde este dominio (CORS).");
    }
    throw error;
  }
}

export async function generateXlsx(data: ProjectData): Promise<void> {
  console.log("Iniciando generación de XLSX en:", `${BACKEND_URL}/generate-xlsx`);
  try {
    const response = await fetch(`${BACKEND_URL}/generate-xlsx`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(err.error || `Error del servidor: ${response.status} ${response.statusText}`);
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const filename = `Cotizacion_${data.tituloCliente}_${data.tituloProyecto}`
      .replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-]/g, "").substring(0, 80);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("No se pudo conectar con el servidor.");
    }
    throw error;
  }
}

export async function saveToDrive(data: ProjectData): Promise<{ folderUrl: string; folderName: string; files: { type: string; name: string; url: string }[] }> {
  console.log("Guardando en Drive:", `${BACKEND_URL}/save-to-drive`);
  try {
    const response = await fetch(`${BACKEND_URL}/save-to-drive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(err.error || `Error del servidor: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("No se pudo conectar con el servidor.");
    }
    throw error;
  }
}
