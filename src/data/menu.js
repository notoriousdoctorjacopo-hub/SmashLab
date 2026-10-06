// Recipes and prices transcribed from the SmashLab menu board.
// Each recipe goes bottom → top. `l` = layer id in art/layers.jsx.

const bun = { l: 'bunBottom', label: 'Potato bun', note: 'la base. regge tutto.' }
const top = { l: 'bunTop', label: 'Potato bun', note: 'lucido. come la tua fronte dopo.' }
const smash1 = { l: 'patty', label: 'Smash 90g', note: 'schiacciato sul ferro' }
const smash2 = { l: 'patty', label: 'Smash 90g', note: 'il bis. 180g in totale.' }
const cheddar = { l: 'cheddar', label: 'Cheddar' }
const bacon = { l: 'bacon', label: 'Bacon', note: 'croccante. non si discute.' }
const sauce = { l: 'sauce', label: 'SmashLab sauce', note: 'ricetta segreta. resta segreta.', color: 'smashlab' }

export const MENU = [
  {
    id: 'devastante',
    name: 'Devastante!',
    prices: [12, 14],
    accent: '#FF1E2D',
    copy:
      'Jalapeños, onion rings, doppio smash, doppio cheddar. Così tanto formaggio che ti servirà la nostra salvietta nera per recuperare la dignità.',
    recipe: [
      bun,
      sauce,
      smash1,
      cheddar,
      smash2,
      { ...cheddar, label: 'Cheddar', note: 'sì, di nuovo.' },
      bacon,
      { l: 'jalapeno', label: 'Jalapeño', note: 'pizzica. ti avevamo avvisato.' },
      { l: 'onionRings', label: 'Onion rings' },
      top,
    ],
  },
  {
    id: 'basic-smash',
    name: 'Basic Smash',
    prices: [12, 14],
    accent: '#FFE600',
    copy:
      'Basic solo di nome. Due palline da 90 grammi schiacciate finché non chiedono scusa. Cipolla alla griglia, bacon, cheddar. Fine della discussione.',
    recipe: [bun, sauce, smash1, cheddar, smash2, { ...cheddar, note: 'fuso fino ai bordi' }, { l: 'onionGrilled', label: 'Cipolla', note: 'alla griglia' }, bacon, top],
  },
  {
    id: 'pazzesco',
    name: 'Pazzesco!',
    prices: [12, 14],
    accent: '#FF6A00',
    copy:
      'Cetriolini sotto, onion rings sopra, bacon in mezzo. Il punto esclamativo è già nel nome. Il secondo lo metti tu al primo morso.',
    recipe: [bun, sauce, { l: 'pickles', label: 'Cetriolini' }, smash1, cheddar, smash2, { ...cheddar }, bacon, { l: 'onionRings', label: 'Onion rings' }, top],
  },
  {
    id: 'big-jam',
    name: 'Big Jam!',
    prices: [12, 14],
    accent: '#FFE600',
    copy:
      'Il più alto del menu. Pomodoro e insalata croccante, così puoi dire a tua madre che hai mangiato verdura. Non è vero, ma suona bene.',
    recipe: [
      bun,
      sauce,
      { l: 'lettuce', label: 'Insalata', note: 'croccante. alibi perfetto.' },
      { l: 'tomato', label: 'Pomodoro' },
      smash1,
      cheddar,
      smash2,
      { ...cheddar },
      bacon,
      { l: 'onionGrilled', label: 'Cipolla' },
      { l: 'pickles', label: 'Cetriolini' },
      top,
    ],
  },
  {
    id: 'hot-chick',
    name: 'Hot Chick',
    prices: [12, 14],
    accent: '#FF6A00',
    copy:
      'Coscia di pollo nel panko, fritta finché non scrocchia come le nocche prima di una rissa. Pomodoro, insalata, sesame dressing. Zero manzo, zero pietà.',
    recipe: [
      bun,
      { l: 'sauce', label: 'Sesame dressing', color: 'sesame' },
      { l: 'lettuce', label: 'Insalata' },
      { l: 'tomato', label: 'Pomodoro' },
      { l: 'chickenCutlet', label: 'Coscia di pollo', note: 'impanata nel panko' },
      { l: 'sauce', label: 'Sesame dressing', note: 'doppia mano', color: 'sesame' },
      top,
    ],
  },
  {
    id: 'fabula-smash',
    name: 'Fabula Smash',
    prices: [13, 15],
    accent: '#FF1E2D',
    copy:
      'Doppio smash dentro un croissant. Sì, un croissant. Colazione e cena nello stesso morso. Scamorza alla griglia, BBQ al bacon. Nessun pentimento.',
    recipe: [
      { l: 'croissantBottom', label: 'Croissant', note: 'il Fabula. lo so.' },
      { l: 'sauce', label: 'BBQ al bacon', color: 'bbq' },
      smash1,
      { l: 'scamorza', label: 'Scamorza', note: 'alla griglia' },
      smash2,
      bacon,
      { l: 'sauce', label: 'BBQ al bacon', note: 'ancora. ovvio.', color: 'bbq' },
      { l: 'croissantTop', label: 'Croissant', note: 'burro su burro' },
    ],
  },
  {
    id: 'snoop-dog',
    name: 'Snoop Dog',
    prices: [10, 12],
    accent: '#FFE600',
    copy:
      'Würstel, bacon, doppia cipolla: alla griglia e croccante. Lento, basso, rilassato. Fino al primo morso.',
    recipe: [
      { l: 'hotdogBun', label: 'Potato bun', note: 'aperto. accogliente.' },
      { l: 'sausage', label: 'Würstel' },
      { l: 'onionGrilled', label: 'Cipolla', note: 'alla griglia' },
      bacon,
      { l: 'onionCrispy', label: 'Cipolla croccante' },
      { l: 'drizzle', label: 'SmashLab sauce', color: 'smashlab' },
    ],
  },
  {
    id: 'devastante-dog',
    name: 'Devastante Dog',
    prices: [10, 12],
    accent: '#FF1E2D',
    copy:
      'Chili di carne, jalapeños, doppia salsa con Sriracha. Un hot dog che ti guarda storto. Tieni la lattina a portata di mano.',
    recipe: [
      { l: 'hotdogBun', label: 'Potato bun' },
      { l: 'sausage', label: 'Würstel' },
      { l: 'chili', label: 'Chili di carne', note: 'cucchiaiate, non spruzzi' },
      { l: 'onionGrilled', label: 'Cipolla', note: 'alla griglia' },
      { l: 'jalapeno', label: 'Jalapeños' },
      { l: 'onionCrispy', label: 'Cipolla crispy' },
      { l: 'drizzle', label: 'Sriracha HOT', color: 'sriracha' },
      { l: 'drizzle', label: 'SmashLab sauce', color: 'smashlab' },
    ],
  },
]

export const SIDES = [
  ['Patatine', '4'],
  ['Patatine cheddar e bacon', '6'],
  ['Polpette mac & cheese', '4'],
  ['Bufalo wings', '4'],
  ['Crispy chicken', '5'],
  ['Onion rings', '4'],
  ["Supplì 'nduja e cheddar ×2", '5'],
  ['Pulled pork bites', '5'],
  ['Mozzarella stick', '5'],
  ['Olive ascolane 2.0, 4 pezzi', '6'],
]

export const DRINKS = [
  ['Bibite', '3'],
  ['Birra bionda 0,33', '4'],
  ['Birra bionda 0,50', '5'],
  ['Tè limone o pesca', '3'],
  ['Donut Oreo', '2,50'],
  ['Tiramisù', '3,50'],
  ['Cheesecake al cioccolato', '3,50'],
]

export const SAUCE_LIST = ['Maionese', 'Ketchup', 'Spicy mayo', 'Barbecue', 'Mayo tartufo', 'Piccante thai', 'SmashLab sauce', 'Agropiccante']
