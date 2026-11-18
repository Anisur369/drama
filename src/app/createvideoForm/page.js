'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VideoFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    videoId: '',
    url: '',
    shareLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // এডিট করার জন্য ডেটা ফেচ করা
  useEffect(() => {
    if (editId) {
      fetch('/api/videos')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const currentVideo = data.find((v) => v._id === editId);
            if (currentVideo) {
              setFormData({
                title: currentVideo.title || '',
                videoId: currentVideo.videoId || '',
                url: currentVideo.url || '',
                shareLink: currentVideo.shareLink || ''
              });
            }
          }
        })
        .catch((err) => console.error('Failed to fetch video for edit:', err));
    }
  }, [editId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const url = '/api/videos';
      const method = editId ? 'PUT' : 'POST';
      const bodyData = editId ? { id: editId, ...formData } : formData;

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(editId ? 'ভিডিও সফলভাবে আপডেট হয়েছে!' : 'ভিডিও সফলভাবে সেভ হয়েছে!');
        setTimeout(() => {
          router.push('/');
        }, 1200);
      } else {
        // ব্যাকএন্ড থেকে পাঠানো ডুপ্লিকেট বা অন্য এরর মেসেজ এখানে ধরবে
        setErrorMsg(data.error || 'অপারেশন সফল হয়নি।');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('সার্ভার এরর!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editId ? 'ভিডিও এডিট ও আপডেট করুন' : 'নতুন ভিডিও যুক্ত করুন'}
        </h2>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            {successMsg}
          </div>
        )}

        {/* Error / Duplicate Alert Message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              টাইটেল (যেমন: ১ম, ২য়)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="ভিডিওর শিরোনাম দিন"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video ID
            </label>
            <input
              type="text"
              name="videoId"
              value={formData.videoId}
              onChange={handleChange}
              required
              placeholder="যেমন: L33IUpI6vAQ"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full URL
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share Link
            </label>
            <input
              type="url"
              name="shareLink"
              value={formData.shareLink}
              onChange={handleChange}
              required
              placeholder="https://youtu.be/..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md disabled:bg-blue-300"
          >
            {loading ? 'প্রসেসিং হচ্ছে...' : (editId ? 'আপডেট করুন' : 'সেভ করুন')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CreateVideoForm() {
  return (
    <Suspense fallback={<div className="text-center py-20">লোড হচ্ছে...</div>}>
      <VideoFormContent />
    </Suspense>
  );
}