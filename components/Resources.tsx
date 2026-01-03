import React from 'react';
import { Resource } from '../types';
import { FileText, Download, PlayCircle, Folder, Upload, Search } from 'lucide-react';

const mockResources: Resource[] = [
  { id: 'r1', title: 'مقدمة في تاريخ كوش.pdf', type: 'PDF', size: '2.5 MB', date: '2023-10-20', author: 'د. سمير' },
  { id: 'r2', title: 'شرح العمارة النوبية.mp4', type: 'VIDEO', size: '150 MB', date: '2023-10-22', author: 'أ. مروة' },
  { id: 'r3', title: 'قائمة المصطلحات الهيروغليفية.docx', type: 'DOC', size: '1.2 MB', date: '2023-10-25', author: 'د. سمير' },
];

export const Resources: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">خزائن المعرفة</h2>
          <p className="text-stone-400">الموارد التعليمية والملفات</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-amber-600 hover:bg-amber-500 text-stone-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
              <Upload size={18} />
              <span>رفع ملف</span>
           </button>
        </div>
      </div>

      {/* Filter/Search Bar */}
      <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 mb-6 flex gap-4">
        <div className="flex-1 relative">
           <Search className="absolute right-3 top-3 text-stone-500 w-5 h-5" />
           <input type="text" placeholder="بحث في الموارد..." className="w-full bg-stone-900 border border-stone-700 rounded-lg py-2.5 px-10 text-stone-200 focus:border-amber-500 outline-none" />
        </div>
        <select className="bg-stone-900 border border-stone-700 text-stone-300 rounded-lg px-4 outline-none focus:border-amber-500">
           <option>كل الملفات</option>
           <option>كتب ومقالات</option>
           <option>فيديوهات</option>
        </select>
      </div>

      {/* Recent Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {mockResources.map(res => (
             <div key={res.id} className="bg-stone-800 p-4 rounded-xl border border-stone-700 hover:border-stone-500 transition-all flex flex-col">
                <div className="flex items-start justify-between mb-4">
                   <div className={`p-3 rounded-lg ${res.type === 'PDF' ? 'bg-red-500/20 text-red-500' : res.type === 'VIDEO' ? 'bg-blue-500/20 text-blue-500' : 'bg-blue-300/20 text-blue-300'}`}>
                      {res.type === 'VIDEO' ? <PlayCircle size={24} /> : <FileText size={24} />}
                   </div>
                   <button className="text-stone-500 hover:text-amber-500">
                      <Download size={18} />
                   </button>
                </div>
                <h3 className="text-stone-200 font-semibold mb-1 truncate">{res.title}</h3>
                <div className="text-xs text-stone-500 flex justify-between mt-auto pt-4 border-t border-stone-700/50">
                   <span>{res.size} • {res.date}</span>
                   <span className="text-amber-600/70">{res.author}</span>
                </div>
             </div>
         ))}
         
         {/* Folder Item */}
         <div className="bg-stone-800/50 border border-dashed border-stone-600 p-4 rounded-xl flex items-center justify-center flex-col gap-2 hover:bg-stone-800 transition-colors cursor-pointer group">
             <Folder size={32} className="text-stone-600 group-hover:text-amber-500 transition-colors" />
             <span className="text-stone-400 group-hover:text-amber-500 text-sm">أرشيف المحاضرات</span>
         </div>
      </div>
    </div>
  );
};