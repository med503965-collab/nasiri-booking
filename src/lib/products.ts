export interface Category {
  slug: string;
  name: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  colorFrom: string;
  colorTo: string;
}

export const CATEGORIES: Category[] = [
  { slug: "dresses", name: "فساتين" },
  { slug: "kaftans", name: "عبايات وقفاطين" },
  { slug: "bags", name: "حقائب" },
  { slug: "accessories", name: "إكسسوارات" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "golden-desert-dress",
    name: "فستان الصحراء الذهبي",
    category: "dresses",
    price: 690,
    description:
      "فستان سهرة أنيق بقصة انسيابية، مستوحى من ألوان الكثبان الذهبية عند الغروب.",
    colorFrom: "#d9b978",
    colorTo: "#7a3b28",
  },
  {
    slug: "ayouna-royal-kaftan",
    name: "قفطان أيونا الملكي",
    category: "kaftans",
    price: 1250,
    description:
      "قفطان مغربي فاخر مطرز يدويًا بخيوط ذهبية، تصميم يجمع بين الأصالة والفخامة.",
    colorFrom: "#c09a44",
    colorTo: "#6b2a3a",
  },
  {
    slug: "sand-dune-abaya",
    name: "عباية الرمال الفاخرة",
    category: "kaftans",
    price: 590,
    description:
      "عباية واسعة مريحة بقماش ناعم وتطريز بسيط أنيق بلون الرمال الدافئ.",
    colorFrom: "#e9d6b8",
    colorTo: "#9c5636",
  },
  {
    slug: "leather-hand-bag",
    name: "حقيبة يد جلدية",
    category: "bags",
    price: 450,
    description: "حقيبة يد من الجلد الطبيعي بلمسة مغربية تقليدية أنيقة.",
    colorFrom: "#9c5636",
    colorTo: "#331d12",
  },
  {
    slug: "gold-accessory-set",
    name: "طقم إكسسوارات ذهبي",
    category: "accessories",
    price: 320,
    description: "طقم مجوهرات ذهبي أنيق يضم قلادة وأقراط بتصميم صحراوي راقٍ.",
    colorFrom: "#d9b978",
    colorTo: "#c09a44",
  },
  {
    slug: "sunset-evening-dress",
    name: "فستان غروب العيون",
    category: "dresses",
    price: 780,
    description:
      "فستان سهرة بألوان متدرجة تحاكي غروب شمس العيون فوق المحيط.",
    colorFrom: "#cf9367",
    colorTo: "#6b2a3a",
  },
  {
    slug: "silk-shawl",
    name: "شال حريري مطرز",
    category: "accessories",
    price: 210,
    description: "شال حريري ناعم مطرز بنقوش مغربية تقليدية، مثالي لإطلالة راقية.",
    colorFrom: "#f4e9d8",
    colorTo: "#cf9367",
  },
  {
    slug: "woven-tote-bag",
    name: "حقيبة قش منسوجة",
    category: "bags",
    price: 280,
    description: "حقيبة صيفية منسوجة يدويًا، تجمع بين البساطة والأناقة الصحراوية.",
    colorFrom: "#e9d6b8",
    colorTo: "#cf9367",
  },
  {
    slug: "oasis-kaftan",
    name: "قفطان الواحة",
    category: "kaftans",
    price: 990,
    description: "قفطان مغربي بألوان زاهية مستوحاة من واحات الصحراء الخضراء.",
    colorFrom: "#c09a44",
    colorTo: "#4a2e1e",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((category) => category.slug === slug)?.name ?? slug;
}

export function formatPriceMAD(price: number): string {
  return `${price.toLocaleString("ar-MA")} درهم`;
}
