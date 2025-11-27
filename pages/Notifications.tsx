import React, { useState } from 'react';
import { Page, Tab } from '../types';

interface NotificationsProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'system' | 'interaction'>('all');

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.HOME)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">消息通知</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white mb-3 shadow-sm z-0">
        <div 
            onClick={() => setActiveTab('all')}
            className={`flex-1 text-center py-3 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'all' ? 'text-gray-900' : 'text-gray-400'}`}
        >
            全部
            {activeTab === 'all' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-900 rounded-full"></div>}
        </div>
        <div 
            onClick={() => setActiveTab('system')}
            className={`flex-1 text-center py-3 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'system' ? 'text-gray-900' : 'text-gray-400'}`}
        >
            系统
            {activeTab === 'system' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-900 rounded-full"></div>}
        </div>
        <div 
            onClick={() => setActiveTab('interaction')}
            className={`flex-1 text-center py-3 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'interaction' ? 'text-gray-900' : 'text-gray-400'}`}
        >
            互动
            {activeTab === 'interaction' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-900 rounded-full"></div>}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-8">
        {(activeTab === 'all' || activeTab === 'system') && (
            <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-sm">认证通过通知</h4>
                        <span className="text-[10px] text-gray-400">1小时前</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">恭喜您！您的校友身份认证已通过审核，现在您可以开启完整的校友汇体验了。</p>
                </div>
            </div>
        )}

        {(activeTab === 'all' || activeTab === 'interaction') && (
            <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-3">
                <img src="https://i.pravatar.cc/150?img=5" className="w-10 h-10 rounded-full flex-shrink-0 bg-gray-200" />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-sm">陈若兰 <span className="text-gray-400 font-normal">评论了你的发布</span></h4>
                        <span className="text-[10px] text-gray-400">2小时前</span>
                    </div>
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-600">
                        "成色看起来不错，帮顶！"
                    </div>
                </div>
            </div>
        )}

         {(activeTab === 'all' || activeTab === 'interaction') && (
            <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-3">
                <img src="https://i.pravatar.cc/150?img=11" className="w-10 h-10 rounded-full flex-shrink-0 bg-gray-200" />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-sm">刘一鸣 <span className="text-gray-400 font-normal">赞了你的名片</span></h4>
                        <span className="text-[10px] text-gray-400">昨天</span>
                    </div>
                </div>
            </div>
        )}

        {(activeTab === 'all' || activeTab === 'system') && (
             <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-3 opacity-60">
                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-bullhorn"></i>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-sm">活动提醒</h4>
                        <span className="text-[10px] text-gray-400">3天前</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">您报名的“2023北京校友秋季徒步活动”将于本周六上午9点开始，请准时参加。</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;