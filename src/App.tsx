/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { HowToEatSection } from './components/HowToEatSection';
import { ProductOrderSection } from './components/ProductOrderSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { LookupOrderModal } from './components/LookupOrderModal';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { AuthModal, AuthUser } from './components/AuthModal';
import { MobileOrderBar } from './components/MobileOrderBar';
import { PRODUCT_OPTIONS, ProductOption } from './data/saengsikData';
import { OrderRecord } from '../server';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('saengsik_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authIntentMessage, setAuthIntentMessage] = useState<string>('');
  const [pendingOrderAfterAuth, setPendingOrderAfterAuth] = useState(false);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedProductOption, setSelectedProductOption] = useState<ProductOption>(PRODUCT_OPTIONS[1]); // Default 2박스 세트
  const [ordersCount, setOrdersCount] = useState<number>(0);

  const fetchOrdersCount = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && typeof data.totalCount === 'number') {
        setOrdersCount(data.totalCount);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchOrdersCount();
    const interval = setInterval(fetchOrdersCount, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const handleOpenOrder = () => {
    if (!currentUser) {
      setAuthIntentMessage('주문하시려면 먼저 회원가입 또는 로그인이 필요합니다.');
      setPendingOrderAfterAuth(true);
      setIsAuthModalOpen(true);
      return;
    }
    setIsOrderModalOpen(true);
  };

  const handleSelectOptionAndOrder = (option: ProductOption) => {
    setSelectedProductOption(option);
    if (!currentUser) {
      setAuthIntentMessage('주문하시려면 먼저 회원가입 또는 로그인이 필요합니다.');
      setPendingOrderAfterAuth(true);
      setIsAuthModalOpen(true);
      return;
    }
    setIsOrderModalOpen(true);
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('saengsik_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    // If user clicked order before auth, proceed directly to order modal
    if (pendingOrderAfterAuth) {
      setPendingOrderAfterAuth(false);
      setIsOrderModalOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('saengsik_user');
    } catch {
      // ignore
    }
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  const handleOrderPlaced = (newOrder: OrderRecord) => {
    setOrdersCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#242A24] selection:bg-[#D5E6D5] selection:text-[#1E4D2B]">
      {/* Top Navigation with "윤성미 님 환영합니다" when logged in */}
      <Navbar
        onOpenOrder={handleOpenOrder}
        onOpenLookup={() => setIsLookupModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenAuth={() => {
          setAuthIntentMessage('');
          setPendingOrderAfterAuth(false);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
        currentUser={currentUser}
        orderCount={ordersCount}
      />

      {/* Hero Section: '하루한잔, 간편한 한끼' + Big Order Button */}
      <HeroSection onOpenOrder={handleOpenOrder} />

      {/* 50 Domestic Grains & Vegetables Section */}
      <IngredientsSection />

      {/* '이런 분께 좋아요' 3가지 추천 대상 */}
      <TargetAudienceSection />

      {/* '물이나 우유에 타서 드세요' 1 → 2 → 3 단계 섭취법 */}
      <HowToEatSection />

      {/* 1개 상품과 가격, 큰 '주문하기' 버튼 */}
      <ProductOrderSection onSelectOptionAndOrder={handleSelectOptionAndOrder} />

      {/* 자주 묻는 질문 FAQ (일반식품 기준 준수) */}
      <FaqSection />

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* Mobile Sticky Order Bar */}
      <MobileOrderBar
        onOpenOrder={handleOpenOrder}
        selectedOption={selectedProductOption}
      />

      {/* Login & Signup Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingOrderAfterAuth(false);
        }}
        onSuccess={handleAuthSuccess}
        intentMessage={authIntentMessage}
      />

      {/* Real Full-Stack Interactive Order Modal (Requires Login) */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
        initialOption={selectedProductOption}
        onOrderPlaced={handleOrderPlaced}
        currentUser={currentUser}
      />

      {/* Customer Order Lookup Tracker Modal */}
      <LookupOrderModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
      />

      {/* Store Owner / Admin Orders Management Modal */}
      <AdminOrdersModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          fetchOrdersCount();
        }}
      />
    </div>
  );
}
