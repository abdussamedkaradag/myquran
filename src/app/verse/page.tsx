'use client';

import { useState } from 'react';
import axios from 'axios';

export default function VersePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get(`https://api.acikkuran.com/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error searching verses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Ayet Ara
        </h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Aramak istediğiniz ayeti yazın..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Aranıyor...' : 'Ara'}
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center">Aranıyor...</div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((result: any) => (
              <div key={result.id} className="bg-white p-4 rounded-lg shadow">
                <p className="arabic-text font-arabic mb-2">{result.verse}</p>
                <p className="text-gray-600">{result.translation?.text}</p>
              </div>
            ))}
          </div>
        ) : searchQuery && !loading ? (
          <div className="text-center text-gray-500">
            Sonuç bulunamadı
          </div>
        ) : null}
      </div>
    </div>
  );
} 