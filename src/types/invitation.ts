export type EventTheme = 'minimal-ivory' | 'champagne-gold' | 'sage-green' | 'soft-rose';

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: 'church' | 'cheers' | 'utensils' | 'music' | 'camera' | 'sparkles' | 'heart';
}

export interface ColorSwatch {
  name: string;
  hex: string;
  isProhibited?: boolean;
}

export interface BankDetails {
  bankName: string;
  accountHolder: string;
  clabe: string;
  accountNumber?: string;
  alias?: string;
}

export interface StoreRegistry {
  id: string;
  storeName: string;
  eventNumber: string;
  url: string;
}

export interface AccommodationItem {
  id: string;
  name: string;
  category: string;
  distance: string;
  phone: string;
  discountCode: string;
  url: string;
}

export interface InvitationData {
  // Hosts / Couple
  title: string;
  person1: string;
  person2: string;
  connector: string;
  subtitle: string;
  quote: string;
  quoteAuthor?: string;

  // Date and Time
  eventDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
  dayOfWeek: string;
  dayNumber: string;
  monthYear: string;
  formattedDateDisplay: string;

  // Visuals
  heroImage: string;
  botanicalImage?: string;
  theme: EventTheme;

  // Venues
  ceremony: {
    title: string;
    time: string;
    venueName: string;
    address: string;
    mapsUrl: string;
    wazeUrl?: string;
    notes?: string;
  };
  reception: {
    title: string;
    time: string;
    venueName: string;
    address: string;
    mapsUrl: string;
    wazeUrl?: string;
    notes?: string;
  };

  // Timeline
  timeline: TimelineItem[];

  // Dress Code
  dressCode: {
    title: string;
    subtitle: string;
    description: string;
    colors: ColorSwatch[];
    note: string;
  };

  // Gifts
  gifts: {
    message: string;
    bankDetails: BankDetails;
    envelopeNote: string;
    storeRegistries: StoreRegistry[];
  };

  // RSVP
  rsvp: {
    deadlineDate: string;
    whatsappNumber: string;
    contactPersonName: string;
    welcomeMessage: string;
  };

  // Lodging
  accommodations: AccommodationItem[];
}
