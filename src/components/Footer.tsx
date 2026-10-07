import React from 'react';
import { Phone, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#242A24] text-[#D8D2C5] pt-14 pb-24 md:pb-16 border-t border-[#374037]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#374037]">
          {/* Brand Info */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#3D7A4D] text-white flex items-center justify-center font-bold text-sm">
                生
              </span>
              <span className="text-xl font-black text-white">하루한잔 생식</span>
            </div>
            <p className="text-sm text-[#A69E90] leading-relaxed max-w-md mb-4">
              100% 국내산 50가지 원물(통곡물·채소·과일·해조류)을 무가열 급속 동결건조 공법으로 가공하여,
              바쁜 현대인에게 30초의 간편하고 든든한 일상을 선물합니다.
            </p>
            <p className="text-xs text-[#8C8477]">
              본 제품은 질병의 예방 및 치료를 위한 의약품이 아닌 일반가공식품(생식)입니다.
            </p>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-6 flex flex-col md:items-end">
            <div className="bg-[#2E362E] border border-[#3E493E] rounded-2xl p-6 w-full max-w-sm">
              <span className="text-xs font-bold text-[#A4BFA8] block mb-1">고객 상담 및 전화 주문</span>
              <a
                href="tel:080-000-5050"
                className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2 hover:text-[#78C287] transition-colors"
              >
                <Phone className="w-6 h-6 text-[#78C287]" />
                <span>080-000-5050</span>
              </a>
              <div className="mt-3 text-xs text-[#A8A093] space-y-1">
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#78C287]" />
                  <span>운영시간: 평일 09:00 ~ 18:00 (점심 12:00~13:00)</span>
                </p>
                <p>토/일/공휴일 휴무 | 우체국 택배 안전 당일 발송</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business details & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#857D71]">
          <div>
            <p>상호명: (주)하루한잔식품 | 대표자: 홍길동 | 사업자등록번호: 123-45-67890</p>
            <p className="mt-1">통신판매업신고: 제2026-서울강남-0123호 | 개인정보관리책임자: 김원물</p>
            <p className="mt-1">주소: 충청북도 괴산군 자연곡물로 50 하루식품빌딩</p>
          </div>
          <div className="text-right flex flex-col items-center md:items-end gap-1">
            <p>© 2026 하루한잔 생식. All rights reserved.</p>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-xs text-[#A69E90] hover:text-white underline cursor-pointer mt-1"
              >
                [판매자 주문관리 모니터링 열기]
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
