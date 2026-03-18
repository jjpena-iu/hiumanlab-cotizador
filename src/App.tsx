/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Upload, Loader2, Printer, FileOutput, FileAudio, File as FileIcon, Sparkles, FolderOpen, TableProperties } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { processProjectInput } from './services/geminiService';
import { generateFullHTML } from './services/documentGenerator';
import { generateDocx, generateXlsx } from './services/docxGenerator';
import { saveToDriveOAuth } from './services/driveOAuthService';
import { ProjectData } from './types';

export default function App() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingDocx, setIsGeneratingDocx] = useState(false);
  const [isGeneratingXlsx, setIsGeneratingXlsx] = useState(false);
  const [isSavingDrive, setIsSavingDrive] = useState(false);
  const [driveResult, setDriveResult] = useState<{ folderUrl: string; folderName: string } | null>(null);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerate = async () => {
    if (!input && !file) {
      setError('Por favor ingresa texto o adjunta un archivo.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setDriveResult(null);
    try {
      let fileData;
      if (file) {
        const base64 = await fileToBase64(file);
        fileData = { data: base64, mimeType: file.type };
      }
      const data = await processProjectInput(input, fileData);
      setProjectData(data);
      const html = generateFullHTML(data);
      setPreviewHtml(html);
    } catch (err) {
      console.error(err);
      setError('Error al procesar la información. Por favor intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    if (!previewHtml) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(previewHtml);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 1000);
    }
  };

  const handleDownloadDocx = async () => {
    if (!projectData || isGeneratingDocx) return;
    setIsGeneratingDocx(true);
    setError(null);
    try {
      await generateDocx(projectData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar el archivo Word.');
    } finally {
      setIsGeneratingDocx(false);
    }
  };

  const handleDownloadXlsx = async () => {
    if (!projectData || isGeneratingXlsx) return;
    setIsGeneratingXlsx(true);
    setError(null);
    try {
      await generateXlsx(projectData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar el archivo Excel.');
    } finally {
      setIsGeneratingXlsx(false);
    }
  };

  const handleSaveToDrive = async () => {
    if (!projectData || isSavingDrive) return;
    setIsSavingDrive(true);
    setError(null);
    try {
      const BACKEND_URL = "https://hiumanlab-docx-backend-production.up.railway.app";
      const [docxRes, xlsxRes] = await Promise.all([
        fetch(`${BACKEND_URL}/generate-docx`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData)
        }),
        fetch(`${BACKEND_URL}/generate-xlsx`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData)
        })
      ]);
      if (!docxRes.ok || !xlsxRes.ok) throw new Error("Error generando archivos en el servidor");
      const [docxBlob, xlsxBlob] = await Promise.all([docxRes.blob(), xlsxRes.blob()]);
      const result = await saveToDriveOAuth(
        docxBlob, xlsxBlob,
        projectData.tituloCliente,
        projectData.tituloProyecto
      );
      setDriveResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar en Google Drive.');
    } finally {
      setIsSavingDrive(false);
    }
  };

  // Botones de acción — reutilizados en header y debajo del preview
  const ActionButtons = ({ size = 'sm' }: { size?: 'sm' | 'base' }) => {
    const px   = size === 'sm' ? 'px-5 py-2'   : 'px-7 py-3';
    const text = size === 'sm' ? 'text-sm'      : 'text-base';
    const icon = size === 'sm' ? 'w-4 h-4'      : 'w-5 h-5';

    return (
      <div className="flex items-center gap-3 flex-wrap justify-center">

        {/* DOCX */}
        <button
          onClick={handleDownloadDocx}
          disabled={isGeneratingDocx}
          className={`flex items-center gap-2 border-2 border-hiuman-purple text-hiuman-purple bg-white ${px} rounded-[10px] ${text} font-montserrat font-bold hover:bg-hiuman-purple/5 transition-all disabled:opacity-50`}
        >
          {isGeneratingDocx ? <Loader2 className={`${icon} animate-spin`} /> : <FileOutput className={icon} />}
          {isGeneratingDocx ? 'Generando...' : '📄 Descargar .docx'}
        </button>

        {/* XLSX */}
        <button
          onClick={handleDownloadXlsx}
          disabled={isGeneratingXlsx}
          className={`flex items-center gap-2 border-2 border-emerald-600 text-emerald-700 bg-white ${px} rounded-[10px] ${text} font-montserrat font-bold hover:bg-emerald-50 transition-all disabled:opacity-50`}
        >
          {isGeneratingXlsx ? <Loader2 className={`${icon} animate-spin`} /> : <TableProperties className={icon} />}
          {isGeneratingXlsx ? 'Generando...' : '📊 Descargar .xlsx'}
        </button>

        {/* DRIVE */}
        <button
          onClick={handleSaveToDrive}
          disabled={isSavingDrive}
          className={`flex items-center gap-2 border-2 border-blue-500 text-blue-600 bg-white ${px} rounded-[10px] ${text} font-montserrat font-bold hover:bg-blue-50 transition-all disabled:opacity-50`}
        >
          {isSavingDrive ? <Loader2 className={`${icon} animate-spin`} /> : <FolderOpen className={icon} />}
          {isSavingDrive ? 'Subiendo...' : '📁 Guardar en Drive'}
        </button>

        {/* IMPRIMIR */}
        <button
          onClick={handlePrint}
          className={`flex items-center gap-2 bg-hiuman-purple text-white ${px} rounded-[10px] ${text} font-montserrat font-bold shadow-[0_4px_20px_rgba(135,71,237,0.4)] hover:scale-105 active:scale-95 transition-all`}
        >
          <Printer className={icon} />
          🖨️ Imprimir / PDF
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-hiuman-bg">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 220 52" style={{ height: '32px' }}>
            <text x="0"   y="38" fontFamily="Arial Black" fontSize="40" fontWeight="900" fill="#8747ED">/</text>
            <text x="24"  y="38" fontFamily="Arial Black" fontSize="29" fontWeight="900" fill="#1A1A2E"><tspan>hiuman</tspan><tspan>lab</tspan></text>
            <text x="168" y="22" fontFamily="Arial"       fontSize="9"                   fill="#1A1A2E">®</text>
            <text x="24"  y="50" fontFamily="Arial"       fontSize="7.5"                 fill="#888">Creating Technology Together</text>
          </svg>
          <div className="border-l border-slate-200 pl-4">
            <h1 className="font-montserrat font-bold text-lg text-hiuman-dark leading-tight">Propuestas</h1>
            <p className="text-xs text-slate-500 font-medium">Generador Oficial de Actas de Entendimiento</p>
          </div>
        </div>

        {previewHtml && (
          <div className="no-print flex items-center gap-3">
            <button
              onClick={() => { setPreviewHtml(null); setDriveResult(null); }}
              className="text-sm font-semibold text-slate-600 hover:text-hiuman-purple transition-colors px-4 py-2"
            >
              Nueva Propuesta
            </button>
            <ActionButtons size="sm" />
          </div>
        )}
      </header>

      <main className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {/* ── PANTALLA INICIAL ── */}
          {!previewHtml ? (
            <motion.div
              key="input"
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              className="w-full max-w-2xl mx-auto p-8 flex flex-col gap-8"
            >
              <div className="text-center">
                <h2 className="font-display text-5xl tracking-widest text-hiuman-dark mb-2">CREAR PROPUESTA</h2>
                <p className="text-slate-500">Ingresa el contexto del proyecto, notas de reunión o adjunta un archivo.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl shadow-hiuman-purple/5 border border-slate-100 p-6 flex flex-col gap-6">
                {/* Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Contexto del Proyecto</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe el proyecto aquí, pega notas de reunión, transcripción de audio, o el brief del cliente..."
                    className="w-full h-64 p-4 rounded-xl border border-[#e8e0ff] bg-white focus:border-hiuman-purple focus:ring-2 focus:ring-hiuman-purple/20 outline-none transition-all resize-none text-sm leading-relaxed"
                  />
                </div>

                {/* Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-hiuman-purple px-1">Archivos Adjuntos</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${file ? 'border-hiuman-purple bg-hiuman-purple/5' : 'border-hiuman-purple/40 hover:border-hiuman-purple hover:bg-hiuman-purple/5'}`}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.mp3,.m4a,.wav,.ogg,.txt" />
                    {file ? (
                      <>
                        {file.type.includes('audio') ? <FileAudio className="text-hiuman-purple w-10 h-10" /> : <FileIcon className="text-hiuman-purple w-10 h-10" />}
                        <div className="text-center">
                          <p className="text-sm font-bold text-hiuman-purple">{file.name}</p>
                          <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="text-hiuman-purple w-10 h-10" />
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-600">Arrastra aquí o haz clic para subir</p>
                          <p className="text-xs text-hiuman-purple font-medium">PDF · Audio MP3/WAV · Documento TXT</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">{error}</div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isProcessing}
                  style={{ boxShadow: '0 4px 20px rgba(135,71,237,0.4)' }}
                  className="w-full bg-hiuman-purple text-white py-4 rounded-xl font-montserrat font-bold text-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isProcessing ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> Procesando con IA...</>
                  ) : (
                    <><Sparkles className="w-5 h-5" /> Generar Propuesta</>
                  )}
                </button>
              </div>
            </motion.div>

          ) : (
          /* ── PANTALLA PREVIEW ── */
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 bg-slate-200 overflow-y-auto p-8 flex flex-col items-center gap-6"
            >
              {/* Banner error */}
              {error && (
                <div className="w-full max-w-4xl bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium shadow-sm">
                  {error}
                </div>
              )}

              {/* Banner Drive — aparece tras guardar exitosamente */}
              {driveResult && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-4xl bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <FolderOpen className="text-blue-500 w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-blue-700">¡Archivos guardados en Google Drive!</p>
                      <p className="text-xs text-blue-500 font-medium">{driveResult.folderName}</p>
                    </div>
                  </div>
                  <a
                    href={driveResult.folderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-blue-600 text-white text-sm font-montserrat font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Abrir carpeta →
                  </a>
                </motion.div>
              )}

              {/* Documento */}
              <div className="document-container">
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />

                {/* Botones debajo del preview */}
                <div className="flex flex-col items-center gap-4 mt-6 no-print pb-12">
                  <ActionButtons size="base" />

                  {driveResult && (
                    <a
                      href={driveResult.folderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 font-semibold underline underline-offset-2"
                    >
                      📁 {driveResult.folderName} — Ver en Drive
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
