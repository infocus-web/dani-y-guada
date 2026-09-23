import { InvitationData } from '../types/invitation';
import heroImg from '../assets/images/minimal_wedding_hero_1790132740734.jpg';
import botanicalImg from '../assets/images/delicate_olive_branch_1790132752166.jpg';

export const DEFAULT_INVITATION: InvitationData = {
  title: 'Nuestra Boda',
  person1: 'Sofía',
  person2: 'Alejandro',
  connector: '&',
  subtitle: 'SAVE THE DATE',
  quote: 'El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.',
  quoteAuthor: 'Antoine de Saint-Exupéry',

  // Date specifics
  eventDate: '2026-11-14T16:30:00',
  dayOfWeek: 'SÁBADO',
  dayNumber: '14',
  monthYear: 'NOVIEMBRE 2026',
  formattedDateDisplay: 'Sábado, 14 de Noviembre de 2026',

  heroImage: heroImg,
  botanicalImage: botanicalImg,
  theme: 'minimal-ivory',

  ceremony: {
    title: 'Ceremonia Religiosa',
    time: '16:30 hrs',
    venueName: 'Parroquia San Juan Bautista',
    address: 'Av. Hidalgo 142, Centro Histórico',
    mapsUrl: 'https://maps.google.com/?q=Parroquia+San+Juan+Bautista',
    wazeUrl: 'https://waze.com/ul?q=Parroquia+San+Juan+Bautista',
    notes: 'Por favor llegar 15 minutos antes.',
  },

  reception: {
    title: 'Recepción & Fiesta',
    time: '18:30 hrs',
    venueName: 'Hacienda Los Laureles',
    address: 'Camino Real 3500, Jardines del Valle',
    mapsUrl: 'https://maps.google.com/?q=Hacienda+Los+Laureles',
    wazeUrl: 'https://waze.com/ul?q=Hacienda+Los+Laureles',
    notes: 'Habrá servicio de Valet Parking en la entrada.',
  },

  timeline: [
    {
      id: '1',
      time: '16:30',
      title: 'Ceremonia Religiosa',
      description: 'Lectura de votos y bendición matrimonial.',
      iconName: 'church',
    },
    {
      id: '2',
      time: '18:00',
      title: 'Cóctel de Bienvenida',
      description: 'Música en vivo y brindis inicial.',
      iconName: 'cheers',
    },
    {
      id: '3',
      time: '19:30',
      title: 'Cena de Gala',
      description: 'Menú degustación de 4 tiempos.',
      iconName: 'utensils',
    },
    {
      id: '4',
      time: '21:30',
      title: 'Vals & Primer Baile',
      description: 'Apertura oficial de la pista de baile.',
      iconName: 'heart',
    },
    {
      id: '5',
      time: '22:00',
      title: 'Fiesta & Celebración',
      description: 'DJ en vivo, barra libre y trasnochado.',
      iconName: 'sparkles',
    },
  ],

  dressCode: {
    title: 'Rigurosa Etiqueta',
    subtitle: 'Formal / Traje y Vestido Largo',
    description: 'Queremos que luzcas espectacular en nuestra gran noche. Caballeros: Traje formal o smoking. Damas: Vestido largo de noche.',
    colors: [
      { name: 'Negro', hex: '#1c1917' },
      { name: 'Azul Marino', hex: '#1e293b' },
      { name: 'Champagne', hex: '#c5a059' },
      { name: 'Verde Sabio', hex: '#6b7d6a' },
      { name: 'Vino Tinto', hex: '#581c2b' },
      { name: 'Blanco (Exclusivo)', hex: '#faf7f2', isProhibited: true },
    ],
    note: 'Agradecemos con cariño reservar los tonos blancos y marfil exclusivamente para la novia.',
  },

  gifts: {
    message: 'Tu presencia es nuestro mayor regalo. Si deseas hacernos un presente, ponemos a tu disposición los siguientes datos:',
    bankDetails: {
      bankName: 'BBVA Bancomer',
      accountHolder: 'Sofía & Alejandro Novios',
      clabe: '012 180 015482910482',
      accountNumber: '1548291048',
      alias: 'BODA.SOFIA.ALE',
    },
    envelopeNote: 'También contaremos con baúl para "Lluvia de Sobres" en la recepción.',
    storeRegistries: [
      {
        id: '1',
        storeName: 'Liverpool',
        eventNumber: 'Evento No. 51294829',
        url: 'https://www.liverpool.com.mx/tienda/mesaderegalos',
      },
      {
        id: '2',
        storeName: 'Amazon Bodas',
        eventNumber: 'Lista Sofía & Alejandro',
        url: 'https://www.amazon.com/wedding',
      },
    ],
  },

  rsvp: {
    deadlineDate: '25 de Octubre de 2026',
    whatsappNumber: '+525512345678',
    contactPersonName: 'Sofía & Alejandro',
    welcomeMessage: 'Agradecemos confirmar tu asistencia antes de la fecha límite para preparar tu lugar.',
  },

  accommodations: [
    {
      id: '1',
      name: 'Grand Fiesta Americana',
      category: 'Hotel 5 Estrellas',
      distance: 'A 8 min de la Hacienda',
      phone: '+52 (55) 5123-9900',
      discountCode: 'BODA-SOFIA-ALE',
      url: 'https://www.fiestamericana.com',
    },
    {
      id: '2',
      name: 'Hotel Boutique Casa Rosa',
      category: 'Hotel Boutique',
      distance: 'A 5 min de la Iglesia',
      phone: '+52 (55) 5890-4422',
      discountCode: 'EVENTO-NOV-26',
      url: 'https://www.booking.com',
    },
  ],
};
