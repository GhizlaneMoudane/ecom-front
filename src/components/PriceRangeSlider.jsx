// PriceRangeSlider.jsx
import { useState, useEffect, useRef } from 'react';

export function PriceRangeSlider({ min, max, step, value, onChange }) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = (val) => Math.round(((val - min) / (max - min)) * 100);

  useEffect(() => {
    if (maxValRef.current && range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  useEffect(() => {
    onChange([minVal, maxVal]);
  }, [minVal, maxVal, onChange]);

  return (
    <div className="relative w-full">
      {/* Base track */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-300 rounded"></div>
      {/* Highlighted range */}
      <div
        ref={range}
        className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-[#ffb190] rounded"
      ></div>
      {/* Min range input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value), maxVal - step);
          setMinVal(value);
        }}
        className="absolute w-full pointer-events-none appearance-none z-10 h-2 bg-transparent"
        style={{ WebkitAppearance: 'none' }}
      />
      {/* Max range input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(e) => {
          const value = Math.max(Number(e.target.value), minVal + step);
          setMaxVal(value);
        }}
        ref={maxValRef}
        className="absolute w-full pointer-events-none appearance-none z-10 h-2 bg-transparent"
        style={{ WebkitAppearance: 'none' }}
      />
      <div className="flex justify-between mt-2">
        <span className="text-gray-700">€{minVal}</span>
        <span className="text-gray-700">€{maxVal}</span>
      </div>
    </div>
  );
}
