import React, { useState } from 'react';
import { Teacher } from '../types';
import { Star, Calendar, Clock, Search, Filter, CheckCircle } from 'lucide-react';

const mockTeachers: Teacher[] = [
  { id: 't1', name: 'د. سمير النوبي', specialty: 'التاريخ القديم والآثار', rating: 4.9, hourlyRate: 50, image: 'https://picsum.photos/200?random=20', bio: 'أستاذ دكتور في علم المصريات، متخصص في حقبة الممالك النوبية.' },
  { id: 't2', name: 'أ. مروة كوش', specialty: 'اللغة الهيروغليفية', rating: 4.7, hourlyRate: 35, image: 'https://picsum.photos/200?random=21', bio: 'باحثة لغوية ومترجمة للنصوص القديمة، خبرة 10 سنوات.' },
  { id: 't3', name: 'د. أسامة آمون', specialty: 'فنون العمارة', rating: 4.8, hourlyRate: 45, image: 'https://picsum.photos/200?random=22', bio: 'مهندس معماري متخصص في ترميم المباني الأثرية.' },
  { id: 't4', name: 'سارة النيل', specialty: 'فلك وهندسة', rating: 4.6, hourlyRate: 40, image: 'https://picsum.photos/200?random=23', bio: 'مدرسة فيزياء وفلك، تربط بين العلوم الحديثة والمعرفة القديمة.' },
];

export const Teachers: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = () => {
    setIsBooking(true);
    // Simulate API Booking
    setTimeout(() => {
        setIsBooking(false);
        setBookingSuccess(true);
        setTimeout(() => {
            setBookingSuccess(false);
            setSelectedTeacher(null);
        }, 3000);
    }, 1500);
  };

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">مجلس الحكماء</h2>
          <p className="text-stone-400">احجز جلسة خاصة مع نخبة المعلمين</p>
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <Search className="absolute right-3 top-2.5 text-stone-500 w-4 h-4" />
                <input type="text" placeholder="بحث عن معلم..." className="bg-stone-800 text-sm text-stone-200 pl-4 pr-9 py-2 rounded-lg border border-stone-700 focus:border-amber-500 outline-none" />
            </div>
            <button className="bg-stone-800 p-2 rounded-lg border border-stone-700 text-stone-400 hover:text-amber-500">
                <Filter size={20} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-6">
        {mockTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-stone-800 rounded-xl overflow-hidden border border-stone-700 hover:border-amber-500/50 transition-all group">
            <div className="h-24 bg-gradient-to-r from-amber-900/50 to-stone-900 relative">
               <div className="absolute -bottom-8 right-1/2 transform translate-x-1/2">
                   <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-full border-4 border-stone-800 object-cover" />
               </div>
            </div>
            <div className="pt-10 pb-6 px-4 text-center">
               <h3 className="font-bold text-lg text-white">{teacher.name}</h3>
               <p className="text-amber-500 text-sm mb-2">{teacher.specialty}</p>
               <div className="flex justify-center gap-1 mb-4">
                   {[...Array(5)].map((_, i) => (
                       <Star key={i} size={14} className={i < Math.floor(teacher.rating) ? "text-yellow-500 fill-yellow-500" : "text-stone-600"} />
                   ))}
                   <span className="text-xs text-stone-500 mr-1">({teacher.rating})</span>
               </div>
               <p className="text-xs text-stone-400 mb-4 line-clamp-2 h-8">{teacher.bio}</p>
               
               <div className="flex justify-between items-center border-t border-stone-700 pt-4 mt-2">
                   <div className="text-right">
                       <span className="block text-xs text-stone-500">سعر الساعة</span>
                       <span className="font-bold text-white">${teacher.hourlyRate}</span>
                   </div>
                   <button 
                     onClick={() => setSelectedTeacher(teacher)}
                     className="bg-stone-700 hover:bg-amber-600 hover:text-stone-900 text-stone-200 px-4 py-2 rounded-lg text-sm transition-colors font-medium"
                   >
                       حجز موعد
                   </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal Overlay */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-900/50 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in relative">
            
            {bookingSuccess ? (
                <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">تم الحجز بنجاح!</h3>
                    <p className="text-stone-400">سيتم إرسال تفاصيل الجلسة إلى بريدك الإلكتروني.</p>
                </div>
            ) : (
                <>
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-stone-800 pb-2">
                        حجز جلسة مع {selectedTeacher.name}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm text-stone-400 mb-2">اختر اليوم</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                {[1, 2, 3, 4, 5].map((d) => (
                                    <button key={d} className={`flex-shrink-0 w-16 h-20 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${d === 1 ? 'bg-amber-600 border-amber-500 text-white' : 'bg-stone-800 border-stone-700 text-stone-400 hover:border-amber-500/50'}`}>
                                        <span className="text-xs">أكتوبر</span>
                                        <span className="font-bold text-lg">{27 + d}</span>
                                        <span className="text-[10px] opacity-70">الأحد</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-stone-400 mb-2">اختر التوقيت</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'].map((t, i) => (
                                    <button key={t} className={`py-2 rounded border text-sm ${i === 2 ? 'bg-amber-900/30 border-amber-500 text-amber-500' : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button 
                            onClick={() => setSelectedTeacher(null)}
                            className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-300 py-3 rounded-lg font-medium transition-colors"
                        >
                            إلغاء
                        </button>
                        <button 
                            onClick={handleBook}
                            disabled={isBooking}
                            className="flex-2 w-full bg-nubian-gold hover:bg-amber-400 text-stone-900 py-3 rounded-lg font-bold transition-colors flex justify-center items-center gap-2"
                        >
                            {isBooking ? 'جاري التأكيد...' : 'تأكيد الحجز ($' + selectedTeacher.hourlyRate + ')'}
                        </button>
                    </div>
                </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};