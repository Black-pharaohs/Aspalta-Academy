import React, { useState } from 'react';
import { User } from '../types';
import { ShieldCheck, Mail, Lock, ArrowLeft } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: 'user-' + Date.now(),
        name: role === 'student' ? 'طارق النوبي' : 'أ. نفرتاري',
        role: role,
        avatarUrl: `https://picsum.photos/200?random=${Date.now()}`,
        email: email
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="w-full max-w-md p-8 bg-stone-900 border border-amber-900/30 rounded-2xl shadow-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/50">
            <ShieldCheck className="text-amber-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-nubian-gold mb-2">بوابة أسبالتا</h1>
          <p className="text-stone-400">سجل دخولك لترتقي في معبد المعرفة</p>
        </div>

        <div className="flex bg-stone-800 p-1 rounded-lg mb-6">
          <button 
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'student' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'}`}
          >
            طالب
          </button>
          <button 
            onClick={() => setRole('teacher')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'teacher' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'}`}
          >
            معلم (حكيم)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-1">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 text-stone-500 w-5 h-5" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg py-2.5 px-10 text-stone-200 focus:border-amber-500 outline-none transition-colors"
                placeholder="name@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-stone-500 w-5 h-5" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg py-2.5 px-10 text-stone-200 focus:border-amber-500 outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-stone-400 cursor-pointer">
              <input type="checkbox" className="ml-2 accent-amber-600 rounded" />
              تذكرني
            </label>
            <button type="button" className="text-amber-500 hover:text-amber-400">نسيت الرمز؟</button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-nubian-gold hover:bg-amber-400 text-stone-900 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {isLogin ? 'دخول المعبد' : 'انضمام للقافلة'}
                <ArrowLeft size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-stone-500 text-sm">
          {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-amber-500 font-semibold hover:underline mr-1"
          >
            {isLogin ? 'سجل الآن' : 'سجل الدخول'}
          </button>
        </div>
      </div>
    </div>
  );
};