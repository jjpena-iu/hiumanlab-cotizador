# Generador de Propuestas hiumanlab / iU Brain

Aplicación web para generar Actas de Entendimiento y Propuestas Económicas profesionales usando IA (Gemini).

## 🚀 Funcionalidades

- **Generación con IA**: Extrae información de texto libre, transcripciones o PDFs
- **Vista previa HTML**: Documento de 8 páginas con identidad visual hiumanlab
- **Exportar DOCX**: Descarga el acta en formato Word
- **Exportar XLSX**: Tabulador con 3 pestañas (Propuesta Económica, Cronograma, Módulos)
- **Guardar en Google Drive**: Sube DOCX + XLSX a la cuenta Google del usuario via OAuth

## 🛠️ Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **IA**: Google Gemini (via AI Studio)
- **Backend**: Node.js en Railway
- **Auth Drive**: Google OAuth 2.0 (GSI)

## ⚙️ Variables de entorno
```bash
GEMINI_API_KEY=           # API key de Gemini
VITE_GOOGLE_CLIENT_ID=    # Client ID OAuth (Google Cloud Console)
```

## 🔗 Repositorios relacionados

- Frontend (este repo): `github.com/jjpena-iu/hiumanlab-cotizador`
- Backend: `github.com/jjpena-iu/hiumanlab-docx-backend`
