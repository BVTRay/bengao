
import React from 'react';
import { Page, UserProfile } from '../types';

interface AlumniListProps {
  onNavigate: (page: Page) => void;
  user: UserProfile;
}

const AlumniList: React.FC<AlumniListProps> = ({ onNavigate, user }) => {
  // Construct "Me" object to show at the top of the list
  const me = {
    id: 999,
    name: user.name,
    year: user.year,
    class: user.classId,
    job: `${user.company || ''} · ${user.jobTitle || ''}`,
    city: user.location || '未知',
    img: '12', // Using fixed avatar for now as avatar upload isn't implemented
    isMe: true
  };

  const alumni: {
    id: number;
    name: string;
    year: string;
    class: string;
    job: string;
    city: string;
    img: string;
    isMe?: boolean;
  }[] = [
    me,
    { id: 1, name: '刘一鸣', year: '2010', class: '12班', job: '字节跳动 · 产品专家', city: '北京', img: '11' },
    { id: 2, name: '陈若兰', year: '2008', class: '06班', job: '沈阳医大一院 · 主治医师', city: '沈阳', img: '5' },
    { id: 3, name: '张伟', year: '2012', class: '15班', job: '自由职业 · 摄影师', city: '本溪', img: '3' },
    { id: 4, name: '李明', year: '2009', class: '03班', job: '阿里巴巴 · 后端开发', city: '杭州', img: '8' },
    { id: 5, name: '赵小花', year: '2015', class: '01班', job: '在读博士 · 清华大学', city: '北京', img: '12' },
    { id: 6, name: '王强', year: '2005', class: '10班', job: '本溪绿色食品 · 总经理', city: '本溪', img: '68' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-2 bg-white sticky top-0 z-20 border-b border-gray-50">
        <div className="flex items-center mb-3">
            <button onClick={() => onNavigate(Page.MAIN)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="flex-1 flex justify-center pr-8">
                <span className="font-bold text-gray-800 text-lg">校友通讯录</span>
            </div>
        </div>
        
        {/* Search */}
        <div className="bg-gray-100 rounded-xl h-10 px-4 flex items-center text-gray-400 mb-2">
            <i className="fa-solid fa-magnifying-glass mr-2 text-xs"></i>
            <input 
                type="text" 
                placeholder="搜索姓名、届别、行业..." 
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
        </div>

        {/* Filters */}
        <div className="flex gap-4 pb-2 text-sm font-medium text-gray-500 justify-around">
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                入学年份 <i className="fa-solid fa-caret-down text-xs"></i>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                所在城市 <i className="fa-solid fa-caret-down text-xs"></i>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                行业 <i className="fa-solid fa-caret-down text-xs"></i>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 relative">
        {alumni.map((p) => (
            <div 
                key={p.id}
                onClick={() => onNavigate(Page.ALUMNI_DETAIL)}
                className={`bg-white p-4 rounded-2xl flex gap-4 items-center shadow-sm cursor-pointer active:scale-[0.99] transition border ${p.isMe ? 'border-red-100 bg-red-50/20' : 'border-gray-50'}`}
            >
              <img src={`https://i.pravatar.cc/150?img=${p.img}`} className="w-12 h-12 rounded-full flex-shrink-0 object-cover bg-gray-200" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-gray-800 truncate flex items-center gap-2">
                    {p.name}
                    {p.isMe && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md">我</span>}
                  </h4>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">{p.year}届</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{p.job}</p>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-400">
                    <i className="fa-solid fa-location-dot"></i> {p.city} · {p.class}
                </div>
              </div>
              {!p.isMe && (
                <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <i className="fa-regular fa-paper-plane text-xs"></i>
                </button>
              )}
            </div>
        ))}

        {/* Index Sidebar */}
        <div className="fixed right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 text-[10px] text-gray-400 font-bold bg-white/50 backdrop-blur rounded-full py-2 px-1 shadow-sm">
            <span>A</span>
            <span>B</span>
            <span className="text-red-500">C</span>
            <span>D</span>
            <span>E</span>
            <span>...</span>
            <span>Z</span>
            <span>#</span>
        </div>
      </div>
    </div>
  );
};

export default AlumniList;
