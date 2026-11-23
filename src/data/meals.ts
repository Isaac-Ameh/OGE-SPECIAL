import { Meal, WebsiteSettings } from '../types/menu';

export const RESTAURANT_INFO = {
  name: "Oge's Special",
  shortName: "Oge's Special",
  positioning: 'Online Igbo Delicacies Plug',
  identity: 'Women-owned, preorder-focused Igbo kitchen and catering brand',
  values: 'Excellence and integrity',
  greeting: 'Umu uto m',
  category: 'Igbo Kitchen & Catering',
  address:
    'Citadel Hostel, 19th Street, BDPA, Ugbowo, Benin City, Edo State, Nigeria.',
  shortLocation: 'BDPA, Ugbowo, Benin City, Edo State',
  phoneDisplay: '+234 901 608 1844',
  phoneTel: 'tel:+2349016081844',
  whatsappNumber: '2349016081844',
  whatsappBaseUrl: 'https://wa.me/2349016081844',
  email: 'ogesspecial01@gmail.com',
  social: {
    instagramHandle: '@oges_special',
    instagramUrl: 'https://www.instagram.com/oges_special/',
    xHandle: '@oges_special',
    xUrl: 'https://x.com/oges_special',
    facebookName: "Oge's Special",
    facebookUrl: 'https://www.facebook.com/101893575901933/',
  },
  hours: {
    kitchenAndPickup: 'Daily, 9:00 AM – 5:00 PM',
    deliveryWeekdays: 'Monday–Friday: 9:00 AM – 5:00 PM',
    deliverySaturday: 'Saturday: 9:00 AM – 4:00 PM',
    enquiriesMonSat: 'Monday–Saturday: 24 hours',
    enquiriesSunday: 'Sunday: 10:00 AM – 12:00 AM',
    enquiriesNote:
      'Online and WhatsApp enquiry availability does not mean kitchen or delivery operations run around the clock.',
  },
  cateringWhatsAppMessage:
    "Hello Oge's Special, I would like to make an enquiry about your catering/bulk food services.",
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=19th+Street+BDPA+Ugbowo+Benin+City+Edo+State+Nigeria',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=BDPA%20Ugbowo%20Benin%20City%20Edo%20State%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  restaurantName: "Oge's Special",
  currency: 'NGN',
  isOpen: true,
  address:
    'Citadel Hostel, 19th Street, BDPA, Ugbowo, Benin City, Edo State, Nigeria.',
  phone: '+234 901 608 1844',
  email: 'ogesspecial01@gmail.com',
  openingHours: 'Kitchen & Pickup: Daily, 9:00 AM – 5:00 PM | Standard Delivery: Mon–Fri 9:00 AM – 5:00 PM, Sat 9:00 AM – 4:00 PM',
  heroSubtitle: 'The Taste of Home, Made with Love.',
  heroDescription:
    'Experience the richness of authentic Igbo delicacies, freshly prepared with care and delivered to your doorstep. From traditional soups to special delicacies, enjoy the flavours you know and love.',
  welcomeHeading: 'Authentic Igbo Delicacies, Prepared with Excellence & Integrity.',
  welcomeBody:
    "Umu uto m, welcome to Oge's Special — your Online Igbo Delicacies Plug in BDPA, Ugbowo, Benin City. As a women-owned, preorder-focused kitchen and catering brand, every pot is cooked fresh to order with care, rich traditional ingredients, and uncompromising hygiene.",
  menuNotice:
    "Prices shown in Nigerian Naira (₦). Preorder online via Paystack or place your pickup, delivery, and bulk order directly on WhatsApp (+234 901 608 1844).",
};

export const RESTAURANT_IMAGES = {
  hero: '/src/assets/images/oges_hero_igbo_feast_1795470746927.jpg',
  culinaryPrep: '/src/assets/images/oges_igbo_delicacies_spread_1795470747497.jpg',
  cateringSpread: '/src/assets/images/oges_catering_trays_spread_1795470747269.jpg',
  aboutTable: '/src/assets/images/oges_igbo_delicacies_spread_1795470747497.jpg',
};

export const AVAILABLE_DISH_IMAGES = [
  { label: 'Jollof Rice & Chicken', path: '/src/assets/images/dish_jollof_chicken.jpg' },
  { label: 'Beans & Fried Plantain', path: '/src/assets/images/dish_beans_fried_plantain.jpg' },
  { label: 'Eba & Afang Soup', path: '/src/assets/images/dish_eba_afang.jpg' },
  { label: 'Eba & Egusi Soup', path: '/src/assets/images/dish_eba_egusi.jpg' },
  { label: 'Fried Rice & Chicken', path: '/src/assets/images/dish_fried_rice_chicken.jpg' },
  { label: 'Eba & Okra Soup', path: '/src/assets/images/dish_eba_okra.jpg' },
  { label: 'Rice & Stew', path: '/src/assets/images/dish_rice_and_stew.jpg' },
  { label: 'Semo & Ogbono Soup', path: '/src/assets/images/dish_semo_ogbono.jpg' },
  { label: 'Yam Porridge', path: '/src/assets/images/dish_yam_porridge.jpg' },
  { label: 'White Rice, Stew & Chicken', path: '/src/assets/images/dish_white_rice_stew_chicken.jpg' },
  { label: 'Pounded Yam & Egusi', path: '/src/assets/images/dish_pounded_yam_egusi.jpg' },
  { label: 'Fufu & Ofe Nsala', path: '/src/assets/images/dish_fufu_ofe_nsala.jpg' },
  { label: 'Rice & Beans with Plantain', path: '/src/assets/images/dish_rice_beans_plantain.jpg' },
  { label: 'Igbo Delicacies Spread', path: '/src/assets/images/oges_igbo_delicacies_spread_1795470747497.jpg' },
  { label: 'Igbo Feast Hero', path: '/src/assets/images/oges_hero_igbo_feast_1795470746927.jpg' },
  { label: 'Catering Food Trays', path: '/src/assets/images/oges_catering_trays_spread_1795470747269.jpg' },
];

export const MEALS: Meal[] = [
  {
    id: 'jollof-rice-and-chicken',
    name: 'Jollof Rice & Chicken',
    category: 'Rice Dishes',
    shortDescription:
      'Fragrant Nigerian party-style jollof rice simmered in rich tomato-pepper sauce and served with seasoned chicken.',
    fullDescription:
      'Our signature Nigerian Jollof Rice slow-cooked in spiced tomato and pepper base, served hot alongside crispy, well-seasoned fried chicken. A popular everyday favourite around UNIBEN and Uselu.',
    prepStyle: 'Signature Rice Dish',
    price: 2500,
    image: '/src/assets/images/dish_jollof_chicken.jpg',
    imageAlt: 'Plate of Nigerian Jollof Rice served with seasoned fried chicken',
    featured: true,
  },
  {
    id: 'beans-and-fried-plantain',
    name: 'Beans & Fried Plantain',
    category: 'Other Specials',
    shortDescription:
      'Hearty palm-oil stewed Nigerian honey beans paired with sweet golden fried ripe plantain slices.',
    fullDescription:
      'Tender honey beans slow-cooked in a savoury palm-oil pepper sauce, topped with caramelized fried ripe plantain (dodo). Filling, nutritious, and comforting for lunch or dinner.',
    prepStyle: 'Traditional Comfort Meal',
    price: 1800,
    image: '/src/assets/images/dish_beans_fried_plantain.jpg',
    imageAlt: 'Plate of Nigerian stewed beans served with sliced golden fried ripe plantain',
  },
  {
    id: 'eba-and-afang',
    name: 'Eba & Afang Soup',
    category: 'Swallows & Soups',
    shortDescription:
      'Smooth garri swallow paired with rich Afang vegetable soup cooked with prawns and assorted meats.',
    fullDescription:
      'Freshly prepared Nigerian Afang soup made with finely shredded afang and waterleaf vegetables, palm oil, and rich seafood and meat proteins, served with warm smooth Eba.',
    prepStyle: 'Traditional Swallow & Soup',
    price: 3300,
    image: '/src/assets/images/dish_eba_afang.jpg',
    imageAlt: 'Nigerian Afang Soup garnished with prawns, stockfish, and leafy greens',
    featured: true,
  },
  {
    id: 'eba-and-egusi',
    name: 'Eba & Egusi Soup',
    category: 'Swallows & Soups',
    shortDescription:
      'Warm yellow garri Eba served with rich, lumpy melon-seed Egusi soup and tender beef.',
    fullDescription:
      'Ground egusi (melon seed) soup cooked with palm oil, traditional spices, leafy greens, and seasoned beef, paired with freshly turned golden Eba.',
    prepStyle: 'Traditional Swallow & Soup',
    price: 2800,
    image: '/src/assets/images/dish_eba_egusi.jpg',
    imageAlt: 'Yellow Eba swallow served beside rich Nigerian Egusi soup and beef',
    featured: true,
  },
  {
    id: 'fried-rice-and-chicken',
    name: 'Fried Rice & Chicken',
    category: 'Rice Dishes',
    shortDescription:
      'Colourful Nigerian fried rice stir-fried with sweet corn, carrots, and green peas alongside grilled chicken.',
    fullDescription:
      'Aromatic Nigerian-style fried rice seasoned in savoury stock with crisp mixed vegetables, plated with juicy spiced fried chicken.',
    prepStyle: 'Signature Rice Dish',
    price: 2700,
    image: '/src/assets/images/dish_fried_rice_chicken.jpg',
    imageAlt: 'Nigerian fried rice with sweet corn, carrots, green peas, and seasoned chicken thighs',
    featured: true,
  },
  {
    id: 'eba-and-okra',
    name: 'Eba & Okra Soup',
    category: 'Swallows & Soups',
    shortDescription:
      'Freshly cooked spiced okra draw soup with red stew and assorted proteins served with smooth Eba.',
    fullDescription:
      'Delicious Nigerian okra soup simmered with chopped fresh okra, rich tomato-pepper stew, and tender meats, accompanied by warm garri Eba.',
    prepStyle: 'Traditional Swallow & Soup',
    price: 2900,
    image: '/src/assets/images/dish_eba_okra.jpg',
    imageAlt: 'Plate of smooth Eba served with spiced Nigerian okra soup and meat',
  },
  {
    id: 'rice-and-stew',
    name: 'Rice & Stew',
    category: 'Rice Dishes',
    shortDescription:
      'Steamed long-grain white rice cooked with mixed vegetables and served with rich Nigerian tomato beef stew.',
    fullDescription:
      'Fluffy white rice garnished with tender vegetables, topped with classic Nigerian peppered tomato stew and seasoned beef.',
    prepStyle: 'Classic Rice Dish',
    price: 1800,
    image: '/src/assets/images/dish_rice_and_stew.jpg',
    imageAlt: 'Steamed white rice with vegetables and rich Nigerian tomato beef stew',
  },
  {
    id: 'semo-and-ogbono',
    name: 'Semo & Ogbono Soup',
    category: 'Swallows & Soups',
    shortDescription:
      'Smooth wheat semovita wrap served with glossy Nigerian ogbono draw soup and leafy greens.',
    fullDescription:
      'Wild bush mango seed (ogbono) soup simmered to a smooth, nutty finish with vegetables and traditional spices, plated with rolled smooth Semovita.',
    prepStyle: 'Traditional Swallow & Soup',
    price: 2900,
    image: '/src/assets/images/dish_semo_ogbono.jpg',
    imageAlt: 'Rolled smooth Semovita swallow paired with a bowl of Nigerian Ogbono soup',
  },
  {
    id: 'yam-porridge',
    name: 'Yam Porridge',
    category: 'Other Specials',
    shortDescription:
      'Creamy Nigerian Asaro (yam porridge) simmered in rich palm-oil pepper sauce with tender meat.',
    fullDescription:
      'Chunks of white yam slow-boiled in seasoned tomato, pepper, and palm-oil broth until thick and creamy, served with flavourful beef.',
    prepStyle: 'Traditional Comfort Meal',
    price: 2200,
    image: '/src/assets/images/dish_yam_porridge.jpg',
    imageAlt: 'Bowl of rich Nigerian yam porridge (Asaro) topped with tender spiced meat',
  },
  {
    id: 'white-rice-stew-and-chicken',
    name: 'White Rice, Stew & Chicken',
    category: 'Rice Dishes',
    shortDescription:
      'Fluffy white rice served with rich Nigerian tomato-pepper stew and golden fried chicken.',
    fullDescription:
      'Classic long-grain white rice paired with slow-simmered red tomato stew and generous pieces of seasoned fried chicken.',
    prepStyle: 'Classic Rice Dish',
    price: 2300,
    image: '/src/assets/images/dish_white_rice_stew_chicken.jpg',
    imageAlt: 'Plate of steamed white rice with Nigerian red tomato stew and fried chicken',
    featured: true,
  },
  {
    id: 'pounded-yam-and-egusi',
    name: 'Pounded Yam & Egusi',
    category: 'Swallows & Soups',
    shortDescription:
      'Smooth pounded yam served with rich Nigerian melon-seed Egusi soup, chicken, and assorted meats.',
    fullDescription:
      'Traditional hand-pounded yam swallow served alongside hearty Egusi soup loaded with leafy greens, ponmo, assorted meats, and seasoned chicken.',
    prepStyle: 'Signature Swallow & Soup',
    price: 3200,
    image: '/src/assets/images/dish_pounded_yam_egusi.jpg',
    imageAlt: 'Smooth pounded yam in a bowl of Nigerian Egusi soup with chicken and assorted meats',
    featured: true,
  },
  {
    id: 'fufu-and-ofe-nsala',
    name: 'Fufu & Ofe Nsala',
    category: 'Swallows & Soups',
    shortDescription:
      'Smooth cassava fufu served with aromatic Ofe Nsala (white soup) cooked with spices and tender chicken.',
    fullDescription:
      'Delicate Eastern Nigerian Ofe Nsala prepared without palm oil using traditional spices, utazi leaves, and chicken, paired with smooth cassava fufu.',
    prepStyle: 'Traditional Swallow & Soup',
    price: 3400,
    image: '/src/assets/images/dish_fufu_ofe_nsala.jpg',
    imageAlt: 'Smooth cassava fufu wraps served beside a bowl of spiced Nigerian Ofe Nsala soup with chicken',
  },
  {
    id: 'rice-and-beans-with-plantain',
    name: 'Rice & Beans with Plantain',
    category: 'Other Specials',
    shortDescription:
      'Hearty plate of white rice and stewed brown beans served with red stew, fried plantain, and fresh salad.',
    fullDescription:
      'A satisfying Nigerian everyday combo bringing together steamed rice, well-cooked brown beans, savoury peppered stew, sweet fried plantain, and crisp garden salad.',
    prepStyle: 'Combo Special',
    price: 2000,
    image: '/src/assets/images/dish_rice_beans_plantain.jpg',
    imageAlt: 'Plate of Nigerian rice and brown beans with tomato stew, fried plantain, and salad',
  },
];

export function formatPrice(price: number | null | undefined): string {
  if (typeof price === 'number' && price > 0) {
    return `₦${price.toLocaleString('en-NG')}`;
  }
  return 'Contact for Price';
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function buildWhatsAppOrderUrl(message: string): string {
  return `${RESTAURANT_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
