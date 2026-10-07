import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, AlertCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  intentMessage?: string; // e.g. "주문하시려면 먼저 로그인이 필요합니다."
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  intentMessage,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('윤성미');
  const [phone, setPhone] = useState('010-1234-5678');

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('이메일 주소를 입력해 주세요.');
      return false;
    }
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('이메일 형식이 올바르지 않아요. (예: example@naver.com)');
      return false;
    }

    if (!password) {
      setErrorMessage('비밀번호를 입력해 주세요.');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('비밀번호가 너무 짧아요. 안전을 위해 6자 이상으로 적어주세요.');
      return false;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setErrorMessage('고객님의 성함을 입력해 주세요.');
        return false;
      }
      if (password !== passwordConfirm) {
        setErrorMessage('비밀번호와 비밀번호 확인이 서로 달라요. 똑같이 적었는지 확인해 주세요.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage('');

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload =
      mode === 'login'
        ? { email: email.trim(), password }
        : { email: email.trim(), password, name: name.trim(), phone: phone.trim() };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.user) {
        onSuccess(data.user);
        onClose();
      } else {
        setErrorMessage(data.error || '처리 중 문제가 발생했어요. 다시 확인해 주세요.');
      }
    } catch (err) {
      setErrorMessage('서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLoginSeongmi = async () => {
    setEmail('seongmi@example.com');
    setPassword('password123');
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'seongmi@example.com', password: 'password123' }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        onSuccess(data.user);
        onClose();
      } else {
        setErrorMessage(data.error || '로그인에 실패했습니다.');
      }
    } catch {
      setErrorMessage('서버 연결 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#DFD7C7] overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="bg-[#FAF8F5] px-6 py-5 border-b border-[#E8E1D3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center font-bold text-sm">
              生
            </span>
            <h3 className="text-xl font-black text-[#1E4D2B]">
              {mode === 'login' ? '로그인' : '간편 회원가입'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#EFECE5] hover:bg-[#E3DEC0] text-[#55493A] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice if opening because user clicked order */}
        {intentMessage && (
          <div className="bg-[#F2F7F2] border-b border-[#D5E5D5] px-6 py-3 text-xs sm:text-sm font-bold text-[#1E4D2B] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#1E4D2B]" />
            <span>{intentMessage}</span>
          </div>
        )}

        {/* Tab switchers: 로그인 / 회원가입 */}
        <div className="flex border-b border-[#EAE3D5] bg-[#FAF8F5]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-3.5 font-bold text-base transition-colors cursor-pointer ${
              mode === 'login'
                ? 'text-[#1E4D2B] border-b-2 border-[#1E4D2B] bg-white'
                : 'text-[#7D6F5E] hover:text-[#231E17]'
            }`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-3.5 font-bold text-base transition-colors cursor-pointer ${
              mode === 'register'
                ? 'text-[#1E4D2B] border-b-2 border-[#1E4D2B] bg-white'
                : 'text-[#7D6F5E] hover:text-[#231E17]'
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Friendly Korean Error Alert */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50 border-2 border-red-200 text-red-800 text-sm font-bold rounded-2xl flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Phone in register mode */}
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#554737] mb-1">
                    이름 (성함) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="예: 윤성미"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 pl-10 pr-3.5 bg-white border border-[#D5CBBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                    />
                    <User className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#554737] mb-1">
                    연락처 (휴대폰 번호) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-12 pl-10 pr-3.5 bg-white border border-[#D5CBBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                    />
                    <Phone className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#554737] mb-1">
                이메일 주소 *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-3.5 bg-white border border-[#D5CBBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                />
                <Mail className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-[#554737]">
                  비밀번호 *
                </label>
                <span className="text-[11px] font-semibold text-[#8C7A65]">
                  6자 이상 입력
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="6자 이상 입력해 주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-3.5 bg-white border border-[#D5CBBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                />
                <Lock className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password confirm in register mode */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-[#554737] mb-1">
                  비밀번호 확인 *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="비밀번호를 한 번 더 입력해 주세요"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full h-12 pl-10 pr-3.5 bg-white border border-[#D5CBBA] rounded-xl text-base text-[#242A24] focus:outline-hidden focus:border-[#1E4D2B]"
                  />
                  <Lock className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#1E4D2B] hover:bg-[#163820] active:scale-98 text-white font-black text-lg rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? '처리 중...' : mode === 'login' ? '로그인하기' : '회원가입 완료하기'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Demo Login Shortcut for "윤성미 님" */}
          <div className="mt-6 pt-5 border-t border-[#ECE4D4] text-center">
            <p className="text-xs text-[#7B6E5D] mb-2 font-medium">
              빠른 체험을 원하시나요?
            </p>
            <button
              type="button"
              onClick={handleQuickLoginSeongmi}
              className="w-full py-2.5 px-3 bg-[#F4EFE6] hover:bg-[#EAE2D4] border border-[#DDD3C2] text-[#1E4D2B] font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#1E4D2B]" />
              <span>'윤성미 님' 계정으로 1초 로그인</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
