
import React from 'react';
import { Page, Tab } from '../types';

interface AdminDashboardProps {
  onNavigate: (page: Page, tab?: Tab) => void;
  onToggleRole: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onToggleRole }) => {
  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-6 bg-[#2d3748] text-white sticky top-0 z-10 rounded-b-[2rem] shadow-md">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold">管理员工作台</h1>
                <p className="text-white/60 text-xs">Admin Console</p>
            </div>
            {/* Exit button removed from header */}
        </div>

        {/* Stats Row */}
        <div className="flex gap-4">
            <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold">12</div>
                <div className="text-[10px] text-white/60">待办审批</div>
            </div>
            <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold">1.5k</div>
                <div className="text-[10px] text-white/60">注册校友</div>
            </div>
            <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold">89</div>
                <div className="text-[10px] text-white/60">校友企业</div>
            </div>
        </div>
      </div>

      {/* Action Grid */}
      <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            <div 
                onClick={() => onNavigate(Page.ADMIN_AUDIT)}
                className="bg-white p-5 rounded-2xl shadow-sm active:scale-95 transition cursor-pointer group"
            >
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:bg-orange-500 group-hover:text-white transition">
                    <i className="fa-solid fa-list-check"></i>
                </div>
                <h3 className="font-bold text-gray-800">审批中心</h3>
                <p className="text-xs text-gray-400 mt-1">处理注册、入驻申请</p>
            </div>

            <div 
                 onClick={() => onNavigate(Page.ADMIN_PUBLISH_NEWS)}
                 className="bg-white p-5 rounded-2xl shadow-sm active:scale-95 transition cursor-pointer group"
            >
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:bg-blue-500 group-hover:text-white transition">
                    <i className="fa-solid fa-pen-nib"></i>
                </div>
                <h3 className="font-bold text-gray-800">发布内容</h3>
                <p className="text-xs text-gray-400 mt-1">发布新闻、公告</p>
            </div>

            <div 
                onClick={() => onNavigate(Page.ADMIN_USER_MANAGE)}
                className="bg-white p-5 rounded-2xl shadow-sm active:scale-95 transition cursor-pointer group"
            >
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:bg-green-500 group-hover:text-white transition">
                    <i className="fa-solid fa-address-book"></i>
                </div>
                <h3 className="font-bold text-gray-800">校友管理</h3>
                <p className="text-xs text-gray-400 mt-1">添加、移除校友</p>
            </div>

             <div className="bg-white p-5 rounded-2xl shadow-sm active:scale-95 transition cursor-pointer group opacity-50">
                <div className="w-12 h-12 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center text-xl mb-3">
                    <i className="fa-solid fa-chart-pie"></i>
                </div>
                <h3 className="font-bold text-gray-800">数据统计</h3>
                <p className="text-xs text-gray-400 mt-1">建设中...</p>
            </div>
          </div>

          {/* Switch Mode Button at Bottom */}
          <div className="mt-12 mb-8 text-center">
             <button 
                onClick={onToggleRole}
                className="px-6 py-3 bg-white text-gray-500 rounded-full text-sm font-bold shadow-sm border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2 mx-auto"
            >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                切换回用户模式
            </button>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
