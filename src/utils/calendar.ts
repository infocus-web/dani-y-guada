import { InvitationData } from '../types/invitation';

export function generateGoogleCalendarUrl(invitation: InvitationData): string {
  try {
    const startDate = new Date(invitation.eventDate);
    // Assume 8 hours duration for wedding/event
    const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

    const formatGDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const title = encodeURIComponent(`${invitation.person1} ${invitation.connector} ${invitation.person2} - ${invitation.title}`);
    const details = encodeURIComponent(
      `¡Acompáñanos a celebrar!\n\n` +
      `Ceremonia: ${invitation.ceremony.title} (${invitation.ceremony.time}) en ${invitation.ceremony.venueName}, ${invitation.ceremony.address}\n` +
      `Recepción: ${invitation.reception.title} (${invitation.reception.time}) en ${invitation.reception.venueName}, ${invitation.reception.address}\n\n` +
      `Código de vestimenta: ${invitation.dressCode.title}`
    );
    const location = encodeURIComponent(`${invitation.ceremony.venueName}, ${invitation.ceremony.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGDate(startDate)}/${formatGDate(endDate)}&details=${details}&location=${location}`;
  } catch {
    return 'https://calendar.google.com';
  }
}

export function downloadIcsFile(invitation: InvitationData) {
  try {
    const startDate = new Date(invitation.eventDate);
    const endDate = new Date(startDate.getTime() + 8 * 60 * 60 * 1000);

    const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
    const formatIcsDate = (d: Date) => {
      return (
        d.getUTCFullYear() +
        pad(d.getUTCMonth() + 1) +
        pad(d.getUTCDate()) +
        'T' +
        pad(d.getUTCHours()) +
        pad(d.getUTCMinutes()) +
        pad(d.getUTCSeconds()) +
        'Z'
      );
    };

    const summary = `${invitation.person1} ${invitation.connector} ${invitation.person2} - ${invitation.title}`;
    const description = `Ceremonia: ${invitation.ceremony.venueName} (${invitation.ceremony.time})\\nRecepción: ${invitation.reception.venueName} (${invitation.reception.time})\\nCódigo de Vestimenta: ${invitation.dressCode.title}`;
    const location = `${invitation.ceremony.venueName}, ${invitation.ceremony.address}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invitacion Digital Interactiva//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:event-${Date.now()}@invitacion-boda`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(startDate)}`,
      `DTEND:${formatIcsDate(endDate)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evento-${invitation.person1.toLowerCase()}-${invitation.person2.toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error generating .ics file:', err);
  }
}
