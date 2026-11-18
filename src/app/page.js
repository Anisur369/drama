'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VideoLibrary() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchVideos = () => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVideos(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ভিডিও ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    if (confirm('আপনি কি সত্যিই এই ভিডিওটি ডিলিট করতে চান?')) {
      try {
        const res = await fetch(`/api/videos?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setVideos(videos.filter((video) => video._id !== id));
        } else {
          alert('ডিলিট করতে সমস্যা হয়েছে।');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // এডিট পেজে রিডাইরেক্ট করার ফাংশন
  const handleEdit = (video) => {
    localStorage.setItem('editVideoData', JSON.stringify(video));
    router.push(`/createvideoForm?id=${video._id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          আমার সেভ করা ইউটিউব ভিডিওসমূহ
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem('editVideoData');
            router.push('/createvideoForm');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + নতুন ভিডিও যোগ করুন
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 text-gray-500">কোনো ভিডিও পাওয়া যায়নি!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => {
            const videoId = video.videoId || "L33IUpI6vAQ";
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <div key={video._id || index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <div className="relative aspect-video bg-black flex items-center justify-center group">
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                    />
                    {/* YouTube Play Button Icon Overlay */}
                    <a
                      href={video.url || `https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition"
                    >
                      <div className="w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition">
                        <div className="w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-10 border-l-white ml-0.5"></div>
                      </div>
                    </a>
                  </div>
                  <div className="p-3 text-center font-medium text-gray-700 truncate">
                    <span className="text-blue-600 font-bold block text-center">{videos.length - index}</span>
                    <span className="text-gray-500 w-full"> {video.title}</span>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="px-3 pb-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(video)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm py-1.5 rounded font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1.5 rounded font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}