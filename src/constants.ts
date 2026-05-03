import { NavItem, Service, Staff, BlogPost, Testimonial } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: { en: 'Home', ha: 'Gida' } },
  { id: 'services', label: { en: 'Services', ha: 'Ayyuka' } },
  { id: 'staff', label: { en: 'Our Staff', ha: 'Ma\'aikatanmu' } },
  { id: 'booking', label: { en: 'Book Appointment', ha: 'Rijista' } },
  { id: 'blog', label: { en: 'Health Tips', ha: 'Shawara' } },
  { id: 'contact', label: { en: 'Contact', ha: 'Tuntuɓa' } },
];

export const SERVICES: Service[] = [
  {
    id: 'consultation',
    title: { en: 'General Consultation', ha: 'Ganin Likita' },
    description: { en: 'Professional medical advice and treatment for common ailments.', ha: 'Shawarar likita da magani ga cututtuka na yau da kullun.' },
    icon: 'Stethoscope',
  },
  {
    id: 'maternal',
    title: { en: 'Maternal & Child Health', ha: 'Lafiyar Uwa da Yara' },
    description: { en: 'Antenatal care, safe delivery, and postnatal support for mothers.', ha: 'Kula da juna biyu, haihuwa lafiya, da tallafin uwa bayan haihuwa.' },
    icon: 'Baby',
  },
  {
    id: 'immunization',
    title: { en: 'Immunization Services', ha: 'Ayyukan Rigakafi' },
    description: { en: 'Vaccinations for children to prevent polio, measles, and more.', ha: 'Rigakafi ga yara don hana shan-inna, kyanda, da sauran su.' },
    icon: 'Syringe',
  },
  {
    id: 'malaria',
    title: { en: 'Malaria Treatment', ha: 'Magungunan Zazzaɓi' },
    description: { en: 'Testing and effective treatment for malaria and typhoid.', ha: 'Gwajin zazzaɓi da ba da magani mai inganci.' },
    icon: 'Thermometer',
  },
  {
    id: 'lab',
    title: { en: 'Laboratory Services', ha: 'Gwajin Laboratory' },
    description: { en: 'Basic blood tests, malaria tests, and diagnostic services.', ha: 'Gwajin jini, gwajin zazzaɓi, da sauran ayyukan bincike.' },
    icon: 'Microscope',
  },
  {
    id: 'education',
    title: { en: 'Health Education', ha: 'Ilimin Lafiya' },
    description: { en: 'Community workshops on hygiene, nutrition, and disease prevention.', ha: 'Bita ga al\'umma kan tsafta, abinci mai gina jiki, da rigakafin cututtuka.' },
    icon: 'BookOpen',
  },
];

export const STAFF: Staff[] = [
  {
    id: '1',
    name: 'Dr. Amina Yusuf',
    role: { en: 'Chief Medical Officer', ha: 'Babban Jami\'in Lafiya' },
    qualification: 'MBBS, MPH',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f153678e?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: '2',
    name: 'Nurse Ibrahim Bello',
    role: { en: 'Head Nurse', ha: 'Shugaban Ma\'aikatan Jinya' },
    qualification: 'RN, RM',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: '3',
    name: 'Dr. Sarah Okafor',
    role: { en: 'Pediatrician', ha: 'Likitan Yara' },
    qualification: 'MBBS, FWACP',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: { en: 'How to Prevent Malaria in Kaduna', ha: 'Yadda Ake Hana Zazzaɓi a Kaduna' },
    excerpt: { en: 'Simple steps to protect your family from mosquito bites and malaria.', ha: 'Matakai masu sauƙi don kare iyalinka daga cizon sauro da zazzaɓi.' },
    date: 'March 25, 2024',
    category: 'Prevention',
  },
  {
    id: '2',
    title: { en: 'Importance of Child Immunization', ha: 'Muhimmancin Rigakafin Yara' },
    excerpt: { en: 'Why every child in Kaduna needs to complete their vaccination schedule.', ha: 'Dalilin da ya sa kowane yaro a Kaduna yake buƙatar kammala rigakafinsa.' },
    date: 'March 18, 2024',
    category: 'Maternal Health',
  },
  {
    id: '3',
    title: { en: 'When to Visit a Health Centre', ha: 'Yaushe Ya Kamata Ka Ziyarci Asibiti' },
    excerpt: { en: 'Recognizing signs that you or your loved ones need medical attention.', ha: 'Gane alamun da ke nuna cewa kai ko masoyinka kuna buƙatar kulawar likita.' },
    date: 'March 10, 2024',
    category: 'General',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Musa Abdullahi',
    text: { en: 'The doctors here are very friendly and the treatment is affordable.', ha: 'Likitocin nan suna da fara\'a kuma maganin yana da sauƙi.' },
    location: 'Kawo, Kaduna',
  },
  {
    id: '2',
    name: 'Fatima Zarah',
    text: { en: 'I received excellent care during my pregnancy. My baby is healthy!', ha: 'Na sami kyakkyawar kulawa lokacin da nake da juna biyu. Jaririna yana da lafiya!' },
    location: 'Tudun Wada, Kaduna',
  },
];

export const CONTACT_INFO = {
  phone: '+234 800 123 4567',
  emergency: '+234 800 999 0000',
  email: 'info@kadunaphc.gov.ng',
  address: 'No. 42 Independence Way, Kaduna North, Kaduna State, Nigeria',
  whatsapp: '2348001234567',
  hours: {
    en: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM | Sun: Emergency Only',
    ha: 'Lit - Jum: 8:00 Safe - 6:00 Yamma | Asab: 9:00 Safe - 2:00 Rana | Lah: Gaggawa Kawai'
  }
};
