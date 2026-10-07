import React, { useState } from 'react';
import { FAQS } from '../data/saengsikData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8DFC9] scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold text-[#1E4D2B] bg-[#E1ECE1] px-3.5 py-1.5 rounded-full border border-[#C5D8C3] uppercase tracking-wider mb-4 inline-block">
            궁금한 점을 확인하세요
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E4D2B] leading-tight mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-base sm:text-lg text-[#554737] font-medium leading-relaxed">
            원재료, 섭취 방법, 보관 등에 대해 고객님들께서 자주 문의하시는 내용입니다.
          </p>
        </div>

        {/* Accordion FAQ list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#E5DCCB] rounded-2xl overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]"
                >
                  <span className="text-lg sm:text-xl font-bold text-[#241E16] flex items-center gap-3">
                    <span className="text-[#1E4D2B] font-black font-mono">Q.</span>
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#F3EDE2] text-[#4F4232] flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#1E4D2B] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-base sm:text-lg text-[#554837] leading-relaxed border-t border-[#F1EAE0]">
                    <div className="flex gap-3 pt-2">
                      <span className="text-[#1E4D2B] font-black font-mono shrink-0">A.</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Regulatory Food Disclaimer Card */}
        <div className="mt-12 bg-white/70 border border-[#DDD3C0] rounded-2xl p-5 text-center text-xs sm:text-sm text-[#6C5E4E] leading-relaxed">
          <p className="font-semibold">
            [안내] 생식은 인체에 유익한 자연 원물을 동결건조한 <strong>일반식품(식사대용식)</strong>입니다.<br className="hidden sm:inline" />
            질병 치료나 의학적 효능을 표방하지 않으며, 자연 그대로의 균형 잡힌 영양 섭취와 편리한 일상을 돕습니다.
          </p>
        </div>

      </div>
    </section>
  );
};
