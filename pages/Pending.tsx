import React from 'react';
import { Page } from '../types';

interface PendingProps {
  onNavigate: (page: Page) => void;
}

const Pending: React.FC<PendingProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center px-8 text-center relative bg-white fade-in">
      <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center text-5xl text-orange-400 mb-8 animate-pulse">
        <i className="fa-solid fa-hourglass-start"></i>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">资料审核中</h2>
      <p className="text-gray-500 leading-relaxed">
        管理员正在核对您的本高学籍信息<br />预计 1-2 个工作日内完成
      </p>
      
      <button 
        onClick={() => onNavigate(Page.REGISTER_INFO)} 
        className="mt-12 px-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition"
      >
        (模拟管理员点击通过)
      </button>
    </div>
  );
};

export default Pending;