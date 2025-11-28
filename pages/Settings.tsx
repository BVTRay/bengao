
import React from 'react';
import { Page, Tab } from '../types';

interface SettingsProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
      {/* Header */}
      <div className="px-6 pt-[max(12px,env(safe-area-inset-top))] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.MINE)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">设置</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Section 1 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center cursor-pointer active:bg-gray-50">
                <span className="text-sm font-bold text-gray-700">账号与安全</span>
                <span className="text-xs text-gray-400">已绑定手机</span>
            </div>
            <div className="px-5 py-4 flex justify-between items-center cursor-pointer active:bg-gray-50">
                <span className="text-sm font-bold text-gray-700">隐私权限</span>
                <i className="fa-solid fa-chevron-right text-xs text-gray-300"></i>
            </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center cursor-pointer active:bg-gray-50">
                <span className="text-sm font-bold text-gray-700">消息通知</span>
                <i className="fa-solid fa-chevron-right text-xs text-gray-300"></i>
            </div>
            <div className="px-5 py-4 flex justify-between items-center cursor-pointer active:bg-gray-50">
                <span className="text-sm font-bold text-gray-700">清除缓存</span>
                <span className="text-xs text-gray-400">12.8 MB</span>
            </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center cursor-pointer active:bg-gray-50">
                <span className="text-sm font-bold text-gray-700">关于校友汇</span>
                <span className="text-xs text-gray-400">v1.0.2</span>
            </div>
            <div className="px-5 py-4 flex justify-between items-center cursor-pointer active:bg-gray-50">
                <span className="text-sm font-bold text-gray-700">联系客服</span>
                <i className="fa-solid fa-chevron-right text-xs text-gray-300"></i>
            </div>
        </div>

        <button 
            onClick={() => onNavigate(Page.LOGIN)}
            className="w-full py-3.5 bg-white text-red-500 rounded-2xl font-bold text-sm shadow-sm active:scale-95 transition"
        >
            退出当前账号
        </button>
      </div>
      
      <div className="pb-8 text-center">
        <p className="text-[10px] text-gray-300">Benxi Senior High School Alumni</p>
      </div>
    </div>
  );
};

export default Settings;
