import { motion } from 'motion/react';
import { DishImage } from './DishImage';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0E261B] text-[#FBF8F3] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="absolute inset-0">
        <DishImage
          src={image}
          alt={imageAlt}
          loading="eager"
          className="w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0E261B]/92 via-[#0E261B]/78 to-[#0E261B]/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0E261B]/85 via-transparent to-[#0E261B]/45"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#E8C67A]">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white text-balance leading-[1.12]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-[#FBF8F3]/90 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
