
import React, { useState } from 'react';
import { Page } from '../types';

interface AdminPublishNewsProps {
  onNavigate: (page: Page) => void;
}

const AdminPublishNews: React.FC<AdminPublishNewsProps> = ({ onNavigate }) => {
  const [showToast, setShowToast] = useState(false);

  const handlePublish = () => {
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
          onNavigate(Page.ADMIN_DASHBOARD);
      }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white fade-in relative">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={() => onNavigate(Page.ADMIN_DASHBOARD)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
            <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">发布新闻</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <input 
            type="text" 
            placeholder="请输入标题" 
            className="w-full text-xl font-bold placeholder-gray-300 border-none outline-none mb-6"
        />

        <div className="w-full h-48 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-gray-400 border border-gray-100 border-dashed cursor-pointer hover:bg-gray-100 transition mb-6">
            <i className="fa-regular fa-image text-3xl mb-2"></i>
            <span className="text-xs">添加封面图</span>
        </div>

        <textarea 
            placeholder="请输入正文内容..." 
            className="w-full h-64 text-sm text-gray-700 placeholder-gray-300 border-none outline-none resize-none"
        ></textarea>
      </div>

       {/* Floating Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-20">
        <button 
            onClick={handlePublish}
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
            立即发布
        </button>
      </div>

      {/* Toast */}
      {showToast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur text-white px-6 py-4 rounded-xl shadow-lg fade-in">
              <i className="fa-solid fa-check text-2xl mb-2"></i>
              <span className="text-sm font-medium">发布成功</span>
          </div>
      )}
    </div>
  );
};

export default AdminPublishNews;
