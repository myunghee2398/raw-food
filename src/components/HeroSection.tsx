import React from 'react';
import { ArrowDown, Check, ShoppingBag, Sparkles, Sprout } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroSectionProps {
  onOpenOrder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenOrder }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#FAF8F5] pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[#E8E2D5]">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-12 left-8 w-72 h-72 bg-[#DCEADB] rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-8 w-80 h-80 bg-[#EFE3CF] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & Call to Action (7 cols on large screen) */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Top Subtitle badge / intro */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECE4] border border-[#C5D8C3] text-[#1E4D2B] text-sm sm:text-base font-bold mb-5 shadow-2xs">
              <Sprout className="w-4 h-4 text-[#1E4D2B]" />
              <span>100% 대한민국 산지 50가지 원물 그대로</span>
            </div>

            {/* Main Required Big Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E4D2B] leading-[1.2] tracking-tight mb-5">
              하루한잔, <br className="hidden sm:inline" />
              간편한 한끼
            </h1>

            {/* Description emphasizing natural domestic ingredients and convenience (strictly compliant) */}
            <p className="text-lg sm:text-xl lg:text-2xl text-[#4A4033] font-medium leading-relaxed mb-8 max-w-2xl">
              바쁜 일상 속, 물이나 우유에 흔들어 <strong className="font-bold text-[#1E4D2B]">30초</strong>면 완성되는 든든한 식사대용식.<br className="hidden sm:inline" />
              국내산 통곡물과 신선 채소 <strong className="font-bold text-[#1E4D2B]">50가지</strong>의 자연 그대로를 담았습니다.
            </p>

            {/* Core Feature Bullet Points with Large Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl mb-9 text-left">
              <div className="flex items-center gap-3 bg-white/70 border border-[#E8E1D2] rounded-xl px-4 py-3 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#2A231A]">
                  국내산 50가지 곡물·채소 100%
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/70 border border-[#E8E1D2] rounded-xl px-4 py-3 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#2A231A]">
                  동결건조로 자연 원물 보존
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/70 border border-[#E8E1D2] rounded-xl px-4 py-3 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#2A231A]">
                  1포 30g 위생적인 개별 포장
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/70 border border-[#E8E1D2] rounded-xl px-4 py-3 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#2A231A]">
                  착색료·보존료 無첨가 일반식품
                </span>
              </div>
            </div>

            {/* Big Prominent "주문하기" Button (Required: 큰 주문하기 버튼) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenOrder}
                className="w-full sm:w-auto min-w-[260px] h-16 sm:h-18 px-8 sm:px-10 bg-[#1E4D2B] hover:bg-[#163820] active:scale-98 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-lg shadow-[#1E4D2B]/25 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
                <span>주문하기</span>
              </button>

              <a
                href="#ingredients"
                className="w-full sm:w-auto h-14 sm:h-16 px-6 bg-[#EBE4D5] hover:bg-[#E2D9C6] text-[#443828] font-bold text-base sm:text-lg rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>원재료 50종 살펴보기</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Quick trust note */}
            <p className="text-xs sm:text-sm text-[#7D705E] mt-4 font-medium">
              ✓ 평일 오후 2시 이전 주문 시 당일 우체국 택배 발송 | 1박스부터 간편 주문 가능
            </p>

          </div>

          {/* Right Visual Element (5 cols on large screen) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
