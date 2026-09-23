import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Gift, 
  Shirt, 
  Clock, 
  Hotel, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  Navigation,
  Sparkles,
  Heart,
  AlertCircle
} from 'lucide-react';
import { InvitationData } from '../types/invitation';
import { downloadIcsFile, generateGoogleCalendarUrl } from '../utils/calendar';

interface InteractiveActionModalProps {
  activeSection: 'venues' | 'calendar' | 'dress' | 'gifts' | 'timeline' | 'hotels' | null;
  onClose: () => void;
  invitation: InvitationData;
}

export const InteractiveActionModal: React.FC<InteractiveActionModalProps> = ({
  activeSection,
  onClose,
  invitation,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!activeSection) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  const titles: Record<string, string> = {
    venues: 'Ubicaciones',
    calendar: 'Agendar en Calendario',
    dress: 'Código de Vestimenta',
    gifts: 'Mesa de Regalos & Cuenta',
    timeline: 'Itinerario del Evento',
    hotels: 'Hospedaje Recomendado',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#fdfbf7] border border-[#e2d8cb] rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-[#332b24] font-montserrat relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#c5a059]/20 flex items-center justify-between bg-[#faf7f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f2ecde] border border-[#c5a059]/40 flex items-center justify-center text-[#8c7853]">
              {activeSection === 'venues' && <MapPin className="w-4 h-4" />}
              {activeSection === 'calendar' && <Calendar className="w-4 h-4" />}
              {activeSection === 'dress' && <Shirt className="w-4 h-4" />}
              {activeSection === 'gifts' && <Gift className="w-4 h-4" />}
              {activeSection === 'timeline' && <Clock className="w-4 h-4" />}
              {activeSection === 'hotels' && <Hotel className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8c7853] font-semibold block">
                {invitation.person1} & {invitation.person2}
              </span>
              <h3 className="font-cinzel text-lg text-[#332b24] font-bold">
                {titles[activeSection]}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 rounded-full text-[#736657] hover:text-[#332b24] hover:bg-[#eae3d5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* 1. VENUES */}
          {activeSection === 'venues' && (
            <div className="space-y-6">
              {/* Ceremony */}
              <div className="p-4 rounded-xl border border-[#c5a059]/30 bg-white shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-widest text-[#8c7853] font-semibold">
                    1. Ceremonia
                  </span>
                  <span className="text-xs font-bold text-[#332b24] bg-[#f5efe3] px-2 py-0.5 rounded">
                    {invitation.ceremony.time}
                  </span>
                </div>
                <h4 className="font-cinzel text-base text-[#332b24] font-bold">
                  {invitation.ceremony.venueName}
                </h4>
                <p className="text-xs text-[#5a4f43] mt-1 leading-relaxed">
                  {invitation.ceremony.address}
                </p>
                {invitation.ceremony.notes && (
                  <p className="text-[11px] italic text-[#8c7853] mt-2">
                    *{invitation.ceremony.notes}
                  </p>
                )}

                <div className="flex items-center gap-2.5 mt-4">
                  <a
                    href={invitation.ceremony.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-[#8c7853] text-white text-xs font-semibold hover:bg-[#736657] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>
                  {invitation.ceremony.wazeUrl && (
                    <a
                      href={invitation.ceremony.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg border border-[#c5a059]/40 bg-white text-[#736657] hover:border-[#8c7853] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Waze</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Reception */}
              <div className="p-4 rounded-xl border border-[#c5a059]/30 bg-white shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-widest text-[#8c7853] font-semibold">
                    2. Recepción & Fiesta
                  </span>
                  <span className="text-xs font-bold text-[#332b24] bg-[#f5efe3] px-2 py-0.5 rounded">
                    {invitation.reception.time}
                  </span>
                </div>
                <h4 className="font-cinzel text-base text-[#332b24] font-bold">
                  {invitation.reception.venueName}
                </h4>
                <p className="text-xs text-[#5a4f43] mt-1 leading-relaxed">
                  {invitation.reception.address}
                </p>
                {invitation.reception.notes && (
                  <p className="text-[11px] italic text-[#8c7853] mt-2">
                    *{invitation.reception.notes}
                  </p>
                )}

                <div className="flex items-center gap-2.5 mt-4">
                  <a
                    href={invitation.reception.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-[#8c7853] text-white text-xs font-semibold hover:bg-[#736657] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>
                  {invitation.reception.wazeUrl && (
                    <a
                      href={invitation.reception.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg border border-[#c5a059]/40 bg-white text-[#736657] hover:border-[#8c7853] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Waze</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. CALENDAR */}
          {activeSection === 'calendar' && (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-xl border border-[#c5a059]/30 bg-white shadow-xs">
                <span className="text-xs uppercase tracking-widest text-[#8c7853] font-semibold block mb-1">
                  Reserva la Fecha
                </span>
                <h4 className="font-cinzel text-xl text-[#332b24] font-bold mb-2">
                  {invitation.formattedDateDisplay}
                </h4>
                <p className="text-xs text-[#5a4f43] leading-relaxed max-w-sm mx-auto mb-5">
                  Agrega este momento a tu calendario preferido para recibir notificaciones y no perder ningún detalle.
                </p>

                <div className="space-y-2.5 max-w-xs mx-auto">
                  <a
                    href={generateGoogleCalendarUrl(invitation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#8c7853] text-white text-xs font-semibold hover:bg-[#736657] transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Añadir a Google Calendar</span>
                  </a>

                  <button
                    onClick={() => downloadIcsFile(invitation)}
                    className="w-full py-2.5 px-4 rounded-lg border border-[#c5a059]/40 bg-white text-[#332b24] hover:border-[#8c7853] text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#8c7853]" />
                    <span>Descargar para Apple / Outlook (.ics)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. DRESS CODE */}
          {activeSection === 'dress' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#c5a059]/30 bg-white shadow-xs">
                <span className="text-[11px] uppercase tracking-widest text-[#8c7853] font-semibold block mb-1">
                  Etiqueta del Evento
                </span>
                <h4 className="font-cinzel text-lg text-[#332b24] font-bold mb-2">
                  {invitation.dressCode.title}
                </h4>
                <p className="text-xs text-[#5a4f43] leading-relaxed mb-4">
                  {invitation.dressCode.description}
                </p>

                <div className="border-t border-[#c5a059]/20 pt-4 mt-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#8c7853] font-semibold block mb-3">
                    Paleta de Inspiración
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {invitation.dressCode.colors.map((color, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-full border border-black/10 shadow-xs relative flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          {color.isProhibited && (
                            <span className="text-red-500 font-bold text-xs">✕</span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#5a4f43] mt-1 text-center font-medium leading-tight">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {invitation.dressCode.note && (
                  <div className="p-3 mt-4 rounded-lg bg-[#faf5ec] border border-[#e5ded3] flex items-start gap-2 text-xs text-[#8c7853]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{invitation.dressCode.note}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. GIFTS / BANK */}
          {activeSection === 'gifts' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#c5a059]/30 bg-white shadow-xs space-y-4">
                <p className="text-xs text-[#5a4f43] leading-relaxed">
                  {invitation.gifts.message}
                </p>

                {/* Bank details card */}
                <div className="p-3.5 rounded-lg bg-[#fbf9f4] border border-[#c5a059]/30 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-[#e5ded3]">
                    <span className="text-[#8c7853] font-semibold">Banco:</span>
                    <span className="font-bold text-[#332b24]">{invitation.gifts.bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-[#e5ded3]">
                    <span className="text-[#8c7853] font-semibold">Beneficiario:</span>
                    <span className="font-medium text-[#332b24]">{invitation.gifts.bankDetails.accountHolder}</span>
                  </div>

                  {/* CLABE with 1-click copy */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[#8c7853] font-semibold block text-[10px] uppercase tracking-wider">
                        CLABE Interbancaria:
                      </span>
                      <span className="font-mono font-bold text-sm text-[#332b24]">
                        {invitation.gifts.bankDetails.clabe}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(invitation.gifts.bankDetails.clabe, 'clabe')}
                      className="px-2.5 py-1.5 rounded bg-white border border-[#c5a059]/50 hover:bg-[#8c7853] hover:text-white text-[#8c7853] text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                    >
                      {copiedKey === 'clabe' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Alias if available */}
                  {invitation.gifts.bankDetails.alias && (
                    <div className="flex items-center justify-between pt-2 border-t border-[#e5ded3]">
                      <div>
                        <span className="text-[#8c7853] font-semibold block text-[10px] uppercase tracking-wider">
                          Concepto / Alias:
                        </span>
                        <span className="font-mono font-medium text-xs text-[#332b24]">
                          {invitation.gifts.bankDetails.alias}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(invitation.gifts.bankDetails.alias || '', 'alias')}
                        className="px-2 py-1 rounded bg-white border border-[#c5a059]/40 hover:bg-[#8c7853] hover:text-white text-[#8c7853] text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                      >
                        {copiedKey === 'alias' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'alias' ? 'Listo' : 'Copiar'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Envelope note */}
                <div className="p-3 rounded-lg bg-[#faf7f0] border border-[#e5ded3] text-xs text-[#736657] italic text-center">
                  💌 {invitation.gifts.envelopeNote}
                </div>
              </div>
            </div>
          )}

          {/* 5. TIMELINE */}
          {activeSection === 'timeline' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#c5a059]/30 bg-white shadow-xs">
                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#c5a059]/30">
                  {invitation.timeline.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 relative pl-1">
                      <div className="w-5 h-5 rounded-full bg-[#f6f2e9] border border-[#c5a059] flex items-center justify-center text-[#8c7853] z-10 shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#8c7853]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#8c7853] bg-[#faf7f0] px-1.5 py-0.5 rounded border border-[#e5ded3]">
                            {item.time}
                          </span>
                          <h5 className="font-cinzel text-xs font-bold text-[#332b24]">
                            {item.title}
                          </h5>
                        </div>
                        <p className="text-xs text-[#5a4f43] mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. HOTELS */}
          {activeSection === 'hotels' && (
            <div className="space-y-3">
              {invitation.accommodations.map((hotel) => (
                <div key={hotel.id} className="p-4 rounded-xl border border-[#c5a059]/30 bg-white shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-cinzel text-sm font-bold text-[#332b24]">
                        {hotel.name}
                      </h4>
                      <span className="text-[11px] text-[#8c7853] font-medium block">
                        {hotel.category} · {hotel.distance}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#e5ded3] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-[#5a4f43]">
                      Código de descuento: <strong className="text-[#8c7853]">{hotel.discountCode}</strong>
                    </span>
                    <a
                      href={`tel:${hotel.phone}`}
                      className="text-xs font-semibold text-[#8c7853] hover:underline"
                    >
                      {hotel.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#c5a059]/20 bg-[#faf7f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#8c7853] text-white text-xs font-semibold hover:bg-[#736657] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
