export interface Product {
  id: string;
  title: string;
  category: 'худи' | 'свитшоты' | 'зип-худи' | 'футболки';
  categoryLabel: string;
  price: number;
  oldPrice: number;
  discount: string;
  images: string[];
  inStock: boolean;
  sku: string;
  fabricComposition: {
    insulated: string;
    lightweight: string;
  };
  packageContents: string;
  sizeRange: string;
  deliveryInfo: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'spartan-300-hoodie',
    title: 'Худи - «300 СПАРТАНЦЕВ»',
    category: 'худи',
    categoryLabel: 'Худи',
    price: 4800,
    oldPrice: 7100,
    discount: '-32%',
    images: [
      '/assets/trooper/RU_Body_albedo_tga.png',
      '/assets/trooper/RU_Equipment_albedo_tga.png',
      '/assets/trooper/RU_Faces_albedo_tga.png',
      '/assets/trooper/Sleeve_patch_of_the_234th_Guards_Airborne_.png'
    ],
    inStock: true,
    sku: 'MIL-HOD-300SP-01',
    fabricComposition: {
        insulated: 'Флис премиум класса с начесом, плотность 380 г/м², футер 3-х нитка (80% хлопок, 20% полиэстер)',
        lightweight: 'Без начеса, петлевой футер 2-х нитка, плотность 280 г/м² (95% хлопок, 5% эластан)'
    },
    packageContents: 'Худи тактического кроя, фирменный шеврон на липучке, набор тактических стикеров, упаковка Zip-lock',
    sizeRange: 'XXS - 6XL',
    deliveryInfo: 'Доставка СДЭК и Почтой России по всей РФ от 2 до 5 дней. Курьерская доставка до двери в Москве и СПб бесплатно от 5000 руб.',
    description: 'Тактическое худи повышенной прочности с усиленными локтями и карманом-кенгуру. Разработано для экстремальных условий и повседневного использования в городе.'
  },
  {
    id: 'guardian-zip-hoodie',
    title: 'Зип-худи - «ГВАРДИЯ»',
    category: 'зип-худи',
    categoryLabel: 'Зип-худи',
    price: 5400,
    oldPrice: 7500,
    discount: '-28%',
    images: [
      '/assets/trooper/RU_Equipment_albedo_tga.png',
      '/assets/trooper/RU_Body_albedo_tga.png',
      '/assets/trooper/Sleeve_patch_of_the_234th_Guards_Airborne_.png'
    ],
    inStock: true,
    sku: 'MIL-ZIP-GVD-02',
    fabricComposition: {
        insulated: 'Утепленный футер 3-х нитка с начесом, плотность 400 г/м²',
        lightweight: 'Хлопок 92%, лайкра 8%, плотность 300 г/м²'
    },
    packageContents: 'Зип-худи на усиленной молнии YKK, съемный патч 234-го полка, паспорт изделия',
    sizeRange: 'XS - 5XL',
    deliveryInfo: 'Отправка в день заказа. Доставка по всей России пункты выдачи СДЭК, Boxberry.',
    description: 'Полноразмерное зип-худи на тяжелой металлической молнии YKK с глубоким капюшоном и ветрозащитной планкой.'
  },
  {
    id: 'tactical-operator-sweatshirt',
    title: 'Свитшот - «ОПЕРАТОР»',
    category: 'свитшоты',
    categoryLabel: 'Свитшоты',
    price: 3900,
    oldPrice: 5200,
    discount: '-25%',
    images: [
      '/assets/trooper/RU_Faces_albedo_tga.png',
      '/assets/trooper/RU_Body_albedo_tga.png',
      '/assets/trooper/RU_Faces_normals_tga.png'
    ],
    inStock: true,
    sku: 'MIL-SWT-OPR-03',
    fabricComposition: {
        insulated: 'Плотный трикотаж с начесом (340 г/м²)',
        lightweight: 'Футер петля (260 г/м²)'
    },
    packageContents: 'Свитшот классического кроя, фирменный фирменный стикерпак',
    sizeRange: 'S - 4XL',
    deliveryInfo: 'Почта России, СДЭК, курьерская доставка по РФ.',
    description: 'Лаконичный военный свитшот без лишних деталей. Эргономичный крой не сковывает движения.'
  },
  {
    id: 'airborne-combat-tshirt',
    title: 'Футболка - «AIRBORNE 234»',
    category: 'футболки',
    categoryLabel: 'Футболки',
    price: 2100,
    oldPrice: 3000,
    discount: '-30%',
    images: [
      '/assets/trooper/Sleeve_patch_of_the_234th_Guards_Airborne_.png',
      '/assets/trooper/RU_Faces_albedo_tga.png'
    ],
    inStock: true,
    sku: 'MIL-TSH-ABN-04',
    fabricComposition: {
        insulated: 'Не применяется для футболок',
        lightweight: 'Кулирная гладь премиум (95% хлопок мерсеризованный, 5% эластан, 180 г/м²)'
    },
    packageContents: 'Футболка тактическая, шевкон на рукаве на липучке',
    sizeRange: 'XXS - 6XL',
    deliveryInfo: 'Быстрая доставка курьером или в пункты выдачи заказов.',
    description: 'Дышащая футболка с анатомическим кроем и износостойким принтом высокой четкости.'
  },
  {
    id: 'recon-tactical-hoodie',
    title: 'Худи - «РАЗВЕДКА СТАНДАРТ»',
    category: 'худи',
    categoryLabel: 'Худи',
    price: 4500,
    oldPrice: 6200,
    discount: '-27%',
    images: [
      '/assets/trooper/RU_Equipment_albedo_tga.png',
      '/assets/trooper/RU_Body_albedo_tga.png'
    ],
    inStock: true,
    sku: 'MIL-HOD-REC-05',
    fabricComposition: {
        insulated: 'Футер 3-х нитка с флисовым ворсом (360 г/м²)',
        lightweight: 'Футер 2-х нитка (270 г/м²)'
    },
    packageContents: 'Худи, фирменный брелок, зип-пакет',
    sizeRange: 'S - 6XL',
    deliveryInfo: 'Доставка по всей России транспортными компаниями.',
    description: 'Надежное тактическое худи в камуфляжной и матовой расцветке с карманом для рации или телефона.'
  },
  {
    id: 'storm-zip-hoodie',
    title: 'Зип-худи - «ШТОРМ»',
    category: 'зип-худи',
    categoryLabel: 'Зип-худи',
    price: 5800,
    oldPrice: 7900,
    discount: '-26%',
    images: [
      '/assets/trooper/RU_Faces_normals_tga.png',
      '/assets/trooper/RU_Equipment_albedo_tga.png'
    ],
    inStock: true,
    sku: 'MIL-ZIP-STM-06',
    fabricComposition: {
        insulated: 'Утепленный футер премиум (420 г/м²)',
        lightweight: 'Хлопок 90%, полиэстер 10% (310 г/м²)'
    },
    packageContents: 'Зип-худи со скрытыми карманами на молнии, шеврон',
    sizeRange: 'XS - 4XL',
    deliveryInfo: 'СДЭК, Почта России, курьер на дом.',
    description: 'Штурмовое зип-худи повышенной износостойкости с усиленной фурнитурой и двойным капюшоном.'
  }
];
