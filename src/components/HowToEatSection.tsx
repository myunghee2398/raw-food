import React, { useState } from 'react';
import { HOW_TO_EAT_STEPS } from '../data/saengsikData';
import { ArrowRight, Droplets, Milk, Sparkles, Check } from 'lucide-react';

export const HowToEatSection: React.FC = () => {
  const [selectedMix, setSelectedMix] = useState<'water' | 'milk' | 'soymilk'>('milk');

  const mixInfo = {
    water: {
      name: '물 (생수)',
      sub: '깔끔하고 개운한 맛',
      color: 'bg-blue-50 border-blue-200 text-blue-900',
      tagColor: 'bg-blue-100 text-blue-800',
      desc: '곡물과 채소 50가지 본연의 깨끗하고 담백한 풍미를 있는 그대로 느끼실 수 있습니다. 목넘김이 가장 가볍고 산뜻합니다.',
      tip: '시원한 냉수 또는 미온수 200ml 추천',
    },
    milk: {
      name: '우유',
      sub: '부드럽고 진한 고소함',
      color: 'bg-amber-50 border-amber-200 text-amber-950',
      tagColor: 'bg-amber-100 text-amber-900',
      desc: '고소한 미숫가루 라떼처럼 풍미가 극대화되며, 더욱 든든하고 크리미한 식감을 즐기실 수 있습니다. 가장 많은 분들이 선호하는 조합입니다.',
      tip: '일반 우유 or 저지방 우유 200ml 추천',
    },
    soymilk: {
      name: '두유',
      sub: '묵직하고 알찬 포만감',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-950',
      tagColor: 'bg-emerald-100 text-emerald-900',
      desc: '식물성 영양의 깊은 담백함과 묵직한 포만감을 원하시는 분께 안성맞춤입니다. 아침 한 끼 대용으로 아주 든든합니다.',
      tip: '무가당 플레인 두유 200ml 추천',
    },
  };

  return (
    <section id="how-to-eat" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8DFC9] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#1E4D2B] bg-[#E1ECE1] px-3.5 py-1.5 rounded-full border border-[#C5D8C3] uppercase tracking-wider mb-4 inline-block">
            30초 간편 조리법
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E4D2B] leading-tight mb-4">
            물이나 우유에 타서 드세요
          </h2>
          <p className="text-base sm:text-xl text-[#524637] font-medium leading-relaxed">
            복잡한 요리 과정 없이, 1→2→3 단계만 따라 하면<br className="hidden sm:inline" />
            언제 어디서나 30초 만에 든든하고 고소한 한 끼가 완성됩니다.
          </p>
        </div>

        {/* 1 → 2 → 3 Visual Sequential Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative mb-16">
          {HOW_TO_EAT_STEPS.map((stepItem, index) => (
            <div
              key={stepItem.step}
              className="bg-white border-2 border-[#E3D9C6] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative"
            >
              {/* Step indicator pill */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#1E4D2B] text-white flex items-center justify-center font-black text-2xl shadow-sm">
                  {stepItem.step}
                </div>
                <span className="text-sm font-bold text-[#8C7A65] bg-[#F8F5EE] px-3 py-1 rounded-full border border-[#E8E1CE]">
                  STEP 0{stepItem.step}
                </span>
              </div>

              <div>
                {/* Step visual icon illustration */}
                <div className="h-28 flex items-center justify-center mb-4">
                  {stepItem.step === 1 && (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-20 bg-gradient-to-b from-[#EBF5FB] to-[#D4E6F1] border-2 border-[#A9CCE3] rounded-xl flex items-center justify-center relative">
                        <Droplets className="w-8 h-8 text-[#2980B9]" />
                        <span className="absolute bottom-1 text-[11px] font-bold text-[#2471A3]">200ml</span>
                      </div>
                      <span className="text-xs text-[#7A6C58] mt-2 font-semibold">음료 먼저 붓기</span>
                    </div>
                  )}

                  {stepItem.step === 2 && (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-20 bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-amber-300 rounded-lg flex flex-col items-center justify-center -rotate-12">
                          <span className="text-[10px] font-black text-[#1E4D2B]">1포</span>
                          <span className="text-[9px] text-[#7A6C58]">30g</span>
                        </div>
                        <span className="text-xl text-[#8C7A65]">➔</span>
                        <div className="w-14 h-16 bg-[#F8F5EE] border-2 border-[#D8CEBA] rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🥛</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#7A6C58] mt-2 font-semibold">스틱 1포 개봉 투입</span>
                    </div>
                  )}

                  {stepItem.step === 3 && (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-20 bg-gradient-to-b from-[#759C75] to-[#4D7C56] border-2 border-[#1E4D2B] rounded-xl flex items-center justify-center text-white text-center shadow-xs">
                        <div className="flex flex-col items-center">
                          <span className="text-lg animate-bounce">🫨</span>
                          <span className="text-[10px] font-bold">10초 쉐이킷!</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#1E4D2B] mt-2 font-bold">고소하게 섭취</span>
                    </div>
                  )}
                </div>

                {/* Step Title - Big font */}
                <h3 className="text-xl sm:text-2xl font-black text-[#261F16] mb-3 leading-snug">
                  {stepItem.title}
                </h3>

                {/* Step Description */}
                <p className="text-base sm:text-lg text-[#554A3B] leading-relaxed mb-4">
                  {stepItem.description}
                </p>
              </div>

              {/* Step Key Tip Highlight */}
              <div className="bg-[#FAF7F0] p-3.5 rounded-xl border border-[#E9E1CE]">
                <p className="text-xs sm:text-sm font-bold text-[#1E4D2B] flex items-center gap-1.5">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{stepItem.highlight}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Mix Choice (물 vs 우유 vs 두유 맛 가이드) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DFD5C2] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h4 className="text-xl sm:text-2xl font-bold text-[#231E17] mb-2">
              어디에 타서 마실까요? 나만의 맛 찾기
            </h4>
            <p className="text-sm sm:text-base text-[#6E604F]">
              취향에 맞게 음료를 선택해보세요. 각각 다른 매력의 풍미가 완성됩니다.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setSelectedMix('water')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-base sm:text-lg transition-all cursor-pointer ${
                selectedMix === 'water'
                  ? 'bg-[#1E4D2B] text-white shadow-sm'
                  : 'bg-[#F5EFE6] text-[#554736] hover:bg-[#EDE5D8]'
              }`}
            >
              <Droplets className="w-5 h-5" />
              <span>물 (생수)</span>
            </button>

            <button
              onClick={() => setSelectedMix('milk')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-base sm:text-lg transition-all cursor-pointer ${
                selectedMix === 'milk'
                  ? 'bg-[#1E4D2B] text-white shadow-sm'
                  : 'bg-[#F5EFE6] text-[#554736] hover:bg-[#EDE5D8]'
              }`}
            >
              <Milk className="w-5 h-5" />
              <span>우유 (추천)</span>
            </button>

            <button
              onClick={() => setSelectedMix('soymilk')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-base sm:text-lg transition-all cursor-pointer ${
                selectedMix === 'soymilk'
                  ? 'bg-[#1E4D2B] text-white shadow-sm'
                  : 'bg-[#F5EFE6] text-[#554736] hover:bg-[#EDE5D8]'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>두유</span>
            </button>
          </div>

          {/* Selected Drink Description Card */}
          <div className="bg-[#FAF8F4] border border-[#E6DECE] rounded-2xl p-6 max-w-2xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-[#E8EFE8] text-[#1E4D2B] text-xs font-bold rounded-full mb-3">
              {mixInfo[selectedMix].tip}
            </div>
            <h5 className="text-xl font-black text-[#261E16] mb-2">
              {mixInfo[selectedMix].name} — {mixInfo[selectedMix].sub}
            </h5>
            <p className="text-base sm:text-lg text-[#524536] leading-relaxed">
              {mixInfo[selectedMix].desc}
            </p>
          </div>

          {/* Important Temperature Note */}
          <div className="mt-6 text-center text-xs sm:text-sm text-[#7D705E]">
            ⚠️ <strong>섭취 시 주의사항:</strong> 원물의 자연 성분 보존을 위해 40℃ 이상의 뜨거운 물보다는 <strong>미온수나 시원한 음료</strong>에 타서 드시는 것을 권장합니다.
          </div>

        </div>

      </div>
    </section>
  );
};
