
import React, { useState } from 'react';
import { Page, Tab } from '../types';

interface ArticleDetailProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ onNavigate }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white fade-in relative">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.HOME)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">正文</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mt-4 leading-tight">
            本溪市高级中学建校70周年庆典圆满落幕，千名校友共襄盛举
        </h1>
        
        {/* Meta */}
        <div className="flex items-center gap-3 mt-4 mb-6 text-xs text-gray-400">
            <span className="text-red-500 font-bold">本溪高中</span>
            <span>2023-10-20</span>
            <span>1.2w 阅读</span>
        </div>

        {/* Content */}
        <div className="prose prose-sm text-gray-700 space-y-6 leading-7">
            <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80" className="w-full rounded-xl" />
            
            <p>
                <strong>(本溪讯)</strong> 金秋十月，丹桂飘香。2023年10月20日，本溪市高级中学迎来了建校70周年华诞。来自世界各地的1000余名校友重返母校，与在校师生欢聚一堂，共庆这一历史性时刻。
            </p>
            <p>
                庆典大会在学校体育馆隆重举行。校长在致辞中回顾了学校70年的办学历程，总结了辉煌的办学成就，并对未来发展提出了新的愿景。他强调，本溪高中始终坚持“立德树人”的根本任务，为国家和社会培养了数以万计的优秀人才。
            </p>
            <p>
                优秀校友代表、2000届校友李华在发言中深情回忆了在母校度过的青春岁月，表达了对母校的感激之情。他勉励学弟学妹们珍惜时光，努力学习，为母校增光添彩。
            </p>
            <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-red-500 italic text-gray-600">
                "七十载风雨兼程，七十载春华秋实。祝愿母校积历史之厚蕴，宏图更展！" —— 95届校友寄语
            </div>
            <p>
                庆典期间，学校还举办了校史展览、校友论坛、文艺晚会等丰富多彩的活动。校友们漫步在熟悉的校园，寻找当年的记忆，共叙同窗情谊。
            </p>
        </div>

        {/* Likes */}
        <div className="mt-10 flex justify-center">
            <div 
                onClick={() => setLiked(!liked)}
                className={`w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1 shadow-sm border transition active:scale-95 cursor-pointer ${liked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-100 text-gray-400'}`}
            >
                <i className={`${liked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up text-xl`}></i>
                <span className="text-xs">{liked ? '343' : '342'}</span>
            </div>
        </div>
      </div>

      {/* Footer Input */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-50 flex items-center gap-3 pb-8 z-30">
        <div className="flex-1 bg-gray-100 rounded-full h-10 px-4 flex items-center text-gray-400 text-sm">
            <i className="fa-regular fa-pen-to-square mr-2"></i>
            <input type="text" placeholder="写评论..." className="bg-transparent border-none outline-none w-full placeholder-gray-400" />
        </div>
        <div className="flex gap-4 px-2 text-gray-600">
             <div className="flex flex-col items-center gap-0.5">
                <i className="fa-regular fa-comment-dots text-lg"></i>
                <span className="text-[10px]">28</span>
             </div>
             <div className="flex flex-col items-center gap-0.5">
                <i className="fa-solid fa-share text-lg"></i>
                <span className="text-[10px]">分享</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
