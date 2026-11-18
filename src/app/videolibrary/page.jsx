'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // ১. next/image ইম্পোর্ট করা হয়েছে

// ভিডিও ডাটাবেজ
const videoDatabase = [
  { title: "১ম", videoId: "L33IUpI6vAQ", url: "https://www.youtube.com/watch?v=L33IUpI6vAQ&t=17s", shareLink: "https://youtu.be/L33IUpI6vAQ?si=3yDwSUAXIJM09ogD" },
  { title: "২য়", videoId: "4Vh6FedG0Xo", url: "https://www.youtube.com/watch?v=4Vh6FedG0Xo", shareLink: "https://youtu.be/4Vh6FedG0Xo?si=kP-WNO0f4hGNzNiZ" },
  { title: "৩য়", videoId: "5p0UVwt4tso", url: "https://www.youtube.com/watch?v=5p0UVwt4tso&t=7s", shareLink: "https://youtu.be/5p0UVwt4tso?si=AAEYZeWsQfBNhlnS" },
  { title: "৪র্থ", videoId: "qP-kpCWNdXQ", url: "https://www.youtube.com/watch?v=qP-kpCWNdXQ", shareLink: "https://youtu.be/qP-kpCWNdXQ?si=wjaGEeENXZylbfdq" },
  { title: "৫ম", videoId: "Dl-7uAa-QVk", url: "https://www.youtube.com/watch?v=Dl-7uAa-QVk", shareLink: "https://youtu.be/Dl-7uAa-QVk?si=2puUJ76au-nwFgI8" },
  { title: "৬ষ্ঠ", videoId: "3dc-kllTnMo", url: "https://www.youtube.com/watch?v=3dc-kllTnMo", shareLink: "https://youtu.be/3dc-kllTnMo?si=nYE_soPzXAnRislo" },
  { title: "৭ম", videoId: "4qCobp-6FHA", url: "https://www.youtube.com/watch?v=4qCobp-6FHA&t=190s", shareLink: "https://youtu.be/4qCobp-6FHA?si=gH2aEQ_gaXnXe-sU" },
  { title: "৮ম", videoId: "di__x0tmKvE", url: "https://www.youtube.com/watch?v=di__x0tmKvE", shareLink: "https://youtu.be/di__x0tmKvE?si=JCQhwHQa1A4gyF3L" },
  { title: "৯ম", videoId: "0mag5RT7dS4", url: "https://www.youtube.com/watch?v=0mag5RT7dS4", shareLink: "https://youtu.be/0mag5RT7dS4?si=Qz-w4dZbMjPEOG31" },
  { title: "১০ম", videoId: "9tG7M9o2aYk", url: "https://www.youtube.com/watch?v=9tG7M9o2aYk", shareLink: "https://youtu.be/9tG7M9o2aYk?si=9NZzFg7lBnCY14Tu" },
  { title: "১১ম", videoId: "BNUHs7Jye8o", url: "https://www.youtube.com/watch?v=BNUHs7Jye8o", shareLink: "https://youtu.be/BNUHs7Jye8o?si=SLu-hGzh810bev4Z" },
  { title: "১২ম", videoId: "qxCPCN9KVkU", url: "https://www.youtube.com/watch?v=qxCPCN9KVkU", shareLink: "https://youtu.be/qxCPCN9KVkU?si=pNc76QaIgTSp2NfA" },
  { title: "১৩ম", videoId: "bS9ujWAG4mQ", url: "https://www.youtube.com/watch?v=bS9ujWAG4mQ", shareLink: "https://youtu.be/bS9ujWAG4mQ?si=e_ld-cx4Ro4KCQbu" },
  { title: "১৪ম", videoId: "5tC9E9UFPoQ", url: "https://www.youtube.com/watch?v=5tC9E9UFPoQ", shareLink: "https://youtu.be/5tC9E9UFPoQ?si=72xyb9Uqezl8Y1Yi" },
  { title: "১৫ম", videoId: "1PHRzfI2kKo", url: "https://www.youtube.com/watch?v=1PHRzfI2kKo", shareLink: "https://youtu.be/1PHRzfI2kKo?si=i1DCHXMK2coj6d2Y" },
  { title: "১৬ম", videoId: "qP-kpCWNdXQ", url: "https://www.youtube.com/watch?v=qP-kpCWNdXQ&t=7s", shareLink: "https://youtu.be/qP-kpCWNdXQ?si=3hqNfKGUg1fUqxH9" },
  { title: "১৭ম", videoId: "rH4n25KM90Q", url: "https://www.youtube.com/watch?v=rH4n25KM90Q", shareLink: "https://youtu.be/rH4n25KM90Q?si=dm1fhTkdPi9Lat50" },
  { title: "১৮ম", videoId: "x9nTA1XffbI", url: "https://www.youtube.com/watch?v=x9nTA1XffbI", shareLink: "https://youtu.be/x9nTA1XffbI?si=gcO3Ui1Or5ju_ZVt" },
  { title: "১৯ম", videoId: "3St1tEmX3Es", url: "https://www.youtube.com/watch?v=3St1tEmX3Es", shareLink: "https://youtu.be/3St1tEmX3Es?si=OrI0_LY_0d2wN6LL" },
  { title: "২০ম", videoId: "5tC9E9UFPoQ", url: "https://www.youtube.com/watch?v=5tC9E9UFPoQ", shareLink: "https://youtu.be/5tC9E9UFPoQ?si=XAvO44ipmmFpTHO9" },
  { title: "২১ম", videoId: "FRlcyw6qVWI", url: "https://www.youtube.com/watch?v=FRlcyw6qVWI", shareLink: "https://youtu.be/FRlcyw6qVWI?si=ZKBh0UJ_bAHbOKQg" },
  { title: "২২ম", videoId: "M11N4tBsSaM", url: "https://www.youtube.com/watch?v=M11N4tBsSaM", shareLink: "https://youtu.be/M11N4tBsSaM?si=RffzMuyp6ntJW65x" },
  { title: "২৩ম", videoId: "X_EN3nrusXU", url: "https://www.youtube.com/watch?v=X_EN3nrusXU", shareLink: "https://youtu.be/X_EN3nrusXU?si=i0oMepCaO4yZmflX" },
  { title: "২৪ম", videoId: "CkDOycECHtw", url: "https://www.youtube.com/watch?v=CkDOycECHtw", shareLink: "https://youtu.be/CkDOycECHtw?si=m5S-IV08DbrlW0jG" },
  { title: "২৫ম", videoId: "", url: "", shareLink: "" },
  { title: "২৬ম", videoId: "", url: "", shareLink: "" },
  { title: "২৭ম", videoId: "", url: "", shareLink: "" },
  { title: "২৮ম", videoId: "", url: "", shareLink: "" },
  { title: "২৯ম", videoId: "", url: "https://www.youtube.com/watch?v=5tC9E9UFPoQ", shareLink: "https://youtu.be/5tC9E9UFPoQ?si=XAvO44ipmmFpTHO9" },
  { title: "৩০ম", videoId: "", url: "https://www.youtube.com/watch?v=5tC9E9UFPoQ", shareLink: "https://youtu.be/5tC9E9UFPoQ?si=XAvO44ipmmFpTHO9" },
  { title: "৩১ম", videoId: "", url: "https://www.youtube.com/watch?v=5tC9E9UFPoQ", shareLink: "https://youtu.be/5tC9E9UFPoQ?si=XAvO44ipmmFpTHO9" },
  { title: "৩২ম", videoId: "", url: "https://www.youtube.com/watch?v=5tC9E9UFPoQ", shareLink: "https://youtu.be/5tC9E9UFPoQ?si=XAvO44ipmmFpTHO9" },
];

export default function VideoLibrary() {
  const [playingStates, setPlayingStates] = useState({});

  const handlePlay = (index) => {
    if (videoDatabase[index].videoId) {
      setPlayingStates((prev) => ({ ...prev, [index]: true }));
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f4f9] p-5 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        আমার সেভ করা ইউটিউব ভিডিওসমূহ
      </h1>

      <div className="flex flex-wrap justify-center gap-5">
        {videoDatabase.map((video, index) => (
          <div
            key={index}
            onClick={() => handlePlay(index)}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md w-[360px] max-w-full cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="relative w-full h-[202px] bg-black rounded-[5px] overflow-hidden">
              {video.videoId ? (
                playingStates[index] ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-none"
                  ></iframe>
                ) : (
                  <>
                    {/* ২. HTML img ট্যাগের বদলে next/image ব্যবহার করা হয়েছে */}
                    <Image
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(255,0,0,0.85)] text-white px-[18px] py-[10px] rounded-lg text-lg font-bold">
                      ▶
                    </div>
                  </>
                )
              ) : (
                <div className="flex items-center justify-center w-full h-full text-white text-sm">
                  কোনো ভিডিও নেই
                </div>
              )}
            </div>

            <h3 className="mt-3 text-[17px] text-[#333] font-medium">
              {index + 1}. {video.title}
            </h3>
          </div>
        ))}
      </div>
    </main>
  );
}