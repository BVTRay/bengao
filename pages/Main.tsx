
import React, { useState, useEffect } from 'react';
import { Page, Tab, UserProfile } from '../types';
import HomeTab from './tabs/HomeTab';
import SquareTab from './tabs/SquareTab';
import MineTab from './tabs/MineTab';

interface MainProps {
  onNavigate: (page: Page, tab?: Tab) => void;
  initialTab?: Tab;
  user: UserProfile;
  isAdmin?: boolean;
  onToggleRole?: () => void;
  onUpdateAvatar?: (newAvatar: string) => void;
}

const Main: React.FC<MainProps> = ({ onNavigate, initialTab, user, isAdmin, onToggleRole, onUpdateAvatar }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab || Tab.HOME);

  // Sync state if prop changes (e.g. returning from detail page)
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <HomeTab onNavigate={onNavigate} />;
      case Tab.SQUARE:
        return <SquareTab onNavigate={onNavigate} />;
      case Tab.MINE:
        return <MineTab onNavigate={onNavigate} user={user} isAdmin={isAdmin} onToggleRole={onToggleRole} onUpdateAvatar={onUpdateAvatar} />;
      default:
        return <HomeTab onNavigate={onNavigate} />;
    }
  };

  const getNavClass = (tab: Tab) => {
    const isActive = activeTab === tab;
    return `flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer h-full pb-1 active:opacity-70 transition-opacity ${isActive ? 'text-[#D63031]' : 'text-gray-400'}`;
  };

  const handleTabClick = (tab: Tab) => {
    onNavigate(Page.MAIN, tab);
  };

  return (
    <div className="h-full bg-[#F7F8FA] relative flex flex-col overflow-hidden fade-in">
      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>

      {/* Compact Native-style Bottom Navigation - Highest Z-Index */}
      {/* Added safe-area-inset-bottom support and adjusted height */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-start pt-2 z-50 pb-[env(safe-area-inset-bottom)] h-[calc(60px+env(safe-area-inset-bottom))]">
        
        <div onClick={() => handleTabClick(Tab.HOME)} className={getNavClass(Tab.HOME)}>
          <i className={`text-xl ${activeTab === Tab.HOME ? 'fa-solid fa-house' : 'fa-solid fa-house'}`}></i>
          <span className="text-[10px] font-medium">首页</span>
        </div>

        <div onClick={() => handleTabClick(Tab.SQUARE)} className={getNavClass(Tab.SQUARE)}>
          <i className={`text-xl ${activeTab === Tab.SQUARE ? 'fa-solid fa-compass' : 'fa-regular fa-compass'}`}></i>
          <span className="text-[10px] font-medium">广场</span>
        </div>

        <div onClick={() => handleTabClick(Tab.MINE)} className={getNavClass(Tab.MINE)}>
          <i className={`text-xl ${activeTab === Tab.MINE ? 'fa-solid fa-user' : 'fa-regular fa-user'}`}></i>
          <span className="text-[10px] font-medium">我的</span>
        </div>

      </div>
    </div>
  );
};

export default Main;