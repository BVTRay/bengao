import React from 'react';
import { Page } from '../types';

interface CertifyProps {
  onNavigate: (page: Page) => void;
}

const Certify: React.FC<CertifyProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in">
      {/* Top Nav - Adjusted for WeChat Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10">
        <button 
          onClick={() => onNavigate(Page.LOGIN)} 
          className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">校友认证</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-8">
             <div className="h-1 flex-1 bg-gradient-to-r from-[#FF6B6B] to-[#D63031] rounded-full"></div>
             <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
             <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
             <span className="ml-2 text-xs font-bold text-gray-400">1/3</span>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">基本信息</h2>
        <p className="text-gray-400 text-sm mb-6">请完善您在高中时期的信息，以便管理员审核</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">真实姓名</label>
            <input 
              type="text" 
              placeholder="请输入您的姓名" 
              className="w-full p-4 bg-white rounded-xl border border-gray-100 focus:border-red-300 outline-none text-gray-700 transition-colors shadow-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">入学年份</label>
              <div className="relative">
                <select className="w-full p-4 bg-white rounded-xl border border-gray-100 outline-none text-gray-700 appearance-none shadow-sm">
                    <option>2010年</option>
                    <option>2011年</option>
                    <option>2012年</option>
                    <option>2013年</option>
                </select>
                <i className="fa-solid fa-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"></i>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">所在班级</label>
              <input 
                type="text" 
                placeholder="如：15班" 
                className="w-full p-4 bg-white rounded-xl border border-gray-100 outline-none text-gray-700 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
              凭证上传 <span className="text-gray-400 font-normal text-xs">(毕业证或学信网截图)</span>
            </label>
            <div className="w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 bg-white hover:bg-gray-50 transition cursor-pointer">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2 text-xl">
                <i className="fa-solid fa-camera"></i>
              </div>
              <span className="text-xs font-medium">点击上传图片</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Button */}
      <div className="p-6 bg-white border-t border-gray-50 pb-8">
        <button 
          onClick={() => onNavigate(Page.PENDING)} 
          className="w-full py-3.5 bg-gradient-to-r from-[#FF6B6B] to-[#D63031] text-white rounded-xl font-bold text-lg shadow-md active:scale-[0.98] transition-transform"
        >
          提交审核
        </button>
      </div>
    </div>
  );
};

export default Certify;