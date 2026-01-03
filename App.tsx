import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LiveClassroom } from './components/LiveClassroom';
import { AiTutor } from './components/AiTutor';
import { Teachers } from './components/Teachers';
import { Messages } from './components/Messages';
import { Resources } from './components/Resources';
import { Auth } from './components/Auth';
import { ViewState, User, Course } from './types';
import { Menu } from 'lucide-react';

const mockCourses: Course[] = [
  { id: 'c1', title: 'أساسيات اللغة النوبية', progress: 75, nextSession: '2023-10-27T10:00:00', thumbnail: 'https://picsum.photos/400/200?random=1' },
  { id: 'c2', title: 'تاريخ كوش ومروي', progress: 30, nextSession: '2023-10-28T14:00:00', thumbnail: 'https://picsum.photos/400/200?random=2' },
  { id: 'c3', title: 'فن العمارة القديمة', progress: 10, nextSession: '2023-10-29T09:00:00', thumbnail: 'https://picsum.photos/400/200?random=3' },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(ViewState.LOGIN);
  };

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard user={currentUser} courses={mockCourses} onCourseSelect={() => setCurrentView(ViewState.COURSES)} />;
      case ViewState.TEACHERS:
        return <Teachers />;
      case ViewState.LIVE_CLASS:
        return <LiveClassroom />;
      case ViewState.AI_TUTOR:
        return <AiTutor />;
      case ViewState.MESSAGES:
        return <Messages />;
      case ViewState.RESOURCES:
        return <Resources />;
      case ViewState.COURSES:
        return (
            <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-6">المقررات الدراسية</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCourses.map(c => (
                        <div key={c.id} className="bg-stone-800 p-6 rounded-xl border border-stone-700">
                             <h3 className="text-xl text-amber-500 font-bold">{c.title}</h3>
                             <p className="text-stone-400 mt-2">تقدم: {c.progress}%</p>
                             <div className="w-full bg-stone-700 h-2 rounded-full mt-2">
                                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${c.progress}%` }}></div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        );
      default:
        return <Dashboard user={currentUser} courses={mockCourses} onCourseSelect={() => setCurrentView(ViewState.COURSES)} />;
    }
  };

  return (
    <div className="flex h-screen bg-stone-950 text-stone-100 font-sans overflow-hidden">
      
      {/* Sidebar for Desktop */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} onLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-stone-900 border-b border-stone-800 p-4 flex justify-between items-center z-30">
          <span className="font-bold text-amber-500">أسبالتا</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-300">
            <Menu />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-stone-900 border-b border-stone-800 z-40 md:hidden p-4 shadow-xl">
             <nav className="flex flex-col space-y-2">
                <button onClick={() => { setCurrentView(ViewState.DASHBOARD); setIsMobileMenuOpen(false); }} className="p-2 text-right hover:text-amber-500">لوحة القيادة</button>
                <button onClick={() => { setCurrentView(ViewState.TEACHERS); setIsMobileMenuOpen(false); }} className="p-2 text-right hover:text-amber-500">الحكماء</button>
                <button onClick={() => { setCurrentView(ViewState.LIVE_CLASS); setIsMobileMenuOpen(false); }} className="p-2 text-right hover:text-amber-500">الفصول الحية</button>
                <button onClick={() => { setCurrentView(ViewState.AI_TUTOR); setIsMobileMenuOpen(false); }} className="p-2 text-right hover:text-amber-500">الحكيم أسبالتا</button>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="p-2 text-right text-red-400">خروج</button>
             </nav>
          </div>
        )}

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {/* Background Texture Overlay */}
           <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/papyrus.png')] z-0"></div>
           
           <div className="relative z-10 max-w-7xl mx-auto h-full">
             {renderContent()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;