import React, { useState } from 'react';
import { Page, Tab } from '../types';

interface MyFavoritesProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const MyFavorites: React.FC<MyFavoritesProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'alumni'>('posts');

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.MINE)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">我的收藏</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white mb-3 shadow-sm z-0">
        <div 
            onClick={() => setActiveTab('posts')}
            className={`flex-1 text-center py-3 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'posts' ? 'text-gray-900' : 'text-gray-400'}`}
        >
            需求动态
            {activeTab === 'posts' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-900 rounded-full"></div>}
        </div>
        <div 
            onClick={() => setActiveTab('alumni')}
            className={`flex-1 text-center py-3 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'alumni' ? 'text-gray-900' : 'text-gray-400'}`}
        >
            校友
            {activeTab === 'alumni' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-900 rounded-full"></div>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-8">
        {activeTab === 'posts' && (
            <>
                <div 
                    onClick={() => onNavigate(Page.POST_DETAIL)}
                    className="bg-white p-4 rounded-2xl shadow-card cursor-pointer border border-gray-50"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg">合作</span>
                        <i className="fa-solid fa-bookmark text-yellow-400 text-xs"></i>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-3 leading-relaxed">寻找本溪当地的餐饮供应链资源，有渠道的请联系，长期合作</h3>
                    <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-50">
                        <div className="w-5 h-5 bg-gray-200 rounded-full bg-[url('https://i.pravatar.cc/150?img=8')] bg-cover"></div>
                        <span className="text-[10px] text-gray-400 font-medium">王强 · 05届</span>
                    </div>
                </div>

                <div 
                    onClick={() => onNavigate(Page.POST_DETAIL)}
                    className="bg-white p-4 rounded-2xl shadow-card cursor-pointer border border-gray-50"
                >
                     <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg">招聘</span>
                        <i className="fa-solid fa-bookmark text-yellow-400 text-xs"></i>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-3 leading-relaxed">【内推】字节跳动懂车帝部门招前端研发实习生</h3>
                    <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-50">
                        <div className="w-5 h-5 bg-gray-200 rounded-full bg-[url('https://i.pravatar.cc/150?img=11')] bg-cover"></div>
                        <span className="text-[10px] text-gray-400 font-medium">刘一鸣 · 10届</span>
                    </div>
                </div>
            </>
        )}

        {activeTab === 'alumni' && (
             <div 
                onClick={() => onNavigate(Page.ALUMNI_DETAIL)}
                className="bg-white p-4 rounded-2xl flex gap-4 items-center shadow-card cursor-pointer border border-gray-50"
            >
              <img src="https://i.pravatar.cc/150?img=11" className="w-12 h-12 rounded-full flex-shrink-0 object-cover bg-gray-200" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-gray-800 truncate">刘一鸣</h4>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">2010届</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">字节跳动 · 产品专家</p>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-400">
                    <i className="fa-solid fa-location-dot"></i> 北京 · 12班
                </div>
              </div>
              <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
            </div>
        )}
        
        {/* Empty State */}
        {activeTab === 'alumni' && false && ( 
             <div className="flex flex-col items-center justify-center pt-20 text-gray-300">
                <i className="fa-regular fa-star text-4xl mb-2"></i>
                <span className="text-sm">暂无收藏</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;