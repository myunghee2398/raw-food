import React, { useState } from 'react';
import { PRODUCT_OPTIONS, ProductOption } from '../data/saengsikData';
import { Check, ShieldCheck, ShoppingBag, Truck, Gift, Star } from 'lucide-react';

interface ProductOrderSectionProps {
  onSelectOptionAndOrder: (option: ProductOption) => void;
}

export const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({ onSelectOptionAndOrder }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('box-2'); // 2박스 default

  const selectedOption = PRODUCT_OPTIONS.find((opt) => opt.id === selectedOptionId) || PRODUCT_OPTIONS[1];

  return (
    <section id="product-order" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E0D2] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#1E4D2B] bg-[#E8EFE8] px-3.5 py-1.5 rounded-full border border-[#D0DFD0] uppercase tracking-wider mb-4 inline-block">
            정직한 단 하나의 제품
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E4D2B] leading-tight mb-4">
            바른 국내산 50곡 하루생식
          </h2>
          <p className="text-base sm:text-xl text-[#5A4E3E] font-medium leading-relaxed">
            원료 선택부터 동결건조 포장까지 한치의 타협 없이 만들었습니다.<br className="hidden sm:inline" />
            100% 국내산 원물 그대로의 깨끗함을 간편하게 주문하세요.
          </p>
        </div>

        {/* Main Product Card with Clean Green & Beige Styling */}
        <div className="bg-white border-2 border-[#E5DDCB] rounded-3xl p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Product Visual Package Showcase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              <div className="relative w-full max-w-sm bg-gradient-to-b from-[#F7F4EC] to-[#EFE8D9] border-2 border-[#DCD3BF] rounded-3xl p-6 text-center shadow-inner">
                {/* Genuine Product Label */}
                <div className="inline-flex items-center gap-1.5 bg-[#1E4D2B] text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% 국산 원물 보증</span>
                </div>

                {/* Box Graphic Representation */}
                <div className="my-4 flex flex-col items-center">
                  <div className="w-48 h-56 bg-white border-2 border-[#D8CEBA] rounded-2xl shadow-md p-4 flex flex-col justify-between relative">
                    <div className="border-b border-[#EAE3D5] pb-2 text-left">
                      <span className="text-[10px] font-bold text-[#8C7B68] block">식사대용 일반식품</span>
                      <h4 className="text-lg font-black text-[#1E4D2B] leading-tight">
                        국내산 50곡<br />하루생식
                      </h4>
                    </div>

                    <div className="my-auto flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#EAF2EA] flex items-center justify-center text-3xl">
                        🌾
                      </div>
                    </div>

                    <div className="text-center pt-2 border-t border-[#EAE3D5]">
                      <p className="text-[11px] font-bold text-[#443828]">{selectedOption.countText}</p>
                      <p className="text-[10px] text-[#8C7A65]">1포당 30g 개별포장</p>
                    </div>
                  </div>

                  {/* Free Shaker Gift Badge for Multi-box */}
                  {selectedOption.id !== 'box-1' && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-[#E6EFE6] border border-[#BFD9BE] text-[#1E4D2B] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold animate-pulse">
                      <Gift className="w-4 h-4" />
                      <span>{selectedOption.id === 'box-3' ? '에코 보틀 2개 증정' : '에코 보틀 1개 증정'}</span>
                    </div>
                  )}
                </div>

                {/* Micro info */}
                <p className="text-xs text-[#7B6E5C] mt-2 font-medium">
                  스틱 1포(30g) 개별 위생 포장 | 상온 보관
                </p>
              </div>

              {/* Delivery Promise */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#5D503F] font-bold mt-4">
                <Truck className="w-4 h-4 text-[#1E4D2B]" />
                <span>우체국 택배 안전 당일 발송 (평일 14시 이전)</span>
              </div>

            </div>

            {/* Right: Package Selection & Big Order Button (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              
              <div className="mb-6">
                <span className="text-xs sm:text-sm font-bold text-[#8C7A65] block mb-1">
                  1회 식사대용 국내산 생식
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#221C14]">
                  {selectedOption.name}
                </h3>
                <p className="text-sm sm:text-base text-[#615341] mt-1">
                  50가지 국내산 자연 원물을 급속 동결건조하여 영양 손실 없이 담았습니다.
                </p>
              </div>

              {/* Option Selection List */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-bold text-[#3B3224]">수량 구성 선택:</p>
                {PRODUCT_OPTIONS.map((opt) => {
                  const isSelected = opt.id === selectedOptionId;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#1E4D2B] bg-[#F4F8F4] shadow-xs'
                          : 'border-[#E2D9C7] bg-[#FAF8F5] hover:border-[#BFB4A0]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#1E4D2B] bg-[#1E4D2B] text-white'
                              : 'border-[#B8AB96] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg font-black text-[#261E16]">
                              {opt.name}
                            </span>
                            {opt.badge && (
                              <span className="text-xs font-bold bg-[#E6EFE6] text-[#1E4D2B] px-2 py-0.5 rounded-md border border-[#BFD9BE]">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          {opt.bonusText && (
                            <p className="text-xs sm:text-sm text-[#1E4D2B] font-semibold mt-0.5">
                              🎁 {opt.bonusText}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs text-[#8C7A65] line-through font-mono">
                          {opt.regularPrice.toLocaleString()}원
                        </div>
                        <div className="text-lg sm:text-xl font-black text-[#1E4D2B] font-mono">
                          {opt.salePrice.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Big Price Display */}
              <div className="bg-[#FAF8F4] border border-[#E5DDCB] rounded-2xl p-5 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#8A7965] block">
                    최종 결제 금액
                  </span>
                  <span className="text-xs text-[#5E513F]">
                    {selectedOption.id === 'box-1' ? '배송비 3,000원 별도' : '무료배송 혜택 적용'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl font-black text-[#1E4D2B] font-mono">
                    {(selectedOption.salePrice + (selectedOption.id === 'box-1' ? 3000 : 0)).toLocaleString()}원
                  </span>
                  <span className="text-sm font-bold text-[#443727] ml-1">원</span>
                </div>
              </div>

              {/* Required Big "주문하기" Button */}
              <button
                onClick={() => onSelectOptionAndOrder(selectedOption)}
                className="w-full h-16 sm:h-18 bg-[#1E4D2B] hover:bg-[#163820] active:scale-98 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-lg shadow-[#1E4D2B]/30 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-7 h-7" />
                <span>주문하기</span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[#7B6E5D]">
                <span>✓ 비회원 간편 주문</span>
                <span>·</span>
                <span>✓ 전화 주문 가능</span>
                <span>·</span>
                <span>✓ 100% 국내산 원물 보증</span>
              </div>

            </div>

          </div>
        </div>

        {/* Legal Product Specification Table (General Food Compliance) */}
        <div className="mt-12 bg-white border border-[#E3D9C6] rounded-2xl p-6 sm:p-8">
          <h4 className="text-lg sm:text-xl font-bold text-[#272119] mb-4 pb-3 border-b border-[#EFE9DC]">
            식품위생법에 의한 상품 기본 정보 (일반식품 고시)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            <div className="flex border-b border-[#F4EFE6] pb-2">
              <span className="w-28 sm:w-32 font-bold text-[#6D5E4D] shrink-0">식품의 유형</span>
              <span className="text-[#2B231B] font-medium">생식 / 일반가공식품 (일반식품)</span>
            </div>
            <div className="flex border-b border-[#F4EFE6] pb-2">
              <span className="w-28 sm:w-32 font-bold text-[#6D5E4D] shrink-0">내용량</span>
              <span className="text-[#2B231B] font-medium">1포당 30g (개별 스틱 포장)</span>
            </div>
            <div className="flex border-b border-[#F4EFE6] pb-2">
              <span className="w-28 sm:w-32 font-bold text-[#6D5E4D] shrink-0">원재료 및 원산지</span>
              <span className="text-[#2B231B] font-medium">100% 대한민국 국내산 (곡물 15종, 채소 20종, 과일 등 15종)</span>
            </div>
            <div className="flex border-b border-[#F4EFE6] pb-2">
              <span className="w-28 sm:w-32 font-bold text-[#6D5E4D] shrink-0">보관 방법</span>
              <span className="text-[#2B231B] font-medium">직사광선 및 습기를 피하여 서늘한 실온 보관</span>
            </div>
            <div className="flex border-b border-[#F4EFE6] pb-2">
              <span className="w-28 sm:w-32 font-bold text-[#6D5E4D] shrink-0">섭취 방법</span>
              <span className="text-[#2B231B] font-medium">1일 1~2회, 1회 1포를 물 또는 우유 200ml에 타서 섭취</span>
            </div>
            <div className="flex border-b border-[#F4EFE6] pb-2">
              <span className="w-28 sm:w-32 font-bold text-[#6D5E4D] shrink-0">알레르기 정보</span>
              <span className="text-[#2B231B] font-medium">대두, 메밀 함유 (원재료 알레르기 체질 확인 필요)</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-[#827563]">
            ※ 본 제품은 질병의 예방 및 치료를 위한 의약품이 아닌 일반식품입니다.
          </p>
        </div>

      </div>
    </section>
  );
};
