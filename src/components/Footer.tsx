import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { RESTAURANT_INFO, buildWhatsAppOrderUrl } from '../data/meals';
import { useMenu } from '../context/MenuContext';
import { BrandMark } from './BrandMark';

export function Footer() {
  const { siteSettings, meals } = useMenu();
  const currentYear = new Date().getFullYear();
  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const address = siteSettings.address || RESTAURANT_INFO.address;
  const emailDisplay = siteSettings.email || RESTAURANT_INFO.email;
  const phoneDigits = phoneDisplay.replace(/[^0-9]/g, '');
  const phoneTel = phoneDigits.startsWith('0')
    ? `tel:+234${phoneDigits.slice(1)}`
    : `tel:+${phoneDigits}`;

  const quickWhatsAppUrl = buildWhatsAppOrderUrl(
    `Hello ${siteSettings.restaurantName}, I would like to place a preorder or enquire about today's delicacies.`
  );

  return (
    <footer className="bg-[#0E261B] text-[#FBF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="Oge's Special home">
              <BrandMark variant="light" size="lg" />
            </Link>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#E8C67A]">
              Online Igbo Delicacies Plug · Excellence &amp; Integrity
            </p>
            <p className="text-sm leading-relaxed text-[#FBF8F3]/85 max-w-sm">
              Women-owned, preorder-focused Igbo kitchen and catering brand in BDPA, Ugbowo, Benin
              City. Freshly prepared traditional delicacies for pickup, delivery, and events.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C25E2E] hover:bg-[#A64B20] text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </a>
              <a
                href={phoneTel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FBF8F3]/25 hover:bg-white/10 text-[#FBF8F3] text-xs font-semibold transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {phoneDisplay}</span>
              </a>
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#FBF8F3]/80">
              <a
                href={RESTAURANT_INFO.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8C67A] transition-colors"
              >
                Instagram: {RESTAURANT_INFO.social.instagramHandle}
              </a>
              <span aria-hidden="true" className="text-[#FBF8F3]/30">
                ·
              </span>
              <a
                href={RESTAURANT_INFO.social.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8C67A] transition-colors"
              >
                X: {RESTAURANT_INFO.social.xHandle}
              </a>
              <span aria-hidden="true" className="text-[#FBF8F3]/30">
                ·
              </span>
              <a
                href={RESTAURANT_INFO.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8C67A] transition-colors"
              >
                Facebook: {RESTAURANT_INFO.social.facebookName}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#E8C67A]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#FBF8F3]/85 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-[#FBF8F3]/85 hover:text-white transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#FBF8F3]/85 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#FBF8F3]/85 hover:text-white transition-colors"
                >
                  Contact &amp; Catering
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-[#FBF8F3]/85 hover:text-white transition-colors">
                  Order Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#E8C67A]">
              Menu Sections
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/menu?category=Rice+Dishes"
                  className="text-[#FBF8F3]/85 hover:text-white transition-colors"
                >
                  Rice Dishes
                </Link>
              </li>
              <li>
                <Link
                  to="/menu?category=Swallows+%26+Soups"
                  className="text-[#FBF8F3]/85 hover:text-white transition-colors"
                >
                  Swallows &amp; Soups
                </Link>
              </li>
              <li>
                <Link
                  to="/menu?category=Other+Specials"
                  className="text-[#FBF8F3]/85 hover:text-white transition-colors"
                >
                  Other Specials
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-[#E8C67A] hover:underline transition-colors">
                  View All {meals.length} Dishes
                </Link>
              </li>
            </ul>
          </div>

          {/* Location, Hours & Direct Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#E8C67A]">
              Kitchen Pickup, Delivery &amp; Contact
            </h3>
            <ul className="space-y-3 text-sm text-[#FBF8F3]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8C67A] shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8C67A] shrink-0" />
                <a
                  href={phoneTel}
                  className="tabular-nums hover:text-white transition-colors font-medium"
                >
                  {phoneDisplay}
                </a>
              </li>
              {emailDisplay && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#E8C67A] shrink-0" />
                  <a
                    href={`mailto:${emailDisplay}`}
                    className="hover:text-white transition-colors"
                  >
                    {emailDisplay}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E8C67A] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed space-y-1 text-[#FBF8F3]/80">
                  <p>
                    <strong className="text-[#FBF8F3]">Kitchen &amp; Pickup:</strong>{' '}
                    {RESTAURANT_INFO.hours.kitchenAndPickup}
                  </p>
                  <p>
                    <strong className="text-[#FBF8F3]">Delivery:</strong>{' '}
                    {RESTAURANT_INFO.hours.deliveryWeekdays} ·{' '}
                    {RESTAURANT_INFO.hours.deliverySaturday}
                  </p>
                  <p>
                    <strong className="text-[#FBF8F3]">Enquiries:</strong>{' '}
                    {RESTAURANT_INFO.hours.enquiriesMonSat} ·{' '}
                    {RESTAURANT_INFO.hours.enquiriesSunday}
                  </p>
                </div>
              </li>
              <li>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-semibold text-[#E8C67A] hover:underline"
                >
                  Open Pickup Directions in Google Maps &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="mt-12 pt-8 border-t border-[#FBF8F3]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FBF8F3]/70">
          <p>
            &copy; {currentYear} {siteSettings.restaurantName}. {RESTAURANT_INFO.shortLocation}.
          </p>
          <p>
            Preorder Kitchen · Pickup, Benin City Delivery &amp; Event Catering (Outside Benin City
            by arrangement).
          </p>
        </div>
      </div>
    </footer>
  );
}
