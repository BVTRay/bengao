
import React from 'react';
import { Page, Tab, UserProfile } from '../types';

interface AlumniCardProps {
  onNavigate: (page: Page, tab?: Tab) => void;
  user: UserProfile;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ onNavigate, user }) => {
  return (
    <div className="h-full flex flex-col bg-gray-900 text-white fade-in relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-black z-0"></div>
        <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-red-600 rounded-full blur-[100px] opacity-20 z-0"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20 z-0"></div>

      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center sticky top-0 z-10">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.MINE)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-white text-lg">电子校友卡</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-8 py-8 z-10 overflow-y-auto no-scrollbar">
        {/* The Card */}
        <div className="w-full aspect-[1.6/1] rounded-3xl bg-gradient-to-br from-[#FF6B6B] to-[#D63031] p-6 shadow-[0_20px_60px_-15px_rgba(214,48,49,0.5)] relative overflow-hidden group">
            {/* Card Decor */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full blur-2xl transform -translate-x-5 translate-y-5"></div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 text-xl shadow-lg">
                            <i className="fa-solid fa-school"></i>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-base leading-none">本溪市高级中学</h2>
                            <span className="text-white/70 text-[10px] uppercase tracking-wider">Alumni Card</span>
                        </div>
                    </div>
                    <div className="w-12 h-8 rounded-md border border-white/30 flex items-center justify-center">
                        <div className="w-8 h-5 bg-yellow-400/80 rounded-sm"></div>
                    </div>
                </div>

                <div>
                    <div className="text-white/80 text-xs mb-1">NO. {user.year}15001</div>
                    <div className="text-2xl font-bold text-white tracking-widest shadow-black drop-shadow-md">{user.name}</div>
                </div>
            </div>
        </div>

        {/* QR Code Section */}
        <div className="w-full bg-white text-gray-800 rounded-3xl mt-[-30px] pt-12 pb-8 px-6 shadow-2xl relative z-[-1] flex flex-col items-center">
            <p className="text-xs text-gray-400 mb-4">进出校园 · 参加活动 · 享受权益</p>
            <div className="w-48 h-48 bg-gray-100 rounded-xl p-2 mb-4">
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BenxiHighSchoolAlumni:${user.name}:${user.year}`} className="w-full h-full opacity-90 mix-blend-multiply" />
            </div>
            <div className="flex items-center gap-2 text-xs text-green-500 font-bold bg-green-50 px-3 py-1.5 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                动态码已刷新
            </div>
        </div>

        {/* Rights Section */}
        <div className="w-full mt-8">
            <h3 className="text-white/60 text-sm font-bold mb-4">校友权益</h3>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"><i className="fa-solid fa-book-open"></i></div>
                    <div>
                        <div className="text-white font-bold text-sm">图书馆</div>
                        <div className="text-white/50 text-xs">阅览权限</div>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"><i className="fa-solid fa-utensils"></i></div>
                    <div>
                        <div className="text-white font-bold text-sm">食堂消费</div>
                        <div className="text-white/50 text-xs">校友折扣</div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AlumniCard;
