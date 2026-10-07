import React, { useState } from 'react';
import { X, Search, PackageCheck, Clock, MapPin, Phone, Truck, AlertCircle } from 'lucide-react';
import { OrderRecord } from '../../server';

interface LookupOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LookupOrderModal: React.FC<LookupOrderModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setHasSearched(true);

    try {
      const res = await fetch(`/api/orders/lookup?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        setErrorMsg(data.error || '주문 정보를 찾을 수 없습니다.');
        setOrders([]);
      }
    } catch (err) {
      setErrorMsg('서버와 통신 중 문제가 발생했습니다.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '접수완료':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case '입금확인':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case '배송준비':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case '배송중':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case '배송완료':
        return 'bg-gray-100 text-gray-900 border-gray-300';
      default:
        return 'bg-zinc-100 text-zinc-800 border-zinc-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#DFD7C7] overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#FAF8F5] px-6 py-5 border-b border-[#E8E1D3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center font-bold text-sm">
              <Search className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-black text-[#1E4D2B]">내 주문 조회하기</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#EFECE5] hover:bg-[#E3DEC0] text-[#55493A] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <label className="block text-sm font-bold text-[#443828] mb-2">
              주문 시 입력한 전화번호 또는 주문번호
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="010-1234-5678 또는 주문번호 (예: SG-2610-1234)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 h-13 px-4 bg-white border border-[#D5CBBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 h-13 bg-[#1E4D2B] hover:bg-[#163820] text-white font-bold rounded-xl transition-all cursor-pointer shrink-0"
              >
                {loading ? '조회 중...' : '조회하기'}
              </button>
            </div>
            <p className="text-xs text-[#8C7D6B] mt-2">
              * 주문서에 적으신 연락처 뒷자리나 전체 번호로 간편하게 찾으실 수 있습니다.
            </p>
          </form>

          {/* Results list */}
          {hasSearched && (
            <div>
              {errorMsg && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {orders.length === 0 && !errorMsg && !loading && (
                <div className="py-12 text-center text-[#7E705E] bg-[#FAF8F5] rounded-2xl border border-[#ECE5D8]">
                  <p className="text-base font-bold">일치하는 주문 내역이 없습니다.</p>
                  <p className="text-xs mt-1">입력하신 전화번호를 다시 확인해 주세요.</p>
                </div>
              )}

              {orders.length > 0 && (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#FAF8F5] border border-[#E2D8C6] rounded-2xl p-5 text-sm space-y-2.5"
                    >
                      <div className="flex items-center justify-between border-b border-[#EBE4D5] pb-2.5">
                        <div>
                          <span className="text-xs font-bold text-[#8C7A65] block font-mono">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs text-[#7B6E5D]">{ord.formattedDate}</span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                            ord.orderStatus
                          )}`}
                        >
                          {ord.orderStatus}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6E604F]">주문 상품</span>
                        <span className="font-bold text-[#231E17]">
                          {ord.productName} ({ord.quantity}세트)
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6E604F]">받는 분</span>
                        <span className="font-semibold text-[#231E17]">
                          {ord.customerName} ({ord.phoneNumber})
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6E604F]">배송지</span>
                        <span className="font-medium text-[#231E17] text-right max-w-xs truncate">
                          {ord.address}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#6E604F]">결제 수단</span>
                        <span className="font-semibold text-[#1E4D2B]">
                          {ord.paymentDetail || ord.paymentMethod}
                        </span>
                      </div>

                      <div className="flex justify-between pt-2 border-t border-[#EBE4D5] text-base">
                        <span className="font-bold text-[#231E17]">결제 금액</span>
                        <span className="font-black text-[#1E4D2B]">
                          {ord.totalAmount.toLocaleString()}원 ({ord.paymentStatus})
                        </span>
                      </div>

                      {ord.trackingNumber && (
                        <div className="bg-white p-3 rounded-xl border border-[#DFD6C4] flex items-center justify-between text-xs font-bold">
                          <span className="flex items-center gap-1.5 text-[#1E4D2B]">
                            <Truck className="w-4 h-4" /> 우체국택배 송장번호
                          </span>
                          <span className="font-mono text-[#231E17]">{ord.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
