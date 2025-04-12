'use client';

import { useRouter } from 'next/navigation';

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

export default function SurahPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sureler</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Ana Sayfa
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(SURAH_NAMES).map(([id, name]) => (
            <button
              key={id}
              onClick={() => router.push(`/surah/${id}`)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-50 border border-gray-100"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-green-700">{name}</h2>
                <p className="text-gray-500">Sure {id}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 