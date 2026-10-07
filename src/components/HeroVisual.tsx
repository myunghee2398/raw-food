import React from 'react';
import { Leaf, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Background Soft Glow & Ambient Circle */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#E6EFE6] via-[#F4ECE1] to-[#EAE2D2] rounded-3xl -rotate-1 transform scale-105 opacity-80" />
      
      {/* Main Showcase Container */}
      <div className="relative bg-white/90 backdrop-blur-sm border border-[#E5DEC9] rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#243324]/5">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E4D2B]" />
            <span className="text-xs sm:text-sm font-bold text-[#1E4D2B] tracking-wide">
              100% 대한민국 산지 직송 원료
            </span>
          </div>
          <span className="text-xs font-semibold text-[#8C7D6B] bg-[#F7F4EE] px-2.5 py-1 rounded-md border border-[#E9E3D5]">
            식사대용 일반식품
          </span>
        </div>

        {/* Visual Showcase: Tumbler + Stick Pouch + Grain Garnish */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
          
          {/* Shaker Bottle Graphic */}
          <div className="relative flex flex-col items-center">
            {/* Shaker Cap */}
            <div className="w-16 h-7 bg-[#1E4D2B] rounded-t-xl border-b-2 border-[#163820] flex items-center justify-center shadow-sm">
              <div className="w-6 h-2 bg-[#2D6A4F] rounded-full" />
            </div>
            {/* Shaker Neck */}
            <div className="w-20 h-3 bg-[#E8E4D8] border-x border-[#D8D2C2]" />
            {/* Shaker Body */}
            <div className="w-28 h-52 bg-gradient-to-b from-[#F9F8F5]/80 via-white/70 to-[#F4EFE6] border-2 border-[#D8D2C2] rounded-b-2xl relative overflow-hidden shadow-inner flex flex-col justify-end p-2">
              {/* Measurement lines */}
              <div className="absolute top-4 right-2 flex flex-col gap-3 opacity-30 text-[9px] font-mono">
                <span>- 300ml</span>
                <span>- 200ml</span>
                <span>- 100ml</span>
              </div>
              
              {/* Liquid Wave (Nutritious grain shake) */}
              <div className="w-full h-36 bg-gradient-to-t from-[#4D7C56] via-[#759C75] to-[#9CBF96] rounded-b-xl relative overflow-hidden flex flex-col justify-between p-2 shadow-sm">
                {/* Shake bubbles / grain specks */}
                <div className="flex justify-around opacity-40">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-white" />
                  <span className="w-2 h-2 rounded-full bg-white opacity-60" />
                </div>
                
                {/* Text on bottle */}
                <div className="text-center bg-[#1E4D2B]/85 text-white py-1 px-1.5 rounded-md backdrop-blur-xs">
                  <p className="text-[10px] font-bold tracking-tight">하루생식 한잔</p>
                  <p className="text-[9px] opacity-90">200ml + 1포(30g)</p>
                </div>

                <div className="text-center text-[10px] font-medium text-emerald-100">
                  고소하고 담백한 맛
                </div>
              </div>
            </div>
            <span className="mt-2 text-xs font-bold text-[#55493A]">전용 에코 보틀</span>
          </div>

          {/* Stick Pouch Graphic */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-60 bg-gradient-to-b from-[#FDFCF8] via-[#FAF6ED] to-[#EFE7D8] border-2 border-[#D8D0BE] rounded-xl p-3 shadow-md flex flex-col justify-between relative transform rotate-2 hover:rotate-0 transition-transform">
              {/* Easy cut notch */}
              <div className="flex items-center justify-between border-b border-dashed border-[#D2C8B5] pb-2">
                <span className="text-[9px] font-bold text-[#8C7A65]">EASY CUT</span>
                <span className="text-[10px] text-[#A69985]">✂</span>
              </div>

              {/* Brand & Content on Stick */}
              <div className="text-center my-auto flex flex-col items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center text-[10px] font-bold">
                  生
                </span>
                <span className="text-[11px] font-black text-[#1E4D2B] leading-tight">
                  국내산 50곡<br />하루생식
                </span>
                <div className="w-6 h-0.5 bg-[#8C7A65]/40 my-1" />
                <span className="text-[9px] text-[#7A6E5D] leading-tight">
                  무가열 동결건조<br />자연 원물 100%
                </span>
              </div>

              {/* Net weight */}
              <div className="bg-[#1E4D2B] text-white text-center py-1 rounded text-[10px] font-bold">
                1포 30g
              </div>
            </div>
            <span className="mt-2 text-xs font-bold text-[#55493A]">개별 스틱 1포</span>
          </div>

          {/* Key Ingredient mini bowl representation */}
          <div className="hidden sm:flex flex-col gap-3 justify-center">
            <div className="bg-[#F8F5EE] border border-[#E5DEC9] p-2.5 rounded-xl flex items-center gap-2.5 shadow-2xs">
              <span className="w-7 h-7 rounded-lg bg-[#E2ECE3] text-[#1E4D2B] flex items-center justify-center font-bold text-xs">
                🌾
              </span>
              <div>
                <p className="text-xs font-bold text-[#2C241B]">통곡물 15종</p>
                <p className="text-[10px] text-[#7A6E5D]">현미·검은콩·율무</p>
              </div>
            </div>

            <div className="bg-[#F8F5EE] border border-[#E5DEC9] p-2.5 rounded-xl flex items-center gap-2.5 shadow-2xs">
              <span className="w-7 h-7 rounded-lg bg-[#E2ECE3] text-[#1E4D2B] flex items-center justify-center font-bold text-xs">
                🥬
              </span>
              <div>
                <p className="text-xs font-bold text-[#2C241B]">신선채소 20종</p>
                <p className="text-[10px] text-[#7A6E5D]">케일·신선초·양배추</p>
              </div>
            </div>

            <div className="bg-[#F8F5EE] border border-[#E5DEC9] p-2.5 rounded-xl flex items-center gap-2.5 shadow-2xs">
              <span className="w-7 h-7 rounded-lg bg-[#E2ECE3] text-[#1E4D2B] flex items-center justify-center font-bold text-xs">
                🍎
              </span>
              <div>
                <p className="text-xs font-bold text-[#2C241B]">과일·버섯 15종</p>
                <p className="text-[10px] text-[#7A6E5D]">사과·표고·해조류</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Micro-strip */}
        <div className="mt-4 pt-4 border-t border-[#F0ECE1] grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <Clock className="w-4 h-4 text-[#1E4D2B] mb-1" />
            <span className="text-xs font-bold text-[#352D23]">준비 30초</span>
            <span className="text-[11px] text-[#857764]">초간편 식사대용</span>
          </div>
          <div className="flex flex-col items-center border-x border-[#EFECE2]">
            <Leaf className="w-4 h-4 text-[#1E4D2B] mb-1" />
            <span className="text-xs font-bold text-[#352D23]">국내산 50종</span>
            <span className="text-[11px] text-[#857764]">곡물·채소 100%</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-[#1E4D2B] mb-1" />
            <span className="text-xs font-bold text-[#352D23]">무첨가 원칙</span>
            <span className="text-[11px] text-[#857764]">착색료·보존료 無</span>
          </div>
        </div>

      </div>
    </div>
  );
};
