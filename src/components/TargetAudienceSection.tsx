import React from 'react';
import { SunMedium, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  const cards = [
    {
      num: '01',
      title: '아침 식사를 자주 거르시는 분',
      sub: '출근·등교 전 바쁜 아침 30초',
      desc: '바쁜 출근 준비나 늦잠으로 아침을 굶고 계신가요? 텀블러에 생식 1포와 물이나 우유를 넣고 가볍게 흔들면, 30초 만에 속을 든든하게 채우고 하루를 시작할 수 있습니다.',
      benefit: '빈속의 허전함 없이 깔끔하고 든든한 시작',
      icon: SunMedium,
    },
    {
      num: '02',
      title: '매번 끼니 챙기기 번거로우신 분',
      sub: '장보기 · 요리 · 설거지 부담 끝',
      desc: '1인 가구, 맞벌이, 혼밥 등으로 매 끼니마다 장을 보고 조리하고 뒤처리하는 과정이 귀찮으신 분께 제격입니다. 1회용 스틱으로 간편하게 뜯어 마시고 가볍게 헹구면 식사 끝!',
      benefit: '준비부터 정리까지 1분이면 충분한 편리함',
      icon: Clock,
    },
    {
      num: '03',
      title: '속 편하고 가벼운 한 끼를 원하시는 분',
      sub: '더부룩함 없는 순수 100% 자연 원물',
      desc: '기름진 인스턴트나 배달 음식으로 속이 더부룩하셨나요? 인공 감미료와 첨가물 없이, 오직 국내산 곡물과 채소 50종 그대로를 담아 섭취 후에도 속이 편안하고 깔끔합니다.',
      benefit: '부담 없는 담백한 포만감과 편안한 식후감',
      icon: Sparkles,
    },
  ];

  return (
    <section id="target-audience" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E0D2] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header with Large Bold Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#1E4D2B] bg-[#E8EFE8] px-3.5 py-1.5 rounded-full border border-[#D0DFD0] uppercase tracking-wider mb-4 inline-block">
            이런 분께 권해드립니다
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E4D2B] leading-tight mb-4">
            하루한잔 생식, <br />
            이런 분께 특히 좋아요
          </h2>
          <p className="text-base sm:text-xl text-[#5A4E3E] font-medium leading-relaxed">
            복잡한 준비 없이 자연 그대로의 원물로 채우는 건강한 식습관.
            나와 가족의 일상에 꼭 맞는 간편함을 경험해보세요.
          </p>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#E5DDCB] hover:border-[#1E4D2B] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  {/* Top Header Badge & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#EAF2EA] group-hover:bg-[#1E4D2B] group-hover:text-white text-[#1E4D2B] flex items-center justify-center transition-colors">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-[#8C7D6B]/40 font-mono">
                      {card.num}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <span className="text-xs sm:text-sm font-bold text-[#8C7A65] block mb-1">
                    {card.sub}
                  </span>

                  {/* Main Title - Big Font */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#221C14] mb-4 leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-[#554939] leading-relaxed mb-6 font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Benefit Tag */}
                <div className="pt-4 border-t border-[#F0EAE0] flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#1E4D2B] shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-[#1E4D2B]">
                    {card.benefit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance banner */}
        <div className="mt-12 bg-[#F3EDE2] rounded-2xl p-5 text-center border border-[#DFD5C2]">
          <p className="text-sm sm:text-base text-[#594C3B] font-semibold">
            💡 본 제품은 의약품이 아닌 <strong className="text-[#1E4D2B]">순수 자연 원물 100% 식사대용 일반식품</strong>으로, 누구나 부담 없이 일상 식사처럼 드실 수 있습니다.
          </p>
        </div>

      </div>
    </section>
  );
};
