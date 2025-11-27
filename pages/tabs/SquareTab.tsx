
import React, { useState } from 'react';
import { Page } from '../../types';

interface SquareTabProps {
  onNavigate?: (page: Page) => void;
}

const SquareTab: React.FC<SquareTabProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '招聘内推', '商务合作', '求助问答', '闲置交易'];

  // Enhanced Mock Data
  const posts = [
      { id: 1, type: '招聘内推', title: '【北京】字节跳动懂车帝部门招前端研发实习生', author: '刘一鸣', year: '10届', avatar: '11', image: null },
      { id: 2, type: '招聘内推', title: '公司急招Java后端，本高校友优先，薪资面议', author: '李明', year: '09届', avatar: '8', image: null },
      { id: 3, type: '商务合作', title: '寻找本溪当地的餐饮供应链资源，有渠道的请联系，长期合作', author: '王强', year: '05届', avatar: '68', image: null },
      { id: 4, type: '闲置交易', title: '出一台闲置的MacBook Pro 14寸，成色99新，带Apple Care+', author: '张伟', year: '12届', avatar: '3', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80' },
      { id: 5, type: '求助问答', title: '周末回本溪，哪家羊汤现在最好喝？求推荐老字号！', author: '赵小花', year: '15届', avatar: '12', image: null },
      { id: 6, type: '求助问答', title: '急求一份高中物理复习资料，家里亲戚小孩要用', author: '陈若兰', year: '08届', avatar: '5', image: null },
      { id: 7, type: '商务合作', title: '本溪特色农产品寻找电商代运营团队', author: '王强', year: '05届', avatar: '68', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80' },
      { id: 8, type: '闲置交易', title: '转让两张周杰伦演唱会门票，原价出', author: '张同学', year: '12届', avatar: '12', image: null },
      { id: 9, type: '招聘内推', title: '阿里巴巴（杭州）大量社招HC，欢迎师弟师妹投递', author: '李明', year: '09届', avatar: '8', image: null },
      { id: 10, type: '求助问答', title: '北京地区有没有做法律咨询的校友？有个合同纠纷想咨询', author: '刘一鸣', year: '10届', avatar: '11', image: null },
      { id: 11, type: '商务合作', title: '承接各类小程序、APP外包开发，价格公道', author: '张伟', year: '12届', avatar: '3', image: null },
      { id: 12, type: '闲置交易', title: '搬家出一辆捷安特山地车，仅骑过5次', author: '赵小花', year: '15届', avatar: '12', image: 'https://images.unsplash.com/photo-1485965120184-e224f723d621?auto=format&fit=crop&w=600&q=80' },
      { id: 13, type: '招聘内推', title: '沈阳医大一院行政岗招聘，合同制', author: '陈若兰', year: '08届', avatar: '5', image: null },
  ];

  const filteredPosts = activeCategory === '全部' ? posts : posts.filter(p => p.type === activeCategory);

  const handlePostClick = () => {
    if (onNavigate) {
      onNavigate(Page.POST_DETAIL);
    }
  };

  const handleMyPostsClick = () => {
    if (onNavigate) {
      onNavigate(Page.MY_POSTS);
    }
  };

  const handlePublishClick = () => {
    if (onNavigate) {
      onNavigate(Page.PUBLISH_POST);
    }
  };

  return (
    <div className="h-full overflow-y-auto pb-[90px] no-scrollbar bg-[#F7F8FA]">
      {/* Redesigned Header - Sticky with proper Z-Index */}
      <div className="glass px-6 pt-[52px] pb-4 sticky top-0 z-30 shadow-sm border-b border-white/50">
        {/* Title Row */}
        <div className="flex justify-between items-center h-[36px] mb-4">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">供需广场</h2>
          <div className="w-[87px]"></div> {/* Spacer for Capsule */}
        </div>
        
        {/* Action Row: Search + My Posts + Publish */}
        <div className="flex items-center gap-3 mb-4">
            {/* Search Input */}
            <div className="flex-1 bg-white border border-gray-100 rounded-xl h-10 px-3 flex items-center text-gray-400 shadow-sm">
                <i className="fa-solid fa-magnifying-glass mr-2 text-xs"></i>
                <input 
                    type="text" 
                    placeholder="搜索需求..." 
                    className="bg-transparent border-none outline-none text-xs w-full text-gray-700 placeholder-gray-400"
                />
             </div>
             
             {/* My Posts Button */}
             <div 
                onClick={handleMyPostsClick}
                className="h-10 px-3 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-600 shadow-sm active:bg-gray-50 transition cursor-pointer"
             >
                <i className="fa-solid fa-list-ul text-sm"></i>
             </div>

             {/* Publish Button */}
             <button 
                onClick={handlePublishClick}
                className="h-10 w-10 rounded-xl bg-gradient-school text-white flex items-center justify-center shadow-soft active:scale-95 transition"
             >
                 <i className="fa-solid fa-plus text-sm"></i>
             </button>
        </div>

        {/* Filter Row */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar items-center pb-2">
          {categories.map(cat => (
              <span 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer transition border ${activeCategory === cat ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'}`}
              >
                  {cat}
              </span>
          ))}
        </div>
      </div>

      {/* Masonry Content */}
      <div className="p-4 columns-2 gap-4 space-y-4">
        {filteredPosts.map(post => (
             <div 
                key={post.id}
                onClick={handlePostClick}
                className="break-inside-avoid bg-white p-4 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-50"
            >
                {post.image && (
                     <div className="relative mb-3 rounded-xl overflow-hidden">
                        <img src={post.image} alt="Post Cover" className="w-full h-auto object-cover" />
                    </div>
                )}
                <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${post.type === '招聘内推' ? 'bg-blue-50 text-blue-600' : post.type === '商务合作' ? 'bg-green-50 text-green-600' : post.type === '求助问答' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'}`}>
                        {post.type.replace('内推','').replace('交易','')}
                    </span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-gray-200 text-xs opacity-0 group-hover:opacity-100 transition"></i>
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-3 leading-relaxed line-clamp-3">{post.title}</h3>
                <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-50">
                    <div className={`w-5 h-5 bg-gray-200 rounded-full bg-[url('https://i.pravatar.cc/150?img=${post.avatar}')] bg-cover`}></div>
                    <span className="text-[10px] text-gray-400 font-medium">{post.author} · {post.year}</span>
                </div>
            </div>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-20 text-gray-300">
             <i className="fa-solid fa-wind text-4xl mb-2 opacity-30"></i>
             <span className="text-sm">暂无此类需求</span>
          </div>
      )}
    </div>
  );
};

export default SquareTab;
