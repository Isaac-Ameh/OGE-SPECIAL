import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  RESTAURANT_IMAGES,
  RESTAURANT_INFO,
  buildWhatsAppOrderUrl,
} from '../data/meals';
import { useMenu } from '../context/MenuContext';
import { PageHero } from '../components/PageHero';

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export function ContactPage() {
  const { siteSettings } = useMenu();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'catering' ? 'catering' : 'meal';

  const [enquiryMode, setEnquiryMode] = useState<'meal' | 'catering'>(initialMode);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Party / Family Celebration Catering');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('30');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [cateringSaved, setCateringSaved] = useState(false);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'catering') {
      setEnquiryMode('catering');
    }
  }, [searchParams]);

  const phoneDisplay = siteSettings.phone || RESTAURANT_INFO.phoneDisplay;
  const address = siteSettings.address || RESTAURANT_INFO.address;
  const contactEmail = siteSettings.email || RESTAURANT_INFO.email;
  const phoneDigits = phoneDisplay.replace(/[^0-9]/g, '');
  const phoneTel = phoneDigits.startsWith('0')
    ? `tel:+234${phoneDigits.slice(1)}`
    : `tel:+${phoneDigits}`;

  const cateringWhatsAppUrl = buildWhatsAppOrderUrl(
    RESTAURANT_INFO.cateringWhatsAppMessage
  );

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!phone.trim()) {
      nextErrors.phone = 'Please enter your phone number or WhatsApp contact.';
    }
    if (!message.trim() || message.trim().length < 6) {
      nextErrors.message = 'Please enter your meal, bulk tray, or catering details (at least 6 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedMessage(null);
      return;
    }

    setErrors({});
    setCateringSaved(false);

    if (enquiryMode === 'catering') {
      setSubmitting(true);
      try {
        const res = await fetch('/api/catering', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            eventType: eventType.trim(),
            eventDate: eventDate.trim(),
            guestCount: Number(guestCount) || 25,
            requestedDishes: message.trim(),
            notes: `Submitted via Contact page (${eventType})`,
          }),
        });
        if (res.ok) {
          setCateringSaved(true);
        }
      } catch {
        // Still allow WhatsApp handoff below
      } finally {
        setSubmitting(false);
      }
    }

    const composed =
      enquiryMode === 'catering'
        ? `Hello ${siteSettings.restaurantName},\nCatering / Bulk Order Enquiry:\nName: ${name.trim()}\nPhone: ${phone.trim()}\nEvent / Order Type: ${eventType}\nDate: ${
            eventDate || 'TBD'
          }\nGuests / Servings: ${guestCount}\nDishes & Notes: ${message.trim()}`
        : `Hello ${siteSettings.restaurantName},\nName: ${name.trim()}\nPhone: ${phone.trim()}\nMessage: ${message.trim()}`;

    setSubmittedMessage(composed);
    setName('');
    setPhone('');
    setEmail('');
    setEventDate('');
    setMessage('');
  };

  return (
    <div>
      <PageHero
        eyebrow="Orders, Pickup & Catering"
        title={`Contact ${siteSettings.restaurantName}`}
        subtitle="Reach our Ugbowo, Benin City kitchen for preorder meals, bulk soup orders, customised food trays, or event catering."
        image={RESTAURANT_IMAGES.hero}
        imageAlt="Traditional Igbo delicacies prepared by Oge's Special"
      />

      <section className="py-16 sm:py-24 bg-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Contact Info, Hours & Socials */}
            <div className="lg:col-span-5 space-y-7">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C25E2E]">
                  {RESTAURANT_INFO.positioning} · BDPA, Ugbowo
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#241B15]">
                  {siteSettings.restaurantName}
                </h2>
                <p className="mt-3 text-sm text-[#5E544C] leading-relaxed">
                  Preorder fresh Igbo delicacies and Nigerian favourites for pickup at BDPA, Ugbowo
                  or delivery across Benin City. Catering outside Benin City is available by
                  arrangement.
                </p>
              </div>

              <div className="space-y-5 pt-4 border-t border-[#163828]/12">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#163828] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#241B15]">Pickup Address</h3>
                    <p className="mt-0.5 text-sm text-[#5E544C] leading-relaxed">{address}</p>
                    <a
                      href={RESTAURANT_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#C25E2E] hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#163828] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#241B15]">
                      Phone &amp; WhatsApp
                    </h3>
                    <p className="mt-0.5 text-sm text-[#5E544C] tabular-nums">
                      <a href={phoneTel} className="font-semibold text-[#163828] hover:underline">
                        {phoneDisplay}
                      </a>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      <a
                        href={buildWhatsAppOrderUrl(
                          `Hello ${siteSettings.restaurantName}, I would like to ask about today's meals.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-xs font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#E8C67A]" />
                        <span>Order on WhatsApp</span>
                      </a>
                      <a
                        href={cateringWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C25E2E] hover:bg-[#A64B20] text-[#FBF8F3] text-xs font-semibold transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Catering WhatsApp</span>
                      </a>
                      <a
                        href={phoneTel}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#163828]/20 text-[#163828] hover:bg-[#F4EFE6] text-xs font-semibold transition-colors tabular-nums"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call {phoneDisplay}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#163828] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#241B15]">Email &amp; Social Media</h3>
                    <p className="mt-0.5 text-sm text-[#5E544C]">
                      <a
                        href={`mailto:${contactEmail}`}
                        className="font-medium text-[#163828] hover:underline"
                      >
                        {contactEmail}
                      </a>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-[#5E544C]">
                      <a
                        href={RESTAURANT_INFO.social.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#163828] underline"
                      >
                        Instagram ({RESTAURANT_INFO.social.instagramHandle})
                      </a>
                      <a
                        href={RESTAURANT_INFO.social.xUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#163828] underline"
                      >
                        X ({RESTAURANT_INFO.social.xHandle})
                      </a>
                      <a
                        href={RESTAURANT_INFO.social.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#163828] underline"
                      >
                        Facebook ({RESTAURANT_INFO.social.facebookName})
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#163828] shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#241B15]">Operating Hours</h3>
                    <div className="text-xs text-[#5E544C] space-y-1 leading-relaxed">
                      <p>
                        <strong className="text-[#241B15]">Kitchen &amp; Pickup:</strong>{' '}
                        {RESTAURANT_INFO.hours.kitchenAndPickup}
                      </p>
                      <p>
                        <strong className="text-[#241B15]">Standard Delivery:</strong>{' '}
                        {RESTAURANT_INFO.hours.deliveryWeekdays} ·{' '}
                        {RESTAURANT_INFO.hours.deliverySaturday}
                      </p>
                      <p>
                        <strong className="text-[#241B15]">Online &amp; WhatsApp Enquiries:</strong>{' '}
                        {RESTAURANT_INFO.hours.enquiriesMonSat} ·{' '}
                        {RESTAURANT_INFO.hours.enquiriesSunday}
                      </p>
                      <p className="text-[11px] text-[#5E544C]/90 pt-0.5">
                        {RESTAURANT_INFO.hours.enquiriesNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Meal or Catering Enquiry Form */}
            <div className="lg:col-span-7 bg-[#FFFFFF] rounded-xl border border-[#163828]/12 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold text-[#241B15]">
                  {enquiryMode === 'catering'
                    ? 'Request Event Catering or Bulk Order'
                    : 'Send a Meal or Preorder Enquiry'}
                </h2>
                <div className="inline-flex rounded-lg border border-[#163828]/15 p-1 bg-[#FBF8F3]">
                  <button
                    type="button"
                    onClick={() => setEnquiryMode('meal')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      enquiryMode === 'meal'
                        ? 'bg-[#163828] text-[#FBF8F3]'
                        : 'text-[#5E544C] hover:text-[#241B15]'
                    }`}
                  >
                    Meal Preorder
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnquiryMode('catering')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      enquiryMode === 'catering'
                        ? 'bg-[#163828] text-[#FBF8F3]'
                        : 'text-[#5E544C] hover:text-[#241B15]'
                    }`}
                  >
                    Catering &amp; Bulk
                  </button>
                </div>
              </div>

              <p className="mt-2 text-sm text-[#5E544C]">
                {enquiryMode === 'catering'
                  ? `Submit your party catering, bulk soup, or customised food tray enquiry directly to ${siteSettings.restaurantName}, then follow up on WhatsApp.`
                  : `Fill in your details below to prepare a message for ${siteSettings.restaurantName}, then send it directly via WhatsApp to ${phoneDisplay}.`}
              </p>

              {submittedMessage && (
                <div
                  role="status"
                  className="mt-6 rounded-lg bg-[#163828]/8 border border-[#163828]/25 p-4 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#163828] shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[#163828]">
                      {cateringSaved
                        ? 'Your catering enquiry has been logged with our kitchen'
                        : 'Your enquiry is ready to send'}
                    </p>
                    <p className="text-sm text-[#5E544C]">
                      Click below to send this message directly via WhatsApp, or call{' '}
                      <a href={phoneTel} className="font-semibold text-[#163828] underline tabular-nums">
                        {phoneDisplay}
                      </a>
                      .
                    </p>
                    <a
                      href={buildWhatsAppOrderUrl(submittedMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#163828] hover:bg-[#1E4D36] text-[#FBF8F3] text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#E8C67A]" />
                      <span>Send via WhatsApp Now</span>
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[#241B15]"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Chidinma Okafor"
                      aria-invalid={Boolean(errors.name)}
                      className="mt-1.5 w-full rounded-lg border border-[#241B15]/15 bg-[#FBF8F3] px-4 py-2.5 text-sm text-[#241B15] placeholder:text-[#5E544C]/60 focus:outline-none focus:ring-2 focus:ring-[#163828]"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-[#B91C1C]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-[#241B15]"
                    >
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 0901 000 0000"
                      aria-invalid={Boolean(errors.phone)}
                      className="mt-1.5 w-full rounded-lg border border-[#241B15]/15 bg-[#FBF8F3] px-4 py-2.5 text-sm text-[#241B15] placeholder:text-[#5E544C]/60 focus:outline-none focus:ring-2 focus:ring-[#163828]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-[#B91C1C]">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {enquiryMode === 'catering' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#241B15]">
                        Event or Order Type
                      </label>
                      <input
                        type="text"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#241B15]/15 bg-[#FBF8F3] px-3.5 py-2.5 text-sm text-[#241B15] focus:outline-none focus:ring-2 focus:ring-[#163828]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#241B15]">Preferred Date</label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#241B15]/15 bg-[#FBF8F3] px-3.5 py-2.5 text-sm text-[#241B15] focus:outline-none focus:ring-2 focus:ring-[#163828]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#241B15]">
                        Guests / Packs
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={5000}
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#241B15]/15 bg-[#FBF8F3] px-3.5 py-2.5 text-sm text-[#241B15] focus:outline-none focus:ring-2 focus:ring-[#163828]"
                      />
                    </div>
                  </div>
                )}

                {enquiryMode === 'catering' && (
                  <div>
                    <label className="block text-sm font-medium text-[#241B15]">
                      Optional Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., chidinma@example.com"
                      className="mt-1.5 w-full rounded-lg border border-[#241B15]/15 bg-[#FBF8F3] px-4 py-2.5 text-sm text-[#241B15] focus:outline-none focus:ring-2 focus:ring-[#163828]"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[#241B15]"
                  >
                    {enquiryMode === 'catering'
                      ? 'Requested Delicacies, Bulk Bowls or Tray Details'
                      : 'Enquiry or Preorder Request'}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      enquiryMode === 'catering'
                        ? 'e.g., Customised food trays, bulk Ofe Nsala bowls, Jollof Rice packs, and location in Benin City...'
                        : 'Let us know the delicacies you would like to preorder, preferred pickup or delivery area in Benin City...'
                    }
                    aria-invalid={Boolean(errors.message)}
                    className="mt-1.5 w-full rounded-lg border border-[#241B15]/15 bg-[#FBF8F3] px-4 py-2.5 text-sm text-[#241B15] placeholder:text-[#5E544C]/60 focus:outline-none focus:ring-2 focus:ring-[#163828]"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-[#B91C1C]">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#C25E2E] hover:bg-[#A64B20] disabled:opacity-60 text-[#FBF8F3] text-sm font-semibold transition-colors cursor-pointer"
                >
                  {submitting
                    ? 'Submitting Enquiry...'
                    : enquiryMode === 'catering'
                    ? 'Submit Catering Enquiry'
                    : 'Prepare Enquiry Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Embedded Google Map for BDPA, Ugbowo, Benin City */}
          <div className="mt-14 bg-[#FFFFFF] rounded-xl border border-[#163828]/12 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#241B15]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-[#241B15]">
                  Pickup Location: BDPA, Ugbowo, Benin City, Edo State
                </h3>
                <p className="text-xs text-[#5E544C]">{address}</p>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163828] hover:text-[#C25E2E]"
              >
                <span>Open Full Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-[#F4EFE6]">
              <iframe
                title="Map showing BDPA, Ugbowo, Benin City, Edo State, Nigeria"
                src={RESTAURANT_INFO.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
