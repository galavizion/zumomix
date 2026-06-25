export interface SpecRow {
  label: string;
  value: string;
}

export interface SpecTable {
  label: string;
  rows: SpecRow[];
  downloadUrl?: string;
}

export interface Highlight {
  icon?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  desc: string;
}

export interface PromoSection {
  badge?: string;
  title: string;
  bullets: string[];
  linkHref: string;
  linkLabel: string;
  image?: string;
}

export interface Testimonial {
  src: string;
  caption: string;
}

export interface Benefit {
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
}

export interface VideoItem {
  videoId: string;
  title: string;
}

export interface ProductExtra {
  whyBetterTitle?: string;
  benefits?: Benefit[];
  highlights?: Highlight[];
  extraTexts?: string[];
  promo?: PromoSection;
  showTestimonials?: boolean;
  testimonials?: Testimonial[];
  showRefacciones?: boolean;
  refaccionesImages?: string[];
  videos?: VideoItem[];
  specTitle?: string;
  specTabs?: SpecTable[];
  specs?: SpecRow[];
  specImage?: string;
}

const productExtras: Record<string, ProductExtra> = {
  "exprimidora-business-1-plus": {
    whyBetterTitle: "¿Por qué nuestra máquina es mejor?",
    highlights: [
      {
        icon: "🔩",
        image: "/img/bplus1/b1-plus-reforzada-1-e1686701468494-q7xcs5g6fibu8knhosyt4jevnafr94a7fbu0z5ddz0.jpeg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Estructura reforzada",
        desc: "Equipo reforzado en su estructura interna, lo que hace este producto robusto y superior a todas las máquinas del mercado.",
      },
      {
        icon: "🚿",
        image: "/img/bplus1/B1-plus-grifo-reforzado-e1686701280259-q7xcn8qiqnlxlvs6coky3s07yumr20so316qr4negs.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Grifo reforzado",
        desc: "Práctico grifo que dispensa de manera fácil y sin escurrimientos tu jugo recién exprimido. Además activa la máquina de manera inmediata.",
      },
      {
        icon: "🌱",
        image: "/img/bplus1/B1-plus-separador-de-semillas-prbxgxeplscgjv6m3rljfo03cdbampyfs6ifvb65mk.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Separador de semillas",
        desc: "Palita interna que elimina las semillas y el gajo del filtro durante el exprimido. No pararás el proceso para limpiar.",
      },
    ],
    extraTexts: [
      "Ofrece a tus clientes jugos 100% naturales y frescos realizados en segundos.",
      "Nuestra máquina además de realizar un jugo natural es vistosa para el cliente. ¡A los niños les encanta ver el proceso!",
      "Si cuentas con un restaurante, merendero o algún negocio parecido le encantará a tu clientela.",
    ],
    showTestimonials: true,
    testimonials: [
      { src: "/img/bplus1/294774129_379066947670209_646293035742485206_n-600x450.webp", caption: "Fácil de utilizar y muy atractiva" },
      { src: "/img/bplus1/295095519_379067381003499_3497319660714179148_n-600x450.webp", caption: "Aguas frescas 100% naturales" },
    ],
    showRefacciones: true,
    specTitle: "Ficha técnica Business 1 Plus",
    specImage: "/img/bplus1/ficha-tecnica-b1-zumomix.jpeg",
    specs: [
      { label: "Material",                    value: "Acero inoxidable y plástico" },
      { label: "Diámetro de naranja",         value: "6 a 9 cm" },
      { label: "Voltaje",                     value: "110 V" },
      { label: "Capacidad de almacenamiento", value: "3 kg" },
      { label: "Limpieza",                    value: "Se recomienda limpieza diaria" },
      { label: "Peso",                        value: "52 kg" },
      { label: "Energía",                     value: "250 W" },
      { label: "Velocidad de exprimido",      value: "22 a 25 naranjas p/m" },
      { label: "Seguridad",                   value: "Botón de paro. Desconectar cuando esté fuera de uso." },
    ],
  },

  "exprimidor-atomic": {
    benefits: [
      { image: "/img/atomic/Diseno-sin-titulo-1-q31kue7k4br0d4g35vs2q06zvxxgs1n8ia8mfu6ty8.png.webp",  imageWidth: 120, imageHeight: 120, title: "Exprime más de 90 kg en una hora" },
      { image: "/img/atomic/Diseno-sin-titulo-4-q31l5sz12xdbapvfjbc1hmjfhbov7rxxqrbt5r9sf4.png.webp",  imageWidth: 120, imageHeight: 120, title: "1 lt de jugo cada 2 minutos" },
      { image: "/img/atomic/Diseno-sin-titulo-3-q31l61fksfow77j55wzom2ektsj651virx76h8x8v4.png.webp",  imageWidth: 120, imageHeight: 120, title: "Reduce el esfuerzo de tu equipo" },
      { image: "/img/atomic/Diseno-sin-titulo-6-q31lcttm5czg1to5iumomcqf9z2lqctqditf96uvxc.png.webp",  imageWidth: 120, imageHeight: 120, title: "Silenciosa y fácil de operar" },
      { image: "/img/atomic/Diseno-sin-titulo-5-q31ld1cbo19qmpd8axvp6au4121jfxnl2k1b3ejqjk.png.webp",  imageWidth: 120, imageHeight: 120, title: "Cabe en cualquier rinconcito" },
      { image: "/img/atomic/Diseno-sin-titulo-7-q31lfmecgmt4k3m27k3rj5cqu7avlyx0fcmdlsprfk.png.webp",  imageWidth: 120, imageHeight: 120, title: "Puedes moverla a cualquier sucursal" },
    ],
    highlights: [
      {
        icon: "🔝",
        image: "/img/atomic/tapa-de-atomic-e1730577120883.jpg.webp",
        imageWidth: 600,
        imageHeight: 600,
        title: "Tapa de Atomic",
        desc: "Completos o partidos puedes meter los limones por la apertura. El proceso es rápido y sin esfuerzo.",
      },
      {
        icon: "🍋",
        image: "/img/atomic/limon-exprimido-e1730577026394-600x600.jpg.webp",
        imageWidth: 600,
        imageHeight: 600,
        title: "Gran rendimiento",
        desc: "Gran capacidad y rendimiento que permite dejar bien exprimido cada limón, obteniendo el máximo jugo posible.",
      },
      {
        icon: "⚙️",
        image: "/img/atomic/molinos-ajustables-e1730577067154.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Molinos ajustables",
        desc: "Los rodillos son ajustables: puedes apretarlos o separarlos según el tamaño del limón o el nivel de exprimido que necesites.",
      },
      {
        icon: "🧹",
        image: "/img/atomic/facil-de-limpiar-Atomic-e1730576973189.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Fácil de limpiar",
        desc: "Su limpieza es sumamente sencilla. Diseñada para que puedas mantenerla impecable con el mínimo tiempo y esfuerzo.",
      },
      {
        icon: "🔩",
        image: "/img/atomic/flechas-de-acero-e1730577167154-300x300.jpg.webp",
        imageWidth: 300,
        imageHeight: 300,
        title: "Flechas de acero",
        desc: "Fuerte y resistente gracias a sus flechas de acero inoxidable. Una máquina confiable y duradera para uso continuo.",
      },
    ],
    extraTexts: [
      "Ideal para: agua de limón, bebidas preparadas, salsas y mariscos.",
      "Cientos de bares, restaurantes, marisquerías y hoteles ya confían en el Atomic.",
    ],
    showTestimonials: true,
    testimonials: [
      { src: "/img/atomic/clientes-100x100.jpg.webp", caption: "Vendo jugo de limón a hoteles y restaurantes" },
      { src: "/img/atomic/rancho-150x150.jpg.webp", caption: "Lo preparo con la máquina Atomic en minutos — Rancho las Animas" },
    ],
    showRefacciones: true,
    videos: [
      { videoId: "ktgUkTHa8ag", title: "ATOMIC Distribuidores" },
      { videoId: "GR0I5K6K9Mo", title: "Atomic - exprimidor de limones" },
      { videoId: "E2sr0n7L37w", title: "Exprimiendo limones en segundos" },
      { videoId: "459ctKSRL18", title: "Exprimidor de limón" },
    ],
    specTitle: "Ficha técnica Atomic",
    specs: [
      { label: "Material",                value: "Acero inoxidable y plástico" },
      { label: "Tamaño máximo de fruta",  value: "Menor a 4 cm" },
      { label: "Voltaje",                 value: "110 V" },
      { label: "Altura",                  value: "31 cm" },
      { label: "Ancho",                   value: "23 cm" },
      { label: "Peso",                    value: "22 kg" },
      { label: "Energía",                 value: "90 W" },
      { label: "Limpieza",                value: "Se recomienda limpieza diaria" },
      { label: "Seguridad",               value: "Botón de paro. Desconectar cuando no esté en uso." },
    ],
  },

  "exprimidora-pro-1": {
    whyBetterTitle: "Producción continua para negocios de alto volumen",
    highlights: [
      {
        icon: "⚡",
        image: "/img/pro1/p1dw.png.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Hasta 40 naranjas por minuto",
        desc: "El mayor rendimiento de la línea Zumomix. Produce jugo fresco sin parar, ideal para picos de demanda en hoteles, restaurantes de cadena y tiendas de conveniencia.",
      },
      {
        icon: "🏗️",
        title: "Tolva automática de despacho",
        desc: "Carga las naranjas y la máquina hace el resto. Corta, exprime y despacha el jugo de forma automática sin necesidad de intervención constante.",
      },
      {
        icon: "🗑️",
        title: "Contenedor de residuos integrado",
        desc: "Incluye contenedor para la pulpa y cáscaras, manteniendo el área de trabajo limpia y permitiendo operación continua sin detener la producción para limpiar.",
      },
    ],
    extraTexts: [
      "Productos robustos a un precio accesible — así resume Zumomix su filosofía con la Pro 1.",
      "Perfecta para establecimientos que no pueden permitirse interrupciones: jugos frescos disponibles en todo momento.",
    ],
    showRefacciones: true,
    specTitle: "Ficha técnica Pro 1",
    specs: [
      { label: "Material",                    value: "Acero inoxidable y plástico" },
      { label: "Diámetro de naranja",         value: "6 a 9 cm" },
      { label: "Voltaje",                     value: "110 V" },
      { label: "Capacidad de almacenamiento", value: "15 kg" },
      { label: "Limpieza",                    value: "Se recomienda limpieza diaria" },
      { label: "Peso",                        value: "96 kg" },
      { label: "Energía",                     value: "370 W" },
      { label: "Velocidad de exprimido",      value: "36 a 40 naranjas p/m" },
      { label: "Seguridad",                   value: "Botón de paro de emergencia" },
    ],
    specImage: "/img/pro1/ficha-tecnica-pro1-zumomix.jpeg",
  },

  "exprimidora-business-2": {
    whyBetterTitle: "La única en su tipo en el mercado",
    highlights: [
      {
        icon: "🏗️",
        image: "/img/b2/4-e1775708427701-rlqjn26am2s2xnflh8t792de8zx10mkwn5rz9alx4s.png.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Tolva automática de 15 kg",
        desc: "Carga hasta 15 kg de naranjas de una sola vez. La máquina las procesa sola: las corta, las exprime y separa la cáscara sin que tengas que intervenir.",
      },
      {
        icon: "⚡",
        image: "/img/b2/5-e1775707851980-rlqj81p3gc87hv8o596pxcrcofwz2nz8wunsb6vaik.png.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "1 litro por minuto",
        desc: "Procesa de 22 a 25 naranjas por minuto, produciendo un litro de jugo fresco en ese mismo tiempo. Ideal para picos de demanda sin detener la operación.",
      },
      {
        icon: "🔩",
        image: "/img/b2/6-1-rkd3zl2v118iyf0jj858lrpxrycgs659ulnri23bwc.png.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Reforzada para uso rudo",
        desc: "Estructura interna reforzada en acero inoxidable diseñada para soportar operación continua en entornos de alta demanda, superior a cualquier otro equipo del mercado.",
      },
    ],
    extraTexts: [
      "Simplemente coloca las naranjas en la tolva y en segundos tendrás jugo 100% natural y fresco.",
      "La Business 2 es la única máquina capaz de ahorrar tiempo y esfuerzo a tu valioso equipo de trabajo.",
      "Perfecta para restaurantes, hoteles, tiendas de conveniencia y cualquier negocio con alta rotación de jugos.",
    ],
    showTestimonials: true,
    testimonials: [
      { src: "/img/b2/294774129_379066947670209_646293035742485206_n-600x450.webp", caption: "Fácil de utilizar y muy atractiva" },
      { src: "/img/b2/295095519_379067381003499_3497319660714179148_n-600x450.webp", caption: "Aguas frescas 100% naturales" },
    ],
    showRefacciones: true,
    specTitle: "Ficha técnica Business 2",
    specs: [
      { label: "Material",                    value: "Acero inoxidable y plástico" },
      { label: "Diámetro de naranja",         value: "6 a 9 cm" },
      { label: "Voltaje",                     value: "110 V" },
      { label: "Capacidad de almacenamiento", value: "15 kg" },
      { label: "Peso",                        value: "64 kg" },
      { label: "Energía",                     value: "250 W" },
      { label: "Velocidad de exprimido",      value: "22 a 25 naranjas p/m" },
      { label: "Producción",                  value: "1 lt por minuto" },
      { label: "Seguridad",                   value: "Botón de paro de emergencia" },
    ],
    specImage: "/img/b2/medidas-600x750.png.webp",
  },

  "maquina-granita": {
    promo: {
      badge: "Complementa tu Granita",
      title: "Más de 30 sabores de concentrados naturales",
      bullets: [
        "Presentación de litro.",
        "Cajas de 24 litros — sabores mezclables.",
        "Envíos a toda la república.",
        "Calidad premium y sabores exóticos.",
      ],
      linkHref: "/concentrados",
      linkLabel: "Conoce los concentrados",
      image: "/img/concentrados/concentrados.webp",
    },
    highlights: [
      {
        icon: "🥤",
        image: "/img/granita/granix2-A-e1686546394169-q7u8b5w68vq1kyqci54udtldqcz6o346fwdso0tsmc.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Doble tanque de 12 lts",
        desc: "2 tanques de 12 lts cada uno controlados de manera independiente. Ofrece dos sabores simultáneos con un total de 24 lts de bebida.",
      },
      {
        icon: "🌡️",
        image: "/img/granita/granix2-B-e1686546762453-q7u8krss3wvk9grweanjveb0c5m9cp9efggh9ukx0k.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Temperatura constante",
        desc: "Mantiene tus bebidas entre -2 °C y -3 °C de forma continua. Incluye bandejas por tanque para evitar escurrimientos.",
      },
      {
        icon: "💡",
        image: "/img/granita/granix2-C-e1686546917217-q7u8othrj8f090w9rjmq3vjgevo5hsbsnhkqnqkw84.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Luz LED en cada tanque",
        desc: "Iluminación LED integrada que resalta el color y la textura de tus bebidas, aumentando su atractivo visual y las ventas.",
      },
      {
        icon: "🎛️",
        image: "/img/granita/granix-D-e1686547075173-q7u8sy09j22b7ewjobts1u2a9rc59ypdvwnghggox0.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Panel de control independiente",
        desc: "Cada tanque tiene su propio control. Regula temperatura y operación de forma individual según la demanda de cada sabor.",
      },
      {
        icon: "💪",
        image: "/img/granita/granix2-E-e1686547190384-q7u8vy3pd06aakjj54jviksal2jcv5mimroaoa0f1g.jpg.webp",
        imageWidth: 600,
        imageHeight: 400,
        title: "Equipo resistente",
        desc: "Fabricada con acero inoxidable y tanques de policarbonato. Palanca de despacho fácil de usar — sirve tus bebidas en segundos.",
      },
    ],
    extraTexts: [
      "Aumenta el menú de tu negocio y genera una nueva fuente de ingresos con frappes y smoothies de alta calidad.",
      "Perfecta para restaurantes, bares, cafeterías y palerías que quieren sorprender a sus clientes.",
    ],
    showRefacciones: true,
    specTitle: "Ficha técnica GRANIX 2",
    specs: [
      { label: "Material",            value: "Acero inoxidable y policarbonato" },
      { label: "Frente",              value: "43 cm" },
      { label: "Fondo",               value: "51 cm" },
      { label: "Altura",              value: "77 cm" },
      { label: "Peso",                value: "44 kg" },
      { label: "Capacidad",           value: "2 tanques de 12 lts" },
      { label: "Consumo energético",  value: "500 W" },
      { label: "Voltaje",             value: "110 V" },
      { label: "Temperatura",         value: "-2 °C a -3 °C" },
    ],
  },

  "dispensadora-mix2-mix3": {
    promo: {
      badge: "Complementa tu dispensadora",
      title: "Concentrados naturales para aguas frescas",
      bullets: [
        "Presentación de litro.",
        "Cajas de 24 litros — sabores mezclables.",
        "Envíos a toda la república.",
        "Calidad premium y sabores exóticos.",
      ],
      linkHref: "/concentrados",
      linkLabel: "Conoce más de los concentrados",
      image: "/img/concentrados/concentrados.webp",
    },
    highlights: [
      {
        icon: "🔘",
        image: "/img/mix/botoned-mix3-detalle-e1730581354678.jpg",
        imageWidth: 600,
        imageHeight: 400,
        title: "Botones independientes",
        desc: "Interruptores separados del sistema de enfriamiento y del giratorio. Controla cada función de forma individual.",
      },
      {
        icon: "🔄",
        image: "/img/mix/sistema-giratorio-e1730581393270-1536x1536.jpg.webp",
        imageWidth: 600,
        imageHeight: 600,
        title: "Sistema giratorio",
        desc: "Evita sedimentos en el fondo del tanque, manteniendo tus aguas en movimiento constante para una bebida siempre fresca y homogénea.",
      },
      {
        icon: "🧊",
        image: "/img/mix/Charola-mix-1-scaled-e1730581443338-1536x1536.jpg.webp",
        imageWidth: 600,
        imageHeight: 600,
        title: "Charola MIX",
        desc: "Charola individual por tanque para evitar escurrimientos. Fácil de retirar para una limpieza rápida y sin complicaciones.",
      },
      {
        icon: "💨",
        image: "/img/mix/ventilacion-mix2-e1730581501757-768x768.jpg.webp",
        imageWidth: 600,
        imageHeight: 600,
        title: "Ventilación eficiente",
        desc: "Salidas de aire estratégicas para disipar el calor del compresor. Operación muy silenciosa — no molestará a tus clientes.",
      },
      {
        icon: "🛢️",
        image: "/img/mix/Tanques-de-18-tls-mix--scaled-e1730581215418-1536x1536.jpg.webp",
        imageWidth: 600,
        imageHeight: 600,
        title: "Tanques de 18 lts",
        desc: "Capacidad de 18 lts por tanque con anillos de goma selladores que evitan fugas. Enfriamiento de 7 a 12 °C con compresor de alto rendimiento.",
      },
      {
        icon: "🔧",
        title: "Refacciones y taller",
        desc: "Contamos con refacciones y taller especializado. Siempre tendrás el soporte de Zumomix cuando lo necesites.",
      },
    ],
    extraTexts: [
      "El uso y la instalación son muy sencillos — no necesitas capacitación especializada.",
      "El combo ideal para tu negocio: aguas frescas naturales preparadas en segundos con nuestros concentrados premium.",
    ],
    showTestimonials: true,
    specTitle: "Ficha técnica",
    specTabs: [
      {
        label: "MIX2 — 2 tanques",
        rows: [
          { label: "Material",   value: "Acero inoxidable y plástico" },
          { label: "Capacidad",  value: "2 tanques de 18 lts" },
          { label: "Fondo",      value: "43 cm" },
          { label: "Frente",     value: "48 cm" },
          { label: "Altura",     value: "76 cm" },
          { label: "Peso",       value: "36 kg" },
          { label: "Voltaje",    value: "110 V" },
          { label: "Energía",    value: "300 W" },
          { label: "Limpieza",   value: "Diariamente después de uso" },
        ],
      },
      {
        label: "MIX3 — 3 tanques",
        rows: [
          { label: "Material",   value: "Acero inoxidable y plástico" },
          { label: "Capacidad",  value: "3 tanques de 18 lts" },
          { label: "Fondo",      value: "43 cm" },
          { label: "Frente",     value: "74 cm" },
          { label: "Altura",     value: "76 cm" },
          { label: "Peso",       value: "37 kg" },
          { label: "Voltaje",    value: "110 V" },
          { label: "Energía",    value: "385 W" },
          { label: "Limpieza",   value: "Diariamente después de uso" },
        ],
      },
    ],
  },
};

export default productExtras;
