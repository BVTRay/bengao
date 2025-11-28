
import React, { useState } from 'react';
import { Page, Tab } from '../types';

interface AlumniDetailProps {
  onNavigate: (page: Page, tab?: Tab) => void;
  onBack?: () => void;
}

const AlumniDetail: React.FC<AlumniDetailProps> = ({ onNavigate, onBack }) => {
  const [showWeChatModal, setShowWeChatModal] = useState(false);
  const [toast, setToast] = useState<{show: boolean, msg: string}>({ show: false, msg: '' });
  const [loading, setLoading] = useState(false);

  const handlePrivateMessage = () => {
    setShowWeChatModal(true);
  };

  const confirmWeChatJump = () => {
    setLoading(true);
    // Simulate delay for "opening" app
    setTimeout(() => {
        setLoading(false);
        setShowWeChatModal(false);
        window.location.href = "weixin://";
    }, 800);
  };

  const handleExchangeCard = () => {
    // Show Toast
    setToast({ show: true, msg: '已发送名片交换请求' });
    setTimeout(() => setToast({ show: false, msg: '' }), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-white fade-in relative">
      {/* Header */}
       <div className="px-6 pt-[max(12px,env(safe-area-inset-top))] pb-3 flex items-center bg-white sticky top-0 z-30">
        <button 
            onClick={onBack ? onBack : () => onNavigate(Page.MAIN, Tab.HOME)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {/* Right side blank for Capsule */}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Basic Info */}
        <div className="flex flex-col items-center mt-2">
            <div className="w-24 h-24 rounded-full bg-gray-200 p-1 border-2 border-gray-100">
                <img src="https://i.pravatar.cc/150?img=11" className="w-full h-full rounded-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-4 flex items-center gap-2">
                刘一鸣 
                <i className="fa-solid fa-circle-check text-blue-500 text-sm"></i>
            </h2>
            <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg">2010届</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg">高三12班</span>
            </div>
            <p className="text-gray-500 text-sm mt-4 text-center px-4 leading-relaxed">
                "在这里遇见更好的自己，也希望通过校友会认识更多优秀的校友。"
            </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-8 pb-8 border-b border-gray-100">
             <div className="text-center">
                <div className="font-bold text-xl">北京</div>
                <div className="text-xs text-gray-400">城市</div>
             </div>
             <div className="text-center">
                <div className="font-bold text-xl">互联网</div>
                <div className="text-xs text-gray-400">行业</div>
             </div>
             <div className="text-center">
                <div className="font-bold text-xl">1.2k</div>
                <div className="text-xs text-gray-400">人气</div>
             </div>
        </div>

        {/* Details */}
        <div className="mt-8 space-y-6">
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">就职经历</h3>
                <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg"><i className="fa-brands fa-byte"></i></div>
                    <div>
                        <div className="font-bold text-gray-800">字节跳动 ByteDance</div>
                        <div className="text-sm text-gray-600">高级产品专家 · 商业化</div>
                        <div className="text-xs text-gray-400 mt-1">2018 - 至今</div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">提供的帮助</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-full">简历内推</span>
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-full">行业咨询</span>
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-full">约饭</span>
                </div>
            </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 flex gap-4 pb-[max(24px,env(safe-area-inset-bottom))] z-30">
        <button 
            onClick={handlePrivateMessage}
            className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold active:bg-gray-200 transition"
        >
            私信
        </button>
        <button 
            onClick={handleExchangeCard}
            className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold active:scale-[0.98] transition shadow-lg"
        >
            交换名片
        </button>
      </div>

      {/* --- WeChat Style Modal --- */}
      {showWeChatModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-8">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowWeChatModal(false)}></div>
            <div className="bg-white rounded-2xl w-full max-w-sm relative z-10 overflow-hidden shadow-2xl animate-[scaleIn_0.2s_ease-out]">
                <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">即将打开微信</h3>
                    <p className="text-gray-500 text-sm mb-4">
                        微信号 <span className="text-gray-900 font-bold select-all bg-gray-100 px-1 rounded">liuyiming_2010</span> 已复制。
                        <br/>
                        是否跳转微信添加好友？
                    </p>
                </div>
                <div className="flex border-t border-gray-100">
                    <button 
                        onClick={() => setShowWeChatModal(false)}
                        className="flex-1 py-3.5 text-gray-500 font-bold text-sm active:bg-gray-50 transition"
                    >
                        取消
                    </button>
                    <div className="w-[1px] bg-gray-100"></div>
                    <button 
                        onClick={confirmWeChatJump}
                        className="flex-1 py-3.5 text-[#576b95] font-bold text-sm active:bg-gray-50 transition flex justify-center items-center gap-2"
                        disabled={loading}
                    >
                        {loading && <i className="fa-solid fa-spinner animate-spin"></i>}
                        {loading ? '正在跳转' : '允许'}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- Toast --- */}
      {toast.show && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur text-white px-6 py-4 rounded-xl shadow-lg fade-in">
              <i className="fa-solid fa-check text-2xl mb-2"></i>
              <span className="text-sm font-medium">{toast.msg}</span>
          </div>
      )}
    </div>
  );
};

export default AlumniDetail;
