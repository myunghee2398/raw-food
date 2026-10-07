import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ProductOption } from '../data/saengsikData';

interface MobileOrderBarProps {
  onOpenOrder: () => void;
  selectedOption: ProductOption;
}

export const MobileOrderBar: React.FC<MobileOrderBarProps> = ({ onOpenOrder, selectedOption }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/98 border-t border-[#DFD7C7] p-3 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col pl-1">
          <span className="text-[11px] font-bold text-[#7D705F] line-clamp-1">
            국내산 50곡 생식 (1개월분~)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#1E4D2B] font-mono">
              {selectedOption.salePrice.toLocaleString()}원
            </span>
            <span className="text-xs font-bold text-[#4F4335]">부터</span>
          </div>
        </div>

        <button
          onClick={onOpenOrder}
          className="flex-1 h-13 bg-[#1E4D2B] active:bg-[#163820] text-white font-black text-lg rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>주문하기</span>
        </button>
      </div>
    </div>
  );
};
