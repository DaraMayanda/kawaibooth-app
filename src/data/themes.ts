export type PersonaType = 'baddie' | 'cute' | 'minimalist';

export interface PersonaConfig {
  id: PersonaType;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  bgGradient: string;
  fontFamily: string;
}

export const PERSONAS: Record<PersonaType, PersonaConfig> = {
  baddie: {
    id: 'baddie',
    name: 'Baddie',
    primaryColor: '#d946ef', // Fuchsia 500
    secondaryColor: '#18181b', // Zinc 900
    accentColor: '#ffffff',
    textColor: '#ffffff',
    bgGradient: 'from-zinc-900 to-black',
    fontFamily: 'Black Ops One, cursive'
  },
  cute: {
    id: 'cute',
    name: 'Cute',
    primaryColor: '#f472b6', // Pink 400
    secondaryColor: '#fdf2f8', // Pink 50
    accentColor: '#db2777', // Pink 600
    textColor: '#831843', // Pink 900
    bgGradient: 'from-pink-100 to-white',
    fontFamily: 'Quicksand, sans-serif'
  },
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    primaryColor: '#78716c', // Stone 600
    secondaryColor: '#f5f5f4', // Stone 100
    accentColor: '#1c1917', // Stone 900
    textColor: '#44403c', // Stone 700
    bgGradient: 'from-stone-50 to-white',
    fontFamily: 'Inter, sans-serif'
  }
};