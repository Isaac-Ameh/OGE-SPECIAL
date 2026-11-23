import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Sparkles,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
} from '../data/meals';
import { useMenu } from '../context/MenuContext';
import { MealCard } from '../components/MealCard';
import { DishImage } from '../components/DishImage';

export function HomePage() {
  const { meals, siteSettings } = useMenu();
  const featuredMeals = meals.filter((meal) => meal.featured).slice(0, 6);
  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const phoneDigits = phoneDisplay.replace(/[^0-9]/g, '');
  const phoneTel = phoneDigits.startsWith('0')
    ? `tel:+234${phoneDigits.slice(1)}`
    : `tel:+${phoneDigits}`;

  const quickWhatsAppUrl = buildWhatsAppOrderUrl(
    `Hello ${siteSettings.restaurantName}, I would like to place a preorder or enquire about today's meals.`
  );
  const cateringWhatsAppUrl = buildWhatsAppOrderUrl(
    RESTAURANT_INFO.cateringWhatsAppMessage
  );

  return (
    <div>
      {/* Full-Bleed Forest & Authentic Igbo Feast Hero */}
      <section className="relative min-h-[86vh] flex items-center bg-[#0E261B] text-[#FBF8F3] overflow-hidden">
        <div className="absolute inset-0">
          <DishImage
            src={RESTAURANT_IMAGES.hero}
            alt="Traditional Igbo delicacies featuring Ofe Nsala, pounded yam, Abacha, and Nkwobi"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0E261B]/95 via-[#163828]/82 to-[#0E261B]/45"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0E261B]/88 via-transparent to-[#0E261B]/35"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:py-36">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#E8C67A]">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{RESTAURANT_INFO.positioning} · Ugbowo, Benin City</span>
            </p>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FBF8F3] text-balance leading-[1.06]">
              The Taste of Home, Made with Love.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#FBF8F3]/90 leading-relaxed max-w-xl">
              {siteSettings.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C25E2E] hover:bg-[#A64B20] text-[#FBF8F3] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#163828] hover:bg-[#1E4D36] border border-[#E8C67A]/40 text-[#FBF8F3] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#E8C67A]" />
                <span>Order on WhatsApp</span>
              </a>
              <a
                href="#catering-services"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#E8C67A] hover:text-[#FBF8F3] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Discover Our Catering Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section A: Our Heritage, Kitchen & Welcome */}
      <section className="py-16 sm:py-24 bg-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C25E2E]">
                {RESTAURANT_INFO.greeting} · Welcome to {siteSettings.restaurantName}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#241B15] text-balance leading-[1.15]">
                {siteSettings.welcomeHeading}
              </h2>
              <p className="mt-5 text-base text-[#5E544C] leading-relaxed">
                {siteSettings.welcomeBody}
              </p>
              <p className="mt-4 text-base text-[#5E544C] leading-relaxed">
                From hearty weekday lunch packs and traditional swallows to bulk soup bowls and
                celebration trays, every meal is prepared fresh for pickup at BDPA, Ugbowo or
                scheduled delivery across Benin City.
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#163828]/12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#163828]">
                    Rooted In Values
                  </p>
                  <p className="mt-1 text-sm text-[#5E544C]">
                    Women-owned kitchen guided by {RESTAURANT_INFO.values.toLowerCase()}.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#163828]">
                    Preorder Model
                  </p>
                  <p className="mt-1 text-sm text-[#5E544C]">
                    Freshly cooked to order for pickup or Benin City doorstep delivery.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#163828] hover:text-[#C25E2E] transition-colors"
                >
                  <span>Read Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#C25E2E] hover:text-[#A64B20] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Pickup Location in BDPA, Ugbowo</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative h-full min-h-[320px] sm:min-h-[420px] rounded-xl overflow-hidden bg-[#F4EFE6] border border-[#163828]/10">
                <DishImage
                  src={RESTAURANT_IMAGES.culinaryPrep}
                  alt="Authentic Igbo pepper soup and Ukwa breadfruit spread prepared at Oge's Special"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section B: Featured Menu Dishes */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6] border-y border-[#163828]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C25E2E]">
                Kitchen Selections
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#241B15] text-balance">
                Signature Plates &amp; Traditional Soups
              </h2>
              <p className="mt-3 text-base text-[#5E544C] leading-relaxed">
                Explore favourite dishes ready for online preorder or direct WhatsApp ordering via{' '}
                <a
                  href={phoneTel}
                  className="font-semibold text-[#163828] hover:underline tabular-nums"
                >
                  {phoneDisplay}
                </a>
                .
              </p>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#163828] hover:text-[#C25E2E] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Full Menu ({meals.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm sm:text-base font-semibold transition-colors"
            >
              <span>Explore All {meals.length} Dishes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section C: Catering, Bulk Orders & Customised Food Trays */}
      <section id="catering-services" className="py-16 sm:py-24 bg-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative h-full min-h-[320px] sm:min-h-[420px] rounded-xl overflow-hidden bg-[#F4EFE6] border border-[#163828]/10">
                <DishImage
                  src={RESTAURANT_IMAGES.cateringSpread}
                  alt="Customised food trays and sealed bulk soup bowls prepared by Oge's Special"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C25E2E]">
                Events, Bulk Pots &amp; Trays
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#241B15] text-balance leading-[1.15]">
                Bulk Soups, Customised Trays &amp; Event Catering
              </h2>
              <p className="mt-4 text-base text-[#5E544C] leading-relaxed">
                Whether you are stocking up your home freezer, gifting a loved one, or hosting an
                occasion, {siteSettings.restaurantName} prepares generous bulk bowls and curated
                trays with dependable taste and integrity.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#163828]/12">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#163828]/8 text-[#163828] flex items-center justify-center shrink-0">
                    <PackageCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#241B15]">
                      Bulk Orders &amp; Food Trays
                    </h3>
                    <p className="mt-1 text-xs text-[#5E544C] leading-relaxed">
                      Bulk traditional soups, delicacy bowls, customised food trays, and daily
                      lunch packs where applicable.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#C25E2E]/10 text-[#C25E2E] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#241B15]">
                      Celebrations &amp; Corporate Events
                    </h3>
                    <p className="mt-1 text-xs text-[#5E544C] leading-relaxed">
                      Family gatherings, special occasions, corporate and formal events, and
                      large-volume orders—plus catering outside Benin City by arrangement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={cateringWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C25E2E] hover:bg-[#A64B20] text-[#FBF8F3] text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
                <Link
                  to="/contact?mode=catering"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#163828]/25 text-[#163828] hover:bg-[#F4EFE6] text-sm font-semibold transition-colors"
                >
                  <span>Submit Catering Request</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Operating Hours & Preorder Clarity Strip */}
          <div className="mt-16 pt-14 border-t border-[#163828]/12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#163828]/8 text-[#163828] flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-[#241B15]">
                Kitchen &amp; Pickup Hours
              </h3>
              <p className="mt-2 text-sm text-[#5E544C] leading-relaxed">
                {RESTAURANT_INFO.hours.kitchenAndPickup}
              </p>
              <p className="mt-1.5 text-xs text-[#5E544C]">
                Pickup at {RESTAURANT_INFO.address}
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-lg bg-[#C5963A]/15 text-[#8A651C] flex items-center justify-center">
                <Truck className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-[#241B15]">
                Standard Delivery Schedule
              </h3>
              <p className="mt-2 text-sm text-[#5E544C] leading-relaxed">
                {RESTAURANT_INFO.hours.deliveryWeekdays}
                <br />
                {RESTAURANT_INFO.hours.deliverySaturday}
              </p>
              <p className="mt-1.5 text-xs text-[#5E544C]">
                Serving orders across Benin City; outside Benin City by arrangement.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-lg bg-[#C25E2E]/10 text-[#C25E2E] flex items-center justify-center">
                <Clock className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-[#241B15]">
                Online &amp; WhatsApp Enquiries
              </h3>
              <p className="mt-2 text-sm text-[#5E544C] leading-relaxed">
                {RESTAURANT_INFO.hours.enquiriesMonSat}
                <br />
                {RESTAURANT_INFO.hours.enquiriesSunday}
              </p>
              <p className="mt-1.5 text-xs text-[#5E544C]">
                {RESTAURANT_INFO.hours.enquiriesNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section D: Deep Forest Call to Action */}
      <section className="py-20 sm:py-24 bg-[#0E261B] text-[#FBF8F3] border-b border-[#E8C67A]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E8C67A]">
            {RESTAURANT_INFO.positioning} · Ugbowo, Benin City
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#FBF8F3] text-balance">
            Ready to Preorder Your Next Meal?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#FBF8F3]/80 max-w-xl mx-auto leading-relaxed">
            Browse all {meals.length} dishes on our menu, place your preorder online, or reach{' '}
            {siteSettings.restaurantName} on WhatsApp and phone at{' '}
            <a
              href={phoneTel}
              className="tabular-nums font-semibold text-[#E8C67A] hover:underline"
            >
              {phoneDisplay}
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#C25E2E] hover:bg-[#A64B20] text-[#FBF8F3] text-base font-semibold transition-colors"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#163828] hover:bg-[#1E4D36] border border-[#E8C67A]/35 text-[#FBF8F3] text-base font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#E8C67A]" />
              <span>Order on WhatsApp</span>
            </a>
            <a
              href={phoneTel}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#FBF8F3]/25 hover:bg-white/10 text-[#FBF8F3] text-sm font-medium transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4" />
              <span>{phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
