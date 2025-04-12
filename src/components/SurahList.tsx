'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Surah {
  id: number;
  name: string;
  name_en: string;
  name_ar: string;
  verse_count: number;
}

interface SurahListProps {
  surahs: Surah[];
  onSurahSelect: (surahId: number) => void;
}

export default function SurahList({ surahs, onSurahSelect }: SurahListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map((surah) => (
        <button
          key={surah.id}
          onClick={() => onSurahSelect(surah.id)}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-600">{surah.id}.</span>
            <span className="text-lg font-arabic">{surah.name_ar}</span>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold">{surah.name}</h3>
            <p className="text-sm text-gray-500">{surah.verse_count} Ayet</p>
          </div>
        </button>
      ))}
    </div>
  );
} 