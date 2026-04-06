import blackShirt from '../assets/mensWear/blackShirt.png';
import oliveShirt from '../assets/mensWear/oliveShirt.png';
import pinkShirt from '../assets/mensWear/pinkShirt.png';
import blackShirtFull from '../assets/mensWear/bShirtFull.png';
import oliveShirtFull from '../assets/mensWear/oShirtFull.png';
import pinkShirtFull from '../assets/mensWear/pShirtFull.png';
import blackPant from '../assets/mensWear/blackPant.png';
import grayPant from '../assets/mensWear/grayPant.png';
import blackPantFull from '../assets/mensWear/bPantFull.png';
import grayPantFull from '../assets/mensWear/gPantFull.png';
import blackShoe from '../assets/mensWear/blackShoe.png';
import skyShoe from '../assets/mensWear/skyShoe.png';
import skyShoeFull from '../assets/mensWear/sShoeFull.png';
import whiteHeel from '../assets/womensWear/whiteHeel.png';
import skyHeel from '../assets/womensWear/skyHeel.png';
import lovarySaree from '../assets/womensWear/lovarySaree.png';
import pinkSaree from '../assets/womensWear/pinkSaree.png';
import yellowShawl from '../assets/womensWear/yellowShawl.png';
import whiteShowl from '../assets/womensWear/whiteShowl.png';
import whiteHoodie from '../assets/mensWear/whiteHoodie.png';
import blackShoeFull from '../assets/mensWear/bShoeFull.png';
import skyHoodie from '../assets/mensWear/skyHoodie.png';
import kidBluePants from '../assets/kidWear/kidBoysWear/kidBluePants.png';
import kidSkyPant from '../assets/kidWear/kidBoysWear/kidSkyPant.png';
import kidBlueShorts from '../assets/kidWear/kidBoysWear/kidBlueShorts.png';
import kidBrownShorts from '../assets/kidWear/kidBoysWear/kidBrownShorts.png';
import kidRedCap from '../assets/kidWear/kidBoysWear/kidRedCap.png';
import kidBluePantFull from '../assets/kidWear/kidBoysWear/kidBluePantFull.png';
import kidSkyPantFull from '../assets/kidWear/kidBoysWear/kidSkyPantFull.png';
import kidBlueShortsFull from '../assets/kidWear/kidBoysWear/kidBlueShortsFull.png';
import kidBrownShortsFull from '../assets/kidWear/kidBoysWear/kidBrownShortsFull.png';
import kidRedCapFull from '../assets/kidWear/kidBoysWear/kidRedCapFull.png';
import kidWomenShirtPink from '../assets/kidWear/kidWomenWear/kidWomenShirtPink.png';
import KidWomShirPinkFull from '../assets/kidWear/kidWomenWear/KidWomShirPinkFull.png';
import kidWomenShirtPurple from '../assets/kidWear/kidWomenWear/kidWomenShirtPurple.png';
import KidWomShirPurFull from '../assets/kidWear/kidWomenWear/KidWomShirPurFull.png';
import kidWomenShoeWhite from '../assets/kidWear/kidWomenWear/kidWomenShoeWhite.png';
import KidWomShoewhiteFull from '../assets/kidWear/kidWomenWear/KidWomShoewhiteFull.png';
import kidWomenShoeBrown from '../assets/kidWear/kidWomenWear/kidWomenShoeBrown.png';
import KidWomShoeBrownFull from '../assets/kidWear/kidWomenWear/KidWomShoeBrownFull.png';
import kidWomenBagPink from '../assets/kidWear/kidWomenWear/kidWomenBagPink.png';
import kidWomenBagPinkFull from '../assets/kidWear/kidWomenWear/kidWomenBagPinkFull.png';
import kidWomenBagWhite from '../assets/kidWear/kidWomenWear/kidWomenBagWhite.png';
import kidWomenBagWhiteFull from '../assets/kidWear/kidWomenWear/kidWomenBagWhiteFull.png';
import whiteHoodieFull from '../assets/mensWear/wHoodieFull.png';
import skyHoodieFull from '../assets/mensWear/sHoodieFull.png';
import whiteHeelFull from '../assets/womensWear/whiteHeelFull.png';
import skyHeelFull from '../assets/womenswear/skyHeelFull.png';
import lovarySareeFull from '../assets/womensWear/lovarySareeFull.png';
import pinkSareeFull from '../assets/womensWear/pinkSareeFull.png';
import whiteShowlFull from '../assets/womensWear/whiteShowlFull.png';
import yellowShawFull from '../assets/womensWear/yellowShawFull.png';   
import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'The Atelier Oxford Shirt',
    price: 220,
    category: 'Men',
    type: 'Shirt',
    color: 'Black',
    description: 'A crisp, tailored shirt cut from premium cotton with a refined modern fit. Perfect for the wardrobe edit.',
    variants: [
      { label: 'Black', color: '#111111', image: blackShirt, fullImage: blackShirtFull },
      { label: 'Olive', color: '#8C8B4A', image: oliveShirt, fullImage: oliveShirtFull },
      { label: 'Pink', color: '#D36B95', image: pinkShirt, fullImage: pinkShirtFull }
    ],
    images: [
      blackShirt,
      oliveShirt,
      pinkShirt
    ],
    rating: 4.9,
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 12,
    viewers: 8,
    deliveryDays: 3,
    model3D: '/models/compressed/shirt.glb',
    reviews: [
      { id: 'r1', user: 'Mia R.', rating: 5, comment: 'Impeccable cut and luxurious feel.', date: '2026-01-10' },
      { id: 'r2', user: 'Noah T.', rating: 5, comment: 'A premium shirt that feels bespoke.', date: '2026-01-18' }
    ]
  },
  {
    id: '2',
    name: 'Maison Tailored Trousers',
    price: 260,
    category: 'Men',
    type: 'Pants',
    color: 'Black',
    description: 'Soft wool-blend trousers with a streamlined profile and elegant drape for a polished finish.',
    variants: [
      { label: 'Black', color: '#111111', image: blackPant, fullImage: blackPantFull },
      { label: 'Gray', color: '#9B9B9B', image: grayPant, fullImage: grayPantFull }
    ],
    images: [
      blackPant,
      grayPant
    ],
    rating: 4.8,
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 8,
    viewers: 12,
    deliveryDays: 4,
    model3D: '/models/compressed/chair.glb',
    reviews: [
      { id: 'r3', user: 'Luca B.', rating: 5, comment: 'The fit is flawless and the fabric is exceptional.', date: '2026-02-02' }
    ]
  },
  {
    id: '3',
    name: 'Velvet Heel',
    price: 360,
    category: 'Women',
    type: 'Heels',
    color: 'White',
    description: 'A sculptural heel finished in rich velvet with a cushioned insole for evening elegance.',
    variants: [
      { label: 'White', color: '#FFFFFF', image: whiteHeel, fullImage: whiteHeelFull },
      { label: 'Sky', color: '#7DBBD2', image: skyHeel, fullImage: skyHeelFull }
    ],
    images: [
      whiteHeel,
      skyHeel
    ],
    rating: 4.7,
    featured: true,
    sizes: ['36', '37', '38', '39', '40'],
    stock: 5,
    viewers: 17,
    deliveryDays: 5,
    model3D: '/models/compressed/shoe.glb',
    reviews: [
      { id: 'r4', user: 'Sofia N.', rating: 5, comment: 'The most comfortable heel I own.', date: '2026-03-08' }
    ]
  },
  {
    id: '4',
    name: 'Women Saree',
    price: 420,
    category: 'Women',
    type: 'Saree',
    color: 'Olive',
    description: 'A luxurious draped saree with elegant embroidery and soft, flowing fabric for modern traditional occasions.',
    variants: [
      { label: 'Olive', color: '#8C8B4A', image: lovarySaree, fullImage: lovarySareeFull },
      { label: 'Pink', color: '#D36B95', image: pinkSaree, fullImage: pinkSareeFull }
    ],
    images: [
      lovarySaree,
      pinkSaree
    ],
    rating: 4.9,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 6,
    viewers: 21,
    deliveryDays: 3,
    reviews: [
      { id: 'r5', user: 'Ava P.', rating: 5, comment: 'Elegant and dreamy, the perfect evening dress.', date: '2026-03-15' }
    ]
  },
  {
    id: '5',
    name: 'Ashmere Shawl',
    price: 190,
    category: 'Women',
    type: 'Shawl',
    color: 'Golden',
    description: 'A sumptuous shawl woven for warmth and glamour, finished with delicate sheen and timeless color contrast.',
    variants: [
      { label: 'Gold', color: '#D4AF37', image: yellowShawl, fullImage: yellowShawFull },
      { label: '#BBB6B3', color: '#BBB6B3', image: whiteShowl, fullImage: whiteShowlFull }
    ],
    images: [
      yellowShawl,
      whiteShowl
    ],
    rating: 4.8,
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 14,
    viewers: 9,
    deliveryDays: 4,
    reviews: [
      { id: 'r6', user: 'Emma F.', rating: 4, comment: 'Beautiful fabric and sophisticated details.', date: '2026-03-20' }
    ]
  },
 

  {
    id: '10',
    name: 'Blue & Sky Boys Pants',
    price: 140,
    category: 'Kids',
    type: 'Boys Wear',
    color: 'Blue / Light Blue',
    description: 'A kids pants set with crisp blue and sky tones designed for modern boys wear.',
    variants: [
      { label: 'Blue', color: '#1E3A8A', image: kidBluePants, fullImage: kidBluePantFull },
      { label: 'Light Blue', color: '#7DD3FC', image: kidSkyPant, fullImage: kidSkyPantFull }
    ],
    images: [
      kidBluePants,
      kidSkyPant
    ],
    rating: 4.7,
    featured: true,
    sizes: ['2', '4', '6', '8'],
    stock: 14,
    viewers: 5,
    deliveryDays: 3,
    reviews: [
      { id: 'r13', user: 'Ayaan S.', rating: 5, comment: 'Perfect fit and beautiful shades for little boys.', date: '2026-03-22' }
    ]
  },
  {
    id: '11',
    name: 'Blue & Brown Boys Shorts',
    price: 110,
    category: 'Kids',
    type: 'Boys Wear',
    color: 'Blue / Brown',
    description: 'A playful kids shorts duo in blue and brown, ideal for weekend style.',
    variants: [
      { label: 'Blue', color: '#2563EB', image: kidBlueShorts, fullImage: kidBlueShortsFull },
      { label: 'Brown', color: '#92400E', image: kidBrownShorts, fullImage: kidBrownShortsFull }
    ],
    images: [
      kidBlueShorts,
      kidBrownShorts
    ],
    rating: 4.6,
    featured: true,
    sizes: ['2', '4', '6', '8'],
    stock: 16,
    viewers: 6,
    deliveryDays: 3,
    reviews: [
      { id: 'r14', user: 'Zara B.', rating: 5, comment: 'Great colors and lightweight finish for the kids.', date: '2026-03-24' }
    ]
  },
  {
    id: '12',
    name: 'Scarlet Boys Cap',
    price: 55,
    category: 'Kids',
    type: 'Boys Wear',
    color: 'Red',
    description: 'A bright red cap crafted for bold little boys wear looks.',
    variants: [
      { label: 'Red', color: '#EF4444', image: kidRedCap, fullImage: kidRedCapFull }
    ],
    images: [
      kidRedCap
    ],
    rating: 4.8,
    featured: true,
    sizes: ['One Size'],
    stock: 20,
    viewers: 3,
    deliveryDays: 2,
    reviews: [
      { id: 'r15', user: 'Nia K.', rating: 5, comment: 'A standout red cap my boy loves wearing.', date: '2026-03-26' }
    ]
  },
  {
    id: '13',
    name: 'Petal Pink Girls Shirt',
    price: 130,
    category: 'Kids',
    type: 'Girls Wear',
    color: 'Pink / Purple',
    description: 'A soft girls shirt in pastel pink and purple shades made for playful daywear.',
    variants: [
      { label: 'Pink', color: '#F9A8D4', image: kidWomenShirtPink, fullImage: KidWomShirPinkFull },
      { label: 'Purple', color: '#A78BFA', image: kidWomenShirtPurple, fullImage: KidWomShirPurFull }
    ],
    images: [
      kidWomenShirtPink,
      kidWomenShirtPurple
    ],
    rating: 4.8,
    featured: true,
    sizes: ['2', '4', '6', '8'],
    stock: 12,
    viewers: 6,
    deliveryDays: 3,
    reviews: [
      { id: 'r16', user: 'Sara J.', rating: 5, comment: 'Delicate colors and a lovely fit for my little one.', date: '2026-03-28' }
    ]
  },
  {
    id: '14',
    name: 'Ivory Girls Sneakers',
    price: 105,
    category: 'Kids',
    type: 'Girls Wear',
    color: 'White / Brown',
    description: 'Comfortable girls sneakers with an ivory finish and warm brown accents.',
    variants: [
      { label: 'White', color: '#FFFFFF', image: kidWomenShoeWhite, fullImage: KidWomShoewhiteFull },
      { label: 'Brown', color: '#92400E', image: kidWomenShoeBrown, fullImage: KidWomShoeBrownFull }
    ],
    images: [
      kidWomenShoeWhite,
      kidWomenShoeBrown
    ],
    rating: 4.7,
    featured: true,
    sizes: ['2', '4', '6', '8'],
    stock: 15,
    viewers: 5,
    deliveryDays: 3,
    reviews: [
      { id: 'r17', user: 'Mina Q.', rating: 5, comment: 'Perfectly cushioned and stylish for school.', date: '2026-03-29' }
    ]
  },
  {
    id: '15',
    name: 'Mini Tote Girls Bag',
    price: 85,
    category: 'Kids',
    type: 'Girls Wear',
    color: 'Pink / White',
    description: 'A charming mini tote designed for little girls who love playful accessories.',
    variants: [
      { label: 'Pink', color: '#F472B6', image: kidWomenBagPink, fullImage: kidWomenBagPinkFull },
      { label: 'White', color: '#FFFFFF', image: kidWomenBagWhite, fullImage: kidWomenBagWhiteFull }
    ],
    images: [
      kidWomenBagPink,
      kidWomenBagWhite
    ],
    rating: 4.6,
    featured: true,
    sizes: ['One Size'],
    stock: 18,
    viewers: 4,
    deliveryDays: 2,
    reviews: [
      { id: 'r18', user: 'Lina Z.', rating: 5, comment: 'Cute, practical, and perfect for little outings.', date: '2026-03-30' }
    ]
  },
  {
    id: '8',
    name: 'Signature Leather Loafers',
    price: 320,
    category: 'Men',
    type: 'Shoes',
    color: 'Black',
    description: 'Polished leather loafers crafted with premium finish and a sleek silhouette for timeless wear.',
    variants: [
      { label: 'Black', color: '#111111', image: blackShoe, fullImage: blackShoeFull },
      { label: 'Sky', color: '#7DBBD2', image: skyShoe, fullImage: skyShoeFull }
    ],
    images: [
      blackShoe,
      skyShoe
    ],
    rating: 4.9,
    featured: true,
    sizes: ['39', '40', '41', '42'],
    stock: 9,
    viewers: 14,
    deliveryDays: 4,
    reviews: [
      { id: 'r9', user: 'Leo S.', rating: 5, comment: 'A perfect balance of comfort and style.', date: '2026-03-12' }
    ]
  },
  {
    id: '9',
    name: 'Signature Cashmere Hoodie',
    price: 280,
    category: 'Men',
    type: 'Hoodies',
    color: 'White',
    description: 'A soft cashmere hoodie with a relaxed yet refined cut for everyday elevated comfort.',
    variants: [
      { label: 'White', color: '#FFFFFF', image: whiteHoodie, fullImage: whiteHoodieFull },
      { label: 'Sky', color: '#87CEEB', image: skyHoodie, fullImage: skyHoodieFull }
    ],
    images: [
      whiteHoodie,
      skyHoodie
    ],
    rating: 4.8,
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 6,
    viewers: 18,
    deliveryDays: 4,
    reviews: [
      { id: 'r10', user: 'Noah W.', rating: 5, comment: 'An elevated hoodie with incredible softness.', date: '2026-03-18' }
    ]
  }
];
