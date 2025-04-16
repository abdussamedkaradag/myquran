'use client';

import Link from 'next/link';

interface Juz {
  id: number;
  name: string;
  start_surah: number;
  start_verse: number;
  end_surah: number;
  end_verse: number;
}

const JUZ_DATA: Juz[] = [
  { id: 1, name: "1. Cüz", start_surah: 1, start_verse: 1, end_surah: 2, end_verse: 141 },
  { id: 2, name: "2. Cüz", start_surah: 2, start_verse: 142, end_surah: 2, end_verse: 252 },
  { id: 3, name: "3. Cüz", start_surah: 2, start_verse: 253, end_surah: 3, end_verse: 92 },
  { id: 4, name: "4. Cüz", start_surah: 3, start_verse: 93, end_surah: 4, end_verse: 23 },
  { id: 5, name: "5. Cüz", start_surah: 4, start_verse: 24, end_surah: 4, end_verse: 147 },
  { id: 6, name: "6. Cüz", start_surah: 4, start_verse: 148, end_surah: 5, end_verse: 81 },
  { id: 7, name: "7. Cüz", start_surah: 5, start_verse: 82, end_surah: 6, end_verse: 110 },
  { id: 8, name: "8. Cüz", start_surah: 6, start_verse: 111, end_surah: 7, end_verse: 87 },
  { id: 9, name: "9. Cüz", start_surah: 7, start_verse: 88, end_surah: 8, end_verse: 40 },
  { id: 10, name: "10. Cüz", start_surah: 8, start_verse: 41, end_surah: 9, end_verse: 92 },
  { id: 11, name: "11. Cüz", start_surah: 9, start_verse: 93, end_surah: 11, end_verse: 5 },
  { id: 12, name: "12. Cüz", start_surah: 11, start_verse: 6, end_surah: 12, end_verse: 52 },
  { id: 13, name: "13. Cüz", start_surah: 12, start_verse: 53, end_surah: 14, end_verse: 52 },
  { id: 14, name: "14. Cüz", start_surah: 15, start_verse: 1, end_surah: 16, end_verse: 128 },
  { id: 15, name: "15. Cüz", start_surah: 17, start_verse: 1, end_surah: 18, end_verse: 74 },
  { id: 16, name: "16. Cüz", start_surah: 18, start_verse: 75, end_surah: 20, end_verse: 135 },
  { id: 17, name: "17. Cüz", start_surah: 21, start_verse: 1, end_surah: 22, end_verse: 78 },
  { id: 18, name: "18. Cüz", start_surah: 23, start_verse: 1, end_surah: 25, end_verse: 20 },
  { id: 19, name: "19. Cüz", start_surah: 25, start_verse: 21, end_surah: 27, end_verse: 55 },
  { id: 20, name: "20. Cüz", start_surah: 27, start_verse: 56, end_surah: 29, end_verse: 45 },
  { id: 21, name: "21. Cüz", start_surah: 29, start_verse: 46, end_surah: 33, end_verse: 30 },
  { id: 22, name: "22. Cüz", start_surah: 33, start_verse: 31, end_surah: 36, end_verse: 27 },
  { id: 23, name: "23. Cüz", start_surah: 36, start_verse: 28, end_surah: 39, end_verse: 31 },
  { id: 24, name: "24. Cüz", start_surah: 39, start_verse: 32, end_surah: 41, end_verse: 46 },
  { id: 25, name: "25. Cüz", start_surah: 41, start_verse: 47, end_surah: 45, end_verse: 37 },
  { id: 26, name: "26. Cüz", start_surah: 46, start_verse: 1, end_surah: 51, end_verse: 30 },
  { id: 27, name: "27. Cüz", start_surah: 51, start_verse: 31, end_surah: 57, end_verse: 29 },
  { id: 28, name: "28. Cüz", start_surah: 58, start_verse: 1, end_surah: 66, end_verse: 12 },
  { id: 29, name: "29. Cüz", start_surah: 67, start_verse: 1, end_surah: 77, end_verse: 50 },
  { id: 30, name: "30. Cüz", start_surah: 78, start_verse: 1, end_surah: 114, end_verse: 6 }
];

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

export default function JuzPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Link href="/" className="home-button" style={{ textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Anasayfa
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kuran-ı Kerim Cüzleri</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bitiş
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlangıç
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cüz No
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {JUZ_DATA.map((juz) => (
                <tr key={juz.id}>
                  <td className="px-6 py-4">
                    <Link href={`/juz/${juz.id}`} className="juz-table-link">
                      <div className="juz-table-content">
                        <div className="juz-table-surah">{SURAH_NAMES[juz.end_surah]}</div>
                        <div className="juz-table-verse">{juz.end_verse}. Ayet</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/juz/${juz.id}`} className="juz-table-link">
                      <div className="juz-table-content">
                        <div className="juz-table-surah">{SURAH_NAMES[juz.start_surah]}</div>
                        <div className="juz-table-verse">{juz.start_verse}. Ayet</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/juz/${juz.id}`} className="juz-table-link">
                      <div className="juz-table-number">{juz.name}</div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 