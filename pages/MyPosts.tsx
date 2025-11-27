
import React, { useState } from 'react';
import { Page, Tab } from '../types';

interface MyPostsProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const MyPosts: React.FC<MyPostsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'published' | 'completed'>('published');

  const posts = [
    { id: 1, type: '招聘', title: '公司急招Java后端，本高校友优先', date: '2023-10-24', views: 342, status: 'active' },
    { id: 2, type: '问答', title: '请问本溪哪里有比较好的牙科诊所推荐？', date: '2023-10-10', views: 128, status: 'active' },
    { id: 3, type: '闲置', title: '转让九成新Ipad Pro 2021款', date: '2023-09-05', views: 890, status: 'completed' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button onClick={() => onNavigate(Page.MAIN, Tab.SQUARE)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">管理我的需求</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white mb-4 shadow-sm z-0">
        <div 
            onClick={() => setActiveTab('published')}
            className={`flex-1 text-center py-4 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'published' ? 'text-red-500' : 'text-gray-400'}`}
        >
            已发布 (2)
            {activeTab === 'published' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-red-500 rounded-full"></div>}
        </div>
        <div 
            onClick={() => setActiveTab('completed')}
            className={`flex-1 text-center py-4 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'completed' ? 'text-red-500' : 'text-gray-400'}`}
        >
            已解决/关闭 (1)
            {activeTab === 'completed' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-red-500 rounded-full"></div>}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 space-y-4 pb-8">
        {posts.filter(p => activeTab === 'published' ? p.status === 'active' : p.status === 'completed').map((post) => (
            <div key={post.id} className="bg-white p-5 rounded-2xl shadow-card">
                <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-md ${post.type === '招聘' ? 'bg-blue-50 text-blue-600' : post.type === '闲置' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}`}>
                        {post.type}
                    </span>
                    <span className="text-[10px] text-gray-300 font-medium">{post.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-4 leading-snug">{post.title}</h3>
                <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <i className="fa-regular fa-eye"></i> {post.views}
                    </span>
                    <div className="flex gap-2">
                        {post.status === 'active' && (
                             <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 transition">
                                <i className="fa-solid fa-check mr-1"></i>标记解决
                             </button>
                        )}
                        <button className="px-3 py-1.5 border border-gray-100 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 transition">
                            编辑
                        </button>
                         <button className="px-3 py-1.5 border border-red-50 rounded-lg text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition">
                            删除
                        </button>
                    </div>
                </div>
            </div>
        ))}
        {posts.filter(p => activeTab === 'published' ? p.status === 'active' : p.status === 'completed').length === 0 && (
            <div className="flex flex-col items-center justify-center pt-20 text-gray-300">
                <i className="fa-regular fa-folder-open text-4xl mb-2"></i>
                <span className="text-sm">暂无内容</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
