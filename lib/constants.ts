import type { Product } from "@/types";

export const CONTACT = {
  email: "ventas@zumomix.com",
  phoneMonterrey: "(81) 1809 7022",
  phoneGuadalajara: "33 1351 8442",
  whatsapp: "5218118097022",
  instagram: "@zumomix.mx",
  facebook: "ZumomixExprimidores",
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "exprimidora-business-1-plus",
    name: "Exprimidora Business 1 Plus",
    shortDescription: "Exprimidora de naranjas compacta para negocios",
    description:
      "La Exprimidora Business 1 Plus es ideal para negocios que buscan un equipo compacto y eficiente. Con capacidad de procesar hasta 500 naranjas por hora, es perfecta para cafeterías, restaurantes y tiendas de jugos. Su diseño robusto y fácil limpieza la hacen la opción número uno para emprendedores.",
    price: 18500,
    sku: "BUS-1-PLUS",
    category: "exprimidores",
    images: [
      "https://www.zumomix.com/wp-content/uploads/2024/11/NARANJA.png",
    ],
    features: [
      "Capacidad: 500 naranjas/hora",
      "Motor 1/4 HP",
      "Acero inoxidable",
      "Fácil limpieza",
      "Garantía 1 año",
    ],
    stock: 12,
    status: "active",
  },
  {
    id: "2",
    slug: "exprimidora-business-2",
    name: "Exprimidora Business 2",
    shortDescription: "Exprimidora de naranjas de alto rendimiento",
    description:
      "La Exprimidora Business 2 es nuestra solución de alto rendimiento para negocios con mayor demanda. Con capacidad para procesar hasta 800 naranjas por hora, este equipo está diseñado para hoteles, restaurantes de cadena y tiendas de conveniencia que requieren producción continua de jugos frescos.",
    price: 24900,
    sku: "BUS-2",
    category: "exprimidores",
    images: [
      "https://www.zumomix.com/wp-content/uploads/2026/03/Gemini_Generated_Image_2z0w6x2z0w6x2z0w.png",
    ],
    features: [
      "Capacidad: 800 naranjas/hora",
      "Motor 1/2 HP",
      "Estructura de acero inoxidable",
      "Sistema automático de exprimido",
      "Garantía 1 año",
    ],
    stock: 8,
    status: "active",
  },
  {
    id: "3",
    slug: "exprimidora-pro-1",
    name: "Exprimidora Pro 1",
    shortDescription: "Exprimidora profesional de naranjas",
    description:
      "La Exprimidora Pro 1 es nuestra línea profesional diseñada para establecimientos de alto volumen. Con tecnología de última generación y materiales de primera calidad, esta máquina garantiza el mejor jugo de naranja con el mínimo desperdicio. Ideal para cadenas hoteleras y restaurantes de alta demanda.",
    price: 32000,
    sku: "PRO-1",
    category: "exprimidores",
    images: [
      "https://www.zumomix.com/wp-content/uploads/2021/08/p1w.png",
    ],
    features: [
      "Capacidad: 1200 naranjas/hora",
      "Motor industrial 3/4 HP",
      "Acero inoxidable grado alimenticio",
      "Sistema de filtrado integrado",
      "Garantía 2 años",
    ],
    stock: 5,
    status: "active",
  },
  {
    id: "4",
    slug: "exprimidor-atomic",
    name: "Exprimidor Atomic",
    shortDescription: "Exprimidor industrial de limones",
    description:
      "El Exprimidor Atomic es el especialista en cítricos ácidos. Diseñado específicamente para limones, limas y toronjas, este equipo industrial extrae el máximo jugo con mínima semilla y sin amargor. Perfecto para bares, restaurantes mexicanos y negocios de agua fresca.",
    price: 15800,
    sku: "ATOMIC",
    category: "exprimidores",
    images: [
      "https://www.zumomix.com/wp-content/uploads/2024/11/LIMON-683x1024.png",
    ],
    features: [
      "Especializado en limones y cítricos",
      "Capacidad: 600 limones/hora",
      "Sistema anti-amargor",
      "Filtro de semillas integrado",
      "Garantía 1 año",
    ],
    stock: 15,
    status: "active",
  },
  {
    id: "5",
    slug: "dispensadora-mix2-mix3",
    name: "Dispensadora MIX2 y MIX3",
    shortDescription: "Dispensadoras de aguas frescas",
    description:
      "Las Dispensadoras MIX2 y MIX3 son la solución perfecta para negocios que quieren ofrecer aguas frescas naturales de forma automatizada. Con capacidad para 2 o 3 sabores simultáneos, estas máquinas son ideales para restaurantes, cafeterías y eventos. Compatible con nuestros concentrados naturales.",
    price: 28500,
    sku: "MIX-2-3",
    category: "dispensadoras",
    images: [
      "https://www.zumomix.com/wp-content/uploads/2024/11/BEST-SALE-e1730917860851-735x1024.png",
    ],
    features: [
      "2 o 3 sabores simultáneos",
      "Capacidad 20L por depósito",
      "Sistema de refrigeración integrado",
      "Panel digital de temperatura",
      "Compatible con concentrados Zumomix",
    ],
    stock: 10,
    status: "active",
  },
  {
    id: "6",
    slug: "maquina-granita",
    name: "Máquina Granita",
    shortDescription: "Máquina para frappes y smoothies",
    description:
      "La Máquina Granita Zumomix es perfecta para crear frappes, smoothies, slushies y bebidas granizadas de alta calidad. Con tecnología de enfriamiento rápido y capacidad de producción continua, transforma cualquier negocio en una heladería gourmet. Ideal para heladerías, cafeterías y restaurantes modernos.",
    price: 35000,
    sku: "GRANITA-2T",
    category: "maquinas",
    images: [
      "https://www.zumomix.com/wp-content/uploads/2023/06/Maquina-Granix-2T.jpg",
    ],
    features: [
      "2 depósitos independientes",
      "Capacidad 10L por depósito",
      "Enfriamiento rápido en 30 min",
      "Pantalla digital",
      "Certificación sanitaria",
    ],
    stock: 6,
    status: "active",
  },
  {
    id: "7",
    slug: "exprimidora-master-pro",
    name: "Exprimidora Master Pro",
    shortDescription: "La exprimidora definitiva para grandes producciones",
    description:
      "Diseñada para supermercados y hoteles de gran volumen, la Master Pro ofrece un rendimiento inigualable y una durabilidad excepcional. Exprime hasta 1500 naranjas por hora con un sistema de alimentación automático y autolimpieza.",
    price: 45000,
    sku: "MASTER-PRO",
    category: "exprimidores",
    images: [
      "https://www.zumomix.com/wp-content/uploads/2021/08/p1w.png",
    ],
    features: [
      "Capacidad: 1500 naranjas/hora",
      "Motor industrial 1 HP",
      "Alimentador automático de naranjas",
      "Sistema de autolimpieza",
      "Garantía 3 años",
    ],
    stock: 4,
    status: "active",
  },
];

export const CONCENTRADOS_FLAVORS = [
  "Fresa-Kiwi",
  "Pepino-Limón",
  "Mango",
  "Maracuyá",
  "Jamaica",
  "Horchata",
  "Tamarindo",
  "Sandía",
  "Guanábana",
  "Piña-Coco",
  "Naranja-Zanahoria",
  "Limón-Chía",
  "Melón",
  "Uva",
  "Frutos Rojos",
  "Durazno",
  "Mango-Habanero",
  "Pepino-Menta",
  "Guayaba",
  "Granada",
  "Tuna",
  "Nanche",
  "Jobo",
  "Ciruela",
  "Chía-Limón",
  "Agua de Jamaica Premium",
  "Horchata de Almendra",
  "Coco Natural",
  "Piña Natural",
  "Manzana-Canela",
];

export const PRESENTACIONES_CONCENTRADOS = [
  {
    title: "Litro individual",
    description: "Ideal para probar sabores o negocios con menor volumen.",
    detail: "1 litro rinde aprox. 6 litros de agua fresca",
  },
  {
    title: "Caja de 24 litros",
    description: "Para negocios con mayor demanda. Sabores mixtos disponibles.",
    detail: "Ahorra hasta un 20% vs. compra individual",
  },
];

export const CLIENT_LOGOS = [
  {
    name: "Delicias del Contry",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/delicias-del-contry-85625625-300x98.jpg",
  },
  {
    name: "UANL",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/Universidad-Autonoma-de-Nuevo-Leon-300x300.webp",
  },
  {
    name: "Wild Rooster",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/Wild-Rooster-logo.png",
  },
  {
    name: "Cliente",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/070-300x129.jpg",
  },
  {
    name: "Pockets Billiard",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/Pockets-billiard-300x179.png",
  },
  {
    name: "La Flor de Michoacán",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/La-Flor-de-Michoacan-logo-300x300.jpg",
  },
  {
    name: "La Michoacana",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/la_michoacana_logo-300x295.webp",
  },
  {
    name: "Pariente",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/Pariente-300x263.jpg",
  },
  {
    name: "Hoteles Misión",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/Hoteles_Mision-300x122.jpg",
  },
  {
    name: "AlSuper",
    src: "https://www.zumomix.com/wp-content/uploads/2023/09/AlSuper-300x193.webp",
  },
];

export const GALLERY_IMAGES = [
  "https://www.zumomix.com/wp-content/uploads/2022/09/259881233_228331649410407_1617566213225861175_n.webp",
  "https://www.zumomix.com/wp-content/uploads/2022/09/254659181_218245050419067_7709948053673163448_n.webp",
  "https://www.zumomix.com/wp-content/uploads/2022/09/296448978_386818933561677_6311962382191161284_n.webp",
  "https://www.zumomix.com/wp-content/uploads/2022/09/240181537_167989912111248_157233056831773795_n.webp",
  "https://www.zumomix.com/wp-content/uploads/2022/09/295909592_386824710227766_538293794449097087_n.webp",
  "https://www.zumomix.com/wp-content/uploads/2022/09/294774129_379066947670209_646293035742485206_n.webp",
];
