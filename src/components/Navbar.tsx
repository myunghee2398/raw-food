import React from 'react';
import { ShoppingBag, Search, ClipboardList, User, LogOut, LogIn } from 'lucide-react';
import { AuthUser } from './AuthModal';

interface NavbarProps {
  onOpenOrder: () => void;
  onOpenLookup: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  currentUser: AuthUser | null;
  orderCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrder,
  onOpenLookup,
  onOpenAdmin,
  onOpenAuth,
  onLogout,
  currentUser,
  orderCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
      {/* Top Welcome Bar if logged in */}
      {currentUser && (
        <div className="bg-[#1E4D2B] text-white px-4 py-1.5 text-xs sm:text-sm font-bold flex items-center justify-between">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-extrabold tracking-wide">
                {currentUser.name} 님 환영합니다!
              </span>
              <span className="hidden sm:inline text-emerald-100/90 text-xs font-normal">
                (회원 인증 완료 · 바로 주문 가능)
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-xs text-emerald-100 hover:text-white underline cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Brand single text element */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <span className="w-9 h-9 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            生
          </span>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1E4D2B]">
              하루한잔 생식
            </span>
            <span className="text-[11px] font-medium text-[#7D7365] -mt-1 hidden sm:block">
              100% 국내산 50가지 곡물·채소
            </span>
          </div>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm sm:text-base font-semibold text-[#5A5043]">
          <a href="#ingredients" className="hover:text-[#1E4D2B] transition-colors">
            50가지 원재료
          </a>
          <a href="#target-audience" className="hover:text-[#1E4D2B] transition-colors">
            추천 대상
          </a>
          <a href="#how-to-eat" className="hover:text-[#1E4D2B] transition-colors">
            섭취 방법
          </a>
          <a href="#product-order" className="hover:text-[#1E4D2B] transition-colors">
            상품 안내
          </a>
          <button
            onClick={onOpenLookup}
            className="hover:text-[#1E4D2B] transition-colors cursor-pointer flex items-center gap-1 font-bold text-[#1E4D2B]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>주문 조회</span>
          </button>
        </nav>

        {/* Zone 3: User greeting & Primary action & Store Admin button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Logged in indicator / Login button */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#E9EFE9] border border-[#C5D8C3] px-3 py-1.5 rounded-xl">
              <User className="w-4 h-4 text-[#1E4D2B]" />
              <span className="text-sm sm:text-base font-black text-[#1E4D2B] whitespace-nowrap">
                {currentUser.name} 님
              </span>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FAF6ED] text-[#1E4D2B] font-bold text-xs sm:text-sm rounded-xl border border-[#C5D8C3] transition-all cursor-pointer whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              <span>로그인/가입</span>
            </button>
          )}

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF5EB] hover:bg-[#F2ECE0] text-[#1E4D2B] font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap border-2 border-[#1E4D2B]/30 shadow-2xs"
            title="판매자 실시간 주문 관리"
          >
            <ClipboardList className="w-4 h-4 text-[#1E4D2B]" />
            <span className="hidden sm:inline">판매자 주문관리</span>
            <span className="sm:hidden">주문관리</span>
            {orderCount > 0 ? (
              <span className="px-1.5 py-0.5 bg-[#1E4D2B] text-white rounded-full text-[10px] font-black">
                {orderCount}
              </span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={onOpenOrder}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 bg-[#1E4D2B] hover:bg-[#163820] active:scale-95 text-white font-bold text-sm sm:text-base rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>주문하기</span>
          </button>
        </div>
      </div>
    </header>
  );
};
