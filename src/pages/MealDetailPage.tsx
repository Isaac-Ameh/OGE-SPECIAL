import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
} from 'lucide-react';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
  formatPrice,
} from '../data/meals';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import { DishImage } from '../components/DishImage';
import { MealCard } from '../components/MealCard';
import { PageHero } from '../components/PageHero';

export function MealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { meals, siteSettings } = useMenu();
  const meal = meals.find((m) => m.id === id);
  const { addToCart, totalItems } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const phoneDigits = phoneDisplay.replace(/[^0-9]/g, '');
  const phoneTel = phoneDigits.startsWith('0')
    ? `tel:+234${phoneDigits.slice(1)}`
    : `tel:+${phoneDigits}`;

  useEffect(() => {
    setQuantity(1);
    setAddedFeedback(false);
  }, [id]);

  if (!meal) {
    return (
      <div>
        <PageHero
          eyebrow="Menu Item"
          title="Meal Not Found"
          subtitle="We could not find that dish on our current menu."
          image={RESTAURANT_IMAGES.hero}
          imageAlt="Traditional dishes prepared by Oge's Special"
        />
        <section className="py-20 bg-[#FBF8F3] text-center">
          <div className="max-w-lg mx-auto px-4">
            <p className="text-base text-[#5E544C]">
              The meal you are looking for may have moved or the link may be incomplete.
            </p>
            <Link
              to="/menu"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#163828] text-[#FBF8F3] text-sm font-medium hover:bg-[#1E4D36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Menu</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const available = meal.isAvailable !== false;
  const relatedMeals = meals
    .filter((m) => m.category === meal.category && m.id !== meal.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!available) return;
    const added = addToCart(meal, quantity);
    if (added) {
      setAddedFeedback(true);
      window.setTimeout(() => setAddedFeedback(false), 1800);
    }
  };

  const directWhatsAppUrl = buildWhatsAppOrderUrl(
    `Hello ${siteSettings.restaurantName}, I would like to preorder ${quantity}x ${meal.name}${
      typeof meal.price === 'number' && meal.price > 0
        ? ` (${formatPrice(meal.price)} each)`
        : ' and confirm the current price in Naira (₦)'
    }.`
  );

  return (
    <div>
      <PageHero
        eyebrow={meal.category}
        title={meal.name}
        subtitle={meal.prepStyle}
        image={meal.image}
        imageAlt={meal.imageAlt}
      />

      <section className="py-10 sm:py-16 bg-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#163828] hover:text-[#C25E2E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </Link>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Large Dish Photography */}
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F4EFE6] border border-[#163828]/10">
                <DishImage
                  src={meal.image}
                  alt={meal.imageAlt}
                  title={meal.name}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-[#5E544C]">
                Freshly prepared to order at {siteSettings.restaurantName},{' '}
                {RESTAURANT_INFO.shortLocation}. Available for pickup and scheduled Benin City
                delivery.
              </p>
            </div>

            {/* Right: Contiguous Order & Dish Details Module */}
            <div className="lg:col-span-5 bg-[#FFFFFF] rounded-xl border border-[#163828]/12 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C25E2E]">
                {meal.category}
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#241B15]">
                {meal.name}
              </h2>

              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <span className="tabular-nums font-display text-2xl font-semibold text-[#163828]">
                  {formatPrice(meal.price)}
                </span>
                <span className="text-xs text-[#5E544C]">
                  {typeof meal.price === 'number' && meal.price > 0
                    ? 'Freshly prepared to order'
                    : `Confirm current rate via ${phoneDisplay}`}
                </span>
              </div>

              <p className="mt-5 text-base text-[#5E544C] leading-relaxed">
                {meal.fullDescription}
              </p>

              {/* Category & Preorder Note */}
              <div className="mt-6 pt-5 border-t border-[#241B15]/8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#241B15]">
                  Preparation &amp; Service
                </h3>
                <p className="mt-2 text-sm text-[#5E544C] leading-relaxed">
                  {meal.prepStyle} · Kitchen &amp; pickup daily 9:00 AM – 5:00 PM at{' '}
                  {RESTAURANT_INFO.shortLocation}. Contact{' '}
                  <span className="tabular-nums font-medium text-[#241B15]">{phoneDisplay}</span>{' '}
                  for bulk bowls or custom requests.
                </p>
              </div>

              {/* Quantity & Order Controls */}
              <div className="mt-6 pt-6 border-t border-[#241B15]/8 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#241B15]">Quantity</span>
                  <div className="inline-flex items-center rounded-lg border border-[#241B15]/15 bg-[#FBF8F3]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="p-2.5 text-[#241B15] hover:bg-[#F4EFE6] rounded-l-lg transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="tabular-nums px-4 text-sm font-semibold text-[#241B15] min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="p-2.5 text-[#241B15] hover:bg-[#F4EFE6] rounded-r-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!available}
                  onClick={handleAddToCart}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold transition-colors ${
                    !available
                      ? 'bg-[#241B15]/15 text-[#5E544C] cursor-not-allowed'
                      : addedFeedback
                      ? 'bg-[#163828] text-[#FBF8F3] cursor-pointer'
                      : 'bg-[#C25E2E] hover:bg-[#A64B20] text-[#FBF8F3] cursor-pointer'
                  }`}
                >
                  {!available ? (
                    <span>Currently Unavailable</span>
                  ) : addedFeedback ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Order ({quantity})</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Order ({quantity})</span>
                    </>
                  )}
                </button>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#E8C67A]" />
                  <span>Preorder / Enquire on WhatsApp</span>
                </a>

                <a
                  href={phoneTel}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-[#241B15]/15 text-sm font-medium text-[#241B15] hover:bg-[#F4EFE6] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#163828]" />
                  <span>Call {phoneDisplay}</span>
                </a>

                {totalItems > 0 && (
                  <Link
                    to="/cart"
                    className="block w-full text-center py-2.5 rounded-lg border border-[#163828]/25 text-sm font-medium text-[#163828] hover:bg-[#F4EFE6] transition-colors"
                  >
                    Review Order Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Dishes */}
      {relatedMeals.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#F4EFE6] border-t border-[#163828]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#241B15]">
              More in {meal.category}
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedMeals.map((related) => (
                <MealCard key={related.id} meal={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
