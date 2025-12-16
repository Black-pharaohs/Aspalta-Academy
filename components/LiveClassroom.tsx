import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users, Share, MoreVertical, Link as LinkIcon } from 'lucide-react';

export const LiveClassroom: React.FC = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [googleMeetCode, setGoogleMeetCode] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle Camera Simulation
  useEffect(() => {
    if (isCamOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Camera access denied or error:", err);
          setIsCamOn(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isCamOn]);

  const handleJoinGoogleMeet = () => {
    const code = googleMeetCode.trim() || 'new';
    window.open(`https://meet.google.com/${code}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full space-y-4 animate-fade-in">
      <header className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white">قاعة "بعنخي" الافتراضية</h2>
          <p className="text-stone-400 text-sm">درس مباشر: هندسة الأهرامات النوبية</p>
        </div>
        <div className="flex items-center gap-3">
            <input 
                type="text" 
                placeholder="رمز Google Meet" 
                className="bg-stone-800 border border-stone-600 text-stone-200 px-3 py-2 rounded-lg text-sm focus:border-amber-500 outline-none"
                value={googleMeetCode}
                onChange={(e) => setGoogleMeetCode(e.target.value)}
            />
            <button 
                onClick={handleJoinGoogleMeet}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors shadow-lg font-medium"
            >
                <LinkIcon size={16} />
                <span>Google Meet</span>
            </button>
        </div>
      </header>

      {/* Main Video Area */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        
        {/* Main Stage */}
        <div className="flex-1 bg-black rounded-2xl relative overflow-hidden shadow-2xl border border-stone-800 flex items-center justify-center">
          
          {/* Main User Video (Self or Teacher) */}
          {isCamOn ? (
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
          ) : (
            <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-stone-800 flex items-center justify-center mx-auto mb-4 border-2 border-amber-600">
                    <span className="text-4xl text-amber-600 font-bold">A</span>
                </div>
                <p className="text-stone-500">الكاميرا مغلقة</p>
            </div>
          )}

          {/* Overlays */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white text-xs flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            مباشر 00:45:12
          </div>

          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-white text-sm">
             أنت (الطالب)
          </div>
        </div>

        {/* Participants / Chat Panel (Simplified) */}
        <div className="w-80 bg-stone-800 rounded-2xl border border-stone-700 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-stone-700 flex justify-between items-center">
            <h3 className="text-white font-semibold">المشاركون (24)</h3>
            <Users size={18} className="text-stone-400" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Mock Teacher */}
            <div className="flex items-center gap-3">
              <img src="https://picsum.photos/40/40?random=1" alt="Teacher" className="w-10 h-10 rounded-full border-2 border-amber-500" />
              <div>
                <p className="text-white text-sm font-medium">أ. محمد (المعلم)</p>
                <p className="text-amber-500 text-xs">يتحدث الآن...</p>
              </div>
              <Mic size={14} className="text-green-500 mr-auto" />
            </div>
            
            {/* Mock Students */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <img src={`https://picsum.photos/40/40?random=${i + 10}`} alt="Student" className="w-8 h-8 rounded-full bg-stone-600" />
                <p className="text-stone-300 text-sm">طالب {i}</p>
                <MicOff size={14} className="text-red-500 mr-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="h-20 bg-stone-800 rounded-2xl flex items-center justify-between px-8 border border-stone-700 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-stone-400 text-sm font-mono">24:00 / 45:00</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-4 rounded-full transition-all ${isMicOn ? 'bg-stone-700 hover:bg-stone-600 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
          >
            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          
          <button 
            onClick={() => setIsCamOn(!isCamOn)}
            className={`p-4 rounded-full transition-all ${isCamOn ? 'bg-stone-700 hover:bg-stone-600 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
          >
            {isCamOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <button className="p-4 rounded-full bg-stone-700 hover:bg-stone-600 text-white transition-all">
            <Share size={20} />
          </button>
          
          <button className="p-4 rounded-full bg-stone-700 hover:bg-stone-600 text-white transition-all">
            <MessageSquare size={20} />
          </button>
          
          <button className="p-4 rounded-full bg-stone-700 hover:bg-stone-600 text-white transition-all">
            <MoreVertical size={20} />
          </button>

          <div className="w-px h-10 bg-stone-600 mx-2"></div>

          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold flex items-center gap-2 transition-colors">
            <PhoneOff size={20} />
            <span className="hidden sm:inline">إنهاء الجلسة</span>
          </button>
        </div>

        <div className="hidden sm:block text-stone-500 text-xs">
           اتصال آمن ومشفّر
        </div>
      </div>
    </div>
  );
};