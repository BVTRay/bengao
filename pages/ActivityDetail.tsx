
import React, { useState } from 'react';
import { Page, Tab } from '../types';

interface ActivityDetailProps {
  onNavigate: (page: Page, tab?: Tab) => void;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ onNavigate }) => {
  const [signedUp, setSignedUp] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white fade-in relative">
        {/* Cover Image */}
        <div className="h-64 relative">
             <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-transparent"></div>
             
             {/* Back Button Overlay */}
             <div className="absolute top-[52px] left-4">
                <button 
                    onClick={() => onNavigate(Page.ACTIVITIES)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
                >
                     <i className="fa-solid fa-chevron-left"></i>
                </button>
             </div>
        </div>

        <div className="flex-1 overflow-y-auto -mt-6 rounded-t-3xl bg-white relative z-10 px-6 pt-8 pb-32">
            <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg mb-3 inline-block">报名中</span>
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">2023 北京校友秋季徒步活动 · 香山红叶季</h1>

            {/* Info Grid */}
            <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 text-lg">
                        <i className="fa-regular fa-clock"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 text-sm">时间</div>
                        <div className="text-gray-500 text-sm">10月28日 (周六) 09:00 - 14:00</div>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 text-lg">
                        <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 text-sm">集合地点</div>
                        <div className="text-gray-500 text-sm">北京市海淀区香山公园东门</div>
                        <div className="text-blue-500 text-xs mt-1 font-bold">查看地图</div>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 text-lg">
                        <i className="fa-solid fa-user-group"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 text-sm">参与人员</div>
                        <div className="text-gray-500 text-sm">限额 50 人 (已报 32 人)</div>
                        <div className="flex -space-x-2 mt-2">
                             {[1,2,3,4,5].map(i => (
                                 <img key={i} src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-6 h-6 rounded-full border-2 border-white" />
                             ))}
                             <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-bold">+27</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-8 pt-8 border-t border-gray-50">
                <h3 className="font-bold text-gray-900 text-lg mb-4">活动详情</h3>
                <div className="text-sm text-gray-600 leading-7 space-y-4">
                    <p>
                        各位在京校友：<br/>
                        秋高气爽，正是登高望远好时节。北京校友会拟组织秋季徒步活动，邀请大家一同前往香山公园，共赏红叶，强身健体，增进交流。
                    </p>
                    <p>
                        <strong>【行程安排】</strong><br/>
                        09:00 香山公园东门集合签到<br/>
                        09:30 开始登山（沿主干道）<br/>
                        11:30 到达香炉峰，合影留念，简单午餐（自备）<br/>
                        12:30 开始下山<br/>
                        14:00 活动结束，自由解散
                    </p>
                    <p>
                        <strong>【注意事项】</strong><br/>
                        1. 请穿着舒适的运动鞋和服装。<br/>
                        2. 请自备饮用水和少量干粮。<br/>
                        3. 如遇恶劣天气，活动将顺延，具体通知见群公告。
                    </p>
                </div>
            </div>
        </div>

        {/* Floating Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-20 pb-8">
            <button 
                onClick={() => setSignedUp(!signedUp)}
                className={`w-full py-3.5 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform ${signedUp ? 'bg-gray-100 text-gray-400' : 'bg-gray-900 text-white'}`}
            >
                {signedUp ? '已报名' : '立即报名'}
            </button>
        </div>
    </div>
  );
};

export default ActivityDetail;
