import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  Utensils,
  ShoppingBag,
  Truck,
  Tv,
  Beer,
  Wine,
  Martini,
  Flame,
  UtensilsCrossed,
  Users,
  Bath,
  Nfc,
  CreditCard,
  Baby,
  UsersRound,
  CalendarCheck,
  Star,
  MapPin,
  Clock,
  BookOpen
} from 'lucide-react';

const IMAGES = {
  hero: "/images/food4.png",
  food1: "/images/food1.png",
  food2: "/images/food2.png",
  food3: "/images/food3.png",
  food4: "/images/food4.png",
  drinks1: "/images/drinks1.png",
  drinks2: "/images/drinks2.png",
  drinks3: "/images/drinks3.png"
};

const MENU_CATEGORIES = [
  "Bocadillos",
  "Hamburguesas",
  "Croissants",
  "Arepas",
  "Cachapas",
  "Bebidas"
];

const MENU_ITEMS = {
  "Bocadillos": [
    { name: "Bocadillo Obrero", price: "1€", desc: "El clásico relleno para empezar el día con fuerza", featured: true },
    { name: "Bocadillo Mixto", price: "2.50€", desc: "Jamón cocido y queso fundido en pan crujiente" },
    { name: "Bocadillo Especial", price: "3.50€", desc: "Con todo lo bueno de la casa" }
  ],
  "Hamburguesas": [
    { name: "Hamburguesa Clásica", price: "4€", desc: "Carne de vacuno, lechuga, tomate y nuestra salsa" },
    { name: "Hamburguesa Doble", price: "6€", desc: "Doble ración de carne y queso fundido" },
    { name: "Hamburguesa Especial", price: "7€", desc: "Coronada con huevo frito y bacon crujiente" }
  ],
  "Croissants": [
    { name: "Croissant Jamón y Queso", price: "2.50€", desc: "Caliente y fundido" },
    { name: "Croissant Mixto", price: "3€", desc: "Acompañado con mantequilla" }
  ],
  "Arepas": [
    { name: "Arepa de Pollo", price: "4€", desc: "Pollo mechado jugoso" },
    { name: "Arepa de Carne", price: "4.50€", desc: "Carne mechada al estilo tradicional" },
    { name: "Arepa Mixta", price: "5€", desc: "La combinación perfecta" }
  ],
  "Cachapas": [
    { name: "Cachapa de Queso", price: "4€", desc: "Maíz dulce con abundante queso telita" },
    { name: "Cachapa de Pernil", price: "5€", desc: "Con pernil asado y jugoso" }
  ],
  "Bebidas": [
    { name: "Café solo", price: "1€", desc: "Expreso intenso" },
    { name: "Café con leche", price: "1.20€", desc: "Suave y espumoso" },
    { name: "Zumo naranja", price: "2€", desc: "Recién exprimido" },
    { name: "Cerveza", price: "2€", desc: "Caña bien fría" },
    { name: "Vino", price: "2€", desc: "Copa de la casa" },
    { name: "Refresco", price: "1.50€", desc: "Variedad de sabores" }
  ]
};

const REVIEWS = [
  { name: "Kanelo Ojeda Ojeda", badge: "Local Guide · 532 reseñas", stars: 5, text: "Cada que subo del sur al norte este es mi lugar para comer. Maravilloso, la verdad, los menús están muy ricos. Hoy tocó una sopa de calabaza con un choco a la plancha con papas guisadas y mojo verde de infarto." },
  { name: "Gustavo Castillo", badge: "Local Guide · 545 reseñas", stars: 5, text: "Muy buen lugar para tomarse algo con amigos, desayunar, comerse algo. Siempre voy por la tarde-noche, los chicos que atienden son una pasada." },
  { name: "César Sanz Dorta", badge: "12 reseñas", stars: 5, text: "Desde que conocí esta cafetería, sin duda es mi rinconcito de paz. Bocadillos buenísimos, el mejor café de la zona y un equipo — Rayco, Daniela y Guille — cuyo trato cercano marca la diferencia. Que no cambien nunca ni el café ni el equipo." },
  { name: "Mery Perez", badge: "3 reseñas", stars: 5, text: "Desayuno de vez en cuando allí, el chico que está por la mañana hace unos bocadillos riquísimos (la tortilla de patatas espectacular) y atiende súper rápido. Ideal para cuando tienes que entrar al trabajo a contrarreloj." },
  { name: "Luis Andrés Melián Díaz", badge: "Local Guide · 153 reseñas", stars: 5, text: "Buen trato por parte del personal del lugar. He ido solo una vez pero repetiré. Comida: 5 estrellas." },
  { name: "Maria Lourdes Ríos", badge: "5 reseñas", stars: 5, text: "Buen precio, los camareros amables, buen servicio. Me pedí un bocadillo de tortilla española, por cierto riquísimo... son caseros, lo hacen en el mismo establecimiento." },
  { name: "Lourdes S.C.", badge: "Local Guide · 208 reseñas", stars: 5, text: "Recomendado por Google, las reseñas indicaban que merecía la pena ir y así fue. La comida muy buena, los precios asequibles, el personal muy atento y salimos satisfechos." }
];

export function Website() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0]);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [cartaOpen, setCartaOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Inicio", id: "hero" },
    { name: "Sobre Nosotros", id: "about" },
    { name: "Servicios", id: "services" },
    { name: "Carta", id: "menu" },
    { name: "Galería", id: "gallery" },
    { name: "Reservas", id: "reservations" },
    { name: "Contacto", id: "contact" }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2A26] font-sans selection:bg-[#708238] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E4D9] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollTo('hero')}>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#708238]">Los Espejitos</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-[#5C5A56] hover:text-[#708238] transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => setCartaOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-[#708238] text-white text-sm font-medium rounded-full hover:bg-[#5C6B2E] transition-colors"
              >
                <BookOpen className="mr-1.5 h-4 w-4" />
                Ver Carta
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#5C5A56] hover:text-[#708238] focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-b border-[#E8E4D9] absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-[#5C5A56] hover:text-[#708238] hover:bg-[#F4F1EA] rounded-md transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => { setCartaOpen(true); setIsMenuOpen(false); }}
                className="flex items-center w-full px-3 py-3 text-base font-medium text-white bg-[#708238] rounded-md"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Ver Carta Completa
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center pt-20">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${IMAGES.hero}')` }}
        >
          <div className="absolute inset-0 bg-[#2C2A26]/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Tu lugar para desconectar y disfrutar
          </h1>
          <p className="text-xl md:text-2xl text-[#E8E4D9] mb-10 font-light max-w-2xl mx-auto">
            Comida casera, bebidas frías y el mejor ambiente en el corazón de La Laguna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:922821200"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#708238] text-white text-lg font-medium rounded-full hover:bg-[#5C6B2E] transition-all transform hover:scale-105 shadow-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Llamar para reservar
            </a>
            <button
              onClick={() => scrollTo('menu')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 text-lg font-medium rounded-full hover:bg-white/20 transition-all"
            >
              Ver carta
            </button>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section id="about" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-100">
              <h2 className="text-4xl font-serif font-bold text-[#2C2A26] mb-6">Un rincón con alma</h2>
              <div className="w-20 h-1 bg-[#708238] mb-8"></div>
              <p className="text-lg text-[#5C5A56] leading-relaxed mb-6">
                En Los Espejitos creemos en lo auténtico. Somos ese bar de barrio donde te llamamos por tu nombre,
                el café siempre está en su punto y la comida te reconforta el alma. Un espacio informal, moderno pero
                con esencia tradicional.
              </p>
              <p className="text-lg text-[#5C5A56] leading-relaxed mb-10">
                Ya sea para tu desayuno de campeones antes de trabajar, un almuerzo rápido o para
                ver el partido con los amigos por la tarde. Aquí siempre eres bienvenido.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F4F1EA] rounded-full flex items-center justify-center text-[#708238]">
                    <Utensils className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-[#2C2A26]">Comer allí</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F4F1EA] rounded-full flex items-center justify-center text-[#708238]">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-[#2C2A26]">Para llevar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F4F1EA] rounded-full flex items-center justify-center text-[#708238]">
                    <Truck className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-[#2C2A26]">A domicilio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F4F1EA] rounded-full flex items-center justify-center text-[#708238]">
                    <Tv className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-[#2C2A26]">Deportes en TV</span>
                </div>
              </div>
            </div>

            <div className="relative animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                <img src={IMAGES.drinks3} alt="Buen ambiente en Los Espejitos" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#F4F1EA] rounded-full -z-10"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#708238]/10 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="services" className="py-24 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl font-serif font-bold text-[#2C2A26] mb-4">Todo lo que necesitas</h2>
            <div className="w-20 h-1 bg-[#708238] mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200">
            {[
              { icon: Beer, label: "Cerveza" },
              { icon: Wine, label: "Vino" },
              { icon: Martini, label: "Cócteles" },
              { icon: Flame, label: "Licores" },
              { icon: UtensilsCrossed, label: "Comida" },
              { icon: Users, label: "Servicio en mesa" },
              { icon: Bath, label: "Aseos" },
              { icon: Nfc, label: "Pago NFC" },
              { icon: CreditCard, label: "Tarjetas" },
              { icon: Baby, label: "Apto niños" },
              { icon: UsersRound, label: "Grupos" },
              { icon: CalendarCheck, label: "Reservas" }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-[#E8E4D9] flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow group">
                <service.icon className="h-10 w-10 text-[#708238] mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-[#2C2A26]">{service.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carta */}
      <section id="menu" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl font-serif font-bold text-[#2C2A26] mb-4">Nuestra Carta</h2>
            <div className="w-20 h-1 bg-[#708238] mx-auto mb-8"></div>
            <p className="text-[#5C5A56] text-lg">Sabor auténtico, precios justos.</p>
          </div>

          {/* Featured Item */}
          <div className="mb-12 bg-[#708238] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-100">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div>
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
                  La Estrella de la Casa
                </div>
                <h3 className="text-3xl font-serif font-bold mb-2">Bocadillo Obrero</h3>
                <p className="text-white/80 max-w-md">El clásico que te da la energía que necesitas para afrontar el día. Relleno abundante, pan crujiente y un precio inmejorable.</p>
              </div>
              <div className="mt-6 md:mt-0 text-center">
                <div className="text-5xl font-bold font-serif mb-1">1€</div>
                <span className="text-sm text-white/70 uppercase tracking-widest">Insuperable</span>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
              <UtensilsCrossed className="w-64 h-64" />
            </div>
          </div>

          {/* Menu Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat
                    ? 'bg-[#2C2A26] text-white shadow-md'
                    : 'bg-[#F4F1EA] text-[#5C5A56] hover:bg-[#E8E4D9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300">
            {MENU_ITEMS[activeTab as keyof typeof MENU_ITEMS].map((item, idx) => (
              <div key={idx} className="border-b border-[#E8E4D9] pb-4 group">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-xl font-bold text-[#2C2A26] group-hover:text-[#708238] transition-colors flex items-center">
                    {item.name}
                    {item.featured && <Star className="h-4 w-4 ml-2 text-[#708238] fill-[#708238]" />}
                  </h4>
                  <span className="text-lg font-bold text-[#708238] ml-4 bg-[#F4F1EA] px-3 py-1 rounded-md">{item.price}</span>
                </div>
                <p className="text-[#5C5A56]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-400">
            <button
              onClick={() => setCartaOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-[#708238] text-white font-bold rounded-full hover:bg-[#5C6B2E] transition-colors shadow-md hover:shadow-lg"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Ver carta completa
            </button>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="gallery" className="py-24 bg-[#1A1917] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl font-serif font-bold mb-4">Nuestros Momentos</h2>
            <div className="w-20 h-1 bg-[#708238] mx-auto mb-8"></div>
            <p className="text-white/70 max-w-2xl mx-auto">Un vistazo a lo que te espera en Los Espejitos.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200">
            {[IMAGES.food1, IMAGES.drinks1, IMAGES.food2, IMAGES.drinks2, IMAGES.food3, IMAGES.drinks3, IMAGES.food4].map((src, idx) => (
              <div
                key={idx}
                className={`relative group overflow-hidden rounded-xl cursor-pointer aspect-square ${idx === 0 || idx === 6 ? 'md:col-span-2 md:row-span-2' : ''}`}
                onClick={() => setLightboxImg(src)}
              >
                <img
                  src={src}
                  alt={`Galería ${idx + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-full backdrop-blur-sm">Ver imagen</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md"
            onClick={(e) => { e.stopPropagation(); setLightboxImg(null); }}
          >
            <X size={32} />
          </button>
          <img
            src={lightboxImg}
            alt="Imagen ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Reservas */}
      <section id="reservations" className="py-24 bg-[#F4F1EA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
          <h2 className="text-4xl font-serif font-bold text-[#2C2A26] mb-4">¿Quieres reservar una mesa?</h2>
          <div className="w-20 h-1 bg-[#708238] mx-auto mb-8"></div>
          <p className="text-[#5C5A56] text-lg mb-12 max-w-xl mx-auto">
            Llámanos directamente y te atendemos al momento. ¡Es la forma más rápida y sencilla de asegurar tu sitio!
          </p>
          <a
            href="tel:922821200"
            className="inline-flex items-center justify-center px-12 py-6 bg-[#708238] text-white text-2xl font-bold rounded-full hover:bg-[#5C6B2E] transition-all transform hover:scale-105 shadow-2xl"
          >
            <Phone className="mr-4 h-7 w-7" />
            922 821 200
          </a>
          <p className="mt-8 text-sm text-[#5C5A56]">
            Horario de atención: Lunes – Sábado de 6:00 a 23:00
          </p>
        </div>
      </section>

      {/* Reseñas */}
      <section className="py-24 bg-[#FDFBF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl font-serif font-bold text-[#2C2A26] mb-4">Lo que dicen nuestros clientes</h2>
            <div className="w-20 h-1 bg-[#708238] mx-auto mb-6"></div>
            <div className="flex justify-center items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-[#5C5A56] mt-2 font-medium">4.8 sobre 5 en reseñas locales</p>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory -mx-4 sm:mx-0">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className={`min-w-[320px] max-w-[400px] snap-center p-8 rounded-2xl shadow-sm border shrink-0 ${(review as any).negative ? 'bg-gray-50 border-gray-200' : 'bg-white border-[#E8E4D9]'}`}>
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                </div>
                <p className="text-xs text-[#9C9A96] mb-4">{(review as any).badge}</p>
                <p className="text-[#5C5A56] italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-white ${(review as any).negative ? 'bg-gray-400' : 'bg-[#708238]'}`}>
                    {review.name.charAt(0)}
                  </div>
                  <span className="ml-3 font-bold text-[#2C2A26]">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación & Contacto */}
      <section id="contact" className="py-0 bg-[#F4F1EA]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[500px] lg:h-auto w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.6!2d-16.3!3d28.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI4JzQ4LjAiTiAxNsKwMTgnMDAuMCJX!5e0!3m2!1ses!2ses!4v1234567890"
              className="absolute inset-0 w-full h-full border-0 grayscale contrast-75 opacity-90"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="p-12 md:p-24 flex flex-col justify-center bg-[#2C2A26] text-white">
            <h2 className="text-4xl font-serif font-bold mb-12">Encuéntranos</h2>

            <div className="space-y-10">
              <div className="flex items-start">
                <MapPin className="w-8 h-8 text-[#708238] mr-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Dirección</h3>
                  <p className="text-white/80 leading-relaxed">
                    Cam. la Hornera, 139<br />
                    38108 La Laguna<br />
                    Santa Cruz de Tenerife
                  </p>
                  <div className="mt-3 inline-block bg-white/10 px-3 py-1 rounded text-sm text-white/90">
                    🚗 Muchas plazas libres, gratis en calle
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-8 h-8 text-[#708238] mr-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Horario</h3>
                  <table className="w-full text-white/80">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-8">Lunes – Sábado</td>
                        <td className="py-1 font-medium text-white">6:00 – 23:00</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-8">Domingo</td>
                        <td className="py-1 font-medium text-[#708238]">Cerrado</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-8 h-8 text-[#708238] mr-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Contacto</h3>
                  <a href="tel:922821200" className="text-2xl font-medium hover:text-[#708238] transition-colors">
                    922 821 200
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carta Completa Modal */}
      {cartaOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-[#2C2A26] text-white px-8 py-6 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-3xl font-serif font-bold">Nuestra Carta</h2>
                <p className="text-white/60 text-sm mt-1">Bar Cafetería Los Espejitos · La Laguna</p>
              </div>
              <button
                onClick={() => setCartaOpen(false)}
                className="text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="bg-[#708238] text-white px-8 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-white mr-2" />
                <span className="font-bold text-lg">Bocadillo Obrero</span>
                <span className="ml-3 text-white/80 text-sm">— El clásico de la casa, relleno abundante</span>
              </div>
              <span className="text-2xl font-bold">1€</span>
            </div>

            <div className="overflow-y-auto flex-1 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {MENU_CATEGORIES.map((cat) => (
                  <div key={cat}>
                    <h3 className="text-xl font-serif font-bold text-[#2C2A26] border-b-2 border-[#708238] pb-2 mb-5">{cat}</h3>
                    <div className="space-y-4">
                      {MENU_ITEMS[cat as keyof typeof MENU_ITEMS].map((item, i) => (
                        <div key={i} className="flex justify-between items-start group">
                          <div className="flex-1 pr-4">
                            <p className="font-semibold text-[#2C2A26] group-hover:text-[#708238] transition-colors">
                              {item.name}
                              {item.featured && <Star className="inline w-3.5 h-3.5 ml-1 text-[#708238] fill-[#708238]" />}
                            </p>
                            <p className="text-sm text-[#5C5A56]">{item.desc}</p>
                          </div>
                          <span className="font-bold text-[#708238] bg-[#F4F1EA] px-3 py-1 rounded-md text-sm whitespace-nowrap">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E8E4D9] px-8 py-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <p className="text-sm text-[#5C5A56]">Precios sujetos a cambios estacionales. Pregunta por el menú del día.</p>
              <a
                href="tel:922821200"
                className="inline-flex items-center px-6 py-3 bg-[#708238] text-white font-bold rounded-full hover:bg-[#5C6B2E] transition-colors"
              >
                <Phone className="mr-2 h-4 w-4" />
                Llamar para reservar
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1A1917] text-white/60 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <span className="font-serif text-2xl font-bold text-white tracking-tight">Los Espejitos</span>
              <p className="mt-2 text-sm">Tu bar cafetería de confianza en La Laguna.</p>
            </div>

            <div className="flex space-x-6 mb-8 md:mb-0">
              <CreditCard className="w-6 h-6" />
              <Nfc className="w-6 h-6" />
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2025 Bar Cafetería Los Espejitos. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">Sobre Nosotros</button>
              <button onClick={() => scrollTo('menu')} className="hover:text-white transition-colors">Carta</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contacto</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
