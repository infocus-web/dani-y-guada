import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Send, CheckCircle2, AlertCircle, Users, UtensilsCrossed, Music2, MessageSquare } from 'lucide-react';
import { InvitationData } from '../types/invitation';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation: InvitationData;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, invitation }) => {
  const { rsvp } = invitation;

  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState(1);
  const [dietary, setDietary] = useState('Ninguna');
  const [songRequest, setSongRequest] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (attending === 'yes') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c5a059', '#e5ded3', '#8c7853', '#fdfbf7'],
        });
      } catch (err) {
        console.warn('Confetti error', err);
      }
    }

    setSubmitted(true);

    const formattedWhatsAppNumber = rsvp.whatsappNumber.replace(/[^0-9]/g, '');
    const attendanceText = attending === 'yes' ? '✅ ¡CONFIRMO MI ASISTENCIA!' : '❌ Lamentablemente no podré asistir.';
    const details = [
      `¡Hola ${rsvp.contactPersonName}!`,
      ``,
      `*Confirmación de Asistencia:*`,
      `👤 *Nombre:* ${fullName}`,
      `📌 *Respuesta:* ${attendanceText}`,
      attending === 'yes' ? `👥 *Pases requeridos:* ${guestsCount}` : null,
      attending === 'yes' && dietary !== 'Ninguna' ? `🥗 *Restricción alimentaria:* ${dietary}` : null,
      attending === 'yes' && songRequest ? `🎵 *Canción para la fiesta:* ${songRequest}` : null,
      guestMessage ? `💌 *Mensaje:* ${guestMessage}` : null,
      ``,
      `_Enviado desde la Invitación Digital_`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const whatsappUrl = `https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(details)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-[#fdfbf7] border border-[#e2d8cb] rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#332b24] font-montserrat"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#c5a059]/20 flex items-center justify-between bg-[#faf7f0]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8c7853] font-semibold block">
              Confirmar Asistencia
            </span>
            <h3 className="font-cinzel text-lg text-[#332b24] font-bold">
              {invitation.person1} & {invitation.person2}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#736657] hover:text-[#332b24] hover:bg-[#eae3d5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center text-emerald-700 mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-cinzel text-xl text-[#332b24] font-bold mb-1.5">
                ¡Gracias por tu respuesta, {fullName}!
              </h4>
              <p className="text-xs text-[#5a4f43] leading-relaxed max-w-xs mx-auto mb-6">
                Tu confirmación ha sido preparada y se está abriendo WhatsApp para notificar a los novios.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#8c7853] hover:underline cursor-pointer"
                >
                  Modificar datos
                </button>
                <span className="text-[#8c7853]">·</span>
                <button
                  onClick={onClose}
                  className="text-xs font-semibold text-[#332b24] hover:underline cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-xs text-[#5a4f43]">
                  {rsvp.welcomeMessage}
                </p>
                <span className="text-[11px] text-[#8c7853] font-semibold block mt-1">
                  Fecha límite: {rsvp.deadlineDate}
                </span>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#736657] font-semibold mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Carmen Salinas"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24] placeholder-neutral-400 text-xs focus:outline-none focus:border-[#8c7853]"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#736657] font-semibold mb-1">
                  ¿Podrás acompañarnos? *
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      attending === 'yes'
                        ? 'bg-[#8c7853] text-white border-[#8c7853] shadow-xs'
                        : 'bg-white text-[#5a4f43] border-[#e2d8cb] hover:border-[#8c7853]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sí, asistiré</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      attending === 'no'
                        ? 'bg-neutral-800 text-white border-neutral-800 shadow-xs'
                        : 'bg-white text-[#736657] border-[#e2d8cb] hover:border-neutral-400'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>No podré asistir</span>
                  </button>
                </div>
              </div>

              {attending === 'yes' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Number of passes */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#736657] font-semibold mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#8c7853]" />
                        <span>Número de Pases</span>
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24] text-xs focus:outline-none focus:border-[#8c7853]"
                      >
                        <option value={1}>1 Persona</option>
                        <option value={2}>2 Personas</option>
                        <option value={3}>3 Personas</option>
                        <option value={4}>4 Personas</option>
                      </select>
                    </div>

                    {/* Dietary */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#736657] font-semibold mb-1 flex items-center gap-1">
                        <UtensilsCrossed className="w-3 h-3 text-[#8c7853]" />
                        <span>Menú / Dieta</span>
                      </label>
                      <select
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24] text-xs focus:outline-none focus:border-[#8c7853]"
                      >
                        <option value="Ninguna">Menú Regular</option>
                        <option value="Vegetariano">Vegetariano</option>
                        <option value="Vegano">Vegano</option>
                        <option value="Sin Gluten">Sin Gluten / Celíaco</option>
                      </select>
                    </div>
                  </div>

                  {/* Song request */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#736657] font-semibold mb-1 flex items-center gap-1">
                      <Music2 className="w-3 h-3 text-[#8c7853]" />
                      <span>Canción sugerida para el DJ (opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={songRequest}
                      onChange={(e) => setSongRequest(e.target.value)}
                      placeholder="Canción y artista..."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24] placeholder-neutral-400 text-xs focus:outline-none focus:border-[#8c7853]"
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#736657] font-semibold mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-[#8c7853]" />
                  <span>Mensaje para los novios</span>
                </label>
                <textarea
                  rows={2}
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder="Escribe unas palabras de cariño..."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24] placeholder-neutral-400 text-xs focus:outline-none focus:border-[#8c7853]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8c7853] via-[#b39864] to-[#8c7853] text-white font-montserrat text-xs uppercase tracking-wider font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Confirmación por WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
