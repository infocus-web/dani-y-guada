import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { InvitationData } from '../types/invitation';
import { ambientMusic } from '../utils/ambientAudio';

interface EnvelopeModalProps {
  invitation: InvitationData;
  isOpen: boolean;
  onOpen: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  invitation,
  isOpen,
  onOpen,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  if (isOpen) return null;

  const handleOpenEnvelope = () => {
    setIsAnimating(true);
    // Start subtle ambient piano music when envelope opens
    ambientMusic.play();

    setTimeout(() => {
      onOpen();
      setIsAnimating(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#e8e2d8]/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity">
      <div className="flex flex-col items-center max-w-sm w-full">
        {/* Helper text */}
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8c7853] font-montserrat mb-4 font-semibold">
          Tienes una invitación especial
        </span>

        {/* Realistic luxury envelope presentation */}
        <div
          onClick={handleOpenEnvelope}
          className={`w-full aspect-[4/3] bg-[#fdfbf7] rounded-2xl border border-[#c5a059]/40 shadow-2xl p-6 flex flex-col items-center justify-between cursor-pointer relative overflow-hidden transition-all duration-700 hover:scale-[1.02] ${
            isAnimating ? 'scale-95 opacity-0 -translate-y-6' : ''
          }`}
        >
          {/* Top flap triangle background representation */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#f5eee0] to-transparent border-b border-[#c5a059]/20 -skew-y-1 origin-top-left" />

          {/* Invitation recipient wording */}
          <div className="text-center relative z-10 pt-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8c7853] font-montserrat font-semibold">
              {invitation.subtitle}
            </span>
            <h2 className="font-pinyon text-4xl sm:text-5xl text-[#332b24] mt-2">
              {invitation.person1} & {invitation.person2}
            </h2>
            <div className="w-12 h-[1px] bg-[#c5a059]/40 mx-auto my-1.5" />
            <span className="text-[11px] font-cormorant italic text-[#736657]">
              {invitation.formattedDateDisplay}
            </span>
          </div>

          {/* Wax Seal / Monogram Button */}
          <div className="relative z-10 my-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c5a059] via-[#ab8a43] to-[#785e28] shadow-lg border-2 border-[#fff0d0]/50 flex flex-col items-center justify-center text-white text-center transform transition-transform hover:scale-110 active:scale-95">
              <span className="font-cinzel text-xs font-bold tracking-widest leading-none">
                {invitation.person1.charAt(0)}&{invitation.person2.charAt(0)}
              </span>
              <Heart className="w-2.5 h-2.5 fill-white/80 mt-1 opacity-90" />
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="text-center relative z-10 pb-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c7853] font-montserrat font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>Toca para abrir invitación</span>
            </span>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={onOpen}
          className="mt-6 text-xs text-[#736657] hover:text-[#332b24] underline underline-offset-4 cursor-pointer font-montserrat"
        >
          Saltar animación y ver invitación directa
        </button>
      </div>
    </div>
  );
};
