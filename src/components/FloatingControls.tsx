import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Edit3, Github, Mail, Share2, Check } from 'lucide-react';
import { ambientMusic } from '../utils/ambientAudio';

interface FloatingControlsProps {
  onOpenCustomizer: () => void;
  onOpenGitHubModal: () => void;
  onReopenEnvelope: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  onOpenCustomizer,
  onOpenGitHubModal,
  onReopenEnvelope,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setIsPlaying(ambientMusic.getStatus());
  }, []);

  const handleToggleMusic = () => {
    const status = ambientMusic.toggle();
    setIsPlaying(status);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Te invito cordialmente a nuestra boda',
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="fixed top-3 right-3 z-40 flex items-center gap-1.5 bg-[#fdfbf7]/90 backdrop-blur-md border border-[#c5a059]/35 rounded-full px-3 py-1.5 shadow-md text-xs font-montserrat">
      {/* Audio Button */}
      <button
        onClick={handleToggleMusic}
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        aria-label="Música ambiental"
        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
          isPlaying
            ? 'text-[#8c7853] bg-[#f2ecde]'
            : 'text-neutral-500 hover:text-[#332b24] hover:bg-[#faf7f0]'
        }`}
      >
        {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
      </button>

      <span className="w-[1px] h-3.5 bg-[#c5a059]/30" />

      {/* Reopen Envelope */}
      <button
        onClick={onReopenEnvelope}
        title="Ver sobre digital"
        aria-label="Sobre digital"
        className="p-1.5 rounded-full text-neutral-600 hover:text-[#332b24] hover:bg-[#faf7f0] transition-colors cursor-pointer"
      >
        <Mail className="w-4 h-4" />
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        title="Compartir enlace"
        aria-label="Compartir enlace"
        className="p-1.5 rounded-full text-neutral-600 hover:text-[#332b24] hover:bg-[#faf7f0] transition-colors cursor-pointer relative"
      >
        {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
      </button>

      <span className="w-[1px] h-3.5 bg-[#c5a059]/30" />

      {/* Quick Customize */}
      <button
        onClick={onOpenCustomizer}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f2ecde] text-[#8c7853] hover:bg-[#e8decb] font-semibold text-[11px] transition-colors cursor-pointer"
      >
        <Edit3 className="w-3 h-3" />
        <span className="hidden sm:inline">Editar</span>
      </button>

      {/* GitHub Export */}
      <button
        onClick={onOpenGitHubModal}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#332b24] text-white hover:bg-black font-semibold text-[11px] transition-colors cursor-pointer"
      >
        <Github className="w-3 h-3 text-[#c5a059]" />
        <span className="hidden sm:inline">GitHub</span>
      </button>
    </div>
  );
};
