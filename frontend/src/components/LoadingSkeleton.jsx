import { useTheme } from '../context/ThemeContext';

export function CardSkeleton() {
  const { darkMode } = useTheme();
  return (
    <div className="premium-card h-[280px]">
      <div className="p-5 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-[52px] h-[52px] rounded-lg skeleton-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 rounded skeleton-shimmer" />
            <div className="h-3 w-16 rounded skeleton-shimmer" />
          </div>
        </div>
        <div className="h-px bg-[#1F2937] w-full"></div>
        <div className="space-y-3">
          <div className="h-3 w-full rounded skeleton-shimmer" />
          <div className="h-3 w-3/4 rounded skeleton-shimmer" />
        </div>
        <div className="h-px bg-[#1F2937] w-full"></div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <div className="h-5 w-12 rounded skeleton-shimmer" />
            <div className="h-5 w-16 rounded skeleton-shimmer" />
          </div>
          <div className="h-4 w-12 rounded skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  const { darkMode } = useTheme();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-gray-800" />
        <div className="space-y-4">
          <div className="h-10 w-64 bg-gray-800 rounded" />
          <div className="flex gap-4">
            <div className="h-6 w-24 bg-gray-800 rounded-full" />
            <div className="h-6 w-24 bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-800 rounded" />
        <div className="h-4 w-full bg-gray-800 rounded" />
        <div className="h-4 w-full bg-gray-800 rounded" />
        <div className="h-4 w-2/3 bg-gray-800 rounded" />
      </div>
    </div>
  );
}
