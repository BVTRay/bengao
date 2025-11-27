import React from 'react';
import { Page } from '../types';

interface LoginProps {
  onNavigate: (page: Page) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-full flex flex-col justify-center px-8 bg-white overflow-hidden fade-in">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-20%] w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="flex-1 flex flex-col justify-center z-10">
        <div className="mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#D63031] rounded-2xl flex items-center justify-center text-white text-3xl shadow-[0_10px_30px_-10px_rgba(214,48,49,0.3)] mb-6 rotate-3">
            <i className="fa-solid fa-school"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight leading-tight">
            本溪市高级中学<br />校友汇
          </h1>
          <p className="text-gray-400 mt-2 font-medium">连接每一位本高学子</p>
        </div>

        <div className="space-y-5">
          <div className="relative group">
            <i className="fa-solid fa-mobile-screen absolute left-4 top-4 text-gray-400 group-focus-within:text-[#FF6B6B] transition-colors"></i>
            <input 
              type="tel" 
              placeholder="请输入手机号" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none text-gray-700 font-medium transition-all focus:translate-y-[-2px] focus:shadow-[0_4px_12px_rgba(0,0,0,0.05)] placeholder-gray-400"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1 group">
              <i className="fa-solid fa-shield-halved absolute left-4 top-4 text-gray-400 group-focus-within:text-[#FF6B6B] transition-colors"></i>
              <input 
                type="text" 
                placeholder="验证码" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none text-gray-700 font-medium transition-all focus:translate-y-[-2px] focus:shadow-[0_4px_12px_rgba(0,0,0,0.05)] placeholder-gray-400"
              />
            </div>
            <button className="px-5 py-4 bg-white border border-gray-200 rounded-2xl text-gray-600 font-medium text-sm shadow-sm active:scale-95 transition">
              获取
            </button>
          </div>
          
          <button 
            onClick={() => onNavigate(Page.CERTIFY)} 
            className="w-full py-4 bg-gradient-to-br from-[#FF6B6B] to-[#D63031] text-white rounded-2xl font-bold text-lg shadow-[0_10px_30px_-10px_rgba(214,48,49,0.3)] active:scale-95 transition-transform mt-4"
          >
            登录 / 注册
          </button>
        </div>

        {/* Developer Shortcut */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigate(Page.MAIN)} 
            className="text-xs text-gray-400 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
          >
            👀 开发者通道：跳过流程直接看主页
          </button>
        </div>
      </div>
      
      <div className="pb-8 text-center text-xs text-gray-300 z-10">
        Benxi Senior High School Alumni
      </div>
    </div>
  );
};

export default Login;