
import React, { useState } from 'react';
import { Page, Tab } from '../types';

interface GroupDetailProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({ onNavigate }) => {
  const [joined, setJoined] = useState(false);

  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in">
        {/* Header */}
        <div className="bg-white">
            <div className="h-32 bg-gradient-to-r from-red-500 to-red-600 relative">
                 <div className="px-6 pt-[52px] flex items-center">
                    <button 
                        onClick={() => onNavigate(Page.GROUPS)}
                        className="w-10 h-10 -ml-2 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                 </div>
            </div>
            <div className="px-6 relative -mt-10 pb-6">
                <div className="w-20 h-20 bg-white p-1 rounded-2xl shadow-sm mb-3">
                    <div className="w-full h-full bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-3xl">
                        <i className="fa-solid fa-landmark"></i>
                    </div>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">北京校友会</h1>
                        <p className="text-xs text-gray-500 mt-1">成员 520 人 · 帖子 128</p>
                    </div>
                    <button 
                        onClick={() => setJoined(!joined)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition ${joined ? 'bg-gray-100 text-gray-400' : 'bg-red-500 text-white shadow-lg shadow-red-200'}`}
                    >
                        {joined ? '已加入' : '加入'}
                    </button>
                </div>
                <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                    本溪市高级中学北京校友会官方组织。欢迎在京校友加入，我们定期举办聚餐、徒步、行业交流等活动。
                    <br/>会长：刘一鸣 (2010届)
                </p>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
             {/* Announcement */}
             <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-3 items-center">
                <i className="fa-solid fa-bullhorn text-orange-500"></i>
                <div className="flex-1 text-sm text-gray-800 truncate">
                    最新公告：本月28日组织香山徒步活动，请大家...
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-gray-300"></i>
             </div>

             {/* Members Preview */}
             <div className="bg-white p-5 rounded-2xl shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">管理员 & 活跃成员</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                            <img src={`https://i.pravatar.cc/150?img=${i+20}`} className="w-10 h-10 rounded-full bg-gray-200" />
                            <span className="text-[10px] text-gray-500">校友{i}</span>
                        </div>
                    ))}
                </div>
             </div>

             {/* Posts */}
             <div className="bg-white p-5 rounded-2xl shadow-sm min-h-[200px]">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">群内讨论</h3>
                <div className="space-y-4">
                    <div className="border-b border-gray-50 pb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <img src="https://i.pravatar.cc/150?img=11" className="w-5 h-5 rounded-full" />
                            <span className="text-xs font-bold text-gray-700">刘一鸣</span>
                            <span className="text-[10px] text-gray-400">1小时前</span>
                        </div>
                        <p className="text-sm text-gray-800 pl-7">欢迎新加入的校友！大家记得改一下群名片：姓名-届别-行业。</p>
                    </div>
                     <div className="border-b border-gray-50 pb-3">
                        <div className="flex items-center gap-2 mb-1">
                            <img src="https://i.pravatar.cc/150?img=5" className="w-5 h-5 rounded-full" />
                            <span className="text-xs font-bold text-gray-700">陈若兰</span>
                            <span className="text-[10px] text-gray-400">3小时前</span>
                        </div>
                        <p className="text-sm text-gray-800 pl-7">收到，已经修改啦。这周六的活动我也报名了。</p>
                    </div>
                </div>
             </div>
        </div>
    </div>
  );
};

export default GroupDetail;
