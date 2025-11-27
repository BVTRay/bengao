
import React, { useState, useEffect } from 'react';
import { Page } from '../../types';

interface HomeTabProps {
  onNavigate: (page: Page) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
      title: '建校70周年庆典公告',
      subtitle: '校友返校指南',
      tag: '置顶',
      color: 'from-red-500 to-red-600',
      target: Page.ARTICLE_DETAIL
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      title: '重返校园 · 寻找青春记忆',
      subtitle: '校园开放日预约开启',
      tag: '活动',
      color: 'from-blue-500 to-blue-600',
      target: Page.ACTIVITIES
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      title: '2023校友企业创投峰会',
      subtitle: '连接资源，共创未来',
      tag: '商务',
      color: 'from-gray-800 to-black',
      target: Page.ACTIVITIES
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleGridClick = (label: string) => {
    switch(label) {
      case '母校动态': onNavigate(Page.NEWS_LIST); break;
      case '校友企业': onNavigate(Page.COMPANY_LIST); break;
      case '找组织': onNavigate(Page.GROUPS); break;
      case '近期活动': onNavigate(Page.ACTIVITIES); break;
      default: break;
    }
  };

  return (
    <div className="h-full overflow-y-auto pb-[90px] no-scrollbar">
      {/* Header - Sticky with safe area support */}
      <div className="bg-white/95 backdrop-blur-md px-6 pt-6 pb-2 sticky top-0 z-20 border-b border-gray-50 pt-[max(24px,env(safe-area-inset-top))]">
        <div className="flex justify-between items-center h-[36px]">
            <div>
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                    本高人 <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                </h2>
                <p className="text-[10px] text-gray-400 leading-none">Since 1953</p>
            </div>
            {/* Removed Capsule Spacer */}
        </div>

        {/* Search & Bell Row */}
        <div className="mt-4 mb-2 flex gap-3">
             <div 
                onClick={() => onNavigate(Page.SEARCH)}
                className="flex-1 bg-gray-100 rounded-full h-10 px-4 flex items-center text-gray-400 cursor-text active:bg-gray-200 transition"
             >
                <i className="fa-solid fa-magnifying-glass mr-2 text-xs"></i>
                <span className="text-sm text-gray-400">搜索校友、班级、动态...</span>
             </div>
             <div 
                onClick={() => onNavigate(Page.NOTIFICATIONS)}
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-600 relative active:bg-gray-50 cursor-pointer"
             >
                <i className="fa-regular fa-bell"></i>
                <div className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
             </div>
        </div>
      </div>

      {/* Scroll Content */}
      <div className="px-5 mt-4 space-y-6">
        
        {/* Carousel Banner */}
        <div className="w-full aspect-[2.2/1] rounded-2xl relative overflow-hidden shadow-sm group">
          <div 
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div 
                key={banner.id}
                onClick={() => onNavigate(banner.target)}
                className="w-full h-full flex-shrink-0 relative cursor-pointer"
              >
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${banner.id === 1 ? 'from-black/60' : 'from-black/70'} to-transparent`}></div>
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-medium border border-white/10">{banner.tag}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight">{banner.title}</h3>
                    <p className="text-xs opacity-80 mt-0.5">{banner.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="absolute bottom-3 right-5 flex gap-1.5">
            {banners.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-3' : 'bg-white/50'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* King Kong Area (Features) */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { color: 'text-red-500', bg: 'bg-red-50', icon: 'fa-building-columns', label: '母校动态' },
            { color: 'text-blue-500', bg: 'bg-blue-50', icon: 'fa-handshake', label: '校友企业' },
            { color: 'text-orange-500', bg: 'bg-orange-50', icon: 'fa-users', label: '找组织' },
            { color: 'text-purple-500', bg: 'bg-purple-50', icon: 'fa-calendar-day', label: '近期活动' },
          ].map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleGridClick(item.label)}
              className="flex flex-col items-center gap-2 cursor-pointer group py-2 active:opacity-60"
            >
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-lg shadow-sm transition`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Alumni List */}
        <div>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-base font-bold text-gray-800">活跃校友</h3>
            <span 
              onClick={() => onNavigate(Page.ALUMNI_LIST)}
              className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer active:opacity-50 hover:text-gray-900 transition"
            >
              全部 <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </span>
          </div>

          <div className="space-y-3">
            {/* Card 1 */}
            <div 
                onClick={() => onNavigate(Page.ALUMNI_DETAIL)}
                className="bg-white p-4 rounded-2xl flex gap-4 items-center active:bg-gray-50 transition-colors cursor-pointer border border-gray-50"
            >
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-12 h-12 rounded-full flex-shrink-0 object-cover bg-gray-200" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-gray-800 truncate">刘一鸣</h4>
                  <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">2010届</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">字节跳动 · 产品专家</p>
              </div>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                <i className="fa-regular fa-comment"></i>
              </button>
            </div>

            {/* Card 2 */}
            <div 
                onClick={() => onNavigate(Page.ALUMNI_DETAIL)}
                className="bg-white p-4 rounded-2xl flex gap-4 items-center active:bg-gray-50 transition-colors cursor-pointer border border-gray-50"
            >
              <img src="https://i.pravatar.cc/150?img=5" alt="Avatar" className="w-12 h-12 rounded-full flex-shrink-0 object-cover bg-gray-200" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-gray-800 truncate">陈若兰</h4>
                  <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">2008届</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">沈阳医大一院 · 主治医师</p>
              </div>
               <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                <i className="fa-regular fa-comment"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;