import React, { useState } from 'react';
import JSZip from 'jszip';
import { X, Copy, Check, Download, Github, Terminal, Globe, Rocket, FileCode2 } from 'lucide-react';
import { InvitationData } from '../types/invitation';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation: InvitationData;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({
  isOpen,
  onClose,
  invitation,
}) => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCommand(id);
      setTimeout(() => setCopiedCommand(null), 2500);
    });
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      zip.file(
        'README.md',
        `# Invitación Digital Minimalista - ${invitation.person1} & ${invitation.person2}

Invitación digital interactiva y minimalista estilo Canva para bodas y eventos especiales.

## 🚀 Despliegue en GitHub Pages (Gratis en 2 minutos)

1. Sube este repositorio a tu cuenta de GitHub.
2. Ve a la pestaña **Settings** > **Pages** de tu repositorio.
3. En **Build and deployment** > **Source**, selecciona **GitHub Actions**.
4. ¡Listo! El workflow automático publicará tu invitación en \`https://tu-usuario.github.io/tu-repo/\`.

## 💻 Desarrollo local

\`\`\`bash
npm install
npm run dev
npm run build
\`\`\`
`
      );

      zip.file(
        '.github/workflows/deploy.yml',
        `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
      );

      zip.file('src/invitation-data.json', JSON.stringify(invitation, null, 2));

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invitacion-boda-${invitation.person1.toLowerCase()}-${invitation.person2.toLowerCase()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const gitCommands = [
    '# 1. Inicializar git en la carpeta de tu proyecto',
    'git init',
    '',
    '# 2. Agregar todos los archivos preparados',
    'git add .',
    '',
    '# 3. Crear commit',
    'git commit -m "Invitación interactiva minimalista lista para desplegar"',
    '',
    '# 4. Establecer la rama main',
    'git branch -M main',
    '',
    '# 5. Vincular con tu repositorio en GitHub',
    'git remote add origin https://github.com/TU-USUARIO/MI-INVITACION.git',
    '',
    '# 6. Subir a GitHub',
    'git push -u origin main',
  ].join('\n');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-montserrat">
      <div 
        className="bg-[#fdfbf7] border border-[#e2d8cb] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#332b24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#c5a059]/20 flex items-center justify-between bg-[#faf7f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#332b24] text-white flex items-center justify-center">
              <Github className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8c7853] font-semibold block">
                Publicación Gratuita
              </span>
              <h3 className="font-cinzel text-lg text-[#332b24] font-bold">
                Volcar y Publicar en GitHub Pages
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#736657] hover:text-[#332b24] hover:bg-[#eae3d5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Note */}
          <div className="p-3.5 rounded-xl bg-[#faf5ec] border border-[#c5a059]/35 flex items-start gap-3">
            <Rocket className="w-4 h-4 text-[#8c7853] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-[#332b24] mb-0.5">
                Configurado con Vite base relativa para GitHub Pages
              </h4>
              <p className="text-[#5a4f43] leading-relaxed">
                El proyecto ya incluye <code className="bg-white px-1 py-0.5 rounded border border-[#e5ded3] text-[#8c7853]">base: './'</code> y el workflow de GitHub Actions para que tus invitados vean la invitación sin errores de rutas.
              </p>
            </div>
          </div>

          {/* Step 1 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8c7853] flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>Paso 1: Comandos para Terminal</span>
              </span>
              <button
                onClick={() => copyToClipboard(gitCommands, 'git')}
                className="flex items-center gap-1 text-[11px] text-[#8c7853] hover:text-[#332b24] bg-white border border-[#c5a059]/35 px-2.5 py-0.5 rounded cursor-pointer transition-colors shadow-xs"
              >
                {copiedCommand === 'git' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#8c7853]" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-[#1e1b18] text-[#e8e2d8] font-mono text-[11px] overflow-x-auto leading-relaxed">
              {gitCommands}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-xl bg-white border border-[#e2d8cb] space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8c7853] flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Paso 2: Activar GitHub Pages en tu Repositorio</span>
            </span>
            <ol className="list-decimal list-inside space-y-1 text-[#5a4f43] leading-relaxed">
              <li>En tu repositorio en <strong className="text-[#332b24]">GitHub.com</strong>, ve a <strong>Settings</strong> &gt; <strong>Pages</strong>.</li>
              <li>En <strong>Build and deployment</strong> &gt; <strong>Source</strong>, selecciona <span className="font-semibold text-[#8c7853]">GitHub Actions</span>.</li>
              <li>El despliegue automático generará tu enlace público para enviar por WhatsApp.</li>
            </ol>
          </div>

          {/* ZIP Download */}
          <div className="p-3.5 rounded-xl bg-[#faf7f0] border border-[#c5a059]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FileCode2 className="w-5 h-5 text-[#8c7853] shrink-0" />
              <div>
                <h5 className="font-semibold text-xs text-[#332b24]">Descargar Proyecto Completo (.ZIP)</h5>
                <p className="text-[10px] text-[#736657]">
                  Archivos listos para descomprimir y subir a tu repositorio.
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-3.5 py-2 rounded-lg bg-[#8c7853] text-white font-semibold text-xs hover:bg-[#736657] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isZipping ? 'Preparando...' : 'Descargar ZIP'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#c5a059]/20 bg-[#faf7f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#332b24] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Listo, cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
