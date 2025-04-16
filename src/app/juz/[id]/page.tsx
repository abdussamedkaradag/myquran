'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Verse {
  id: number;
  verse_number: number;
  verse: string;
  surah_id: number;
  surah: {
    id: number;
    name: string;
    name_ar: string;
  };
  translation?: {
    text: string;
    author?: {
      name: string;
    };
  };
}

const JUZ_DATA = [
  { id: 1, start: { surah: 1, verse: 1 }, end: { surah: 2, verse: 141 } },
  { id: 2, start: { surah: 2, verse: 142 }, end: { surah: 2, verse: 252 } },
  { id: 3, start: { surah: 2, verse: 253 }, end: { surah: 3, verse: 92 } },
  { id: 4, start: { surah: 3, verse: 93 }, end: { surah: 4, verse: 23 } },
  { id: 5, start: { surah: 4, verse: 24 }, end: { surah: 4, verse: 147 } },
  { id: 6, start: { surah: 4, verse: 148 }, end: { surah: 5, verse: 81 } },
  { id: 7, start: { surah: 5, verse: 82 }, end: { surah: 6, verse: 110 } },
  { id: 8, start: { surah: 6, verse: 111 }, end: { surah: 7, verse: 87 } },
  { id: 9, start: { surah: 7, verse: 88 }, end: { surah: 8, verse: 40 } },
  { id: 10, start: { surah: 8, verse: 41 }, end: { surah: 9, verse: 92 } },
  { id: 11, start: { surah: 9, verse: 93 }, end: { surah: 11, verse: 5 } },
  { id: 12, start: { surah: 11, verse: 6 }, end: { surah: 12, verse: 52 } },
  { id: 13, start: { surah: 12, verse: 53 }, end: { surah: 14, verse: 52 } },
  { id: 14, start: { surah: 15, verse: 1 }, end: { surah: 16, verse: 128 } },
  { id: 15, start: { surah: 17, verse: 1 }, end: { surah: 18, verse: 74 } },
  { id: 16, start: { surah: 18, verse: 75 }, end: { surah: 20, verse: 135 } },
  { id: 17, start: { surah: 21, verse: 1 }, end: { surah: 22, verse: 78 } },
  { id: 18, start: { surah: 23, verse: 1 }, end: { surah: 25, verse: 20 } },
  { id: 19, start: { surah: 25, verse: 21 }, end: { surah: 27, verse: 55 } },
  { id: 20, start: { surah: 27, verse: 56 }, end: { surah: 29, verse: 45 } },
  { id: 21, start: { surah: 29, verse: 46 }, end: { surah: 33, verse: 30 } },
  { id: 22, start: { surah: 33, verse: 31 }, end: { surah: 36, verse: 27 } },
  { id: 23, start: { surah: 36, verse: 28 }, end: { surah: 39, verse: 31 } },
  { id: 24, start: { surah: 39, verse: 32 }, end: { surah: 41, verse: 46 } },
  { id: 25, start: { surah: 41, verse: 47 }, end: { surah: 45, verse: 37 } },
  { id: 26, start: { surah: 46, verse: 1 }, end: { surah: 51, verse: 30 } },
  { id: 27, start: { surah: 51, verse: 31 }, end: { surah: 57, verse: 29 } },
  { id: 28, start: { surah: 58, verse: 1 }, end: { surah: 66, verse: 12 } },
  { id: 29, start: { surah: 67, verse: 1 }, end: { surah: 77, verse: 50 } },
  { id: 30, start: { surah: 78, verse: 1 }, end: { surah: 114, verse: 6 } }
];

// Sure isimlerini içeren obje
const SURAH_NAMES: { [key: number]: string } = {
  1: "Fatiha",
  2: "Bakara",
  3: "Al-i İmran",
  4: "Nisa",
  5: "Maide",
  6: "En'am",
  7: "A'raf",
  8: "Enfal",
  9: "Tevbe",
  10: "Yunus",
  11: "Hud",
  12: "Yusuf",
  13: "Ra'd",
  14: "İbrahim",
  15: "Hicr",
  16: "Nahl",
  17: "İsra",
  18: "Kehf",
  19: "Meryem",
  20: "Taha",
  21: "Enbiya",
  22: "Hac",
  23: "Müminun",
  24: "Nur",
  25: "Furkan",
  26: "Şuara",
  27: "Neml",
  28: "Kasas",
  29: "Ankebut",
  30: "Rum",
  31: "Lokman",
  32: "Secde",
  33: "Ahzab",
  34: "Sebe",
  35: "Fatır",
  36: "Yasin",
  37: "Saffat",
  38: "Sad",
  39: "Zümer",
  40: "Mümin",
  41: "Fussilet",
  42: "Şura",
  43: "Zuhruf",
  44: "Duhan",
  45: "Casiye",
  46: "Ahkaf",
  47: "Muhammed",
  48: "Fetih",
  49: "Hucurat",
  50: "Kaf",
  51: "Zariyat",
  52: "Tur",
  53: "Necm",
  54: "Kamer",
  55: "Rahman",
  56: "Vakıa",
  57: "Hadid",
  58: "Mücadele",
  59: "Haşr",
  60: "Mümtehine",
  61: "Saf",
  62: "Cuma",
  63: "Münafikun",
  64: "Tegabün",
  65: "Talak",
  66: "Tahrim",
  67: "Mülk",
  68: "Kalem",
  69: "Hakka",
  70: "Mearic",
  71: "Nuh",
  72: "Cin",
  73: "Müzzemmil",
  74: "Müddessir",
  75: "Kıyame",
  76: "İnsan",
  77: "Mürselat",
  78: "Nebe",
  79: "Naziat",
  80: "Abese",
  81: "Tekvir",
  82: "İnfitar",
  83: "Mutaffifin",
  84: "İnşikak",
  85: "Büruc",
  86: "Tarık",
  87: "Ala",
  88: "Gaşiye",
  89: "Fecr",
  90: "Beled",
  91: "Şems",
  92: "Leyl",
  93: "Duha",
  94: "İnşirah",
  95: "Tin",
  96: "Alak",
  97: "Kadir",
  98: "Beyyine",
  99: "Zilzal",
  100: "Adiyat",
  101: "Karia",
  102: "Tekasür",
  103: "Asr",
  104: "Hümeze",
  105: "Fil",
  106: "Kureyş",
  107: "Maun",
  108: "Kevser",
  109: "Kafirun",
  110: "Nasr",
  111: "Tebbet",
  112: "İhlas",
  113: "Felak",
  114: "Nas"
};

export default function JuzDetailPage() {
  const params = useParams();
  const juzId = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [scrollSpeed, setScrollSpeed] = useState<'none' | 'slow' | 'medium' | 'fast'>('none');
  const [isScrolling, setIsScrolling] = useState(false);
  const juzInfo = JUZ_DATA.find(j => j.id === juzId);

  // Kaydırma hızı ayarları
  const scrollSettings = {
    none: { interval: 0, pixels: 0 },
    slow: { interval: 100, pixels: 1 },
    medium: { interval: 50, pixels: 2 },
    fast: { interval: 25, pixels: 3 }
  };

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
    const fetchJuzVerses = async () => {
      if (!juzInfo) return;

      try {
        setLoading(true);
        const startSurah = juzInfo.start.surah;
        const endSurah = juzInfo.end.surah;
        const allVerses: Verse[] = [];

        // Her sure için ayetleri çekelim
        for (let surahId = startSurah; surahId <= endSurah; surahId++) {
          const response = await axios.get(`https://api.acikkuran.com/surah/${surahId}?author=8`);
          const surahVerses = response.data.data.verses;
          
          // Sadece cüze ait ayetleri filtreleyelim
          const filteredVerses = surahVerses.filter((verse: Verse) => {
            if (surahId === startSurah && surahId === endSurah) {
              return verse.verse_number >= juzInfo.start.verse && verse.verse_number <= juzInfo.end.verse;
            } else if (surahId === startSurah) {
              return verse.verse_number >= juzInfo.start.verse;
            } else if (surahId === endSurah) {
              return verse.verse_number <= juzInfo.end.verse;
            }
            return true;
          });

          // Her ayete sure bilgisini ekleyelim
          const versesWithSurah = filteredVerses.map((verse: Verse) => ({
            ...verse,
            surah_id: surahId
          }));

          allVerses.push(...versesWithSurah);
        }

        setVerses(allVerses);
      } catch (error) {
        console.error('Error fetching juz verses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (juzId) {
      fetchJuzVerses();
    }
  }, [juzId, juzInfo]);

  if (!juzInfo) {
    return <div className="text-center py-8">Cüz bulunamadı</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center py-8">Yükleniyor...</div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="juz-detail-title">
                {juzInfo.id}. Cüz
              </h1>
              <div className="flex flex-col gap-2 text-gray-600">
                <p className="text-lg">
                  <span className="font-semibold text-brown-700">Başlangıç: </span>
                  {SURAH_NAMES[juzInfo.start.surah] || `Sure ${juzInfo.start.surah}`}, {juzInfo.start.verse}. Ayet
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-brown-700">Bitiş: </span>
                  {SURAH_NAMES[juzInfo.end.surah] || `Sure ${juzInfo.end.surah}`}, {juzInfo.end.verse}. Ayet
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <select
                  value={scrollSpeed}
                  onChange={(e) => {
                    const newSpeed = e.target.value as 'none' | 'slow' | 'medium' | 'fast';
                    setScrollSpeed(newSpeed);
                    setIsScrolling(newSpeed !== 'none');
                  }}
                  className="custom-scroll-select bg-white border border-brown-200 rounded-lg px-4 py-2 text-brown-700"
                >
                  <option value="none">Kaydırma Yok</option>
                  <option value="slow">Yavaş</option>
                  <option value="medium">Orta</option>
                  <option value="fast">Hızlı</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              {verses.map((verse) => (
                <div
                  key={`${verse.surah_id}-${verse.verse_number}`}
                  className="bg-white rounded-lg shadow-sm p-6 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-gray-500 text-sm text-right min-w-[60px]">
                      <div>{SURAH_NAMES[verse.surah_id] || `Sure ${verse.surah_id}`}</div>
                      <div>{verse.verse_number}</div>
                    </div>
                    <div className="flex-1">
                      <p className="arabic-text font-arabic mb-4">{verse.verse}</p>
                      <p className="juz-detail-meal">{verse.translation?.text}</p>
                      <hr className="my-4 border-gray-100 border-2" />
                    </div>
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