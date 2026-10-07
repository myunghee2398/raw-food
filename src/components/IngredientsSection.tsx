import React, { useState } from 'react';
import { INGREDIENTS_50, Ingredient } from '../data/saengsikData';
import { Leaf, Search, ShieldCheck, Snowflake, Wind } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'grain' | 'vegetable' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIngredients = INGREDIENTS_50.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.character.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-[#F4EFE6] border-b border-[#E8E0D2] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Large Clear Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EDE2] border border-[#C5D8C3] text-[#1E4D2B] text-sm sm:text-base font-bold mb-4">
            <Leaf className="w-4 h-4 text-[#1E4D2B]" />
            <span>원재료 100% 대한민국 원산지</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E4D2B] leading-tight mb-4">
            국내산 50가지 곡물과 채소를<br />
            온전히 한 포에 담았습니다
          </h2>

          <p className="text-base sm:text-xl text-[#524637] font-medium leading-relaxed">
            원산지가 불분명한 원료나 수입산 농산물은 일절 섞지 않았습니다.<br className="hidden sm:inline" />
            자연 그대로의 영양과 고소함을 지키기 위해 오직 우리 땅에서 자란 <strong className="text-[#1E4D2B] font-bold">50가지 자연 원물</strong>만을 고집합니다.
          </p>
        </div>

        {/* 3 Core Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className="bg-[#FAF8F5] border border-[#E3DC handle-border-[#DCD4C4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#E6EFE6] text-[#1E4D2B] flex items-center justify-center font-bold text-2xl mb-4">
              🌾
            </div>
            <div>
              <span className="text-xs font-bold text-[#8C7B68] block mb-1">01. 100% 국내산 농산물</span>
              <h3 className="text-xl font-bold text-[#231F1A] mb-2">통곡물 15종</h3>
              <p className="text-sm sm:text-base text-[#615444] leading-relaxed">
                현미, 발아현미, 찰흑미, 율무, 수수, 서리태(검은콩), 귀리 등 씹을수록 구수한 전통 통곡물의 풍부한 영양.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#DCD4C4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#E6EFE6] text-[#1E4D2B] flex items-center justify-center font-bold text-2xl mb-4">
              🥬
            </div>
            <div>
              <span className="text-xs font-bold text-[#8C7B68] block mb-1">02. 신선한 밭 채소</span>
              <h3 className="text-xl font-bold text-[#231F1A] mb-2">초록 채소 20종</h3>
              <p className="text-sm sm:text-base text-[#615444] leading-relaxed">
                케일, 신선초, 시금치, 양배추, 브로콜리, 당근, 연근, 우엉 등 매일 챙기기 힘든 채소를 골고루 배합.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#DCD4C4] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#E6EFE6] text-[#1E4D2B] flex items-center justify-center font-bold text-2xl mb-4">
              🍎
            </div>
            <div>
              <span className="text-xs font-bold text-[#8C7B68] block mb-1">03. 과일·버섯·바다 원료</span>
              <h3 className="text-xl font-bold text-[#231F1A] mb-2">특화 원료 15종</h3>
              <p className="text-sm sm:text-base text-[#615444] leading-relaxed">
                국내산 사과, 배, 표고버섯, 영지버섯, 다시마, 미역, 보리새싹 등 자연의 산뜻함과 조화를 더했습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Freeze-Drying Process Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DFD7C7] shadow-sm mb-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EBF3EB] text-[#1E4D2B] flex items-center justify-center shrink-0">
                <Snowflake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1E4D2B] uppercase tracking-wider block mb-1">
                  생식(生食) 제조 원칙
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#262017] mb-2">
                  열을 가하지 않는 '영하 35℃ 급속 동결건조'
                </h4>
                <p className="text-sm sm:text-base text-[#574B3C] leading-relaxed max-w-2xl">
                  볶거나 찌는 일반 곡물가루(선식)와 달리, 신선한 원물을 영하 35도 이하에서 급속 동결한 후 수분만 승화시킵니다.
                  자연 원물 본연의 색, 은은한 향, 엽록소 및 영양소 파괴를 최소화하여 담백하고 깨끗합니다.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0 bg-[#FAF8F5] px-5 py-3 rounded-2xl border border-[#E9E2D3]">
              <ShieldCheck className="w-6 h-6 text-[#1E4D2B]" />
              <div className="text-left">
                <p className="text-sm font-bold text-[#2C241B]">식품첨가물 0%</p>
                <p className="text-xs text-[#7A6E5E]">착색료 · 보존료 · 설탕 無</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 50 Ingredients Viewer */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#DFD7C7] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E8E1D3]">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#231F1A]">
                국내산 50가지 전성분 목록 확인
              </h4>
              <p className="text-sm sm:text-base text-[#6E6150] mt-1">
                원하는 곡물이나 채소를 검색하거나 분류별로 찾아보세요.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="원재료명 검색 (예: 현미, 케일)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-white border border-[#D5CBBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B] focus:ring-2 focus:ring-[#1E4D2B]/20"
              />
              <Search className="w-5 h-5 text-[#8A7D6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#1E4D2B] text-white shadow-xs'
                  : 'bg-white text-[#5F5241] border border-[#DDD4C3] hover:bg-[#F0ECE1]'
              }`}
            >
              전체 보기 (50종)
            </button>
            <button
              onClick={() => setActiveTab('grain')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                activeTab === 'grain'
                  ? 'bg-[#1E4D2B] text-white shadow-xs'
                  : 'bg-white text-[#5F5241] border border-[#DDD4C3] hover:bg-[#F0ECE1]'
              }`}
            >
              통곡물류 (15종)
            </button>
            <button
              onClick={() => setActiveTab('vegetable')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                activeTab === 'vegetable'
                  ? 'bg-[#1E4D2B] text-white shadow-xs'
                  : 'bg-white text-[#5F5241] border border-[#DDD4C3] hover:bg-[#F0ECE1]'
              }`}
            >
              신선 채소류 (20종)
            </button>
            <button
              onClick={() => setActiveTab('special')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                activeTab === 'special'
                  ? 'bg-[#1E4D2B] text-white shadow-xs'
                  : 'bg-white text-[#5F5241] border border-[#DDD4C3] hover:bg-[#F0ECE1]'
              }`}
            >
              과일·버섯·해조류 (15종)
            </button>
          </div>

          {/* Grid of Ingredients */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E3DBD0] rounded-xl p-3 flex flex-col justify-between hover:border-[#1E4D2B] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#1E4D2B] bg-[#E8F0E8] px-2 py-0.5 rounded-sm">
                      {item.origin}
                    </span>
                    <span className="text-[11px] text-[#8E8170]">#{item.id}</span>
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-[#251F17]">{item.name}</h5>
                    <p className="text-xs text-[#736553] line-clamp-1 mt-0.5">{item.character}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-[#7E705E]">
                검색된 원재료가 없습니다. 다른 단어로 검색해 보세요.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 text-right">
            <span className="text-xs sm:text-sm text-[#7D705F] font-medium">
              * 50종 전 원료 100% 대한민국 산지 수매 및 잔류농약 검사 완료
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
