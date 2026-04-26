import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-base font-bold transition-colors ${isOpen ? 'text-purple-400' : 'text-gray-300 group-hover:text-white'}`}>
          {question}
        </span>
        <HiChevronDown 
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} 
          size={20} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-sm text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = ({ title = "Frequently Asked Questions", faqs }) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-10 text-center">{title}</h2>
        <div className="bg-[#111827] rounded-3xl p-6 sm:p-8 border border-gray-800">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
