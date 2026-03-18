/**
 * driveOAuthService.ts
 * Sube archivos al Google Drive del usuario autenticado via OAuth 2.0
 * No requiere backend — todo ocurre en el navegador.
 */

const GOOGLE_CLIENT_ID =
  "1046840064744-ii5etokar4booer1s7l8ub6vv3e0sarc.apps.googleusercontent.com";

const SCOPES = "https://www.googleapis.com/auth/drive.file";

// ─── Carga la librería GIS (Google Identity Services) dinámicamente ───────────
function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-gsi-script")) return resolve();
    const script = document.createElement("script");
    script.id = "google-gsi-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar Google Identity Services"));
    document.head.appendChild(script);
  });
}

// ─── Obtiene un access token via popup de Google ──────────────────────────────
function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      prompt: '',
      callback: (response: any) => {
        if (response.error) {
          reject(new Error(
            response.error === 'popup_blocked_by_browser'
              ? 'El navegador bloqueó el popup de Google. Por favor permite popups para este sitio en la barra del navegador e intenta de nuevo.'
              : (response.error_description || response.error)
          ));
          return;
        }
        resolve(response.access_token);
      },
      error_callback: (error: any) => {
        if (error.type === 'popup_failed_to_open' || error.type === 'popup_closed') {
          reject(new Error('El popup de Google fue bloqueado. Haz clic en el ícono de popup bloqueado en la barra del navegador, permite popups para este sitio, y vuelve a intentar.'));
        } else {
          reject(new Error(error.message || 'Error de autenticación con Google'));
        }
      }
    });
    client.requestAccessToken();
  });
}

// ─── Crea una carpeta en Drive (o la reutiliza si ya existe) ──────────────────
async function getOrCreateFolder(
  token: string,
  folderName: string,
  parentId?: string
): Promise<string> {
  // Buscar si ya existe
  const query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false${
    parentId ? ` and '${parentId}' in parents` : ""
  }`;
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // Crear si no existe
  const metadata: any = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder",
  };
  if (parentId) metadata.parents = [parentId];

  const createRes = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metadata),
  });
  const folder = await createRes.json();
  if (!folder.id) throw new Error("Error creando carpeta en Drive: " + JSON.stringify(folder));
  return folder.id;
}

// ─── Sube un archivo a Drive ──────────────────────────────────────────────────
async function uploadFileToDrive(
  token: string,
  blob: Blob,
  filename: string,
  mimeType: string,
  folderId: string
): Promise<{ id: string; webViewLink: string }> {
  const metadata = {
    name: filename,
    parents: [folderId],
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", blob);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    }
  );
  const file = await res.json();
  if (!file.id) throw new Error("Error subiendo archivo: " + JSON.stringify(file));
  return file;
}

// ─────────────────────────────────────────────────────────────────────────────
//  FUNCIÓN PRINCIPAL EXPORTADA
// ─────────────────────────────────────────────────────────────────────────────
export interface DriveUploadResult {
  folderName: string;
  folderUrl: string;
  files: { type: string; name: string; url: string }[];
}

export async function saveToDriveOAuth(
  docxBlob: Blob,
  xlsxBlob: Blob,
  tituloCliente: string,
  tituloProyecto: string
): Promise<DriveUploadResult> {
  // 1. Cargar librería de Google
  await loadGoogleScript();

  // 2. Autenticar al usuario con popup
  const token = await getAccessToken();

  // 3. Crear carpeta raíz "Cotizaciones hiumanlab" (si no existe)
  const rootFolderId = await getOrCreateFolder(token, "Cotizaciones hiumanlab");

  // 4. Crear subcarpeta con nombre del proyecto
  const safeName = `${tituloCliente}_${tituloProyecto}`
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "")
    .substring(0, 60);
  const subFolderName = `Acta_${safeName}`;
  const subFolderId = await getOrCreateFolder(token, subFolderName, rootFolderId);

  // 5. Obtener link de la carpeta
  const folderRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${subFolderId}?fields=webViewLink`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const folderData = await folderRes.json();

  // 6. Subir DOCX
  const docxFile = await uploadFileToDrive(
    token,
    docxBlob,
    `Acta_${safeName}.docx`,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    subFolderId
  );

  // 7. Subir XLSX
  const xlsxFile = await uploadFileToDrive(
    token,
    xlsxBlob,
    `Cotizacion_${safeName}.xlsx`,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    subFolderId
  );

  return {
    folderName: subFolderName,
    folderUrl: folderData.webViewLink,
    files: [
      { type: "docx", name: `Acta_${safeName}.docx`,        url: docxFile.webViewLink },
      { type: "xlsx", name: `Cotizacion_${safeName}.xlsx`,   url: xlsxFile.webViewLink },
    ],
  };
}
