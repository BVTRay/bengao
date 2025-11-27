import React from 'react';
import { Page } from '../types';

interface RegisterInfoProps {
  onNavigate: (page: Page) => void;
}

const RegisterInfo: React.FC<RegisterInfoProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in">
      <div className="px-6 pt-[88px] pb-4 bg-white sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-800">完善名片</h2>
        <p className="text-gray-400 text-sm mt-1">让校友更容易认识现在的你</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 pb-32">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-sm relative flex items-center justify-center text-gray-400 text-2xl">
            <i className="fa-solid fa-user"></i>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm border-2 border-white">
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Current Job</label>
              <input 
                type="text" 
                placeholder="就职单位 (必填)" 
                className="w-full text-lg font-bold text-gray-800 placeholder-gray-300 border-b border-gray-100 pb-2 outline-none focus:border-gray-300 transition-colors bg-white"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="职位头衔 (必填)" 
                className="w-full text-lg font-bold text-gray-800 placeholder-gray-300 border-b border-gray-100 pb-2 outline-none focus:border-gray-300 transition-colors bg-white"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Location</label>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              <button className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-sm font-bold border border-red-100 whitespace-nowrap">北京</button>
              <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-sm font-bold border border-gray-100 whitespace-nowrap hover:bg-gray-100">上海</button>
              <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-sm font-bold border border-gray-100 whitespace-nowrap hover:bg-gray-100">沈阳</button>
              <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-sm font-bold border border-gray-100 whitespace-nowrap hover:bg-gray-100">本溪</button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 z-20 pb-8">
        <button 
          onClick={() => onNavigate(Page.MAIN)} 
          className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex justify-between items-center px-6"
        >
          <span>进入校友汇</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default RegisterInfo;