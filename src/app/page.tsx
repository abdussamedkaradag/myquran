'use client';

import HomePage from '@/components/HomePage';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface SearchResult {
  id: number;
  text: string;
  verse_count: number;
}

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [verseSearchQuery, setVerseSearchQuery] = useState('');
  const [nextVerse, setNextVerse] = useState<boolean>(false);
  const [previousVerse, setPreviousVerse] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.quran-app-container');
    if (isDarkMode) {
      container?.classList.add('dark');
    } else {
      container?.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const input = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearBtn");

    if (!input || !clearBtn) return;

    function toggleClearBtn() {
      if (searchQuery.length > 0) {
        clearBtn?.classList.remove("hidden");
      } else {
        clearBtn?.classList.add("hidden");
      }
    }

    function clearInput(e: MouseEvent) {
      e.preventDefault();
      setSearchQuery("");
      (input as HTMLInputElement).focus();
    }

    clearBtn.addEventListener("click", (e) => {
      if (searchQuery.length > 0) {
        handleSearch(e as unknown as React.MouseEvent<HTMLButtonElement>);
      } else {
        clearInput(e);
      }
    });
    toggleClearBtn();

    return () => {
      clearBtn.removeEventListener("click", clearInput);
    };
  }, [searchQuery]);

  const localData: SearchResult[] = [
    { id: 1, text: 'Fatiha Suresi', verse_count: 7 },
    { id: 2, text: 'Bakara Suresi', verse_count: 286 },
    { id: 3, text: 'Al-i İmran Suresi', verse_count: 200 },
    { id: 4, text: 'Nisa Suresi', verse_count: 176 },
    { id: 5, text: 'Maide Suresi', verse_count: 120 },
    { id: 6, text: 'Enam Suresi', verse_count: 165 },
    { id: 7, text: 'Araf Suresi', verse_count: 206 },
    { id: 8, text: 'Enfal Suresi', verse_count: 75 },
    { id: 9, text: 'Tevbe Suresi', verse_count: 129 },
    { id: 10, text: 'Yunus Suresi', verse_count: 109 },
    { id: 11, text: 'Hud Suresi', verse_count: 123 },
    { id: 12, text: 'Yusuf Suresi', verse_count: 111 },
    { id: 13, text: 'Rad Suresi', verse_count: 43 },
    { id: 14, text: 'İbrahim Suresi', verse_count: 52 },
    { id: 15, text: 'Hicr Suresi', verse_count: 99 },
    { id: 16, text: 'Nahl Suresi', verse_count: 128 },
    { id: 17, text: 'İsra Suresi', verse_count: 111 },
    { id: 18, text: 'Kehf Suresi', verse_count: 110 },
    { id: 19, text: 'Meryem Suresi', verse_count: 98 },
    { id: 20, text: 'Taha Suresi', verse_count: 135 },
    { id: 21, text: 'Enbiya Suresi', verse_count: 112 },
    { id: 22, text: 'Hac Suresi', verse_count: 78 },
    { id: 23, text: 'Müminun Suresi', verse_count: 118 },
    { id: 24, text: 'Nur Suresi', verse_count: 64 },
    { id: 25, text: 'Furkan Suresi', verse_count: 77 },
    { id: 26, text: 'Şuara Suresi', verse_count: 227 },
    { id: 27, text: 'Neml Suresi', verse_count: 93 },
    { id: 28, text: 'Kasas Suresi', verse_count: 88 },
    { id: 29, text: 'Ankebut Suresi', verse_count: 69 },
    { id: 30, text: 'Rum Suresi', verse_count: 60 },
    { id: 31, text: 'Lokman Suresi', verse_count: 34 },
    { id: 32, text: 'Secde Suresi', verse_count: 30 },
    { id: 33, text: 'Ahzab Suresi', verse_count: 73 },
    { id: 34, text: 'Sebe Suresi', verse_count: 54 },
    { id: 35, text: 'Fatır Suresi', verse_count: 45 },
    { id: 36, text: 'Yasin Suresi', verse_count: 83 },
    { id: 37, text: 'Saffat Suresi', verse_count: 182 },
    { id: 38, text: 'Sad Suresi', verse_count: 88 },
    { id: 39, text: 'Zümer Suresi', verse_count: 75 },
    { id: 40, text: 'Mümin Suresi', verse_count: 85 },
    { id: 41, text: 'Fussilet Suresi', verse_count: 54 },
    { id: 42, text: 'Şura Suresi', verse_count: 53 },
    { id: 43, text: 'Zuhruf Suresi', verse_count: 89 },
    { id: 44, text: 'Duhan Suresi', verse_count: 59 },
    { id: 45, text: 'Casiye Suresi', verse_count: 37 },
    { id: 46, text: 'Ahkaf Suresi', verse_count: 35 },
    { id: 47, text: 'Muhammed Suresi', verse_count: 38 },
    { id: 48, text: 'Fetih Suresi', verse_count: 29 },
    { id: 49, text: 'Hucurat Suresi', verse_count: 18 },
    { id: 50, text: 'Kaf Suresi', verse_count: 45 },
    { id: 51, text: 'Zariyat Suresi', verse_count: 60 },
    { id: 52, text: 'Tur Suresi', verse_count: 49 },
    { id: 53, text: 'Necm Suresi', verse_count: 62 },
    { id: 54, text: 'Kamer Suresi', verse_count: 55 },
    { id: 55, text: 'Rahman Suresi', verse_count: 78 },
    { id: 56, text: 'Vakıa Suresi', verse_count: 96 },
    { id: 57, text: 'Hadid Suresi', verse_count: 29 },
    { id: 58, text: 'Mücadele Suresi', verse_count: 22 },
    { id: 59, text: 'Haşr Suresi', verse_count: 24 },
    { id: 60, text: 'Mümtehine Suresi', verse_count: 13 },
    { id: 61, text: 'Saff Suresi', verse_count: 14 },
    { id: 62, text: 'Cuma Suresi', verse_count: 11 },
    { id: 63, text: 'Munafikun Suresi', verse_count: 11 },
    { id: 64, text: 'Tegabun Suresi', verse_count: 18 },
    { id: 65, text: 'Talak Suresi', verse_count: 12 },
    { id: 66, text: 'Tahrim Suresi', verse_count: 12 },
    { id: 67, text: 'Mülk Suresi', verse_count: 30 },
    { id: 68, text: 'Kalem Suresi', verse_count: 52 },
    { id: 69, text: 'Hakka Suresi', verse_count: 52 },
    { id: 70, text: 'Mearic Suresi', verse_count: 44 },
    { id: 71, text: 'Nuh Suresi', verse_count: 28 },
    { id: 72, text: 'Cin Suresi', verse_count: 28 },
    { id: 73, text: 'Müzzemmil Suresi', verse_count: 20 },
    { id: 74, text: 'Müddessir Suresi', verse_count: 56 },
    { id: 75, text: 'Kıyamet Suresi', verse_count: 40 },
    { id: 76, text: 'İnsan Suresi', verse_count: 31 },
    { id: 77, text: 'Mürselat Suresi', verse_count: 50 },
    { id: 78, text: 'Nebe Suresi', verse_count: 40 },
    { id: 79, text: 'Naziat Suresi', verse_count: 46 },
    { id: 80, text: 'Abese Suresi', verse_count: 42 },
    { id: 81, text: 'Tekvir Suresi', verse_count: 29 },
    { id: 82, text: 'İnfitar Suresi', verse_count: 19 },
    { id: 83, text: 'Mutaffifin Suresi', verse_count: 36 },
    { id: 84, text: 'İnşikak Suresi', verse_count: 25 },
    { id: 85, text: 'Buruc Suresi', verse_count: 22 },
    { id: 86, text: 'Tarık Suresi', verse_count: 17 },
    { id: 87, text: 'Ala Suresi', verse_count: 19 },
    { id: 88, text: 'Gaşiye Suresi', verse_count: 26 },
    { id: 89, text: 'Fecr Suresi', verse_count: 30 },
    { id: 90, text: 'Beled Suresi', verse_count: 20 },
    { id: 91, text: 'Şems Suresi', verse_count: 15 },
    { id: 92, text: 'Leyl Suresi', verse_count: 21 },
    { id: 93, text: 'Duha Suresi', verse_count: 11 },
    { id: 94, text: 'İnşirah Suresi', verse_count: 8 },
    { id: 95, text: 'Tin Suresi', verse_count: 8 },
    { id: 96, text: 'Alak Suresi', verse_count: 19 },
    { id: 97, text: 'Kadir Suresi', verse_count: 5 },
    { id: 98, text: 'Beyyine Suresi', verse_count: 8 },
    { id: 99, text: 'Zilzal Suresi', verse_count: 8 },
    { id: 100, text: 'Adiyat Suresi', verse_count: 11 },
    { id: 101, text: 'Karia Suresi', verse_count: 11 },
    { id: 102, text: 'Tekasür Suresi', verse_count: 8 },
    { id: 103, text: 'Asr Suresi', verse_count: 3 },
    { id: 104, text: 'Hümeze Suresi', verse_count: 9 },
    { id: 105, text: 'Fil Suresi', verse_count: 5 },
    { id: 106, text: 'Kureyş Suresi', verse_count: 4 },
    { id: 107, text: 'Maun Suresi', verse_count: 7 },
    { id: 108, text: 'Kevser Suresi', verse_count: 3 },
    { id: 109, text: 'Kafirun Suresi', verse_count: 6 },
    { id: 110, text: 'Nasr Suresi', verse_count: 3 },
    { id: 111, text: 'Tebbet Suresi', verse_count: 5 },
    { id: 112, text: 'İhlas Suresi', verse_count: 4 },
    { id: 113, text: 'Felak Suresi', verse_count: 5 },
    { id: 114, text: 'Nas Suresi', verse_count: 6 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchText = value.toLowerCase();
    const filtered = localData.filter(item => 
      item.text.toLowerCase().includes(searchText)
    ).slice(0, 5);
    
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (surah: SearchResult) => {
    setSearchQuery(surah.text);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (!searchQuery) return;

    const searchParts = searchQuery.trim().split(/\s+/);
    if (searchParts.length !== 2) {
      setSearchQuery('');
      toast.error(
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>Lütfen "sure adı ayet numarası" formatında arama yapın (örn: "yasin 5")</span>
        </div>,
        {
          className: 'toast-error',
          duration: 4000,
          position: 'top-center'
        }
      );
      return;
    }

    const [surahName, verseNumber] = searchParts;
    const verseId = parseInt(verseNumber);

    if (isNaN(verseId)) {
      setSearchQuery('');
      toast.error(
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>Lütfen geçerli bir ayet numarası girin</span>
        </div>,
        {
          className: 'toast-error',
          duration: 4000,
          position: 'top-center'
        }
      );
      return;
    }

    const surah = localData.find(s => 
      s.text.toLowerCase().includes(surahName.toLowerCase())
    );

    if (!surah) {
      setSearchQuery('');
      toast.error(
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>Geçersiz sure adı. Lütfen geçerli bir sure adı girin.</span>
        </div>,
        {
          className: 'toast-error',
          duration: 4000,
          position: 'top-center'
        }
      );
      return;
    }

    if (verseId < 1 || verseId > surah.verse_count) {
      setSearchQuery('');
      toast.error(
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{surah.text} {surah.verse_count} ayettir. Lütfen 1 ile {surah.verse_count} arasında bir ayet numarası girin.</span>
        </div>,
        {
          className: 'toast-error',
          duration: 4000,
          position: 'top-center'
        }
      );
      return;
    }

    router.push(`/surah/${surah.id}/${verseId}`);
  };

  const handleResultClick = (surahId: number) => {
    router.push(`/surah/${surahId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNextVerse = () => {
    // Sonraki ayet işlemi
  };

  const handlePreviousVerse = () => {
    // Önceki ayet işlemi
  };

  const handleDetailClick = () => {
    // Detay sayfasına yönlendirme
  };

  return (
    <div className="quran-app-container min-h-screen bg-pattern bg-cover flex items-center justify-center p-4">
      <div className="quran-content-container bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 max-w-md w-full mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-8 text-brown-800">Kuran-ı Kerim</h1>
        
        <div className="custom-search-container relative mb-8">
          <input
            type="text"
            id="searchInput"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="custom-search-input"
            placeholder=" "
          />
          <label className="custom-search-label">Arama yapınız. (Örn: Mülk 2)</label>
          <button
            id="clearBtn"
            className="custom-search-button"
            onClick={handleSearch}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((surah) => (
                <div
                  key={surah.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(surah)}
                >
                  <span className="surah-name">{surah.text}</span>
                  <span className="verse-count text-sm text-gray-500">
                    ({surah.verse_count} ayet)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nav-container">
          <button
            onClick={() => router.push('/surah')}
            className="nav-button"
          >
            Sure
          </button>
          <button
            onClick={() => router.push('/juz')}
            className="nav-button"
          >
            Cüz
          </button>
          <button
            onClick={() => router.push('/page')}
            className="nav-button"
          >
            Sayfa
          </button>
        </div>

        <button className="theme-toggle-button" onClick={toggleTheme}>
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
      <footer className="quran-footer">
        <div className="footer-content">
          <div className="footer-left">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="mailto:info@example.com" className="footer-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="https://patreon.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                <path d="M9.5 3.5h4v18h-4z"></path>
                <path d="M9.5 3.5a2 2 0 1 1 4 0v18a2 2 0 1 1-4 0V3.5z"></path>
              </svg>
            </a>
          </div>
          <div className="footer-right">
            <a href="/about" className="footer-logo-link">
              <img src="/logo.png" alt="BEYYİNAT" className="footer-logo" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
