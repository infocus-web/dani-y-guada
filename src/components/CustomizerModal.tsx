import React, { useState } from 'react';
import { X, Save, RotateCcw, Check, Heart, MapPin, Phone, Calendar, Gift } from 'lucide-react';
import { InvitationData } from '../types/invitation';
import { DEFAULT_INVITATION } from '../data/defaultInvitation';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation: InvitationData;
  onSave: (newData: InvitationData) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  invitation,
  onSave,
}) => {
  const [formData, setFormData] = useState<InvitationData>(invitation);
  const [activeTab, setActiveTab] = useState<'general' | 'lugares' | 'rsvp' | 'banco'>('general');
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restaurar los valores iniciales de la plantilla?')) {
      setFormData(DEFAULT_INVITATION);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-montserrat">
      <div 
        className="bg-[#fdfbf7] border border-[#e2d8cb] rounded-2xl w-full max-w-2xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden text-[#332b24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#c5a059]/20 flex items-center justify-between bg-[#faf7f0]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8c7853] font-semibold block">
              Editor de Invitación
            </span>
            <h3 className="font-cinzel text-lg text-[#332b24] font-bold">
              Personalizar Textos y Datos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#736657] hover:text-[#332b24] hover:bg-[#eae3d5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#c5a059]/20 bg-[#faf7f0] px-6 gap-2 overflow-x-auto text-xs">
          {[
            { id: 'general', label: 'Nombres & Fecha' },
            { id: 'lugares', label: 'Ubicaciones' },
            { id: 'rsvp', label: 'WhatsApp / RSVP' },
            { id: 'banco', label: 'Datos Bancarios' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#8c7853] text-[#8c7853]'
                  : 'border-transparent text-[#736657] hover:text-[#332b24]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {activeTab === 'general' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8c7853] mb-1">
                    Nombre 1 (Novia / Anfitriona)
                  </label>
                  <input
                    type="text"
                    value={formData.person1}
                    onChange={(e) => setFormData({ ...formData, person1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24] focus:outline-none focus:border-[#8c7853]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8c7853] mb-1">
                    Nombre 2 (Novio / Anfitrión)
                  </label>
                  <input
                    type="text"
                    value={formData.person2}
                    onChange={(e) => setFormData({ ...formData, person2: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24] focus:outline-none focus:border-[#8c7853]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                    Día de la Semana
                  </label>
                  <input
                    type="text"
                    value={formData.dayOfWeek}
                    onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                    Número de Día
                  </label>
                  <input
                    type="text"
                    value={formData.dayNumber}
                    onChange={(e) => setFormData({ ...formData, dayNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                    Mes y Año
                  </label>
                  <input
                    type="text"
                    value={formData.monthYear}
                    onChange={(e) => setFormData({ ...formData, monthYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                  Fecha y Hora ISO (para el contador y Google Calendar)
                </label>
                <input
                  type="datetime-local"
                  value={formData.eventDate.slice(0, 16)}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                  Frase o Pensamiento
                </label>
                <textarea
                  rows={2}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                />
              </div>
            </div>
          )}

          {activeTab === 'lugares' && (
            <div className="space-y-4">
              {/* Ceremony */}
              <div className="p-3.5 rounded-xl border border-[#c5a059]/30 bg-white space-y-2.5">
                <span className="font-semibold text-[#8c7853] text-[11px] uppercase tracking-wider block">
                  1. Ceremonia
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#736657] mb-0.5">Lugar</label>
                    <input
                      type="text"
                      value={formData.ceremony.venueName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ceremony: { ...formData.ceremony, venueName: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-[#fdfbf7] border border-[#e2d8cb]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#736657] mb-0.5">Hora</label>
                    <input
                      type="text"
                      value={formData.ceremony.time}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ceremony: { ...formData.ceremony, time: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-[#fdfbf7] border border-[#e2d8cb]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-[#736657] mb-0.5">Dirección</label>
                  <input
                    type="text"
                    value={formData.ceremony.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ceremony: { ...formData.ceremony, address: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded bg-[#fdfbf7] border border-[#e2d8cb]"
                  />
                </div>
              </div>

              {/* Reception */}
              <div className="p-3.5 rounded-xl border border-[#c5a059]/30 bg-white space-y-2.5">
                <span className="font-semibold text-[#8c7853] text-[11px] uppercase tracking-wider block">
                  2. Recepción
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#736657] mb-0.5">Lugar</label>
                    <input
                      type="text"
                      value={formData.reception.venueName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reception: { ...formData.reception, venueName: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-[#fdfbf7] border border-[#e2d8cb]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#736657] mb-0.5">Hora</label>
                    <input
                      type="text"
                      value={formData.reception.time}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reception: { ...formData.reception, time: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-[#fdfbf7] border border-[#e2d8cb]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-[#736657] mb-0.5">Dirección</label>
                  <input
                    type="text"
                    value={formData.reception.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reception: { ...formData.reception, address: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded bg-[#fdfbf7] border border-[#e2d8cb]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rsvp' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#8c7853] mb-1">
                  Número de WhatsApp para Confirmaciones
                </label>
                <input
                  type="text"
                  placeholder="+52 55 1234 5678"
                  value={formData.rsvp.whatsappNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rsvp: { ...formData.rsvp, whatsappNumber: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                />
                <span className="text-[10px] text-[#736657] mt-0.5 block">
                  Incluye el prefijo de país (ej. +52 para México).
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                  Fecha Límite de Confirmación
                </label>
                <input
                  type="text"
                  value={formData.rsvp.deadlineDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rsvp: { ...formData.rsvp, deadlineDate: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                />
              </div>
            </div>
          )}

          {activeTab === 'banco' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                  Banco
                </label>
                <input
                  type="text"
                  value={formData.gifts.bankDetails.bankName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gifts: {
                        ...formData.gifts,
                        bankDetails: { ...formData.gifts.bankDetails, bankName: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                  Beneficiario
                </label>
                <input
                  type="text"
                  value={formData.gifts.bankDetails.accountHolder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gifts: {
                        ...formData.gifts,
                        bankDetails: {
                          ...formData.gifts.bankDetails,
                          accountHolder: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8c7853] mb-1">
                  CLABE Interbancaria / IBAN / CBU
                </label>
                <input
                  type="text"
                  value={formData.gifts.bankDetails.clabe}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gifts: {
                        ...formData.gifts,
                        bankDetails: { ...formData.gifts.bankDetails, clabe: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#736657] mb-1">
                  Concepto o Alias
                </label>
                <input
                  type="text"
                  value={formData.gifts.bankDetails.alias || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gifts: {
                        ...formData.gifts,
                        bankDetails: { ...formData.gifts.bankDetails, alias: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c5a059]/35 text-[#332b24]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#c5a059]/20 bg-[#faf7f0] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-[#736657] hover:text-[#332b24] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs text-[#736657] hover:text-[#332b24] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#8c7853] text-white font-semibold text-xs hover:bg-[#736657] transition-all cursor-pointer shadow-xs"
            >
              {saveToast ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saveToast ? 'Guardado' : 'Guardar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
