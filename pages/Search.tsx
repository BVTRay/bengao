
import React from 'react';
import { Page, Tab } from '../types';

interface SearchProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const Search: React.FC<SearchProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-white fade-in">
      {/* Search Header - Left Back Button + Search Bar + Right Padding for Capsule */}
      <div className="px-4 pt-[52px] pb-2 flex items-center gap-3 bg-white sticky top-0 z-10 pr-[110px]">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.HOME)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg flex-shrink-0"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        <div className="flex-1 bg-gray-100 rounded-full h-10 px-4 flex items-center text-gray-700">
            <i className="fa-solid fa-magnifying-glass mr-2 text-xs text-gray-400"></i>
            <input 
                type="text" 
                autoFocus
                placeholder="搜索..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400"
            />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        {/* History */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800 text-sm">历史搜索</h3>
                <i className="fa-solid fa-trash-can text-gray-300 text-xs cursor-pointer"></i>
            </div>
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg">刘一鸣</span>
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg">北京校友会</span>
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg">互联网</span>
            </div>
        </div>

        {/* Hot Search */}
        <div>
            <h3 className="font-bold text-gray-800 text-sm mb-3">热门搜索</h3>
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-red-50 text-red-500 text-xs rounded-lg font-bold flex items-center gap-1">
                    <i className="fa-solid fa-fire text-[10px]"></i> 70周年校庆
                </span>
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg">羽毛球赛</span>
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg">招聘内推</span>
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg">沈阳医疗</span>
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg">张同学</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
