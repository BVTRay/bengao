
import React, { useRef } from 'react';
import { Page, UserProfile } from '../../types';

interface MineTabProps {
  onNavigate: (page: Page) => void;
  user: UserProfile;
  isAdmin?: boolean;
  onToggleRole?: () => void;
  onLogout?: () => void;
  onUpdateAvatar?: (newAvatar: string) => void;
}

const MineTab: React.FC<MineTabProps> = ({ onNavigate, user, isAdmin, onToggleRole, onUpdateAvatar }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateAvatar) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Determine avatar source: check if it's a URL/DataURI or a number ID
  const avatarSrc = user.avatar && (user.avatar.startsWith('http') || user.avatar.startsWith('data:')) 
    ? user.avatar 
    : `https://i.pravatar.cc/150?img=${user.avatar || '12'}`;

  return (
    <div className="h-full overflow-y-auto pb-[90px] no-scrollbar bg-white">
      <div className="relative bg-gray-50 pb-10 rounded-b-[3rem] overflow-hidden">
        {/* Updated Gradient */}
        <div className="absolute top-0 w-full h-full bg-gradient-school opacity-5 pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        
        {/* Adjusted top padding for safe area */}
        <div className="relative pt-[max(48px,env(safe-area-inset-top))] px-6 text-center">
          {/* Avatar Section with Edit Button */}
          <div className="relative w-24 h-24 mx-auto mb-4 group">
             <div className="w-full h-full bg-white p-1 rounded-full shadow-soft overflow-hidden">
                <img src={avatarSrc} alt="Profile" className="w-full h-full rounded-full object-cover" />
             </div>
             {onUpdateAvatar && (
               <>
                 <button 
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md active:scale-95 transition"
                 >
                    <i className="fa-solid fa-camera text-xs"></i>
                 </button>
                 <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                 />
               </>
             )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">{user.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{user.year}届 · {user.classId}</p>
          <p className="text-xs text-gray-400 mt-2 line-clamp-1 px-8">{user.bio}</p>
          
          <div className="flex justify-center gap-10 mt-8">
            <div 
                className="text-center cursor-pointer hover:opacity-70 active:scale-95 transition group"
                onClick={() => onNavigate(Page.MY_CREATIONS)}
            >
              <div className="font-bold text-xl text-gray-800 group-hover:text-red-500 transition-colors">3</div>
              <div className="text-xs text-gray-400 font-medium">我创建的</div>
            </div>
            <div 
                className="text-center cursor-pointer hover:opacity-70 active:scale-95 transition group"
                onClick={() => onNavigate(Page.VISITORS)}
            >
              <div className="font-bold text-xl text-gray-800 group-hover:text-red-500 transition-colors">342</div>
              <div className="text-xs text-gray-400 font-medium">访客</div>
            </div>
            <div 
                className="text-center cursor-pointer hover:opacity-70 active:scale-95 transition group"
                onClick={() => onNavigate(Page.MY_ALUMNI)}
            >
              <div className="font-bold text-xl text-gray-800 group-hover:text-red-500 transition-colors">89</div>
              <div className="text-xs text-gray-400 font-medium">校友</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-4">
        <div 
          onClick={() => onNavigate(Page.ALUMNI_CARD)}
          className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-card cursor-pointer hover:bg-gray-50 transition hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500"><i className="fa-regular fa-id-card"></i></div>
            <span className="font-bold text-gray-700">我的校友卡</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
        </div>

        <div 
          onClick={() => onNavigate(Page.EDIT_PROFILE)}
          className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-card cursor-pointer hover:bg-gray-50 transition hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500"><i className="fa-solid fa-user-pen"></i></div>
            <span className="font-bold text-gray-700">我的资料</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
        </div>

        <div 
          onClick={() => onNavigate(Page.MY_FAVORITES)}
          className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-card cursor-pointer hover:bg-gray-50 transition hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500"><i className="fa-solid fa-star"></i></div>
            <span className="font-bold text-gray-700">我的收藏</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
        </div>

        <div 
          onClick={() => onNavigate(Page.SETTINGS)}
          className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-card cursor-pointer hover:bg-gray-50 transition hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"><i className="fa-solid fa-gear"></i></div>
            <span className="font-bold text-gray-700">设置</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
        </div>

        {/* Admin Switch */}
        {onToggleRole && (
          <div 
            onClick={onToggleRole}
            className="mt-6 mb-8 text-center"
          >
            <button className="text-xs text-gray-400 underline hover:text-red-500 transition">
              {isAdmin ? '切换回用户模式' : '切换到管理员模式'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MineTab;