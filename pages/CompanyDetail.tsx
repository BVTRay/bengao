
import React from 'react';
import { Page, Tab } from '../types';

interface CompanyDetailProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
       {/* Header */}
       <div className="bg-white pb-6">
            <div className="px-6 pt-[52px] pb-2 flex items-center bg-white">
                <button 
                    onClick={() => onNavigate(Page.COMPANY_LIST)}
                    className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                 <div className="flex-1 text-center font-bold text-lg">企业详情</div>
                 <div className="w-10"></div>
            </div>

            <div className="px-6 mt-4 flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-sm">
                    <i className="fa-brands fa-microsoft"></i>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">未来科技(北京)有限公司</h1>
                    <p className="text-xs text-gray-500 mt-1">互联网 · 人工智能 · B轮</p>
                    <div className="flex gap-2 mt-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg">校友创办</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg">高新技术</span>
                    </div>
                </div>
            </div>
       </div>

       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* About */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">公司简介</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    未来科技成立于2015年，是一家专注于通用人工智能技术研发的创新型科技企业。
                    创始人刘一鸣系本溪高中2010届校友。公司致力于通过AI技术改变人类生活方式，
                    核心产品包括智能对话机器人、计算机视觉平台等。
                    目前团队规模200人，总部位于北京中关村。
                </p>
            </div>

            {/* Alumni */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">在此工作的校友 (3)</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                         <img src="https://i.pravatar.cc/150?img=11" className="w-10 h-10 rounded-full" />
                         <div>
                             <div className="text-sm font-bold text-gray-800">刘一鸣</div>
                             <div className="text-xs text-gray-500">创始人 / CEO · 2010届</div>
                         </div>
                    </div>
                    <div className="flex items-center gap-3">
                         <img src="https://i.pravatar.cc/150?img=8" className="w-10 h-10 rounded-full" />
                         <div>
                             <div className="text-sm font-bold text-gray-800">李明</div>
                             <div className="text-xs text-gray-500">高级技术专家 · 2009届</div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Jobs */}
             <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">在招职位 (2)</h3>
                </div>
                <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="flex justify-between font-bold text-gray-800 text-sm">
                            <span>高级Java工程师</span>
                            <span className="text-blue-600">30k-50k</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">北京 · 3-5年 · 本科</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="flex justify-between font-bold text-gray-800 text-sm">
                            <span>产品经理</span>
                            <span className="text-blue-600">20k-40k</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">北京 · 1-3年 · 本科</div>
                    </div>
                </div>
            </div>
       </div>

       {/* Footer */}
       <div className="bg-white border-t border-gray-50 p-4 pb-8">
            <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold">投递简历 / 联系创始人</button>
       </div>
    </div>
  );
};

export default CompanyDetail;
