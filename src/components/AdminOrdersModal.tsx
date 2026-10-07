import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  RefreshCw,
  Download,
  Phone,
  MapPin,
  Truck,
  Copy,
  Check,
  Trash2,
  Search,
  Bell,
  CheckCircle,
  Package,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { OrderRecord } from '../../server';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // New order detection & live notification
  const [newOrderNotice, setNewOrderNotice] = useState<string | null>(null);
  const [newlyAddedId, setNewlyAddedId] = useState<string | null>(null);
  const previousCountRef = useRef<number>(0);
  const isFirstLoadRef = useRef<boolean>(true);

  // Web Audio pleasant notification chime
  const playChimeSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio autoplay may be restricted, fail gracefully
    }
  };

  const fetchOrders = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        const incomingOrders: OrderRecord[] = data.orders;

        // Check if a new order arrived while viewing
        if (!isFirstLoadRef.current && incomingOrders.length > previousCountRef.current) {
          const newest = incomingOrders[0];
          setNewOrderNotice(`새 주문 도착! [${newest.customerName} 님 · ${newest.orderNumber}]`);
          setNewlyAddedId(newest.id);
          playChimeSound();

          setTimeout(() => {
            setNewOrderNotice(null);
          }, 6000);
          setTimeout(() => {
            setNewlyAddedId(null);
          }, 8000);
        }

        isFirstLoadRef.current = false;
        previousCountRef.current = incomingOrders.length;
        setOrders(incomingOrders);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  // Initial load when opened
  useEffect(() => {
    if (isOpen) {
      isFirstLoadRef.current = true;
      fetchOrders();
    }
  }, [isOpen]);

  // Real-time automatic polling every 2.5 seconds (새 주문 자동 감지)
  useEffect(() => {
    if (!isOpen) return;

    const intervalId = setInterval(() => {
      fetchOrders(true);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  if (!isOpen) return null;

  // Change order status (e.g., '배송중', '배송완료')
  const handleUpdateStatus = async (orderId: string, newStatus: OrderRecord['orderStatus']) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderStatus: newStatus,
          paymentStatus:
            newStatus === '입금확인' || newStatus === '배송중' || newStatus === '배송완료'
              ? '결제완료 (연습결제)'
              : '입금대기',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('이 주문 내역을 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        previousCountRef.current = Math.max(0, previousCountRef.current - 1);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const copyAddressAndInfo = (ord: OrderRecord) => {
    const text = `[택배송장접수용]\n받는분: ${ord.customerName}\n연락처: ${ord.phoneNumber}\n주소: ${ord.address}\n배송메모: ${ord.deliveryNote}\n상품명: ${ord.productName} (${ord.quantity}세트)\n주문번호: ${ord.orderNumber}`;
    navigator.clipboard.writeText(text);
    setCopiedId(ord.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCsv = () => {
    if (orders.length === 0) {
      alert('다운로드할 주문 내역이 없습니다.');
      return;
    }
    const headers = ['주문번호,주문일시,주문자,연락처,배송지주소,배송요청,상품명,수량,결제금액,결제수단,주문상태'];
    const rows = orders.map((o) =>
      `"${o.orderNumber}","${o.formattedDate}","${o.customerName}","${o.phoneNumber}","${o.address.replace(/"/g, '""')}","${o.deliveryNote}","${o.productName}","${o.quantity}","${o.totalAmount}","${o.paymentDetail || o.paymentMethod}","${o.orderStatus}"`
    );
    const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `생식_주문관리_접수목록_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Filtered orders based on status & search query
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.orderStatus === filterStatus;
    const cleanSearch = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !cleanSearch ||
      o.customerName.toLowerCase().includes(cleanSearch) ||
      o.phoneNumber.includes(cleanSearch) ||
      o.orderNumber.toLowerCase().includes(cleanSearch) ||
      o.address.toLowerCase().includes(cleanSearch);
    return matchesStatus && matchesSearch;
  });

  // Summary counts
  const countNew = orders.filter((o) => o.orderStatus === '접수완료' || o.orderStatus === '입금확인').length;
  const countShipping = orders.filter((o) => o.orderStatus === '배송중').length;
  const countDelivered = orders.filter((o) => o.orderStatus === '배송완료').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const getStatusBadge = (status: OrderRecord['orderStatus']) => {
    switch (status) {
      case '접수완료':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case '입금확인':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case '배송준비':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case '배송중':
        return 'bg-purple-100 text-purple-900 border-purple-400 font-bold';
      case '배송완료':
        return 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
      default:
        return 'bg-zinc-100 text-zinc-800 border-zinc-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-[#DFD7C7] overflow-hidden my-4 flex flex-col max-h-[94vh]">
        
        {/* Top Header Bar */}
        <div className="bg-[#1E4D2B] text-white px-6 py-4.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-white/15 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              管
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black">판매자 실시간 주문관리</h3>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-[11px] font-bold text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  실시간 자동감지 중 (새로고침 불필요)
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                외부 손님이 주문하면 새로고침 없이 즉시 목록에 추가됩니다
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchOrders(false)}
              disabled={loading}
              className="px-3 py-2 bg-white/15 hover:bg-white/25 rounded-xl transition-all cursor-pointer text-white flex items-center gap-1.5 text-xs font-bold"
              title="지금 수동 새로고침"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">즉시 새로고침</span>
            </button>

            <button
              onClick={exportToCsv}
              className="px-3 py-2 bg-white/15 hover:bg-white/25 rounded-xl transition-all cursor-pointer text-white flex items-center gap-1.5 text-xs font-bold"
              title="엑셀(CSV) 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span>엑셀 다운로드</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-white/15 hover:bg-white/25 rounded-xl transition-all cursor-pointer text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time New Order Banner Notification */}
        {newOrderNotice && (
          <div className="bg-amber-500 text-white px-6 py-3 font-bold text-sm sm:text-base flex items-center justify-between shadow-md animate-bounce">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-white animate-spin" />
              <span>{newOrderNotice}</span>
            </div>
            <span className="text-xs bg-amber-600 px-2 py-1 rounded-md">실시간 자동 추가됨</span>
          </div>
        )}

        {/* At a Glance Summary Stats Cards */}
        <div className="bg-[#FAF8F5] border-b border-[#E8E1D3] p-4 sm:px-6 shrink-0 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white border border-[#E5DEC9] p-3 rounded-2xl shadow-2xs">
            <span className="text-xs text-[#80705F] font-bold block">전체 주문</span>
            <span className="text-xl sm:text-2xl font-black text-[#1E4D2B] font-mono">
              {orders.length}
            </span>
            <span className="text-xs text-[#80705F] ml-1">건</span>
          </div>

          <div className="bg-white border border-[#E5DEC9] p-3 rounded-2xl shadow-2xs">
            <span className="text-xs text-[#80705F] font-bold block">신규/입금확인</span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 font-mono">
              {countNew}
            </span>
            <span className="text-xs text-[#80705F] ml-1">건</span>
          </div>

          <div className="bg-white border border-[#E5DEC9] p-3 rounded-2xl shadow-2xs">
            <span className="text-xs text-[#80705F] font-bold block">배송중</span>
            <span className="text-xl sm:text-2xl font-black text-purple-600 font-mono">
              {countShipping}
            </span>
            <span className="text-xs text-[#80705F] ml-1">건</span>
          </div>

          <div className="bg-white border border-[#E5DEC9] p-3 rounded-2xl shadow-2xs">
            <span className="text-xs text-[#80705F] font-bold block">배송완료</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
              {countDelivered}
            </span>
            <span className="text-xs text-[#80705F] ml-1">건</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white border border-[#E5DEC9] p-3 rounded-2xl shadow-2xs">
            <span className="text-xs text-[#80705F] font-bold block">총 주문금액</span>
            <span className="text-xl sm:text-2xl font-black text-[#1E4D2B] font-mono">
              {totalRevenue.toLocaleString()}
            </span>
            <span className="text-xs text-[#80705F] ml-0.5">원</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white px-6 py-3 border-b border-[#E8E1D3] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-[#1E4D2B] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#554737] border border-[#DDD3BE]'
              }`}
            >
              전체 ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('입금확인')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterStatus === '입금확인'
                  ? 'bg-[#1E4D2B] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#554737] border border-[#DDD3BE]'
              }`}
            >
              입금확인 ({orders.filter((o) => o.orderStatus === '입금확인').length})
            </button>
            <button
              onClick={() => setFilterStatus('배송중')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterStatus === '배송중'
                  ? 'bg-[#1E4D2B] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#554737] border border-[#DDD3BE]'
              }`}
            >
              배송중 ({orders.filter((o) => o.orderStatus === '배송중').length})
            </button>
            <button
              onClick={() => setFilterStatus('배송완료')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterStatus === '배송완료'
                  ? 'bg-[#1E4D2B] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#554737] border border-[#DDD3BE]'
              }`}
            >
              배송완료 ({orders.filter((o) => o.orderStatus === '배송완료').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="주문자, 전화번호, 주문번호 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-3 text-xs bg-[#FAF8F5] border border-[#D5CBBA] rounded-xl focus:outline-hidden focus:border-[#1E4D2B]"
            />
            <Search className="w-4 h-4 text-[#8C7A65] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* MAIN ORDERS TABLE VIEW */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-[#7F705D] bg-[#FAF8F5] rounded-3xl border border-[#E9E1CE]">
              <Package className="w-12 h-12 text-[#B8AB96] mx-auto mb-3" />
              <p className="text-lg font-bold">접수된 주문이 없습니다.</p>
              <p className="text-xs text-[#9E8F7A] mt-1">
                외부 손님이 주문서를 결제하면 새로고침 없이 즉시 이 표에 자동으로 등록됩니다.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-[#E5DEC9] rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b-2 border-[#E5DEC9] text-xs font-bold text-[#554737]">
                    <th className="py-3.5 px-4 whitespace-nowrap">주문번호 / 일시</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">주문자 정보</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">주문 상품</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">결제 금액 / 수단</th>
                    <th className="py-3.5 px-4 whitespace-nowrap text-center">현재 상태</th>
                    <th className="py-3.5 px-4 whitespace-nowrap text-center">
                      상태 변경 (배송중 / 배송완료)
                    </th>
                    <th className="py-3.5 px-3 text-center whitespace-nowrap">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFEAE0]">
                  {filteredOrders.map((ord) => {
                    const isNewlyAdded = newlyAddedId === ord.id;
                    return (
                      <tr
                        key={ord.id}
                        className={`transition-colors hover:bg-[#FAF8F4] ${
                          isNewlyAdded ? 'bg-amber-50 animate-pulse' : ''
                        }`}
                      >
                        {/* 1. 주문번호 / 일시 */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex flex-col">
                            <span className="font-mono font-black text-[#1E4D2B] text-sm whitespace-nowrap">
                              {ord.orderNumber}
                            </span>
                            <span className="text-[11px] text-[#8C7A65] mt-0.5 whitespace-nowrap">
                              {ord.formattedDate}
                            </span>
                            {isNewlyAdded && (
                              <span className="mt-1 inline-block text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded-md w-fit">
                                NEW 방금 접수
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 2. 주문자 정보 */}
                        <td className="py-4 px-4 align-top max-w-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-base text-[#241E16]">
                                {ord.customerName}
                              </span>
                              <a
                                href={`tel:${ord.phoneNumber}`}
                                className="text-xs text-[#1E4D2B] font-semibold underline flex items-center gap-0.5 whitespace-nowrap"
                              >
                                <Phone className="w-3 h-3" />
                                {ord.phoneNumber}
                              </a>
                            </div>
                            <p className="text-xs text-[#5C4F3E] mt-1 leading-snug">
                              {ord.address}
                            </p>
                            {ord.deliveryNote && (
                              <p className="text-[11px] text-[#8C7B68] italic mt-0.5">
                                메모: {ord.deliveryNote}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* 3. 주문 상품 */}
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <div>
                            <p className="font-bold text-[#1E4D2B]">{ord.productName}</p>
                            <span className="text-xs text-[#7B6E5D] bg-[#F4EFE6] px-2 py-0.5 rounded-md font-medium inline-block mt-0.5">
                              수량: {ord.quantity}세트 ({ord.countText})
                            </span>
                          </div>
                        </td>

                        {/* 4. 결제 금액 / 수단 */}
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <div>
                            <p className="font-black text-base text-[#261E16] font-mono">
                              {ord.totalAmount.toLocaleString()}원
                            </p>
                            <span className="text-[11px] text-[#7A6D5C] block mt-0.5">
                              {ord.paymentDetail || ord.paymentMethod}
                            </span>
                            <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-sm inline-block mt-1 font-semibold">
                              {ord.paymentStatus}
                            </span>
                          </div>
                        </td>

                        {/* 5. 현재 상태 배지 */}
                        <td className="py-4 px-4 align-top text-center whitespace-nowrap">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs border ${getStatusBadge(
                              ord.orderStatus
                            )}`}
                          >
                            {ord.orderStatus}
                          </span>
                        </td>

                        {/* 6. 상태 변경 버튼 (배송중, 배송완료) - REQUIRED */}
                        <td className="py-4 px-4 align-top text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            {/* 배송중으로 바꾸는 버튼 */}
                            <button
                              type="button"
                              disabled={updatingId === ord.id || ord.orderStatus === '배송중'}
                              onClick={() => handleUpdateStatus(ord.id, '배송중')}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1 ${
                                ord.orderStatus === '배송중'
                                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                              }`}
                              title="상태를 배송중으로 변경"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>배송중</span>
                            </button>

                            {/* 배송완료로 바꾸는 버튼 */}
                            <button
                              type="button"
                              disabled={updatingId === ord.id || ord.orderStatus === '배송완료'}
                              onClick={() => handleUpdateStatus(ord.id, '배송완료')}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1 ${
                                ord.orderStatus === '배송완료'
                                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              }`}
                              title="상태를 배송완료로 변경"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>배송완료</span>
                            </button>
                          </div>
                        </td>

                        {/* 7. 송장 복사 및 삭제 */}
                        <td className="py-4 px-3 align-top text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => copyAddressAndInfo(ord)}
                              className="p-1.5 bg-[#FAF7F0] hover:bg-[#F0ECE1] text-[#1E4D2B] border border-[#DDD3BE] rounded-lg transition-colors cursor-pointer text-xs"
                              title="택배 송장용 주소 복사"
                            >
                              {copiedId === ord.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteOrder(ord.id)}
                              className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer rounded-lg hover:bg-red-50"
                              title="주문 내역 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-[#FAF8F5] px-6 py-3 border-t border-[#E8E1D3] text-xs text-[#7A6C5B] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>2.5초마다 실시간 자동 감지 중 · 새로고침을 누르지 않아도 새 주문이 즉시 표에 추가됩니다.</span>
          </div>
          <span className="font-bold text-[#1E4D2B]">현재 접수 목록: 총 {orders.length}건</span>
        </div>

      </div>
    </div>
  );
};
