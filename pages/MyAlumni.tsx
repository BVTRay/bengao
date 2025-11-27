import React from 'react';
import { Page, Tab } from '../types';

interface MyAlumniProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const MyAlumni: React.FC<MyAlumniProps> = ({ onNavigate }) => {
  const friends = [
    { id: 1, name: '刘一鸣', year: '2010', class: '12班', job: '字节跳动 · 产品专家', img: '11', city: '北京' },
    { id: 2, name: '陈若兰', year: '2008', class: '06班', job: '沈阳医大一院 · 主治医师', img: '5', city: '沈阳' },
    { id: 6, name: '王强', year: '2005', class: '10班', job: '本溪绿色食品 · 总经理', img: '68', city: '本溪' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
      <div className="px-6 pt-[52px] pb-2 bg-white sticky top-0 z-10 border-b border-gray-50">
        <div className="flex items-center mb-3">
            <button 
                onClick={() => onNavigate(Page.MAIN, Tab.MINE)} 
                className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
            >
            <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="flex-1 flex justify-center pr-8">
                <span className="font-bold text-gray-800 text-lg">我的校友</span>
            </div>
        </div>
        <div className="bg-gray-100 rounded-xl h-10 px-4 flex items-center text-gray-400 mb-2">
            <i className="fa-solid fa-magnifying-glass mr-2 text-xs"></i>
            <input 
                type="text" 
                placeholder="搜索好友..." 
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        <h3 className="text-xs font-bold text-gray-400 px-1">全部校友 ({friends.length})</h3>
        {friends.map((p) => (
            <div 
                key={p.id}
                onClick={() => onNavigate(Page.ALUMNI_DETAIL)}
                className="bg-white p-4 rounded-2xl flex gap-4 items-center shadow-sm cursor-pointer active:scale-[0.99] transition border border-gray-50"
            >
              <img src={`https://i.pravatar.cc/150?img=${p.img}`} className="w-12 h-12 rounded-full flex-shrink-0 object-cover bg-gray-200" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-gray-800 truncate">{p.name}</h4>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">{p.year}届</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{p.job}</p>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-400">
                    <i className="fa-solid fa-location-dot"></i> {p.city} · {p.class}
                </div>
              </div>
              <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-green-500 transition">
                <i className="fa-regular fa-comment-dots text-sm"></i>
              </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MyAlumni;