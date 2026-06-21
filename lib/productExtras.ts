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

export interface ProductExtra {
  whyBetterTitle?: string;
  highlights?: Highlight[];
  extraTexts?: string[];
  promo?: PromoSection;
  showTestimonials?: boolean;
  showRefacciones?: boolean;
  specTitle?: string;
  specTabs?: SpecTable[];
  specs?: SpecRow[];
}

const productExtras: Record<string, ProductExtra> = {
  "exprimidora-business-1-plus": {
    whyBetterTitle: "¿Por qué nuestra máquina es mejor?",
    highlights: [
      {
        icon: "🔩",
        image: "https://www.zumomix.com/wp-content/uploads/2022/10/b1-plus-reforzada.jpg",
        imageWidth: 600,
        imageHeight: 400,
        title: "Estructura reforzada",
        desc: "Equipo reforzado en su estructura interna, lo que hace este producto robusto y superior a todas las máquinas del mercado.",
      },
      {
        icon: "🚿",
        image: "https://www.zumomix.com/wp-content/uploads/2022/10/B1-plus-grifo-reforzado.jpg",
        imageWidth: 600,
        imageHeight: 400,
        title: "Grifo reforzado",
        desc: "Práctico grifo que dispensa de manera fácil y sin escurrimientos tu jugo recién exprimido. Además activa la máquina de manera inmediata.",
      },
      {
        icon: "🌱",
        image: "https://www.zumomix.com/wp-content/uploads/2022/10/B1-plus-separador-de-semillas.jpg",
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
    showRefacciones: true,
    specTitle: "Ficha técnica Business 1 Plus",
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
      { icon: "🔘", title: "Botones independientes",   desc: "Interruptores separados del sistema de enfriamiento y giratorio." },
      { icon: "🔄", title: "Sistema giratorio",        desc: "Evita sedimentos en el fondo del tanque, manteniendo tus aguas en movimiento." },
      { icon: "🧊", title: "Charola MIX",              desc: "Charola individual por tanque para evitar escurrimientos. Fácil de retirar para limpieza." },
      { icon: "💨", title: "Ventilación eficiente",    desc: "Salidas de aire para disipar el calor. Operación muy silenciosa." },
      { icon: "🛢️", title: "Tanques de 18 lts",        desc: "Capacidad de 18 lts por tanque con anillos de goma selladores que evitan fugas." },
      { icon: "🔧", title: "Refacciones y taller",     desc: "Contamos con refacciones y taller especializado. Siempre tendrás el soporte de Zumomix." },
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
