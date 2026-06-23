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
      "/img/bplus1/b1dplus.png.webp",
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
    shortDescription: "Exprimidora de naranjas con tolva automática de 15 kg",
    description:
      "La Exprimidora Business 2 es la única en su tipo en el mercado. Coloca las naranjas en la tolva y en segundos obtendrás jugo fresco y natural. Corta, exprime y separa las cáscaras de forma automática, ahorrando tiempo y esfuerzo a tu equipo. Ideal para restaurantes, hoteles y tiendas de conveniencia con alta demanda.",
    price: 24900,
    sku: "BUS-2",
    category: "exprimidores",
    images: [
      "/img/b2/6-1-rkd3zl2v118iyf0jj858lrpxrycgs659ulnri23bwc.png.webp",
    ],
    features: [
      "Tolva automática con capacidad de 15 kg",
      "22 a 25 naranjas por minuto — 1 lt/min",
      "Corte, exprimido y separación de cáscara automáticos",
      "Estructura reforzada para uso rudo",
      "Acero inoxidable y plástico de alta resistencia",
      "Botón de paro de emergencia",
    ],
    stock: 8,
    status: "active",
  },
  {
    id: "3",
    slug: "exprimidora-pro-1",
    name: "Exprimidora Pro 1",
    shortDescription: "Exprimidora profesional — hasta 40 naranjas por minuto",
    description:
      "La Exprimidora Pro 1 es el equipo de mayor rendimiento de Zumomix. Exprime hasta 40 naranjas por minuto con tolva automática, contenedor de residuos integrado y gran canasta de almacenamiento. Diseñada para establecimientos de alto volumen que necesitan producción continua de jugo fresco sin interrupciones.",
    price: 32000,
    sku: "PRO-1",
    category: "exprimidores",
    images: [
      "/img/pro1/p1w.png.webp",
    ],
    features: [
      "36 a 40 naranjas por minuto",
      "Tolva automática de despacho",
      "Contenedor de residuos/pulpa integrado",
      "Canasta de almacenamiento de 15 kg",
      "Acero inoxidable y plástico de alta resistencia",
      "Botón de paro de emergencia",
    ],
    stock: 5,
    status: "active",
  },
  {
    id: "4",
    slug: "exprimidor-atomic",
    name: "Exprimidor Atomic",
    shortDescription: "Exprimidor eléctrico de limones — 90 kg por hora",
    description:
      "Exprime jugo de limón en segundos y sin esfuerzo. El Atomic es silencioso, fácil de operar y cabe en cualquier rincón de tu negocio. Con molinos ajustables y limpieza rápida, es la mejor opción para coctelerías, reposterías, restaurantes y marisquerías.",
    price: 15800,
    sku: "ATOMIC",
    category: "exprimidores",
    images: [
      "/img/atomic/tapa-de-atomic-e1730577120883.jpg.webp",
    ],
    features: [
      "Más de 90 kg de limones por hora",
      "1 litro de jugo cada 2 minutos",
      "Molinos ajustables (apretarlos o separarlos)",
      "Silenciosa y fácil de operar",
      "Limpieza rápida y sencilla",
      "Compacta — cabe en cualquier rincón",
    ],
    stock: 15,
    status: "active",
  },
  {
    id: "5",
    slug: "dispensadora-mix2-mix3",
    name: "Dispensadora MIX",
    shortDescription: "Dispensadoras de aguas frescas",
    description:
      "Las Dispensadoras MIX2 y MIX3 son la solución perfecta para negocios que quieren ofrecer aguas frescas naturales de forma automatizada. Con capacidad para 2 o 3 sabores simultáneos, estas máquinas son ideales para restaurantes, cafeterías y eventos. Compatible con nuestros concentrados naturales.",
    price: 13722.80,
    sku: "MIX-2",
    category: "dispensadoras",
    images: [
      "/img/mix/mix-2-foto-V-Principal-225x300.jpg.webp",
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
    variants: [
      { label: "MIX2 — 2 sabores", sku: "MIX-2", price: 13722.80 },
      { label: "MIX3 — 3 sabores", sku: "MIX-3", price: 18362.80 },
    ],
  },
  {
    id: "6",
    slug: "maquina-granita",
    name: "Máquina Granita",
    shortDescription: "Máquina GRANIX 2 para frappes y smoothies — 2 tanques de 12 lts",
    description:
      "Prepara deliciosos frappes y smoothies para tus clientes en minutos con la máquina GRANIX 2. Dos tanques independientes de 12 lts, temperatura constante entre -2 °C y -3 °C, luz LED por tanque y palanca de despacho fácil. Ideal para restaurantes, bares, cafeterías y palerías.",
    price: 35000,
    sku: "GRANITA-2T",
    category: "maquinas",
    images: [
      "/img/granita/Maquina-Granix-2T.jpg.webp",
    ],
    features: [
      "2 tanques independientes de 12 lts c/u",
      "Temperatura constante de -2 °C a -3 °C",
      "Luz LED en cada tanque",
      "Panel de control independiente por tanque",
      "Palanca de despacho con bandeja anti-escurrimiento",
      "Acero inoxidable y policarbonato",
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
