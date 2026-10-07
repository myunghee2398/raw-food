import React, { useState, useEffect } from 'react';
import { ProductOption, PRODUCT_OPTIONS } from '../data/saengsikData';
import {
  X,
  CheckCircle,
  Copy,
  Check,
  ShoppingBag,
  CreditCard,
  Truck,
  Phone,
  AlertCircle,
  Loader2,
  UserCheck,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { OrderRecord } from '../../server';
import { AuthUser } from './AuthModal';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOption: ProductOption;
  onOrderPlaced?: (order: OrderRecord) => void;
  currentUser?: AuthUser | null;
}

type PaymentMethodType = 'card' | 'kakaopay' | 'naverpay' | 'tosspay' | 'bank';

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialOption,
  onOrderPlaced,
  currentUser,
}) => {
  // Navigation Steps: 'info' -> 'payment' -> 'complete'
  const [step, setStep] = useState<'info' | 'payment' | 'complete'>('info');

  const [selectedOption, setSelectedOption] = useState<ProductOption>(initialOption);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>(currentUser?.name || '윤성미');
  const [phoneNumber, setPhoneNumber] = useState<string>(currentUser?.phone || '010-1234-5678');
  const [address, setAddress] = useState<string>('서울시 강남구 테헤란로 123 101동 202호');
  const [deliveryNote, setDeliveryNote] = useState<string>('부재 시 문 앞에 놓아주세요');

  // Payment State (Practice Simulation)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [cardNumber, setCardNumber] = useState<string>('1111-2222-3333-4444'); // Pre-filled as requested!
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('777');
  const [cardPassword, setCardPassword] = useState<string>('00');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Sync initialOption & currentUser
  useEffect(() => {
    setSelectedOption(initialOption);
  }, [initialOption]);

  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.name);
      if (!phoneNumber) setPhoneNumber(currentUser.phone);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const shippingFee = selectedOption.id === 'box-1' ? 3000 : 0;
  const totalPrice = selectedOption.salePrice * quantity + shippingFee;

  // Move from Order Info to Payment Screen
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim() || !address.trim()) {
      setErrorMessage('성함, 연락처, 배송지 주소를 모두 입력해주세요.');
      return;
    }
    setErrorMessage('');
    setStep('payment');
  };

  // Execute Simulated Payment & Create Order
  const handleExecutePayment = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    // Generate Order Number in requested format: ORD-YYYYMMDD-XXXX (e.g. ORD-20261007-3843)
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randomSuffix}`;

    let paymentDetail = '';
    if (paymentMethod === 'card') {
      paymentDetail = `신용/체크카드 (${cardNumber})`;
    } else if (paymentMethod === 'kakaopay') {
      paymentDetail = '카카오페이 (간편결제)';
    } else if (paymentMethod === 'naverpay') {
      paymentDetail = '네이버페이 (포인트결제)';
    } else if (paymentMethod === 'tosspay') {
      paymentDetail = '토스페이 (간편결제)';
    } else {
      paymentDetail = '무통장 입금 (농협은행)';
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber,
          customerName: customerName.trim(),
          phoneNumber: phoneNumber.trim(),
          address: address.trim(),
          deliveryNote: deliveryNote.trim(),
          productId: selectedOption.id,
          productName: selectedOption.name,
          countText: selectedOption.countText,
          unitPrice: selectedOption.salePrice,
          quantity,
          shippingFee,
          paymentMethod,
          paymentDetail,
        }),
      });

      const data = await response.json();

      if (data.success && data.order) {
        setCreatedOrder(data.order);
        setStep('complete');
        if (onOrderPlaced) {
          onOrderPlaced(data.order);
        }
      } else {
        setErrorMessage(data.error || '결제 처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('Payment order submission error:', err);
      setErrorMessage('서버 연결 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyOrderSummary = () => {
    if (!createdOrder) return;
    const summary = `[하루한잔 생식 주문완료]\n주문번호: ${createdOrder.orderNumber}\n받는분: ${createdOrder.customerName}\n연락처: ${createdOrder.phoneNumber}\n상품: ${createdOrder.productName} (${createdOrder.quantity}세트)\n결제금액: ${createdOrder.totalAmount.toLocaleString()}원 (${createdOrder.paymentDetail})\n배송지: ${createdOrder.address}\n배송메모: ${createdOrder.deliveryNote}\n* 본 주문은 연습용 결제로 정상 접수되었습니다.`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleResetAndClose = () => {
    setStep('info');
    setCreatedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#DFD7C7] overflow-hidden my-6">
        
        {/* Top Modal Header */}
        <div className="bg-[#FAF8F5] px-6 py-4.5 border-b border-[#E8E1D3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center font-bold text-sm">
              生
            </span>
            <h3 className="text-xl font-black text-[#1E4D2B]">
              {step === 'info' && '1단계: 주문 및 배송지 정보'}
              {step === 'payment' && '2단계: 연습용 가짜 결제'}
              {step === 'complete' && '주문완료'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-[#EFECE5] hover:bg-[#E3DEC0] text-[#55493A] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[82vh] overflow-y-auto">
          
          {/* STEP 1: ORDER & SHIPPING INFO */}
          {step === 'info' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {currentUser && (
                <div className="bg-[#EAF2EA] border border-[#BFD9BE] p-3 rounded-xl flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#1E4D2B] font-bold">
                    <UserCheck className="w-4 h-4 text-[#1E4D2B]" />
                    <span>주문 고객: <strong>{currentUser.name} 님</strong> ({currentUser.email})</span>
                  </div>
                  <span className="text-[11px] text-[#557755] font-semibold">회원 주문</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Product Option Selector */}
              <div>
                <label className="block text-sm font-bold text-[#382F24] mb-2">
                  상품 구성 선택
                </label>
                <div className="space-y-2">
                  {PRODUCT_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedOption(opt)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedOption.id === opt.id
                          ? 'border-[#1E4D2B] bg-[#F2F7F2]'
                          : 'border-[#E5DEC9] bg-[#FAF8F5]'
                      }`}
                    >
                      <div>
                        <p className="text-base font-bold text-[#231E17]">{opt.name}</p>
                        {opt.bonusText && (
                          <p className="text-xs text-[#1E4D2B] font-medium mt-0.5">{opt.bonusText}</p>
                        )}
                      </div>
                      <span className="text-base font-black text-[#1E4D2B] font-mono">
                        {opt.salePrice.toLocaleString()}원
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center justify-between bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E5DEC9]">
                <span className="text-base font-bold text-[#352C22]">주문 세트 수량</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-[#D5CBBA] font-bold text-lg flex items-center justify-center hover:bg-[#F0ECE1] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-black text-lg text-[#231E17]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg bg-white border border-[#D5CBBA] font-bold text-lg flex items-center justify-center hover:bg-[#F0ECE1] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Recipient Information Form */}
              <div className="space-y-3.5">
                <h4 className="text-base font-bold text-[#2F261C] border-b border-[#EDE6D8] pb-1.5 flex items-center justify-between">
                  <span>배송 받으실 분 정보</span>
                  <span className="text-xs font-normal text-[#8A7B69]">* 입력 후 결제 단계로 이동합니다</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-[#5C4F40] mb-1">
                    받는 분 성함 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-12 px-3.5 bg-white border border-[#D8CEBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C4F40] mb-1">
                    연락처 (휴대폰 번호) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-12 px-3.5 bg-white border border-[#D8CEBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C4F40] mb-1">
                    배송지 주소 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="도로명 주소 및 상세 주소"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-12 px-3.5 bg-white border border-[#D8CEBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C4F40] mb-1">
                    배송 요청사항
                  </label>
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-[#D8CEBA] rounded-xl text-sm text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                  />
                </div>
              </div>

              {/* Amount Summary */}
              <div className="bg-[#FAF8F4] border border-[#E2D8C6] rounded-2xl p-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-[#615343]">
                  <span>상품 금액</span>
                  <span>{(selectedOption.salePrice * quantity).toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-[#615343]">
                  <span>배송비</span>
                  <span>{shippingFee === 0 ? '무료배송' : `${shippingFee.toLocaleString()}원`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#ECE3D5] text-lg font-black text-[#1E4D2B]">
                  <span>결제 예정 금액</span>
                  <span className="font-mono">{totalPrice.toLocaleString()}원</span>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button
                type="submit"
                className="w-full h-16 bg-[#1E4D2B] hover:bg-[#163820] active:scale-98 text-white font-black text-xl rounded-2xl shadow-lg shadow-[#1E4D2B]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>결제 화면으로 이동하기</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </form>
          )}

          {/* STEP 2: PRACTICE SIMULATED PAYMENT SCREEN */}
          {step === 'payment' && (
            <div className="space-y-6">
              
              {/* BIG MANDATORY WARNING BANNER: 실제로 결제되지 않는 연습용 입니다 */}
              <div className="bg-amber-500 text-white rounded-2xl p-4 sm:p-5 shadow-md border-2 border-amber-600 text-center animate-pulse">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ShieldAlert className="w-6 h-6 text-white shrink-0" />
                  <span className="text-xl sm:text-2xl font-black tracking-tight">
                    실제로 결제되지 않는 연습용 입니다
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-amber-100">
                  실제 돈이 결제되거나 빠져나가지 않는 안전한 모의 테스트 결제 화면입니다.
                </p>
              </div>

              {/* Order Amount Recap */}
              <div className="bg-[#FAF8F5] border border-[#DFD6C2] rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#80705E] font-bold block">주문 상품 및 수량</span>
                  <p className="text-base font-black text-[#261E16]">
                    {selectedOption.name} × {quantity}개
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#80705E] font-bold block">결제 금액</span>
                  <span className="text-2xl font-black text-[#1E4D2B] font-mono">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* Payment Method Tabs (카카오페이, 네이버페이, 토스페이, 신용카드, 무통장) */}
              <div>
                <label className="block text-sm font-black text-[#382F24] mb-2.5">
                  결제 수단 선택 (연습 결제)
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {/* 신용/체크카드 */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#1E4D2B] bg-[#F2F7F2] text-[#1E4D2B] shadow-2xs'
                        : 'border-[#E2D9C7] bg-[#FAF8F5] text-[#554737] hover:bg-[#F2ECE0]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#1E4D2B]" />
                    <span>신용/체크카드</span>
                  </button>

                  {/* 카카오페이 */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('kakaopay')}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'kakaopay'
                        ? 'border-[#3C1E1E] bg-[#FEE500] text-[#3C1E1E] shadow-2xs'
                        : 'border-[#E2D9C7] bg-[#FAF8F5] text-[#554737] hover:bg-[#F2ECE0]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-[#3C1E1E] text-[#FEE500] font-black text-xs flex items-center justify-center">
                      k
                    </span>
                    <span>카카오페이</span>
                  </button>

                  {/* 네이버페이 */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('naverpay')}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'naverpay'
                        ? 'border-[#03C75A] bg-[#E8F8EE] text-[#03C75A] shadow-2xs'
                        : 'border-[#E2D9C7] bg-[#FAF8F5] text-[#554737] hover:bg-[#F2ECE0]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-[#03C75A] text-white font-black text-xs flex items-center justify-center">
                      N
                    </span>
                    <span>네이버페이</span>
                  </button>

                  {/* 토스페이 */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tosspay')}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'tosspay'
                        ? 'border-[#0064FF] bg-[#EDF4FF] text-[#0064FF] shadow-2xs'
                        : 'border-[#E2D9C7] bg-[#FAF8F5] text-[#554737] hover:bg-[#F2ECE0]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-[#0064FF] text-white font-black text-xs flex items-center justify-center">
                      t
                    </span>
                    <span>토스페이</span>
                  </button>
                </div>
              </div>

              {/* PAYMENT DETAILS PER METHOD */}
              
              {/* Option 1: Credit Card with Pre-filled 1111-2222-3333-4444 */}
              {paymentMethod === 'card' && (
                <div className="bg-[#FAF8F4] border-2 border-[#DCD3BF] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8DFCB] pb-2">
                    <span className="text-sm font-bold text-[#2A2218]">신용 / 체크카드 정보 입력</span>
                    <span className="text-xs font-bold text-[#1E4D2B] bg-[#E5EFE5] px-2.5 py-0.5 rounded-full">
                      연습용 카드번호 자동입력됨
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#554737] mb-1">
                      카드번호 (미리 입력된 번호로 바로 결제 가능) *
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1111-2222-3333-4444"
                      className="w-full h-12 px-3.5 bg-white border-2 border-[#1E4D2B] rounded-xl text-lg font-black text-[#1E4D2B] font-mono tracking-widest focus:outline-hidden"
                    />
                    <p className="text-[11px] text-[#7A6C5B] mt-1 font-medium">
                      ✓ 연습용 가상 카드번호 <strong className="text-[#1E4D2B]">1111-2222-3333-4444</strong>가 입력되어 있습니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#554737] mb-1">
                        유효기간
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full h-11 px-3 bg-white border border-[#D5CBBA] rounded-xl text-sm font-bold text-center font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#554737] mb-1">
                        CVC 3자리
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full h-11 px-3 bg-white border border-[#D5CBBA] rounded-xl text-sm font-bold text-center font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#554737] mb-1">
                        비밀번호 앞 2자리
                      </label>
                      <input
                        type="password"
                        value={cardPassword}
                        onChange={(e) => setCardPassword(e.target.value)}
                        className="w-full h-11 px-3 bg-white border border-[#D5CBBA] rounded-xl text-sm font-bold text-center font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Option 2: Kakao Pay Simulation */}
              {paymentMethod === 'kakaopay' && (
                <div className="bg-[#FFFDE8] border-2 border-[#FEE500] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#3C1E1E]">카카오페이 원클릭 결제</span>
                    <span className="text-xs font-bold bg-[#FEE500] text-[#3C1E1E] px-2.5 py-0.5 rounded-full">
                      가상 머니 충전완료
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C4530] leading-relaxed">
                    카카오톡 계정의 페이머니/등록 카드로 안전하게 모의 결제됩니다.<br />
                    아래 결제하기 버튼을 누르면 즉시 주문 완료 처리됩니다.
                  </p>
                </div>
              )}

              {/* Option 3: Naver Pay Simulation */}
              {paymentMethod === 'naverpay' && (
                <div className="bg-[#F0FAF3] border-2 border-[#03C75A] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#03C75A]">네이버페이 포인트 간편결제</span>
                    <span className="text-xs font-bold bg-[#03C75A] text-white px-2.5 py-0.5 rounded-full">
                      가상 포인트 충전완료
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#355E40] leading-relaxed">
                    네이버페이 포인트 및 등록 계좌로 모의 결제됩니다.<br />
                    실제 돈은 출금되지 않으며, 즉시 주문이 완료됩니다.
                  </p>
                </div>
              )}

              {/* Option 4: Toss Pay Simulation */}
              {paymentMethod === 'tosspay' && (
                <div className="bg-[#F3F8FF] border-2 border-[#0064FF] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0064FF]">토스페이 1초 간편결제</span>
                    <span className="text-xs font-bold bg-[#0064FF] text-white px-2.5 py-0.5 rounded-full">
                      가상 잔액 보유중
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#34517A] leading-relaxed">
                    토스 앱 연동 없이 바로 모의 승인되는 연습용 결제입니다.<br />
                    원클릭으로 간편하게 주문을 완료할 수 있습니다.
                  </p>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="h-16 px-5 bg-[#EFECE5] hover:bg-[#E4DFC0] text-[#4F4335] font-bold text-base rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>이전</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleExecutePayment}
                  className="flex-1 h-16 bg-[#1E4D2B] hover:bg-[#163820] active:scale-98 text-white font-black text-xl rounded-2xl shadow-lg shadow-[#1E4D2B]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>연습 결제 승인 중...</span>
                    </>
                  ) : (
                    <>
                      <span>{totalPrice.toLocaleString()}원 결제하기</span>
                      <Sparkles className="w-5 h-5 text-emerald-200" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-[#827463] font-medium">
                * [결제하기] 클릭 시 즉시 주문번호가 발급되며 <strong>주문완료</strong> 화면으로 이동합니다.
              </p>
            </div>
          )}

          {/* STEP 3: ORDER COMPLETED SCREEN ("주문완료") */}
          {step === 'complete' && createdOrder && (
            <div className="text-center py-2 space-y-4">
              
              {/* Big Success Icon */}
              <div className="w-20 h-20 rounded-full bg-[#E5F3E5] text-[#1E4D2B] flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>

              {/* Title & Order Number */}
              <div>
                <span className="text-xs font-bold text-[#1E4D2B] bg-[#E8EFE8] px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  연습 결제 승인 완료
                </span>
                <h4 className="text-3xl font-black text-[#231E17] mb-1">
                  주문완료
                </h4>
                <p className="text-base text-[#594C3B] font-medium">
                  {createdOrder.customerName}님의 주문이 성공적으로 접수되었습니다!
                </p>
              </div>

              {/* Order Number Callout Box (예시: ORD-20261001-3843) */}
              <div className="bg-[#FAF8F5] border-2 border-[#1E4D2B] rounded-2xl p-4 text-center shadow-xs">
                <span className="text-xs text-[#7B6E5D] font-bold block mb-1">
                  발급된 주문번호
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#1E4D2B] font-mono tracking-wider select-all">
                  {createdOrder.orderNumber}
                </span>
                <p className="text-[11px] text-[#7B6E5D] mt-1">
                  (상단 [주문 조회] 메뉴에서 위 주문번호로 언제든 확인하실 수 있습니다)
                </p>
              </div>

              {/* Order Details Receipt Box */}
              <div className="bg-white border-2 border-[#E5DDCB] rounded-2xl p-4.5 text-left space-y-2.5 text-sm sm:text-base">
                <div className="flex justify-between border-b border-[#F0EBE0] pb-2">
                  <span className="text-[#756653]">주문 상품</span>
                  <span className="font-bold text-[#231E17]">{createdOrder.productName}</span>
                </div>
                <div className="flex justify-between border-b border-[#F0EBE0] pb-2">
                  <span className="text-[#756653]">주문 수량</span>
                  <span className="font-bold text-[#231E17]">{createdOrder.quantity}세트</span>
                </div>
                <div className="flex justify-between border-b border-[#F0EBE0] pb-2">
                  <span className="text-[#756653]">결제 수단</span>
                  <span className="font-bold text-[#1E4D2B]">{createdOrder.paymentDetail}</span>
                </div>
                <div className="flex justify-between border-b border-[#F0EBE0] pb-2">
                  <span className="text-[#756653]">받는 분 성함</span>
                  <span className="font-medium text-[#231E17]">{createdOrder.customerName} ({createdOrder.phoneNumber})</span>
                </div>
                <div className="flex justify-between border-b border-[#F0EBE0] pb-2">
                  <span className="text-[#756653]">배송지 주소</span>
                  <span className="font-medium text-[#231E17] text-right max-w-xs truncate">{createdOrder.address}</span>
                </div>
                <div className="flex justify-between pt-1 text-base sm:text-lg">
                  <span className="font-bold text-[#231E17]">최종 결제 금액</span>
                  <span className="font-black text-[#1E4D2B] font-mono">{createdOrder.totalAmount.toLocaleString()}원</span>
                </div>
              </div>

              {/* Notice that no real money was charged */}
              <div className="bg-[#FAF5EB] border border-[#E9DFCE] rounded-xl p-3 text-xs text-[#7B6B58] text-center font-medium">
                🛡️ <strong>안내:</strong> 본 주문은 연습용 모의 결제로 진행되어 <strong>실제 비용이 청구되지 않았습니다.</strong>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={copyOrderSummary}
                  className="flex-1 h-14 bg-[#F0ECE1] hover:bg-[#E5DFD1] text-[#3D3325] font-bold text-sm sm:text-base rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {copiedSummary ? <Check className="w-4 h-4 text-[#1E4D2B]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSummary ? '주문내역 복사완료' : '주문내역 카톡/문자용 복사'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 h-14 bg-[#1E4D2B] hover:bg-[#163820] text-white font-bold text-base rounded-xl shadow-md transition-all cursor-pointer"
                >
                  확인 및 완료
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
