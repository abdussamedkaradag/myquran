'use client';

interface Juz {
  id: number;
  name: string;
  start_surah: number;
  start_verse: number;
  end_surah: number;
  end_verse: number;
}

interface JuzListProps {
  onJuzSelect: (juzId: number) => void;
}

export default function JuzList({ onJuzSelect }: JuzListProps) {
  const juzs: Juz[] = [
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
    { id: 30, name: "30. Cüz", start_surah: 78, start_verse: 1, end_surah: 114, end_verse: 6 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-h-[500px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Cüzler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {juzs.map((juz) => (
          <button
            key={juz.id}
            onClick={() => onJuzSelect(juz.id)}
            className="text-left p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{juz.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              {juz.start_surah}. sure, {juz.start_verse}. ayet - {juz.end_surah}. sure, {juz.end_verse}. ayet
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 