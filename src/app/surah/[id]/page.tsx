'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Verse {
  id: number;
  verse_number: number;
  verse: string;
  translation: {
    text: string;
    author: {
      name: string;
    };
  };
}

export default function SurahDetailPage() {
  const params = useParams();
  const surahId = params.id;
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [surahInfo, setSurahInfo] = useState<any>(null);
  const [scrollSpeed, setScrollSpeed] = useState<'none' | 'slow' | 'medium' | 'fast'>('none');
  const [isScrolling, setIsScrolling] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);

  // Kaydırma hızı ayarları
  const scrollSettings = {
    none: { interval: 0, pixels: 0 },
    slow: { interval: 100, pixels: 1 },
    medium: { interval: 50, pixels: 2 },
    fast: { interval: 25, pixels: 3 }
  };

  // scrollSpeed değiştiğinde isScrolling state'ini güncelle
  useEffect(() => {
    if (scrollSpeed !== 'none') {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  }, [scrollSpeed]);

  // Sayfa yüklendiğinde otomatik kaydırma
  useEffect(() => {
    if (scrollSpeed === 'none' || !isScrolling) return;

    const settings = scrollSettings[scrollSpeed];
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Mobil cihazlarda sürekli kaydırma yap
    if (isMobile) {
      const scrollInterval = setInterval(() => {
        window.scrollBy({
          top: settings.pixels,
          behavior: 'smooth'
        });
      }, settings.interval);

      return () => clearInterval(scrollInterval);
    }

    // Web için sürekli kaydırma
    const scrollInterval = setInterval(() => {
      window.scrollBy({
        top: settings.pixels,
        behavior: 'smooth'
      });
    }, settings.interval);

    return () => clearInterval(scrollInterval);
  }, [scrollSpeed, isScrolling]);

  // Mobil cihazlar için özel etkileşim yönetimi
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    const handleTouchEnd = (e: TouchEvent) => {
      // Eğer dokunulan element bir select elementi ise, kaydırmayı değiştirme
      if (e.target instanceof HTMLSelectElement) {
        return;
      }
      
      // Sadece scrollSpeed 'none' değilse kaydırmayı değiştir
      if (scrollSpeed !== 'none') {
        setIsScrolling(prev => !prev);
      }
    };

    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollSpeed]);

  // Web için etkileşim yönetimi
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    const handleInteraction = (e: MouseEvent) => {
      if (e.target instanceof HTMLSelectElement) {
        return;
      }
      setIsScrolling(prev => !prev);
    };

    document.addEventListener('click', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        // Diyanet İşleri meali için author=8
        const response = await axios.get(`https://api.acikkuran.com/surah/${surahId}?author=8`);
        setVerses(response.data.data.verses);
        setSurahInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching surah:', error);
      } finally {
        setLoading(false);
      }
    };

    if (surahId) {
      fetchSurah();
    }
  }, [surahId]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-8">Yükleniyor...</div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {surahInfo?.name}
              </h1>
              <p className="text-xl font-arabic mb-2">{surahInfo?.name_ar}</p>
              <p className="text-gray-600">{surahInfo?.verse_count} Ayet</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <select
                  value={scrollSpeed}
                  onChange={(e) => {
                    const newSpeed = e.target.value as 'none' | 'slow' | 'medium' | 'fast';
                    setScrollSpeed(newSpeed);
                    if (newSpeed !== 'none') {
                      setIsScrolling(true);
                    } else {
                      setIsScrolling(false);
                    }
                  }}
                  className="custom-scroll-select"
                >
                  <option value="none">Kaydırma Yok</option>
                  <option value="slow">Yavaş</option>
                  <option value="medium">Orta</option>
                  <option value="fast">Hızlı</option>
                </select>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="custom-button"
                >
                  {showTranslation ? 'Meali Gizle' : 'Meali Göster'}
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {verses.map((verse) => (
                <div
                  key={verse.id}
                  className="bg-white rounded-lg shadow-md p-6 space-y-4 max-w-2xl mx-auto"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="verse-number">
                        {verse.verse_number}
                      </span>
                      <p className="arabic-text font-arabic mb-1 text-2xl text-center">{verse.verse}</p>
                    </div>
                    {showTranslation && (
                      <p className="meal-text text-gray-600 text-lg text-center mt-1">{verse.translation.text}</p>
                    )}
                    <hr className="verse-divider mt-2 mb-2" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 