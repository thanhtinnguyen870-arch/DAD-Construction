import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Process from '../components/Process';
import CostCalculator from '../components/CostCalculator';
import Testimonials from '../components/Testimonials';
import FaqAccordion from '../components/FaqAccordion';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function HomePage() {
  const [contactPrefill, setContactPrefill] = useState({
    message: '',
    service: 'Xây nhà trọn gói'
  });

  const handlePrefillQuoteFromCalc = (summaryText) => {
    setContactPrefill(prev => ({
      ...prev,
      message: summaryText
    }));

    const contactEl = document.getElementById('lien-he');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Projects />
        <WhyChooseUs />
        <Services />
        <Process />
        <CostCalculator onPrefillQuote={handlePrefillQuoteFromCalc} />
        <Testimonials />
        <FaqAccordion />
        <ContactSection 
          initialMessage={contactPrefill.message}
          initialService={contactPrefill.service}
        />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
