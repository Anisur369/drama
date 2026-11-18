'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateVideoForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    videoId: '',
    url: '',
    shareLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMsg('ভিডিও সফলভাবে সেভ হয়েছে!');
        setFormData({ title: '', videoId: '', url: '', shareLink: '' });
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        alert('ভিডিও সেভ করতে সমস্যা হয়েছে।');
      }
    } catch (error) {
      console.error(error);
      alert('সার্ভার এরর!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">নতুন ভিডিও যুক্ত করুন</h2>

        {successMsg && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
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

          {/* Video ID */}
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

          {/* Full URL */}
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

          {/* Share Link */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md disabled:bg-blue-300"
          >
            {loading ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}