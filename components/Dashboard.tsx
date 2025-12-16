import React from 'react';
import { Course } from '../types';
import { Play, Calendar, TrendingUp, Award, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  user: { name: string };
  courses: Course[];
  onCourseSelect: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, courses, onCourseSelect }) => {
  
  // Data for the "Stairs of Knowledge" visualization
  const progressData = [
    { name: 'الأسبوع 1', score: 20 },
    { name: 'الأسبوع 2', score: 45 },
    { name: 'الأسبوع 3', score: 60 },
    { name: 'الأسبوع 4', score: 85 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl p-8 overflow-hidden border border-amber-900/30 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">مرحباً بك في معبد المعرفة، {user.name}</h2>
          <p className="text-stone-400 max-w-2xl text-lg">
            "اصعد درجات معبد آمون، حيث كل درجة هي درس، وكل قمة هي حكمة." 
            أنت الآن في المستوى الرابع من رحلة التنوير.
          </p>
          <button onClick={onCourseSelect} className="mt-6 bg-nubian-gold hover:bg-amber-400 text-stone-900 font-bold py-2 px-6 rounded-full transition-colors flex items-center gap-2">
            <Play size={18} />
            استكمل الرحلة
          </button>
        </div>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-20 text-amber-500 hidden lg:block">
           {/* Abstract SVG or Icon representing a pyramid/temple */}
           <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20h-13L12 5.5z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stairs of Knowledge Chart */}
        <div className="lg:col-span-2 bg-stone-800/50 backdrop-blur rounded-xl p-6 border border-stone-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-amber-500 flex items-center gap-2">
              <TrendingUp />
              سلالم المعرفة
            </h3>
            <span className="text-xs text-stone-400">تقدمك الشهري</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <XAxis dataKey="name" stroke="#78716c" tick={{fill: '#a8a29e'}} />
                <YAxis stroke="#78716c" tick={{fill: '#a8a29e'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1917', borderColor: '#d4af37', color: '#fff' }}
                  itemStyle={{ color: '#d4af37' }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === progressData.length - 1 ? '#D4AF37' : '#57534e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-6">
          <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700 flex items-center gap-4">
            <div className="bg-amber-900/30 p-3 rounded-lg text-amber-500">
              <Award size={24} />
            </div>
            <div>
              <p className="text-stone-400 text-sm">النقاط المكتسبة</p>
              <p className="text-2xl font-bold text-white">1,250</p>
            </div>
          </div>
          
          <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700 flex items-center gap-4">
            <div className="bg-amber-900/30 p-3 rounded-lg text-amber-500">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-stone-400 text-sm">الدورات المكتملة</p>
              <p className="text-2xl font-bold text-white">3 / 12</p>
            </div>
          </div>

          <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-amber-500" />
              الجلسة القادمة
            </h4>
            <div className="bg-stone-900 p-4 rounded-lg border border-stone-800">
              <p className="text-amber-400 font-semibold">تاريخ النوبة القديم</p>
              <p className="text-stone-500 text-sm mt-1">اليوم، 04:00 مساءً</p>
              <button className="w-full mt-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm py-2 rounded transition-colors">
                عرض التفاصيل
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course List Preview */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">مسارات التعلم الحالية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-stone-800 rounded-xl overflow-hidden shadow-lg border border-stone-700 group hover:border-amber-600/50 transition-all">
              <div className="h-40 overflow-hidden relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-stone-700">
                  <div className="h-full bg-nubian-gold" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-stone-100">{course.title}</h4>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-stone-400">{course.progress}% مكتمل</span>
                  <button onClick={onCourseSelect} className="text-amber-500 text-sm font-semibold hover:text-amber-400">
                    تابع التعلم &larr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};