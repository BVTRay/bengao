
import React from 'react';
import { Page } from '../types';

interface NewsListProps {
  onNavigate: (page: Page) => void;
}

const NewsList: React.FC<NewsListProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in">
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => onNavigate(Page.MAIN)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">母校动态</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* News Item 1 (Big) */}
        <div 
          onClick={() => onNavigate(Page.ARTICLE_DETAIL)}
          className="bg-white rounded-2xl overflow-hidden shadow-sm active:opacity-90 transition cursor-pointer"
        >
            <div className="h-40 bg-gray-200 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
            <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-2">本溪市高级中学建校70周年庆典圆满落幕</h3>
                <p className="text-xs text-gray-400">2023年10月20日 · 1.2w 阅读</p>
            </div>
        </div>

        {/* News Item 2 */}
        <div 
          onClick={() => onNavigate(Page.ARTICLE_DETAIL)}
          className="bg-white p-3 rounded-2xl shadow-sm flex gap-3 active:bg-gray-50 transition cursor-pointer"
        >
             <div className="w-24 h-24 rounded-xl bg-gray-200 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=300&q=80')] bg-cover bg-center flex-shrink-0"></div>
             <div className="flex-1 flex flex-col justify-between py-1">
                 <h3 className="font-bold text-gray-800 text-sm leading-snug">喜报：我校学子在全国中学生物理竞赛中斩获金牌</h3>
                 <p className="text-xs text-gray-400">昨天 · 3422 阅读</p>
             </div>
        </div>

        {/* News Item 3 */}
        <div 
          onClick={() => onNavigate(Page.ARTICLE_DETAIL)}
          className="bg-white p-3 rounded-2xl shadow-sm flex gap-3 active:bg-gray-50 transition cursor-pointer"
        >
             <div className="w-24 h-24 rounded-xl bg-gray-200 bg-[url('https://images.unsplash.com/photo-1477601263568-180e2c6d046e?auto=format&fit=crop&w=300&q=80')] bg-cover bg-center flex-shrink-0"></div>
             <div className="flex-1 flex flex-col justify-between py-1">
                 <h3 className="font-bold text-gray-800 text-sm leading-snug">关于2024年寒假放假安排的通知</h3>
                 <p className="text-xs text-gray-400">3天前 · 5011 阅读</p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
