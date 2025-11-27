import React from 'react';
import { Page, Tab } from '../types';

interface VisitorsProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const Visitors: React.FC<VisitorsProps> = ({ onNavigate }) => {
  const visitors = [
    { id: 1, name: '陈若兰', year: '2008', class: '06班', job: '主治医师', img: '5', time: '10分钟前', action: '查看了你的名片' },
    { id: 2, name: '刘一鸣', year: '2010', class: '12班', job: '产品专家', img: '11', time: '1小时前', action: '查看了你的名片' },
    { id: 3, name: '李明', year: '2009', class: '03班', job: '后端开发', img: '8', time: '3小时前', action: '查看了你的需求' },
    { id: 4, name: '赵小花', year: '2015', class: '01班', job: '在读博士', img: '12', time: '昨天', action: '访问了你的主页' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.MINE)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">最近访客</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {visitors.map((v) => (
            <div 
                key={v.id}
                onClick={() => onNavigate(Page.ALUMNI_DETAIL)}
                className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm cursor-pointer active:bg-gray-50"
            >
                <div className="relative">
                    <img src={`https://i.pravatar.cc/150?img=${v.img}`} className="w-12 h-12 rounded-full bg-gray-200" />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-sm">{v.name} <span className="font-normal text-xs text-gray-500 ml-1">· {v.year}届</span></h4>
                        <span className="text-[10px] text-gray-300">{v.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">{v.job}</p>
                        <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{v.action}</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Visitors;