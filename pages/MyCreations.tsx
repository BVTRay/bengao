
import React, { useState } from 'react';
import { Page, Tab, UserProfile, Company, Group, Activity } from '../types';

interface MyCreationsProps {
  onNavigate: (page: Page, tab?: Tab) => void;
  onBack?: () => void;
  user: UserProfile;
  companies: Company[];
  groups: Group[];
  activities: Activity[];
  onSelectCreation: (type: 'company' | 'group' | 'activity', id: number) => void;
  onAddAudit?: (type: 'company' | 'group' | 'activity', data: any, actionType: 'create' | 'update', targetId?: number) => void;
}

const MyCreations: React.FC<MyCreationsProps> = ({ onNavigate, onBack, user, companies, groups, activities, onSelectCreation, onAddAudit }) => {
  const myCompanies = companies.filter(c => c.creator === user.name);
  
  // Split groups into Regional and Interest
  const myRegionGroups = groups.filter(g => g.creator === user.name && g.type === '地区');
  // Include both '兴趣' and '行业' as Interest Groups for this view
  const myInterestGroups = groups.filter(g => g.creator === user.name && (g.type === '兴趣' || g.type === '行业'));
  
  const myActivities = activities.filter(a => a.creator === user.name);

  // Edit State
  const [showEdit, setShowEdit] = useState(false);
  const [editTarget, setEditTarget] = useState<{type: 'company' | 'group' | 'activity', id: number} | null>(null);
  const [editForm, setEditForm] = useState({ name: '', desc: '' });
  const [toast, setToast] = useState('');

  const openEdit = (e: React.MouseEvent, type: 'company' | 'group' | 'activity', item: any) => {
      e.stopPropagation();
      setEditTarget({ type, id: item.id });
      setEditForm({
          name: item.name || item.title || '',
          desc: item.industry || item.desc || item.location || '' // Simplified mapping
      });
      setShowEdit(true);
  };

  const handleSaveEdit = () => {
      if (!editTarget || !onAddAudit) return;
      
      const updates: any = {};
      if (editTarget.type === 'activity') {
          updates.title = editForm.name;
          updates.location = editForm.desc;
      } else if (editTarget.type === 'company') {
          updates.name = editForm.name;
          updates.industry = editForm.desc;
      } else {
          updates.name = editForm.name;
          updates.desc = editForm.desc;
      }

      onAddAudit(editTarget.type, updates, 'update', editTarget.id);
      
      setShowEdit(false);
      setToast('已提交管理员审核');
      setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in relative">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={onBack ? onBack : () => onNavigate(Page.MAIN, Tab.MINE)} 
            className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">我创建的</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-8">
        
        {/* Companies */}
        <div>
            <h3 className="text-sm font-bold text-gray-500 mb-3 px-2">企业 ({myCompanies.length})</h3>
            <div className="space-y-3">
                {myCompanies.map(c => (
                    <div 
                        key={c.id} 
                        onClick={() => onSelectCreation('company', c.id)}
                        className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 active:scale-[0.99] transition cursor-pointer border border-gray-50"
                    >
                        <div className={`w-12 h-12 bg-${c.color}-50 text-${c.color}-500 rounded-xl flex items-center justify-center text-xl`}>
                            <i className={`fa-solid fa-${c.logo}`}></i>
                        </div>
                        <div className="flex-1">
                             <div className="flex justify-between">
                                <h4 className="font-bold text-gray-800">{c.name}</h4>
                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">已认证</span>
                             </div>
                             <p className="text-xs text-gray-400 mt-1">{c.industry} · {c.location}</p>
                        </div>
                        <button 
                            onClick={(e) => openEdit(e, 'company', c)}
                            className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                        >
                            <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                    </div>
                ))}
                {myCompanies.length === 0 && <div className="text-center text-gray-300 text-xs py-2">暂无创建的企业</div>}
            </div>
        </div>

        {/* Regional Groups */}
        <div>
            <h3 className="text-sm font-bold text-gray-500 mb-3 px-2">地区分会 ({myRegionGroups.length})</h3>
            <div className="grid grid-cols-2 gap-3">
                {myRegionGroups.map(g => (
                    <div 
                        key={g.id} 
                        onClick={() => onSelectCreation('group', g.id)}
                        className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center text-center active:scale-[0.99] transition cursor-pointer border border-gray-50 relative group"
                    >
                        <button 
                            onClick={(e) => openEdit(e, 'group', g)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                        >
                            <i className="fa-solid fa-pen text-[10px]"></i>
                        </button>
                        <div className={`w-10 h-10 bg-${g.color}-50 text-${g.color}-500 rounded-full flex items-center justify-center text-lg mb-2`}>
                            <i className={`fa-solid fa-${g.icon}`}></i>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">{g.name}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">{g.count}人</p>
                    </div>
                ))}
            </div>
            {myRegionGroups.length === 0 && <div className="text-center text-gray-300 text-xs py-2">暂无创建的地区分会</div>}
        </div>

        {/* Interest Groups */}
        <div>
            <h3 className="text-sm font-bold text-gray-500 mb-3 px-2">兴趣/行业小组 ({myInterestGroups.length})</h3>
             <div className="space-y-3">
                {myInterestGroups.map(g => (
                    <div 
                        key={g.id} 
                        onClick={() => onSelectCreation('group', g.id)}
                        className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 active:scale-[0.99] transition cursor-pointer border border-gray-50"
                    >
                        <div className={`w-10 h-10 bg-${g.color}-50 text-${g.color}-500 rounded-lg flex items-center justify-center text-lg`}>
                            <i className={`fa-solid fa-${g.icon}`}></i>
                        </div>
                        <div className="flex-1">
                             <div className="flex justify-between">
                                <h4 className="font-bold text-gray-800 text-sm">{g.name}</h4>
                                <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">{g.type}</span>
                             </div>
                             <p className="text-xs text-gray-400 mt-1 line-clamp-1">{g.desc}</p>
                        </div>
                        <button 
                            onClick={(e) => openEdit(e, 'group', g)}
                            className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                        >
                            <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                    </div>
                ))}
                 {myInterestGroups.length === 0 && <div className="text-center text-gray-300 text-xs py-2">暂无创建的兴趣小组</div>}
            </div>
        </div>

        {/* Activities */}
        <div>
            <h3 className="text-sm font-bold text-gray-500 mb-3 px-2">活动 ({myActivities.length})</h3>
            <div className="space-y-3">
                {myActivities.map(a => (
                    <div 
                        key={a.id} 
                        onClick={() => onSelectCreation('activity', a.id)}
                        className="bg-white p-3 rounded-2xl shadow-sm flex gap-3 active:scale-[0.99] transition cursor-pointer border border-gray-50"
                    >
                        <img src={a.image} className="w-16 h-16 rounded-xl object-cover bg-gray-200" />
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{a.title}</h4>
                            <div className="flex gap-2 mt-1">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${a.status === 'enrolling' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {a.status === 'enrolling' ? '报名中' : '已结束'}
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                <i className="fa-regular fa-clock"></i> {a.date}
                            </p>
                        </div>
                         <button 
                            onClick={(e) => openEdit(e, 'activity', a)}
                            className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition self-center"
                        >
                            <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                    </div>
                ))}
                {myActivities.length === 0 && <div className="text-center text-gray-300 text-xs py-2">暂无发布的活动</div>}
            </div>
        </div>

      </div>

      {/* Edit Form Modal (Simplified) */}
      {showEdit && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
              <div className="bg-white w-full rounded-2xl p-6 shadow-2xl animate-[scaleIn_0.2s_ease-out]">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">编辑信息</h3>
                  <div className="space-y-4 mb-6">
                      <div>
                          <label className="block text-xs font-bold text-gray-400 mb-1">名称/标题</label>
                          <input 
                            type="text" 
                            value={editForm.name} 
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full bg-gray-50 p-3 rounded-xl text-sm outline-none font-bold"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-400 mb-1">描述/简介</label>
                          <textarea 
                            value={editForm.desc} 
                            onChange={(e) => setEditForm({...editForm, desc: e.target.value})}
                            className="w-full bg-gray-50 p-3 rounded-xl text-sm outline-none font-medium h-24 resize-none"
                          />
                      </div>
                  </div>
                  <div className="flex gap-3">
                      <button onClick={() => setShowEdit(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm">取消</button>
                      <button onClick={handleSaveEdit} className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm">保存并提交审核</button>
                  </div>
              </div>
          </div>
      )}

      {toast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 text-white px-6 py-3 rounded-xl shadow-lg fade-in text-sm font-bold whitespace-nowrap">
              {toast}
          </div>
      )}
    </div>
  );
};

export default MyCreations;
