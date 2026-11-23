import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, MessageCircle, Phone, Sparkles, Truck } from 'lucide-react';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
} from '../data/meals';
import { useMenu } from '../context/MenuContext';
import { PageHero } from '../components/PageHero';
import { DishImage } from '../components/DishImage';

export function AboutPage() {
  const { siteSettings } = useMenu();
  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const address = siteSettings.address || RESTAURANT_INFO.address;
  const phoneDigits = phoneDisplay.replace(/[^0-9]/g, '');
  const phoneTel = phoneDigits.startsWith('0')
    ? `tel:+234${phoneDigits.slice(1)}`
    : `tel:+${phoneDigits}`;

  const whatsAppUrl = buildWhatsAppOrderUrl(
    `Hello ${siteSettings.restaurantName}, I would like to place a preorder or enquire about today's delicacies.`
  );
  const cateringWhatsAppUrl = buildWhatsAppOrderUrl(
    RESTAURANT_INFO.cateringWhatsAppMessage
  );

  return (
    <div>
      <PageHero
        eyebrow="Our Story & Values"
        title={`About ${siteSettings.restaurantName}`}
        subtitle={`${RESTAURANT_INFO.identity} — your ${RESTAURANT_INFO.positioning} in BDPA, Ugbowo, Benin City.`}
        image={RESTAURANT_IMAGES.aboutTable}
        imageAlt="Traditional Igbo delicacies prepared with care at Oge's Special"
      />

      {/* Editorial Narrative */}
      <section className="py-16 sm:py-24 bg-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 space-y-5 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C25E2E]">
                {RESTAURANT_INFO.greeting} · Who We Are
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#241B15] text-balance leading-[1.15]">
                Authentic Igbo Delicacies Built on Excellence and Integrity.
              </h2>
              <p className="text-base text-[#5E544C] leading-relaxed">
                {siteSettings.restaurantName} is a{' '}
                <strong className="font-semibold text-[#241B15]">
                  women-owned, preorder-focused Igbo kitchen and catering brand
                </strong>{' '}
                operating from{' '}
                <strong className="font-semibold text-[#241B15]">{address}</strong>
              </p>
              <p className="text-base text-[#5E544C] leading-relaxed">
                Known as your <strong className="font-semibold text-[#241B15]">Online Igbo Delicacies Plug</strong>,
                we focus on freshly cooked-to-order traditional Igbo soups, swallows, rice classics,
                and hearty Nigerian comfort plates—prepared with clean handling, generous portions,
                and true home flavour for pickup or delivery across Benin City.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-semibold transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#E8C67A]" />
                  <span>Pickup Directions</span>
                </a>
                <a
                  href={phoneTel}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#163828]/25 text-sm font-medium text-[#163828] hover:bg-[#F4EFE6] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4" />
                  <span>{phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] lg:h-full rounded-xl overflow-hidden bg-[#F4EFE6] border border-[#163828]/10">
                <DishImage
                  src={RESTAURANT_IMAGES.hero}
                  alt="Authentic Igbo Ofe Nsala, pounded yam, Abacha, and Nkwobi feast"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Craft & Services */}
      <section className="py-16 sm:py-24 bg-[#F4EFE6] border-y border-[#163828]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE8DC]">
                  <DishImage
                    src="/src/assets/images/dish_fufu_ofe_nsala.jpg"
                    alt="Smooth fufu served with aromatic Nigerian Ofe Nsala white soup"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE8DC]">
                  <DishImage
                    src="/src/assets/images/dish_pounded_yam_egusi.jpg"
                    alt="Smooth pounded yam served with rich Nigerian Egusi soup and assorted meats"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 aspect-[16/9] rounded-xl overflow-hidden bg-[#EFE8DC]">
                  <DishImage
                    src={RESTAURANT_IMAGES.cateringSpread}
                    alt="Customised food trays and sealed bulk soup bowls from Oge's Special"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center space-y-7">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C25E2E]">
                  What We Offer
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#241B15]">
                  Preorder Kitchen, Bulk Bowls &amp; Catering
                </h2>
                <p className="mt-4 text-base text-[#5E544C] leading-relaxed">
                  Every dish is prepared to preserve authentic Igbo and Nigerian home cooking—never
                  rushed, never compromised.
                </p>
              </div>

              <div className="space-y-5 pt-5 border-t border-[#163828]/12">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#241B15]">
                    Preorder Meals, Pickup &amp; Benin City Delivery
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#5E544C] leading-relaxed">
                    Freshly prepared traditional delicacies, individual preorder plates, and daily
                    lunch packs where applicable—available for pickup in BDPA, Ugbowo or delivery
                    within Benin City.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold text-[#241B15]">
                    Bulk Soups, Customised Trays &amp; Event Catering
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#5E544C] leading-relaxed">
                    Bulk soup and delicacy orders, customised food trays, and full party and event
                    catering for family gatherings, special occasions, corporate and formal events,
                    and large-volume orders—plus catering outside Benin City by arrangement.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C25E2E] hover:bg-[#A64B20] text-[#FBF8F3] text-sm font-semibold transition-colors"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={cateringWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-sm font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#E8C67A]" />
                  <span>Enquire About Catering</span>
                </a>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#163828]/25 text-[#163828] hover:bg-white text-sm font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Schedule & Social Community */}
      <section className="py-16 sm:py-20 bg-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFFFF] rounded-xl border border-[#163828]/10 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 text-[#163828]">
                <Clock className="w-5 h-5" />
                <h3 className="font-display text-xl font-semibold text-[#241B15]">
                  Kitchen &amp; Pickup
                </h3>
              </div>
              <p className="mt-3 text-sm font-medium text-[#241B15]">
                {RESTAURANT_INFO.hours.kitchenAndPickup}
              </p>
              <p className="mt-2 text-xs text-[#5E544C] leading-relaxed">
                Pickup address: {address}
              </p>
            </div>

            <div className="bg-[#FFFFFF] rounded-xl border border-[#163828]/10 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 text-[#C25E2E]">
                <Truck className="w-5 h-5" />
                <h3 className="font-display text-xl font-semibold text-[#241B15]">
                  Standard Delivery
                </h3>
              </div>
              <p className="mt-3 text-sm text-[#241B15] leading-relaxed">
                {RESTAURANT_INFO.hours.deliveryWeekdays}
                <br />
                {RESTAURANT_INFO.hours.deliverySaturday}
              </p>
              <p className="mt-2 text-xs text-[#5E544C] leading-relaxed">
                Delivery within Benin City; catering outside Benin City is handled by arrangement.
              </p>
            </div>

            <div className="bg-[#FFFFFF] rounded-xl border border-[#163828]/10 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 text-[#163828]">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-display text-xl font-semibold text-[#241B15]">
                  Enquiries &amp; Socials
                </h3>
              </div>
              <p className="mt-3 text-xs text-[#5E544C] leading-relaxed">
                {RESTAURANT_INFO.hours.enquiriesMonSat} · {RESTAURANT_INFO.hours.enquiriesSunday}.{' '}
                {RESTAURANT_INFO.hours.enquiriesNote}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-[#163828]">
                <a
                  href={RESTAURANT_INFO.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C25E2E] underline"
                >
                  Instagram {RESTAURANT_INFO.social.instagramHandle}
                </a>
                <a
                  href={RESTAURANT_INFO.social.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C25E2E] underline"
                >
                  X {RESTAURANT_INFO.social.xHandle}
                </a>
                <a
                  href={RESTAURANT_INFO.social.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C25E2E] underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
