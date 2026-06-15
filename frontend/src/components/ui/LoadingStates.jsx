import { useEffect, useState, useRef } from 'react';

export const PageLoader = ({ label = 'Đang tải dữ liệu...' }) => (
  <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-gray-500">
    <div className="h-11 w-11 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
    <p className="text-sm font-medium">{label}</p>
  </div>
);

export const CardGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="overflow-hidden rounded-sm bg-white shadow-sm">
        <div className="h-64 animate-pulse bg-gray-200" />
        <div className="space-y-4 p-6">
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-4/5 animate-pulse rounded bg-gray-200" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
);

export const DetailSkeleton = () => (
  <div className="container mx-auto px-4 py-32 md:px-8">
    <div className="mb-8 h-5 w-44 animate-pulse rounded bg-gray-200" />
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-6 h-12 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mb-8 h-[420px] animate-pulse rounded-sm bg-gray-200" />
        <div className="space-y-3">
          <div className="h-5 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-11/12 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
      <div className="h-[460px] animate-pulse rounded-sm bg-gray-200" />
    </div>
  </div>
);

export const SmoothImage = ({ className = '', eager = false, fallbackSrc, src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [currentSrc]);

  return (
    <img
      ref={imgRef}
      {...props}
      src={currentSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setFailed(true);
          setLoaded(true);
        }
      }}
      className={`${className} ${!loaded && !failed ? 'bg-gray-200 text-transparent' : ''} transition-all duration-300`}
    />
  );
};
