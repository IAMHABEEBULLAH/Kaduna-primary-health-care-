import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  Stethoscope, 
  Baby, 
  Syringe, 
  Thermometer, 
  Microscope, 
  BookOpen, 
  MessageCircle,
  AlertCircle,
  Calendar,
  Search,
  ArrowRight,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { Language } from './types';
import { NAV_ITEMS, SERVICES, STAFF, BLOG_POSTS, TESTIMONIALS, CONTACT_INFO } from './constants';

const IconMap: Record<string, any> = {
  Stethoscope,
  Baby,
  Syringe,
  Thermometer,
  Microscope,
  BookOpen,
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
      const sections = ['home', 'services', 'staff', 'booking', 'blog', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ha' : 'en');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const t = (obj: { en: string; ha: string }) => obj[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar - Emergency & Language */}
      <div className="bg-blue-600 text-white py-2 px-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-4">
            <a href={`tel:${CONTACT_INFO.emergency}`} className="flex items-center gap-1.5 hover:text-blue-100 transition-colors">
              <AlertCircle size={16} className="animate-pulse text-red-300" />
              <span className="hidden sm:inline">{lang === 'en' ? 'Emergency:' : 'Gaggawa:'}</span>
              {CONTACT_INFO.emergency}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all border border-white/20"
            >
              <Globe size={14} />
              <span>{lang === 'en' ? 'Hausa' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-[40px] z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Stethoscope size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-blue-900">Kaduna PHC</h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{lang === 'en' ? 'Health Centre' : 'Asibiti'}</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-semibold transition-colors hover:text-blue-600 ${activeSection === item.id ? 'text-blue-600' : 'text-slate-600'}`}
              >
                {t(item.label)}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('booking')}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              {lang === 'en' ? 'Book Now' : 'Rijista'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left py-3 px-4 rounded-xl font-semibold transition-colors ${activeSection === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
                  >
                    {t(item.label)}
                  </button>
                ))}
                <button 
                  onClick={() => scrollTo('booking')}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200"
                >
                  {lang === 'en' ? 'Book Appointment' : 'Rijista'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-10 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50" />
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <CheckCircle2 size={14} />
                {lang === 'en' ? 'Accredited Health Facility' : 'Ingantaccen Asibiti'}
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                {lang === 'en' ? 'Accessible and Quality Healthcare for Kaduna Communities' : 'Ingantaccen Kula da Lafiya ga Al\'ummar Kaduna'}
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                {lang === 'en' 
                  ? 'We provide professional medical services tailored to the needs of families in Kaduna. Your health is our priority.' 
                  : 'Muna ba da sabis na likita na ƙwararru waɗanda aka tsara don buƙatun iyalai a Kaduna. Lafiyar ku ita ce fifikonmu.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollTo('booking')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  {lang === 'en' ? 'Book Appointment' : 'Rijista'}
                </button>
                <button 
                  onClick={() => scrollTo('services')}
                  className="bg-white text-slate-700 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Search size={20} />
                  {lang === 'en' ? 'Find a Doctor' : 'Nemi Likita'}
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/person${i}/100/100`} 
                      alt="Patient" 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">5,000+</p>
                  <p className="text-slate-500">{lang === 'en' ? 'Happy Patients' : 'Marasa Lafiya Masu Farin Ciki'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-blue-600/5 absolute -inset-4 rounded-[2rem] -rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Healthcare Facility" 
                className="rounded-[2rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-slate-50 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Opening Hours' : 'Lokacin Aiki'}</p>
                    <p className="text-sm font-bold text-slate-800">{lang === 'en' ? '8:00 AM - 6:00 PM' : '8:00 Safe - 6:00 Yamma'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Info Bar */}
        <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-30">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 grid md:grid-cols-3 gap-8 border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">{lang === 'en' ? 'Call Us' : 'Kira Mu'}</h4>
                <p className="text-sm text-slate-500 mb-2">{lang === 'en' ? 'For general inquiries' : 'Don tambayoyi'}</p>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-blue-600 font-bold hover:underline">{CONTACT_INFO.phone}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-50 p-4 rounded-2xl text-green-600">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">{lang === 'en' ? 'Location' : 'Wuri'}</h4>
                <p className="text-sm text-slate-500 mb-2">{lang === 'en' ? 'Visit our centre' : 'Ziyarci asibitinmu'}</p>
                <p className="text-sm font-bold text-slate-800 leading-tight">Independence Way, Kaduna North</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-4 rounded-2xl text-orange-600">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">{lang === 'en' ? 'WhatsApp' : 'WhatsApp'}</h4>
                <p className="text-sm text-slate-500 mb-2">{lang === 'en' ? 'Quick chat booking' : 'Rijista ta WhatsApp'}</p>
                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-600 font-bold hover:underline"
                >
                  {lang === 'en' ? 'Chat with us' : 'Yi magana da mu'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">{lang === 'en' ? 'Our Services' : 'Ayyukanmu'}</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                {lang === 'en' ? 'Comprehensive Healthcare for Your Family' : 'Cikakken Kula da Lafiya ga Iyalinka'}
              </h3>
              <p className="text-slate-500 text-lg">
                {lang === 'en' 
                  ? 'We offer a wide range of medical services to ensure the well-being of the Kaduna community.' 
                  : 'Muna ba da ayyukan likita da yawa don tabbatar da jin daɗin al\'ummar Kaduna.'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, idx) => {
                const Icon = IconMap[service.icon];
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500"
                  >
                    <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                      <Icon size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">{t(service.title)}</h4>
                    <p className="text-slate-500 leading-relaxed mb-6">{t(service.description)}</p>
                    <button className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all">
                      {lang === 'en' ? 'Learn More' : 'Ƙarin Bayani'}
                      <ArrowRight size={16} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Maternal Care Focus (Special Section) */}
        <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <h2 className="text-blue-200 font-bold text-sm uppercase tracking-[0.2em] mb-4">
                {lang === 'en' ? 'Specialized Care' : 'Kula ta Musamman'}
              </h2>
              <h3 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
                {lang === 'en' ? 'Safe Motherhood is Our Priority' : 'Haihuwa Lafiya Ita Ce Fifikonmu'}
              </h3>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                {lang === 'en' 
                  ? 'We provide dedicated antenatal and postnatal care to ensure every mother in Kaduna has a safe pregnancy and a healthy baby.' 
                  : 'Muna ba da kulawa ta musamman kafin da bayan haihuwa don tabbatar da cewa kowace uwa a Kaduna ta sami juna biyu lafiya da jariri mai lafiya.'}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { en: 'Free Antenatal Checkups', ha: 'Gwajin Juna Biyu Kyauta' },
                  { en: 'Safe Delivery Environment', ha: 'Wurin Haihuwa Mai Kyau' },
                  { en: 'Newborn Immunization', ha: 'Rigakafin Jarirai' },
                  { en: 'Nutrition Support', ha: 'Tallafin Abinci' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-semibold">
                    <div className="bg-white/20 p-1 rounded-full">
                      <CheckCircle2 size={18} className="text-blue-200" />
                    </div>
                    {t(item)}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => scrollTo('booking')}
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-50 transition-all"
              >
                {lang === 'en' ? 'Register for Antenatal' : 'Yi Rijista don Juna Biyu'}
              </button>
            </div>
            <div className="relative">
              <div className="bg-white/10 absolute inset-0 rounded-[3rem] rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800&h=800" 
                alt="Mother and Child" 
                className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover aspect-square"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Staff Section */}
        <section id="staff" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">{lang === 'en' ? 'Our Team' : 'Ma\'aikatanmu'}</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                {lang === 'en' ? 'Meet Our Dedicated Professionals' : 'Haɗu da Ƙwararrun Ma\'aikatanmu'}
              </h3>
              <p className="text-slate-500 text-lg">
                {lang === 'en' 
                  ? 'Our team of experienced doctors and nurses are here to serve you with compassion.' 
                  : 'Ƙungiyarmu ta ƙwararrun likitoci da ma\'aikatan jinya suna nan don yi muku hidima da tausayi.'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {STAFF.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-4 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 group"
                >
                  <div className="relative overflow-hidden rounded-[2rem] mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="px-4 pb-6 text-center">
                    <h4 className="text-xl font-extrabold text-slate-900 mb-1">{member.name}</h4>
                    <p className="text-blue-600 font-bold text-sm mb-3">{t(member.role)}</p>
                    <div className="inline-block bg-slate-100 px-4 py-1 rounded-full text-xs font-bold text-slate-500">
                      {member.qualification}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Appointment Booking */}
        <section id="booking" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-500 rounded-full blur-[100px]" />
              </div>
              
              <div className="grid lg:grid-cols-2">
                <div className="p-10 md:p-20 text-white">
                  <h2 className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-4">
                    {lang === 'en' ? 'Appointments' : 'Rijista'}
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
                    {lang === 'en' ? 'Book Your Visit Today' : 'Yi Rijista don Ziyara'}
                  </h3>
                  <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                    {lang === 'en' 
                      ? 'Fill out the form or use WhatsApp for a faster response. We will confirm your appointment within 24 hours.' 
                      : 'Cika fom ɗin ko amfani da WhatsApp don samun amsa cikin sauri. Za mu tabbatar da rijistar ku cikin sa\'o\'i 24.'}
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-4 rounded-2xl text-blue-400">
                        <MessageCircle size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{lang === 'en' ? 'Fast Track' : 'Sauri'}</p>
                        <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="text-xl font-bold hover:text-blue-400 transition-colors">WhatsApp Booking</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-4 rounded-2xl text-green-400">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{lang === 'en' ? 'Call Centre' : 'Kira'}</p>
                        <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl font-bold hover:text-green-400 transition-colors">{CONTACT_INFO.phone}</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 md:p-20">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">{lang === 'en' ? 'Full Name' : 'Cikakken Suna'}</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Musa Bello"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">{lang === 'en' ? 'Phone Number' : 'Lambar Waya'}</label>
                        <input 
                          type="tel" 
                          placeholder="080..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">{lang === 'en' ? 'Preferred Date' : 'Ranar da kake so'}</label>
                        <input 
                          type="date" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">{lang === 'en' ? 'Service' : 'Aiki'}</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                          <option>{lang === 'en' ? 'General Consultation' : 'Ganin Likita'}</option>
                          <option>{lang === 'en' ? 'Maternal Care' : 'Kula da Juna Biyu'}</option>
                          <option>{lang === 'en' ? 'Immunization' : 'Rigakafi'}</option>
                          <option>{lang === 'en' ? 'Lab Test' : 'Gwajin Lab'}</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">{lang === 'en' ? 'Message (Optional)' : 'Saƙo (Idan akwai)'}</label>
                      <textarea 
                        rows={3}
                        placeholder={lang === 'en' ? 'How can we help you?' : 'Yaya za mu iya taimaka muku?'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                      {lang === 'en' ? 'Submit Appointment' : 'Aika Rijista'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">{lang === 'en' ? 'Testimonials' : 'Shaidun Mutane'}</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">{lang === 'en' ? 'What Our Community Says' : 'Abin da Al\'ummar mu Ke Faɗa'}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {TESTIMONIALS.map((t_item, idx) => (
                <motion.div
                  key={t_item.id}
                  initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-10 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 relative"
                >
                  <div className="text-blue-100 absolute top-8 right-10">
                    <MessageCircle size={64} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-xl text-slate-700 italic mb-8 leading-relaxed">"{t(t_item.text)}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {t_item.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900">{t_item.name}</h5>
                        <p className="text-sm text-slate-500">{t_item.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog / Health Education */}
        <section id="blog" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">{lang === 'en' ? 'Health Tips' : 'Shawara'}</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  {lang === 'en' ? 'Stay Informed, Stay Healthy' : 'Kasance da Ilimi, Kasance da Lafiya'}
                </h3>
              </div>
              <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                {lang === 'en' ? 'View All Articles' : 'Duba Dukkan Labarai'}
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[16/10]">
                    <img 
                      src={`https://picsum.photos/seed/health${post.id}/800/500`} 
                      alt={t(post.title)} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-blue-600">
                      {post.category}
                    </div>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{t(post.title)}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{t(post.excerpt)}</p>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <Clock size={14} />
                    {post.date}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">{lang === 'en' ? 'Contact Us' : 'Tuntuɓa'}</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
                  {lang === 'en' ? 'We are Here to Help You' : 'Muna Nan don Taimaka Muku'}
                </h3>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-5">
                    <div className="bg-white p-4 rounded-2xl shadow-sm text-blue-600">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-1">{lang === 'en' ? 'Address' : 'Adireshin'}</h5>
                      <p className="text-slate-500 leading-relaxed">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="bg-white p-4 rounded-2xl shadow-sm text-green-600">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-1">{lang === 'en' ? 'Phone' : 'Waya'}</h5>
                      <p className="text-slate-500">{CONTACT_INFO.phone}</p>
                      <p className="text-red-500 font-bold">{lang === 'en' ? 'Emergency:' : 'Gaggawa:'} {CONTACT_INFO.emergency}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="bg-white p-4 rounded-2xl shadow-sm text-orange-600">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-1">{lang === 'en' ? 'Email' : 'Imel'}</h5>
                      <p className="text-slate-500">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
                  <div className="flex items-center gap-4 mb-4">
                    <Clock className="text-blue-600" />
                    <h5 className="font-bold text-blue-900">{lang === 'en' ? 'Clinic Hours' : 'Lokacin Aiki'}</h5>
                  </div>
                  <p className="text-blue-800 font-medium leading-relaxed">{t(CONTACT_INFO.hours)}</p>
                </div>
              </div>

              <div className="relative h-[500px] lg:h-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                {/* Mock Map with Image */}
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000&h=1000" 
                  alt="Map Location" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blue-900/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-blue-600/30 rounded-full animate-ping" />
                    <div className="bg-blue-600 text-white p-4 rounded-full shadow-2xl relative z-10">
                      <MapPin size={32} />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 right-10">
                  <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                    <ChevronRight className="rotate-90" />
                    {lang === 'en' ? 'Get Directions' : 'Nemi Kwatance'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-blue-600 p-2 rounded-xl text-white">
                  <Stethoscope size={24} />
                </div>
                <h1 className="font-bold text-xl tracking-tight">Kaduna PHC</h1>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">
                {lang === 'en' 
                  ? 'Providing accessible, quality healthcare services to the people of Kaduna State. Your health, our priority.' 
                  : 'Samar da ingantaccen kula da lafiya ga mutanen jihar Kaduna. Lafiyar ku ita ce fifikonmu.'}
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram'].map(social => (
                  <div key={social} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                    <div className="w-5 h-5 bg-slate-400 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-bold text-lg mb-8">{lang === 'en' ? 'Quick Links' : 'Hanyoyi'}</h5>
              <ul className="space-y-4 text-slate-400">
                {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <button onClick={() => scrollTo(item.id)} className="hover:text-blue-400 transition-colors">{t(item.label)}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-lg mb-8">{lang === 'en' ? 'Our Services' : 'Ayyukanmu'}</h5>
              <ul className="space-y-4 text-slate-400">
                {SERVICES.slice(0, 4).map(service => (
                  <li key={service.id}>
                    <button onClick={() => scrollTo('services')} className="hover:text-blue-400 transition-colors">{t(service.title)}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-lg mb-8">{lang === 'en' ? 'Newsletter' : 'Wasika'}</h5>
              <p className="text-slate-400 text-sm mb-6">{lang === 'en' ? 'Get health tips and updates in your inbox.' : 'Sami shawarwarin lafiya a cikin imel ɗin ku.'}</p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder={lang === 'en' ? 'Your email' : 'Imel ɗinka'}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-blue-600 px-4 rounded-xl hover:bg-blue-700 transition-all">
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-medium">
            <p>© 2024 Kaduna Primary Health Care Centre. {lang === 'en' ? 'All rights reserved.' : 'An kiyaye dukkan haƙƙoƙi.'}</p>
            <div className="flex gap-8">
              <button className="hover:text-white transition-colors">{lang === 'en' ? 'Privacy Policy' : 'Tsarin Sirri'}</button>
              <button className="hover:text-white transition-colors">{lang === 'en' ? 'Terms of Service' : 'Sharuddan Amfani'}</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-200 hover:scale-110 hover:-rotate-12 transition-all active:scale-95 group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          {lang === 'en' ? 'Chat with us' : 'Yi magana da mu'}
        </span>
      </a>
    </div>
  );
}
