interface BrandMarkProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showEmblem?: boolean;
}

export function BrandMark({
  variant = 'dark',
  size = 'md',
  showEmblem = true,
}: BrandMarkProps) {
  const isLight = variant === 'light';

  const emblemSize =
    size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-7 h-7' : 'w-8 h-8 sm:w-9 sm:h-9';

  const textSize =
    size === 'lg'
      ? 'text-xl sm:text-2xl'
      : size === 'sm'
      ? 'text-base sm:text-lg'
      : 'text-lg sm:text-xl';

  const ringStroke = isLight ? '#E8C67A' : '#C5963A';
  const potStroke = isLight ? '#FBF8F3' : '#163828';
  const potFill = isLight ? 'rgba(251,248,243,0.1)' : 'rgba(22,56,40,0.08)';
  const accentFill = isLight ? '#E8C67A' : '#C25E2E';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      {showEmblem && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className={`${emblemSize} shrink-0`}
        >
          {/* Outer fine heritage ring */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke={ringStroke}
            strokeWidth="1.35"
            strokeOpacity="0.85"
          />
          {/* Subtle culinary spice leaf crown */}
          <path
            d="M20 7.5C18.2 9.4 18.2 11.4 20 12.6C21.8 11.4 21.8 9.4 20 7.5Z"
            fill={accentFill}
          />
          {/* Traditional Nigerian earthen pot lid */}
          <path
            d="M12.5 16.5C13.8 14.2 16.7 13 20 13C23.3 13 26.2 14.2 27.5 16.5"
            stroke={potStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Pot rim */}
          <path
            d="M10.5 17.5H29.5"
            stroke={ringStroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Rounded clay cooking pot vessel */}
          <path
            d="M11.5 17.5C11.1 24.4 14.4 29.2 20 29.2C25.6 29.2 28.9 24.4 28.5 17.5"
            fill={potFill}
            stroke={potStroke}
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
          {/* Side pot handles */}
          <path
            d="M11.3 19.8C9.6 19.8 9.2 21.8 11.6 22.4"
            stroke={potStroke}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M28.7 19.8C30.4 19.8 30.8 21.8 28.4 22.4"
            stroke={potStroke}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Base rest line */}
          <path
            d="M15 31.8H25"
            stroke={ringStroke}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span className={`font-display font-semibold tracking-tight leading-none ${textSize}`}>
        <span className={isLight ? 'text-[#FBF8F3]' : 'text-[#163828]'}>Oge&rsquo;s </span>
        <span className={isLight ? 'text-[#E8C67A]' : 'text-[#C25E2E]'}>Special</span>
      </span>
    </span>
  );
}
