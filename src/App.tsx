import { useState, useEffect } from 'react';
import { InvitationData } from './types/invitation';
import { DEFAULT_INVITATION } from './data/defaultInvitation';
import { MinimalCardInvitation } from './components/MinimalCardInvitation';
import { InteractiveActionModal } from './components/InteractiveActionModal';
import { RsvpModal } from './components/RsvpModal';
import { EnvelopeModal } from './components/EnvelopeModal';
import { FloatingControls } from './components/FloatingControls';
import { CustomizerModal } from './components/CustomizerModal';
import { GitHubExportModal } from './components/GitHubExportModal';

const STORAGE_KEY = 'infocus_minimal_invitation_v2';

export default function App() {
  const [invitation, setInvitation] = useState<InvitationData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Could not read saved invitation', err);
    }
    return DEFAULT_INVITATION;
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'venues' | 'calendar' | 'dress' | 'gifts' | 'timeline' | 'hotels' | null>(null);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Sync document title
  useEffect(() => {
    document.title = `${invitation.person1} ${invitation.connector} ${invitation.person2} — ${invitation.subtitle}`;
  }, [invitation.person1, invitation.connector, invitation.person2, invitation.subtitle]);

  const handleSaveInvitation = (newData: InvitationData) => {
    setInvitation(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }
  };

  const handleOpenSection = (section: 'venues' | 'calendar' | 'dress' | 'gifts' | 'timeline' | 'hotels' | 'rsvp') => {
    if (section === 'rsvp') {
      setIsRsvpOpen(true);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4efe8] text-[#332b24] selection:bg-[#c5a059] selection:text-white flex flex-col justify-between relative py-6 sm:py-10 px-2 sm:px-4">
      {/* Interactive Envelope intro on initial load */}
      <EnvelopeModal
        invitation={invitation}
        isOpen={isEnvelopeOpen}
        onOpen={() => setIsEnvelopeOpen(true)}
      />

      {/* Floating Toolbar (Music, Customize, GitHub, Share) */}
      <FloatingControls
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
        onReopenEnvelope={() => setIsEnvelopeOpen(false)}
      />

      {/* Main Minimalist Canva-Style Invitation Card */}
      <main className="flex-1 flex items-center justify-center">
        <MinimalCardInvitation
          invitation={invitation}
          onOpenSection={handleOpenSection}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />
      </main>

      {/* Minimal Footer */}
      <footer className="text-center py-4 text-[11px] text-[#8c7853] font-montserrat">
        <span>Invitación Digital Interactiva</span>
        <span className="mx-2">·</span>
        <span>{invitation.formattedDateDisplay}</span>
      </footer>

      {/* Interactive Detail Modal (Venues, Calendar, Dress Code, Gifts, Timeline, Hotels) */}
      <InteractiveActionModal
        activeSection={activeSection}
        onClose={() => setActiveSection(null)}
        invitation={invitation}
      />

      {/* RSVP WhatsApp Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        invitation={invitation}
      />

      {/* Live Customizer */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        invitation={invitation}
        onSave={handleSaveInvitation}
      />

      {/* GitHub Pages Ready Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        invitation={invitation}
      />
    </div>
  );
}
