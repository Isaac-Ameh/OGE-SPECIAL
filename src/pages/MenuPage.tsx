import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
} from '../data/meals';
import { MealCategory } from '../types/menu';
import { useMenu } from '../context/MenuContext';
import { PageHero } from '../components/PageHero';
import { MealCard } from '../components/MealCard';
import { DishImage } from '../components/DishImage';

type FilterOption = 'All Meals' | MealCategory;

export function MenuPage() {
  const { meals, categories: liveCategories, siteSettings } = useMenu();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriesList: FilterOption[] = Array.from(
    new Set(['All Meals', ...liveCategories, ...meals.map((m) => m.category).filter(Boolean)])
  );
  const initialParam = searchParams.get('category') as FilterOption | null;

  const [selectedCategory, setSelectedCategory] = useState<FilterOption>(
    initialParam && categoriesList.includes(initialParam) ? initialParam : 'All Meals'
  );

  useEffect(() => {
    const param = searchParams.get('category') as FilterOption | null;
    if (param && categoriesList.includes(param)) {
      setSelectedCategory(param);
    } else if (!param) {
      setSelectedCategory('All Meals');
    }
  }, [searchParams, liveCategories, meals]);

  const handleCategoryChange = (category: FilterOption) => {
    setSelectedCategory(category);
    if (category === 'All Meals') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredMeals =
    selectedCategory === 'All Meals'
      ? meals
      : meals.filter((meal) => meal.category === selectedCategory);

  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const orderWhatsAppUrl = buildWhatsAppOrderUrl(
    `Hello ${siteSettings.restaurantName}, I would like to place a preorder from your menu.`
  );
  const cateringWhatsAppUrl = buildWhatsAppOrderUrl(
    RESTAURANT_INFO.cateringWhatsAppMessage
  );

  return (
    <div>
      <PageHero
        eyebrow={`${siteSettings.restaurantName} · Preorder Kitchen`}
        title="Explore Our Menu"
        subtitle="Freshly prepared rice dishes, traditional soups, swallows, and everyday Nigerian specials cooked to order in BDPA, Ugbowo, Benin City."
        image={RESTAURANT_IMAGES.hero}
        imageAlt="Traditional Igbo delicacies and Nigerian dishes prepared by Oge's Special"
      />

      <section className="py-12 sm:py-16 bg-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Controls + Pricing & Preorder Notice */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-[#163828]/12">
            <div
              role="tablist"
              aria-label="Filter menu by category"
              className="flex flex-wrap items-center gap-2"
            >
              {categoriesList.map((category) => {
                const count =
                  category === 'All Meals'
                    ? meals.length
                    : meals.filter((m) => m.category === category).length;
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#163828] text-[#FBF8F3]'
                        : 'bg-[#F4EFE6] text-[#241B15] hover:bg-[#E7DFD2]'
                    }`}
                  >
                    {category}{' '}
                    <span className="tabular-nums opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#5E544C]">
              <span>{siteSettings.menuNotice}</span>
              <a
                href={orderWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-xs font-semibold transition-colors shrink-0 tabular-nums"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#E8C67A]" />
                <span>Order on WhatsApp ({phoneDisplay})</span>
              </a>
            </div>
          </div>

          {/* Complete Meals Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>

          {/* Bulk Orders, Customised Trays & Catering Banner */}
          <div className="mt-16 rounded-2xl bg-[#F4EFE6] border border-[#163828]/12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:h-full bg-[#EFE8DC]">
                <DishImage
                  src={RESTAURANT_IMAGES.cateringSpread}
                  alt="Customised food trays and bulk soup bowls from Oge's Special"
                  title="Oge's Special Catering & Bulk Orders"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C25E2E]">
                  Bulk Soups, Food Trays &amp; Event Catering
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#241B15]">
                  Planning a Celebration, Family Gathering, or Bulk Order?
                </h2>
                <p className="text-sm sm:text-base text-[#5E544C] leading-relaxed">
                  Beyond individual plates, {siteSettings.restaurantName} prepares bulk soups and
                  delicacy bowls, customised food trays, and full event catering for corporate
                  events, celebrations, and gatherings in Benin City and outside Benin City by
                  arrangement.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={cateringWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C25E2E] hover:bg-[#A64B20] text-[#FBF8F3] text-sm font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Catering Enquiry on WhatsApp</span>
                  </a>
                  <Link
                    to="/contact?mode=catering"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-medium transition-colors"
                  >
                    <span>Request Catering / Bulk Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/cart"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#163828]/25 text-[#163828] hover:bg-white text-sm font-medium transition-colors"
                  >
                    <span>Review Order Cart</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
