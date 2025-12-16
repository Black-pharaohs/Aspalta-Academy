import React from 'react';
import { LayoutDashboard, Video, BookOpen, Bot, Settings, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: ViewState.LIVE_CLASS, label: 'الفصول الحية', icon: Video },
    { id: ViewState.COURSES, label: 'المقررات', icon: BookOpen },
    { id: ViewState.AI_TUTOR, label: 'الحكيم أسبالتا', icon: Bot },
  ];

  return (
    <aside className="w-64 bg-nubian-stone border-l border-amber-900/30 flex flex-col h-full shadow-2xl z-20 hidden md:flex">
      <div className="p-6 flex items-center justify-center border-b border-amber-900/30">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-nubian-gold tracking-widest uppercase">أسبالتا</h1>
          <p className="text-xs text-amber-500/70 mt-1">Black Pharaohs Code</p>
        </div>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 group
                ${isActive 
                  ? 'bg-gradient-to-l from-amber-900/40 to-transparent text-amber-400 border-r-4 border-amber-500' 
                  : 'text-stone-400 hover:bg-stone-800 hover:text-amber-200'
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-stone-500 group-hover:text-amber-200'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-amber-900/30">
        <button className="flex items-center space-x-3 space-x-reverse text-stone-500 hover:text-red-400 w-full px-4 py-2 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};