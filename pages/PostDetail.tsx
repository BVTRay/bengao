
import React, { useState } from 'react';
import { Page, Tab } from '../types';

interface PostDetailProps {
  onNavigate: (page: Page, tab?: Tab) => void;
  onBack?: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ onNavigate, onBack }) => {
  const [showWeChatModal, setShowWeChatModal] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [toast, setToast] = useState<{show: boolean, msg: string, icon?: string}>({ show: false, msg: '', icon: '' });

  const handlePrivateMessage = () => {
    setShowWeChatModal(true);
  };

  const handleCollect = () => {
    setIsCollected(!isCollected);
    // Show toast feedback
    setToast({ 
        show: true, 
        msg: !isCollected ? '已收藏' : '已取消收藏',
        icon: !isCollected ? 'fa-solid fa-star' : '' 
    });
    setTimeout(() => setToast({ show: false, msg: '', icon: '' }), 1500);
  };

  const handleShare = () => {
      setToast({ show: true, msg: '链接已复制', icon: 'fa-regular fa-copy' });
      setTimeout(() => setToast({ show: false, msg: '', icon: '' }), 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white fade-in relative">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-2 flex items-center bg-white sticky top-0 z-30">
        <button 
            onClick={onBack ? onBack : () => onNavigate(Page.MAIN, Tab.SQUARE)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex gap-2 items-center">
            <img src="https://i.pravatar.cc/150?img=3" className="w-8 h-8 rounded-full bg-gray-200" />
            <span className="font-bold text-sm text-gray-800">张伟</span>
        </div>
        <div className="w-[87px]"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Title & Meta */}
        <div className="mt-2 mb-6">
            <div className="flex gap-2 mb-3">
                 <span className="px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-lg">闲置转让</span>
                 <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg">北京</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 leading-normal">出一台闲置的MacBook Pro 14寸，成色99新，带Apple Care+</h1>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span>10分钟前发布</span>
                <span>342次浏览</span>
            </div>
        </div>

        {/* Content */}
        <div className="text-gray-600 text-sm leading-7 space-y-4">
            <p>
                因为换了公司发的电脑，这台自用的MacBook Pro 14寸 M1 Pro芯片版闲置了。
                配置是16G+512G，深空灰。
            </p>
            <p>
                平时都很爱惜，一直贴膜带壳使用，电池健康度98%。
                箱说全，带Apple Care+到2025年。
                本高校友价格优惠，仅限北京面交，或者是本溪老乡我也能寄回去。
            </p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-2 mt-6 rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80" className="w-full h-40 object-cover" />
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=600&q=80" className="w-full h-40 object-cover" />
            <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3bd99?auto=format&fit=crop&w=600&q=80" className="w-full h-40 object-cover" />
        </div>

        {/* Comments Section */}
        <div className="mt-10 border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-4">全部留言 (2)</h3>
            
            <div className="space-y-6">
                <div className="flex gap-3">
                     <img src="https://i.pravatar.cc/150?img=12" className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                     <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-500">赵小花 · 15届</span>
                            <span className="text-[10px] text-gray-300">1分钟前</span>
                        </div>
                        <p className="text-sm text-gray-800 mt-1">请问多少钱出呀？</p>
                     </div>
                </div>

                <div className="flex gap-3">
                     <img src="https://i.pravatar.cc/150?img=5" className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                     <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-500">陈若兰 · 08届</span>
                            <span className="text-[10px] text-gray-300">5分钟前</span>
                        </div>
                        <p className="text-sm text-gray-800 mt-1">成色看起来不错，帮顶！</p>
                     </div>
                </div>
            </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-50 flex items-center gap-3 pb-8 z-30">
        <div className="flex-1 bg-gray-100 rounded-full h-10 px-4 flex items-center text-gray-400 text-sm">
            <input type="text" placeholder="看对眼了？聊两句..." className="bg-transparent border-none outline-none w-full placeholder-gray-400" />
        </div>
        <div className="flex gap-4 px-2 text-gray-600">
             <div 
                onClick={handleCollect}
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${isCollected ? 'text-yellow-400' : 'hover:text-gray-900'}`}
             >
                <i className={`${isCollected ? 'fa-solid' : 'fa-regular'} fa-star text-lg transition-all transform ${isCollected ? 'scale-110' : ''}`}></i>
                <span className="text-[10px]">收藏</span>
             </div>
             <div 
                onClick={handleShare}
                className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-gray-900 transition"
             >
                <i className="fa-solid fa-share text-lg"></i>
                <span className="text-[10px]">分享</span>
             </div>
        </div>
        <button 
            onClick={handlePrivateMessage}
            className="bg-gradient-school text-white px-5 py-2 rounded-full font-bold text-sm shadow-soft active:scale-95 transition"
        >
            私信
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
                        微信号 <span className="text-gray-900 font-bold select-all bg-gray-100 px-1 rounded">zhangwei_2012</span> 已复制。
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
                        onClick={() => { setShowWeChatModal(false); window.location.href = "weixin://"; }}
                        className="flex-1 py-3.5 text-[#576b95] font-bold text-sm active:bg-gray-50 transition"
                    >
                        允许
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- Toast --- */}
      {toast.show && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur text-white px-6 py-4 rounded-xl shadow-lg fade-in">
              {toast.icon && <i className={`${toast.icon} text-2xl mb-2`}></i>}
              <span className="text-sm font-medium">{toast.msg}</span>
          </div>
      )}
    </div>
  );
};

export default PostDetail;
