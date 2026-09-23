import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Gift, 
  Shirt, 
  Clock, 
  Hotel, 
  CheckCircle2, 
  Music, 
  Heart,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { InvitationData } from '../types/invitation';

interface MinimalCardInvitationProps {
  invitation: InvitationData;
  onOpenSection: (section: 'venues' | 'calendar' | 'dress' | 'gifts' | 'timeline' | 'hotels' | 'rsvp') => void;
  onOpenRsvp: () => void;
}

export const MinimalCardInvitation: React.FC<MinimalCardInvitationProps> = ({
  invitation,
  onOpenSection,
  onOpenRsvp,
}) => {
  // Countdown calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(invitation.eventDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [invitation.eventDate]);

  return (
    <div className="w-full max-w-xl mx-auto my-4 sm:my-8 px-2 sm:px-0">
      {/* Luxury Minimalist Paper Card (Canva Style) */}
      <div className="paper-card rounded-2xl border border-[#e5ded3] p-3 sm:p-5 shadow-2xl relative overflow-hidden transition-all">
        
        {/* Double Fine Gold Hairline Inner Border */}
        <div className="border border-[#c5a059]/40 rounded-xl p-5 sm:p-8 relative bg-gradient-to-b from-[#fdfbf7] via-[#faf7f0] to-[#fcfaf5]">
          
          {/* Top Delicate Botanical Wreath / Monogram */}
          <div className="flex flex-col items-center text-center mb-6">
            {invitation.botanicalImage && (
              <img
                src={invitation.botanicalImage}
                alt="Detalle botánico"
                className="w-16 h-16 object-contain opacity-80 mb-2 mix-blend-multiply"
              />
            )}

            {/* Monogram Circle */}
            <div className="w-12 h-12 rounded-full border border-[#c5a059]/60 flex items-center justify-center text-[#8c7853] font-cinzel text-sm font-semibold tracking-wider mb-3 bg-[#fbf9f4]/80 shadow-xs">
              {invitation.person1.charAt(0)} & {invitation.person2.charAt(0)}
            </div>

            {/* Kicker */}
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#8c7853] font-montserrat font-medium">
              {invitation.subtitle}
            </span>

            <div className="w-10 h-[1px] bg-[#c5a059]/50 my-2" />
          </div>

          {/* Couple Names (High-fashion Editorial Script & Serif) */}
          <div className="text-center my-4">
            <h1 className="font-pinyon text-5xl sm:text-6xl text-[#332b24] tracking-wide leading-tight">
              {invitation.person1}
            </h1>
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="h-[1px] w-10 bg-[#c5a059]/40" />
              <span className="font-cormorant italic text-2xl text-[#8c7853] font-light">
                {invitation.connector}
              </span>
              <span className="h-[1px] w-10 bg-[#c5a059]/40" />
            </div>
            <h1 className="font-pinyon text-5xl sm:text-6xl text-[#332b24] tracking-wide leading-tight">
              {invitation.person2}
            </h1>
          </div>

          {/* Minimalist Editorial Couple Photo */}
          <div className="my-7 relative max-w-sm mx-auto">
            <div className="p-1 rounded-xl border border-[#c5a059]/30 bg-white shadow-sm">
              <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                <img
                  src={invitation.heroImage}
                  alt={`${invitation.person1} y ${invitation.person2}`}
                  className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Emotional Quote */}
          <div className="text-center max-w-md mx-auto my-6 px-3">
            <p className="font-cormorant italic text-base sm:text-lg text-[#5a4f43] leading-relaxed">
              "{invitation.quote}"
            </p>
            {invitation.quoteAuthor && (
              <span className="block text-[10px] uppercase tracking-widest text-[#9e9082] font-montserrat mt-2">
                — {invitation.quoteAuthor}
              </span>
            )}
          </div>

          {/* Date Block (Canva Minimalist Calendar Framing) */}
          <div className="my-8 py-5 border-y border-[#c5a059]/30 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8c7853] font-montserrat block mb-1">
              {invitation.dayOfWeek}
            </span>

            <div className="flex items-center justify-center gap-4 my-1">
              <span className="text-xs uppercase tracking-widest text-[#736657] font-cormorant">
                DÍA
              </span>
              <span className="font-cormorant text-5xl sm:text-6xl text-[#332b24] font-medium tracking-tight">
                {invitation.dayNumber}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#736657] font-cormorant">
                DEL MES
              </span>
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#8c7853] font-montserrat block mt-1 font-medium">
              {invitation.monthYear}
            </span>
          </div>

          {/* Minimalist Countdown Display */}
          <div className="my-8 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9e9082] font-montserrat block mb-3">
              Faltan para el gran día
            </span>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
              {[
                { label: 'DÍAS', value: timeLeft.days },
                { label: 'HORAS', value: timeLeft.hours },
                { label: 'MIN', value: timeLeft.minutes },
                { label: 'SEG', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 border border-[#c5a059]/25 rounded-lg py-2.5 px-1 shadow-xs flex flex-col items-center"
                >
                  <span className="font-cormorant text-2xl sm:text-3xl text-[#332b24] font-semibold tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#8c7853] font-montserrat font-medium mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Call to Action: RSVP Button (Canva Style) */}
          <div className="my-8 text-center">
            <button
              onClick={onOpenRsvp}
              className="w-full max-w-sm mx-auto py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8c7853] via-[#b39864] to-[#8c7853] text-white font-montserrat text-xs uppercase tracking-[0.2em] font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Confirmar Asistencia (RSVP)</span>
            </button>
            <span className="block text-[11px] text-[#8c7853] font-montserrat mt-2">
              Fecha límite: <strong>{invitation.rsvp.deadlineDate}</strong>
            </span>
          </div>

          {/* Section Separator */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div className="h-[1px] w-12 bg-[#c5a059]/30" />
            <Heart className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]/20" />
            <div className="h-[1px] w-12 bg-[#c5a059]/30" />
          </div>

          {/* Interactive Menu Buttons (Just like Canva interactive invitations) */}
          <div className="text-center mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9e9082] font-montserrat block mb-4">
              Detalles del Evento
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto text-left font-montserrat text-xs">
              {/* Venues */}
              <button
                onClick={() => onOpenSection('venues')}
                className="p-3.5 rounded-xl border border-[#c5a059]/30 bg-white/80 hover:bg-white hover:border-[#c5a059] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f6f2e9] text-[#8c7853] flex items-center justify-center shrink-0 group-hover:bg-[#8c7853] group-hover:text-white transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#332b24] block">Ubicaciones</span>
                    <span className="text-[11px] text-[#736657]">Iglesia & Recepción</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8c7853] opacity-60 group-hover:opacity-100" />
              </button>

              {/* Add to Calendar */}
              <button
                onClick={() => onOpenSection('calendar')}
                className="p-3.5 rounded-xl border border-[#c5a059]/30 bg-white/80 hover:bg-white hover:border-[#c5a059] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f6f2e9] text-[#8c7853] flex items-center justify-center shrink-0 group-hover:bg-[#8c7853] group-hover:text-white transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#332b24] block">Agendar Fecha</span>
                    <span className="text-[11px] text-[#736657]">Google & Apple Cal</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8c7853] opacity-60 group-hover:opacity-100" />
              </button>

              {/* Dress Code */}
              <button
                onClick={() => onOpenSection('dress')}
                className="p-3.5 rounded-xl border border-[#c5a059]/30 bg-white/80 hover:bg-white hover:border-[#c5a059] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f6f2e9] text-[#8c7853] flex items-center justify-center shrink-0 group-hover:bg-[#8c7853] group-hover:text-white transition-colors">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#332b24] block">Código de Vestimenta</span>
                    <span className="text-[11px] text-[#736657]">{invitation.dressCode.title}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8c7853] opacity-60 group-hover:opacity-100" />
              </button>

              {/* Gift Registry */}
              <button
                onClick={() => onOpenSection('gifts')}
                className="p-3.5 rounded-xl border border-[#c5a059]/30 bg-white/80 hover:bg-white hover:border-[#c5a059] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f6f2e9] text-[#8c7853] flex items-center justify-center shrink-0 group-hover:bg-[#8c7853] group-hover:text-white transition-colors">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#332b24] block">Mesa de Regalos</span>
                    <span className="text-[11px] text-[#736657]">Datos de Transferencia</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8c7853] opacity-60 group-hover:opacity-100" />
              </button>

              {/* Timeline */}
              <button
                onClick={() => onOpenSection('timeline')}
                className="p-3.5 rounded-xl border border-[#c5a059]/30 bg-white/80 hover:bg-white hover:border-[#c5a059] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f6f2e9] text-[#8c7853] flex items-center justify-center shrink-0 group-hover:bg-[#8c7853] group-hover:text-white transition-colors">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#332b24] block">Itinerario</span>
                    <span className="text-[11px] text-[#736657]">Minuto a minuto</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8c7853] opacity-60 group-hover:opacity-100" />
              </button>

              {/* Hotels */}
              <button
                onClick={() => onOpenSection('hotels')}
                className="p-3.5 rounded-xl border border-[#c5a059]/30 bg-white/80 hover:bg-white hover:border-[#c5a059] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f6f2e9] text-[#8c7853] flex items-center justify-center shrink-0 group-hover:bg-[#8c7853] group-hover:text-white transition-colors">
                    <Hotel className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#332b24] block">Hospedaje</span>
                    <span className="text-[11px] text-[#736657]">Hoteles sugeridos</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8c7853] opacity-60 group-hover:opacity-100" />
              </button>
            </div>
          </div>

          {/* Card Footer Signature */}
          <div className="text-center pt-8 pb-3">
            <p className="font-cormorant italic text-base text-[#736657]">
              "Esperamos contar con tu valiosa presencia para celebrar este día inolvidable."
            </p>
            <div className="w-8 h-[1px] bg-[#c5a059]/40 mx-auto my-3" />
            <span className="text-[10px] uppercase tracking-widest text-[#9e9082] font-montserrat">
              {invitation.person1} & {invitation.person2} · {invitation.formattedDateDisplay}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
