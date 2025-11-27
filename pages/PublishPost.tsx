import React from 'react';
import { Page, Tab } from '../types';

interface PublishPostProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const PublishPost: React.FC<PublishPostProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-white fade-in relative">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center justify-between bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.SQUARE)} 
            className="text-gray-500 text-sm font-medium hover:text-gray-900"
        >
            取消
        </button>
        <span className="font-bold text-gray-800 text-lg">发布需求</span>
        <div className="w-8"></div> {/* Placeholder to balance title */}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Type Selection */}
        <div className="mb-6">
            <label className="block text-sm font-bold text-gray-400 mb-3">选择类型</label>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold border border-blue-100 whitespace-nowrap">招聘内推</button>
                <button className="px-4 py-2 bg-white text-gray-400 rounded-xl text-sm font-bold border border-gray-100 whitespace-nowrap">商务合作</button>
                <button className="px-4 py-2 bg-white text-gray-400 rounded-xl text-sm font-bold border border-gray-100 whitespace-nowrap">求助问答</button>
                <button className="px-4 py-2 bg-white text-gray-400 rounded-xl text-sm font-bold border border-gray-100 whitespace-nowrap">闲置交易</button>
            </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
            <input 
                type="text" 
                placeholder="填写标题，更容易被校友看到..." 
                className="w-full text-lg font-bold placeholder-gray-300 border-none outline-none"
            />
            <textarea 
                placeholder="详细描述您的需求：
1. 具体的背景或要求
2. 您能提供的资源
3. 期望的联系方式" 
                className="w-full h-40 text-sm text-gray-700 placeholder-gray-300 border-none outline-none resize-none"
            ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mt-6">
            <div className="w-24 h-24 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-gray-400 border border-gray-100 border-dashed cursor-pointer hover:bg-gray-100 transition">
                <i className="fa-solid fa-camera text-xl mb-1"></i>
                <span className="text-[10px]">添加图片</span>
            </div>
        </div>

        {/* Options */}
        <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <div className="flex items-center gap-2 text-gray-700 text-sm font-bold">
                    <i className="fa-solid fa-location-dot text-gray-400"></i> 显示位置
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>北京 · 海淀区</span>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <div className="flex items-center gap-2 text-gray-700 text-sm font-bold">
                    <i className="fa-solid fa-at text-gray-400"></i> 谁可以看
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>公开</span>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        </div>
      </div>

      {/* Floating Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-20">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.SQUARE)}
            className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
            立即发布
        </button>
      </div>
    </div>
  );
};

export default PublishPost;