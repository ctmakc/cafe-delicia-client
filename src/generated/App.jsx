import React, { useEffect, useMemo, useRef, useState } from 'react';

const apiPost = async (url, payload) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return data;
};

const money = (value) => Number(value || 0).toFixed(2);


/* ===== data.js ===== */
/* Menu data — full catalogue */
const DELICIA_DATA = (function () {
  const u = (id, w = 1200) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

  // Diversified imagery — varied Unsplash IDs so the catalogue doesn't feel repetitive.
  const POOL = {
    napoleon:   '1565958011703-44f9829ba187',
    medovik:    '1578985545062-69928b1d9587',
    spartak:    '1606313564200-e75d5e30476c',
    kyiv:       '1486427944299-d1955d23e34d',
    esterhazy:  '1535141192574-5d4897c12636',
    sponge:     '1551404973-761c83cd8339',
    pavlova:    '1488477181946-6428a0291777',
    eclair:     '1551024601-bec78aea704b',
    cheesecake: '1567206563064-6f60f40a2b57',
    tiramisu:   '1571877227200-a0d98ea607e9',
    cookies:    '1499636136210-6f4ee915583e',
    macaron:    '1569864358642-9d1684040f43',
    shortbread: '1497034825429-c343d7c6a68f',
    crescent:   '1517686469429-8bdb88b9f907',
    icecream:   '1567206563064-6f60f40a2b57',
    espresso:   '1510707577719-ae7c14805e3a',
    cappuccino: '1509042239860-f550ce710b93',
    latte:      '1572442388796-11668a67e53d',
    flatwhite:  '1485808191679-5f86510681a2',
    chocolate:  '1517578239113-b03992dcdd25',
    tea:        '1556679343-c7306c1976bc',
    pumpkin:    '1606313564200-e75d5e30476c',
    berrytart:  '1488477181946-6428a0291777',
  };

  const items = [
    // ───────────────── CAKES ─────────────────
    {
      id: 'napoleon',
      cat: 'cakes',
      name: 'Napoleon',
      tagline: 'Layered puff pastry · crème pâtissière',
      desc: 'Sixteen feather-thin layers of butter puff pastry, set with vanilla bean pastry cream and a dusting of fine crumb. The cake we are known for.',
      price: 62, unit: 'whole · 1.2 kg',
      img: u(POOL.napoleon),
      badges: ['Signature', 'Pre-order'],
      sizes: ['Small · 0.8 kg', 'Medium · 1.2 kg', 'Large · 1.8 kg'],
      allergens: 'Wheat, dairy, eggs.',
    },
    {
      id: 'medovik',
      cat: 'cakes',
      name: 'Medovik',
      tagline: 'Honey cake · sour cream',
      desc: 'A Ukrainian honey-layer cake — slow-baked dough with wildflower honey, rested overnight under cultured sour cream so the layers turn velvet-soft.',
      price: 58, unit: 'whole · 1.1 kg',
      img: u(POOL.medovik),
      badges: ['Signature'],
      sizes: ['Small · 0.7 kg', 'Medium · 1.1 kg', 'Large · 1.6 kg'],
      allergens: 'Wheat, dairy, eggs, honey.',
    },
    {
      id: 'spartak',
      cat: 'cakes',
      name: 'Spartak',
      tagline: 'Dark chocolate · sour cream',
      desc: 'Eight cocoa-rich layers brought together with tangy sour cream and a whisper of dark chocolate ganache. Rich but never heavy.',
      price: 60, unit: 'whole · 1.2 kg',
      img: u(POOL.spartak),
      badges: ['Popular'],
      sizes: ['Small · 0.8 kg', 'Medium · 1.2 kg', 'Large · 1.8 kg'],
      allergens: 'Wheat, dairy, eggs, cocoa.',
    },
    {
      id: 'kyiv',
      cat: 'cakes',
      name: 'Kyiv Cake',
      tagline: 'Hazelnut meringue · chocolate buttercream',
      desc: 'Two crisp hazelnut-meringue discs sandwiching cocoa buttercream — the classic Kyiv recipe, refined, never sweet beyond comfort.',
      price: 64, unit: 'whole · 1.0 kg',
      img: u(POOL.kyiv),
      badges: ['Pre-order'],
      sizes: ['Small · 0.7 kg', 'Medium · 1.0 kg'],
      allergens: 'Wheat, dairy, eggs, hazelnut.',
    },
    {
      id: 'esterhazy',
      cat: 'cakes',
      name: 'Esterházy',
      tagline: 'Almond dacquoise · cognac buttercream',
      desc: 'A Central European classic — five layers of almond dacquoise glazed in fondant feathered with chocolate, filled with light cognac buttercream.',
      price: 66, unit: 'whole · 1.0 kg',
      img: u(POOL.esterhazy),
      badges: ['Pre-order'],
      sizes: ['Medium · 1.0 kg'],
      allergens: 'Wheat, dairy, eggs, almond.',
    },
    {
      id: 'sponge',
      cat: 'cakes',
      name: 'Classic Sponge',
      tagline: 'Vanilla · seasonal berries',
      desc: 'Cloud-light sponge moistened with vanilla syrup, finished with whipped cream and whatever berries arrived that morning at the market.',
      price: 52, unit: 'whole · 1.0 kg',
      img: u(POOL.sponge),
      badges: [],
      sizes: ['Small · 0.7 kg', 'Medium · 1.0 kg', 'Large · 1.5 kg'],
      allergens: 'Wheat, dairy, eggs.',
    },
    {
      id: 'pavlova',
      cat: 'cakes',
      name: 'Pavlova',
      tagline: 'Meringue · mascarpone · fruit',
      desc: 'Crisp-shelled meringue with a marshmallow centre, mascarpone cream and a generous tumble of in-season fruit.',
      price: 54, unit: 'whole · 0.9 kg',
      img: u(POOL.pavlova),
      badges: ['Seasonal'],
      sizes: ['Medium · 0.9 kg'],
      allergens: 'Dairy, eggs.',
    },

    // ───────────────── INDIVIDUAL DESSERTS ─────────────────
    {
      id: 'eclair',
      cat: 'desserts',
      name: 'Vanilla Éclair',
      tagline: 'Choux · Madagascar vanilla',
      desc: 'Crisp choux filled with bourbon-vanilla diplomat cream, finished in tempered white-chocolate glaze.',
      price: 7.5, unit: 'each',
      img: u(POOL.eclair),
      badges: ['Popular'],
      allergens: 'Wheat, dairy, eggs.',
    },
    {
      id: 'cheesecake',
      cat: 'desserts',
      name: 'Baked Cheesecake',
      tagline: 'Ricotta · lemon · shortcrust',
      desc: 'A slim slice of ricotta-set cheesecake on butter shortcrust, scented with Sicilian lemon zest.',
      price: 8.5, unit: 'slice',
      img: u(POOL.cheesecake),
      badges: [],
      allergens: 'Wheat, dairy, eggs.',
    },
    {
      id: 'tiramisu',
      cat: 'desserts',
      name: 'Tiramisù',
      tagline: 'Espresso · mascarpone · cocoa',
      desc: 'Savoiardi soaked in our own espresso and Marsala, layered with whipped mascarpone and a soft dusting of cocoa.',
      price: 8.5, unit: 'glass',
      img: u(POOL.tiramisu),
      badges: ['Popular'],
      allergens: 'Wheat, dairy, eggs, alcohol.',
    },
    {
      id: 'pavlova-mini',
      cat: 'desserts',
      name: 'Mini Pavlova',
      tagline: 'Meringue · cream · fruit',
      desc: 'Single-serve pavlova with whipped Chantilly and the morning’s fruit. Light, never cloying.',
      price: 7.0, unit: 'each',
      img: u(POOL.pavlova),
      badges: ['Seasonal'],
      allergens: 'Dairy, eggs.',
    },
    {
      id: 'sernyk',
      cat: 'desserts',
      name: 'Sernyk',
      tagline: 'Ukrainian curd cake · raisin',
      desc: 'Tvorog-based cheesecake, baked low and slow until the top sets to a pale gold. A taste from grandmothers’ kitchens.',
      price: 7.5, unit: 'slice',
      img: u(POOL.cheesecake),
      badges: ['Signature'],
      allergens: 'Wheat, dairy, eggs.',
    },

    // ───────────────── COOKIES ─────────────────
    {
      id: 'linzer',
      cat: 'cookies',
      name: 'Linzer',
      tagline: 'Hazelnut · raspberry',
      desc: 'Toasted-hazelnut shortbread with house raspberry preserve and a hush of icing sugar.',
      price: 4.5, unit: 'each',
      img: u(POOL.cookies),
      badges: [],
      allergens: 'Wheat, dairy, hazelnut.',
    },
    {
      id: 'macaron',
      cat: 'cookies',
      name: 'Macaron Box',
      tagline: 'Six flavours · weekly rotation',
      desc: 'Six macarons in the week’s flavours — pistachio, rose, vanilla, salted caramel, raspberry, espresso.',
      price: 22, unit: 'box of 6',
      img: u(POOL.macaron),
      badges: ['Popular'],
      allergens: 'Almond, dairy, eggs.',
    },
    {
      id: 'shortbread',
      cat: 'cookies',
      name: 'Butter Shortbread',
      tagline: 'Cultured butter · vanilla',
      desc: 'Round shortbread baked from cultured butter and Madagascar vanilla. Pairs with everything we pour.',
      price: 3.5, unit: 'each',
      img: u(POOL.shortbread),
      badges: [],
      allergens: 'Wheat, dairy.',
    },
    {
      id: 'crescent',
      cat: 'cookies',
      name: 'Vanilla Crescents',
      tagline: 'Almond · powdered sugar',
      desc: 'Crescent-shaped almond cookies dusted with vanilla sugar — a Central-European holiday staple.',
      price: 16, unit: '250 g bag',
      img: u(POOL.crescent),
      badges: ['Seasonal'],
      allergens: 'Wheat, dairy, almond.',
    },

    // ───────────────── ICE CREAM ─────────────────
    {
      id: 'gelato-vanilla',
      cat: 'icecream',
      name: 'Vanilla Bean',
      tagline: 'Madagascar vanilla · cream base',
      desc: 'Slow-churned gelato made from cream and split Madagascar pods. Two scoops in a porcelain cup.',
      price: 6.5, unit: 'two scoops',
      img: u(POOL.icecream),
      badges: [],
      allergens: 'Dairy.',
    },
    {
      id: 'gelato-pistachio',
      cat: 'icecream',
      name: 'Pistachio',
      tagline: 'Bronte pistachio',
      desc: 'Sicilian Bronte pistachios, ground in-house, folded into a silken gelato base.',
      price: 7.5, unit: 'two scoops',
      img: u(POOL.icecream),
      badges: ['Signature'],
      allergens: 'Dairy, pistachio.',
    },
    {
      id: 'gelato-caramel',
      cat: 'icecream',
      name: 'Salted Caramel',
      tagline: 'Burnt caramel · Maldon',
      desc: 'Caramelised sugar pushed to the edge of bitter, set with cream and finished with a pinch of Maldon flakes.',
      price: 7.0, unit: 'two scoops',
      img: u(POOL.icecream),
      badges: ['Popular'],
      allergens: 'Dairy.',
    },
    {
      id: 'gelato-berry',
      cat: 'icecream',
      name: 'Wild Berry Sorbet',
      tagline: 'Dairy-free · seasonal',
      desc: 'Sorbet of wild berries pressed through a fine sieve — bright, clean, dairy-free.',
      price: 6.5, unit: 'two scoops',
      img: u(POOL.icecream),
      badges: ['Seasonal'],
      allergens: 'None of the eight common allergens.',
    },

    // ───────────────── COFFEE & DRINKS ─────────────────
    {
      id: 'espresso',
      cat: 'drinks',
      name: 'Espresso',
      tagline: 'Single origin · house roast',
      desc: 'A short, balanced pour from our rotating single-origin lots. Notes lean toward cocoa and toasted hazelnut.',
      price: 3.75, unit: 'short',
      img: u(POOL.espresso),
      badges: [],
      allergens: 'None.',
    },
    {
      id: 'cappuccino',
      cat: 'drinks',
      name: 'Cappuccino',
      tagline: 'Espresso · steamed milk',
      desc: 'Equal espresso, steamed milk and microfoam — served traditionally, no flavour syrups.',
      price: 5.0, unit: '6 oz',
      img: u(POOL.cappuccino),
      badges: ['Popular'],
      allergens: 'Dairy.',
    },
    {
      id: 'latte',
      cat: 'drinks',
      name: 'Latte',
      tagline: 'Espresso · steamed milk',
      desc: 'A longer pour with velvet microfoam. Plant milks available on request.',
      price: 5.5, unit: '8 oz',
      img: u(POOL.latte),
      badges: [],
      allergens: 'Dairy.',
    },
    {
      id: 'flat-white',
      cat: 'drinks',
      name: 'Flat White',
      tagline: 'Double ristretto · steamed milk',
      desc: 'Double ristretto under a thin layer of silky microfoam. Strong but smooth.',
      price: 5.25, unit: '6 oz',
      img: u(POOL.flatwhite),
      badges: [],
      allergens: 'Dairy.',
    },
    {
      id: 'hot-chocolate',
      cat: 'drinks',
      name: 'European Hot Chocolate',
      tagline: '70% Valrhona · cream',
      desc: 'Thick European-style hot chocolate from 70% Valrhona, finished with lightly whipped cream.',
      price: 6.5, unit: '6 oz',
      img: u(POOL.chocolate),
      badges: ['Seasonal'],
      allergens: 'Dairy, cocoa.',
    },
    {
      id: 'tea',
      cat: 'drinks',
      name: 'Loose-leaf Tea',
      tagline: 'Six varieties',
      desc: 'A rotating selection of loose-leaf teas — Earl Grey, oolong, sencha, chamomile, peppermint, rooibos.',
      price: 5.0, unit: 'pot',
      img: u(POOL.tea),
      badges: [],
      allergens: 'None.',
    },

    // ───────────────── SEASONAL ─────────────────
    {
      id: 'pumpkin',
      cat: 'seasonal',
      name: 'Pumpkin Honey Cake',
      tagline: 'Roasted pumpkin · honey · spice',
      desc: 'A seasonal twist on Medovik — roasted pumpkin folded into the layers, scented with cassia and clove.',
      price: 60, unit: 'whole · 1.1 kg',
      img: u(POOL.pumpkin),
      badges: ['Seasonal', 'Pre-order'],
      allergens: 'Wheat, dairy, eggs, honey.',
    },
    {
      id: 'berry-tart',
      cat: 'seasonal',
      name: 'Summer Berry Tart',
      tagline: 'Almond crust · vanilla cream',
      desc: 'Sablé Breton with almond, vanilla diplomat cream and a glossy crown of summer berries.',
      price: 48, unit: 'whole · 0.9 kg',
      img: u(POOL.berrytart),
      badges: ['Seasonal'],
      allergens: 'Wheat, dairy, eggs, almond.',
    },
  ];

  const categories = [
    { id: 'all', label: 'Everything', count: items.length },
    { id: 'cakes', label: 'Cakes', count: items.filter(i => i.cat === 'cakes').length },
    { id: 'desserts', label: 'Individual desserts', count: items.filter(i => i.cat === 'desserts').length },
    { id: 'cookies', label: 'Cookies', count: items.filter(i => i.cat === 'cookies').length },
    { id: 'icecream', label: 'Ice cream', count: items.filter(i => i.cat === 'icecream').length },
    { id: 'drinks', label: 'Coffee & drinks', count: items.filter(i => i.cat === 'drinks').length },
    { id: 'seasonal', label: 'Seasonal specials', count: items.filter(i => i.cat === 'seasonal').length },
  ];

  return { items, categories, byId: id => items.find(i => i.id === id) };
})();

// ─────────────────────────────────────────────────────────────
// JOURNAL — recipe stories, kitchen notes, openings
// ─────────────────────────────────────────────────────────────
const DELICIA_ARTICLES = (function () {
  const u = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
  return [
    {
      id: 'why-medovik',
      cat: 'Recipe stories',
      title: 'Why our Medovik rests for thirty-six hours',
      excerpt: 'A short essay on patience, sour cream, and the particular alchemy that turns fourteen layers of biscuit into the softest cake we know.',
      author: 'Olena Kovalenko',
      date: 'May 14, 2026',
      readMin: 6,
      img: u('1578985545062-69928b1d9587'),
      body: 'There is a moment, somewhere around hour twenty-eight, when a Medovik decides what it is going to be. We build it on a Wednesday afternoon — fourteen biscuit layers, still warm enough to drink in the sour cream, set with a quiet pour of cream beaten only to soft peaks. Then we cover it, put it in the cold room, and we leave it alone. By Friday morning, the biscuits no longer hold themselves apart from the cream. They have settled into one another. The cake has become a single soft thing — somewhere between sponge and custard, with the honey reading first on the tongue and the dairy following just after. That is the cake we sell. It is also the reason we ask for forty-eight hours.',
    },
    {
      id: 'opening-day',
      cat: 'Café notes',
      title: 'A note from opening week',
      excerpt: 'Two years of small steps, one big morning. What it actually felt like to unlock the door for the first time and watch a queue form.',
      author: 'Andrii Kovalenko',
      date: 'April 28, 2026',
      readMin: 4,
      img: u('1554118811-1e0d58224f24'),
      body: 'There were three people waiting when I unlocked the door at 8:02 — late, sorry, because the espresso machine had needed five extra minutes to come up to temperature. By 8:30 we had sold seven Medoviks. By eleven we had to bake more shortbread. By two I had to sit down in the back office and breathe for a minute. The room was warm, the music was the right music, the cakes looked the way Olena had imagined they would look behind that glass. We had spent two years getting here. We had imagined it most evenings. And then it happened, and then it kept happening, and at some point in the afternoon I realised I had been smiling like a fool for hours.',
    },
    {
      id: 'sourcing-honey',
      cat: 'Suppliers',
      title: 'The Caledon hive that makes our cakes possible',
      excerpt: 'How we ended up working with a one-woman apiary an hour north of Toronto — and why we have stopped buying honey by the case.',
      author: 'Olena Kovalenko',
      date: 'April 12, 2026',
      readMin: 5,
      img: u('1517433367423-c7e5b0f35086'),
      body: 'We tried supermarket honey for the first three test batches of Medovik. The cake was fine. It was correct. It tasted like sugar and butter. Then a friend gave us a small jar of unfiltered wildflower honey from Borden Park Apiary in Caledon, and we baked a fourth batch, and the cake was a different cake. The honey was bitter at the edges, floral in the middle, complicated. The cake had the same complication now. We drove up the following Saturday to meet Karen, who keeps thirty hives in a field behind a row of apple trees. We have been buying from her every fortnight since.',
    },
    {
      id: 'cake-message',
      cat: 'How-to',
      title: 'How to write a message that fits on a cake',
      excerpt: 'A practical guide — the twenty-eight character rule, the right names, the words that read well from across a room.',
      author: 'Andrii Kovalenko',
      date: 'March 30, 2026',
      readMin: 3,
      img: u('1488477181946-6428a0291777'),
      body: 'Cakes are not Twitter. You have about twenty-eight characters before the message stops reading from across a dining table. “Happy Birthday Mia” works. “Happy 40th, my darling Marie-Hélène” does not. We can fit the second one, but you will be reading it with your nose against the cake. Names go first. The word “happy” is optional. Hearts are usually nicer than the word “love”. We pipe in dark chocolate by default; ask for buttercream if you prefer it softer. If the message is in Ukrainian, Russian or French, paste it exactly as you want it — accents included — and we will copy it letter for letter.',
    },
    {
      id: 'esterhazy-returns',
      cat: 'Seasonal',
      title: 'Esterházy returns, briefly, in October',
      excerpt: 'The almond dacquoise that defeats us most weeks is finally back on the bench. We will make a small number, and only on Wednesdays.',
      author: 'Olena Kovalenko',
      date: 'March 18, 2026',
      readMin: 3,
      img: u('1535141192574-5d4897c12636'),
      body: 'Esterházy is a difficult cake. It is also a beautiful one. We spent most of last spring trying to find a version we were happy serving — and decided, in the end, that we were only happy serving it on Wednesdays, when the kitchen has the time to feather the fondant top by hand. So that is what we are doing. From October 9th, a small number of Esterházy cakes will be available for pre-order, for Wednesday pickup only, until we run out. They will not appear on the menu the rest of the week.',
    },
    {
      id: 'kyiv-cake',
      cat: 'Recipe stories',
      title: 'Three things you might not know about Kyiv cake',
      excerpt: 'It is older than you think, the meringue is the entire point, and the chocolate buttercream should taste of cocoa, not sugar.',
      author: 'Olena Kovalenko',
      date: 'March 02, 2026',
      readMin: 5,
      img: u('1486427944299-d1955d23e34d'),
      body: 'Kyiv cake started as a happy accident in 1956 — a Karl Marx confectionery factory baker forgot to put a sheet of egg whites into the fridge overnight, and by morning the whites had turned into a kind of fermented meringue. They baked it anyway, layered it with hazelnut and chocolate cream, and discovered they had stumbled into one of the most recognisable cakes of the Soviet era. Real Kyiv cake is about the meringue — crisp enough to crack with a knife but airy enough to dissolve on the tongue. The chocolate buttercream should be loose and cocoa-rich, never sweet. Everything else is decoration.',
    },
  ];
})();



/* ===== tweaks-panel.jsx ===== */

// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}



/* ===== components.jsx ===== */
// Shared UI: Nav, Footer, ProductCard, Cart drawer, misc.
// Globals expected: React, DELICIA_DATA


/* ============================================================
   ICONS (tiny, hand-tuned, single-stroke)
   ============================================================ */
const Icon = {
  Bag: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <path d="M5 8h14l-1.2 11.4a1.5 1.5 0 0 1-1.5 1.4H7.7a1.5 1.5 0 0 1-1.5-1.4L5 8Z" />
      <path d="M9 8V6a3 3 0 1 1 6 0v2" />
    </svg>
  ),
  Plus: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none" {...p}><path d="M5 12h14M12 5v14"/></svg>,
  Minus: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none" {...p}><path d="M5 12h14"/></svg>,
  ArrowR: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  ArrowD: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none" {...p}><path d="M6 9l6 6 6-6"/></svg>,
  Close: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  Pin: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none" {...p}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>,
  Clock: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  Phone: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none" {...p}><path d="M5 4h4l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>,
  Mail: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none" {...p}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 7l9 7 9-7"/></svg>,
  Insta: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>,
  TikTok: (p) => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none" {...p}><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 4a5 5 0 0 0 5 5"/></svg>,
  Menu: (p) => <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none" {...p}><path d="M4 8h16M4 16h16"/></svg>,
};

/* ============================================================
   LOGO — wordmark + tagline lockup
   ============================================================ */
const Wordmark = ({ size = 1, color = 'currentColor', stacked = false }) => (
  <div className="logo-lockup" style={{ color, display: 'flex', flexDirection: stacked ? 'column' : 'row', alignItems: stacked ? 'flex-start' : 'baseline', gap: stacked ? 6 : 14 }}>
    <span className="serif-i" style={{ fontSize: 30 * size, lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
      Delicia
    </span>
    <span style={{
      fontSize: 9.5 * size, letterSpacing: '0.28em', textTransform: 'uppercase',
      borderLeft: stacked ? 'none' : '1px solid currentColor',
      paddingLeft: stacked ? 0 : 12, opacity: 0.8,
      whiteSpace: 'nowrap',
      fontWeight: 500,
    }}>
      Café · Etobicoke
    </span>
  </div>
);

/* ============================================================
   NAV — sticky top bar
   ============================================================ */
const Nav = ({ route, setRoute, cartCount, onOpenCart, onOpenAccount, user, compact = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [megaContent, setMegaContent] = useState(null); // null | 'menu' | 'journal' | 'about'
  const closeTimer = useRef(null);

  useEffect(() => {
    const root = document.querySelector('.app-scroll') || window;
    const onScroll = () => {
      const y = root === window ? window.scrollY : root.scrollTop;
      setScrolled(y > 20);
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMegaContent(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const openMega = (kind) => {
    clearTimeout(closeTimer.current);
    setMegaContent(kind);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaContent(null), 220);
  };

  const links = [
    ['home', 'Home', 'index.html', null],
    ['menu', 'Menu', 'menu.html', 'menu'],
    ['blog', 'Journal', 'blog.html', 'journal'],
    ['about', 'About', 'about.html', 'about'],
    ['visit', 'Visit Us', 'visit.html', null],
  ];

  return (
    <header className={"nav " + (scrolled ? 'nav-scrolled ' : '') + (compact ? 'nav-compact ' : '') + (megaContent ? 'nav-mega-open' : '')}>
      <div className="nav-inner shell">
        <a href="index.html" className="nav-logo">
          <Wordmark size={0.9} />
        </a>
        <nav className="nav-links">
          {links.map(([key, label, href, megaKind]) => (
            <a key={key}
               href={href}
               onMouseEnter={megaKind ? () => openMega(megaKind) : scheduleClose}
               onMouseLeave={scheduleClose}
               className={"nav-link " + (route.name === key || (key === 'cakes' && route.cat === 'cakes') ? 'active' : '')}>
              {label}
              {megaKind && <span className="nav-link-caret">▾</span>}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <AccountButton onOpen={onOpenAccount} user={user} />
          <button className="cart-btn" onClick={onOpenCart} aria-label="Open cart">
            <Icon.Bag />
            {cartCount > 0 && <span className="cart-dot">{cartCount}</span>}
            <span className="cart-label">Order</span>
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <MegaMenu kind={megaContent} onMouseEnter={() => openMega(megaContent)} onMouseLeave={scheduleClose} />

      <style>{`
        .nav {
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(14px);
          background: rgba(239, 231, 214, 0.78);
          border-bottom: 1px solid transparent;
          transition: background .25s ease, border-color .25s ease;
        }
        .nav-scrolled { background: rgba(239, 231, 214, 0.92); border-bottom-color: var(--rule); }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 84px;
        }
        .nav-compact .nav-inner { height: 64px; }
        .nav-logo { cursor: pointer; }
        .nav-links { display: flex; gap: 30px; }
        .nav-link {
          font-size: 12.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 8px 0;
          position: relative;
          color: var(--ink);
          transition: color .2s ease;
          display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--olive); }
        .nav-link.active::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -2px;
          height: 1px; background: var(--ink);
        }
        .nav-link-caret {
          font-size: 9px; transform: translateY(-1px);
          transition: transform .25s ease;
        }
        .nav-mega-open .nav-link-caret { transform: translateY(0) rotate(180deg); }
        .nav-actions { display: flex; gap: 14px; align-items: center; }
        .cart-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 22px;
          border-radius: 999px;
          background: var(--ink); color: var(--paper);
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          position: relative;
          transition: background .2s ease;
        }
        .cart-btn:hover { background: var(--olive); }
        .cart-dot {
          background: var(--paper); color: var(--ink);
          font-size: 10px; font-weight: 600;
          border-radius: 999px;
          min-width: 18px; height: 18px;
          display: grid; place-items: center;
          padding: 0 5px;
        }
        @media (max-width: 880px) {
          .nav-links { display: none; }
          .cart-label { display: none; }
          .cart-btn { padding: 10px 14px; }
        }
      `}</style>
    </header>
  );
};

/* ============================================================
   MEGA MENU — hover panel under Menu / Journal / About
   ============================================================ */
const MegaMenu = ({ kind, onMouseEnter, onMouseLeave }) => {
  if (!DELICIA_DATA) return null;

  const open = !!kind;
  return (
    <>
      <div className={"mm-scrim " + (open ? 'on' : '')} aria-hidden="true" />
      <div className={"mm " + (open ? 'on' : '')}
           onMouseEnter={onMouseEnter}
           onMouseLeave={onMouseLeave}
           role="region" aria-label="Navigation panel">
        <div className="shell mm-grid">
          {kind === 'menu' && <MegaMenuContent />}
          {kind === 'journal' && <MegaJournalContent />}
          {kind === 'about' && <MegaAboutContent />}
        </div>

        <style>{`
          .mm-scrim {
            position: fixed; inset: 84px 0 0; z-index: 49;
            background: rgba(42, 34, 24, 0.25);
            opacity: 0; pointer-events: none;
            transition: opacity .35s ease;
          }
          .mm-scrim.on { opacity: 1; }
          .mm {
            position: absolute; left: 0; right: 0; top: 100%;
            background: var(--bg);
            border-bottom: 1px solid var(--rule);
            box-shadow: 0 30px 60px -30px rgba(74, 53, 32, 0.25);
            z-index: 51;
            opacity: 0; transform: translateY(-12px) scaleY(0.98); transform-origin: top;
            pointer-events: none;
            transition: opacity .3s ease, transform .3s ease;
          }
          .mm.on { opacity: 1; transform: translateY(0) scaleY(1); pointer-events: auto; }
          .mm-grid {
            display: grid;
            grid-template-columns: 1fr 1.8fr;
            gap: 60px;
            padding: 40px 0 50px;
          }
          .mm-grid.three { grid-template-columns: 1fr 1fr 1fr; }

          .mm-cats { display: flex; flex-direction: column; }
          .mm-cat-list { list-style: none; margin-top: 18px; display: flex; flex-direction: column; }
          .mm-cat-link {
            display: flex; align-items: baseline; gap: 14px;
            padding: 12px 0;
            border-bottom: 1px solid var(--rule);
            transition: padding-left .25s ease, color .2s ease;
            cursor: pointer;
          }
          .mm-cat-link:hover { padding-left: 8px; color: var(--olive); }
          .mm-cat-link .mm-cat-count { color: var(--muted); margin-left: auto; }
          .mm-arrow { font-size: 18px; opacity: 0; transition: opacity .2s ease, transform .25s ease; }
          .mm-cat-link:hover .mm-arrow { opacity: 1; transform: translateX(4px); }
          .mm-cta { margin-top: 24px; padding-top: 22px; border-top: 1px solid var(--rule); display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
          .mm-cta-stack { flex-direction: column; align-items: stretch; }
          .mm-cta-stack .btn { width: 100%; }

          .mm-feat-head { display: flex; justify-content: space-between; align-items: baseline; }
          .mm-feat-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
            margin-top: 18px;
          }
          .mm-feat-grid.two { grid-template-columns: repeat(2, 1fr); }
          .mm-feat-card {
            display: flex; flex-direction: column;
            background: var(--paper);
            border: 1px solid var(--rule);
            transition: transform .25s ease, border-color .25s ease;
            overflow: hidden;
          }
          .mm-feat-card:hover { transform: translateY(-2px); border-color: var(--olive); }
          .mm-feat-img { aspect-ratio: 16/10; overflow: hidden; background: var(--cream); }
          .mm-feat-card.tall .mm-feat-img { aspect-ratio: 4/5; }
          .mm-feat-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
          .mm-feat-card:hover .mm-feat-img img { transform: scale(1.04); }
          .mm-feat-body { padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 6px; }
          .mm-feat-meta { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }

          .mm-promo {
            display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 0;
            background: var(--cream);
            margin-top: 24px;
            overflow: hidden;
          }
          .mm-promo-img { aspect-ratio: 4/3; overflow: hidden; background: var(--paper); }
          .mm-promo-img img { width: 100%; height: 100%; object-fit: cover; }
          .mm-promo-body { padding: 20px 24px; display: flex; flex-direction: column; justify-content: center; gap: 8px; }

          @media (max-width: 1000px) {
            .mm { display: none; }
          }
        `}</style>
      </div>
    </>
  );
};

/* Menu content — categories + featured items */
const MegaMenuContent = () => {
  const featured = ['napoleon', 'medovik', 'spartak', 'kyiv', 'macaron', 'cappuccino']
    .map(id => DELICIA_DATA.byId(id)).filter(Boolean);
  const cats = DELICIA_DATA.categories.filter(c => c.id !== 'all');
  return (
    <>
      <div className="mm-cats">
        <span className="eyebrow">Browse the menu</span>
        <ul className="mm-cat-list">
          {cats.map(c => (
            <li key={c.id}>
              <a href={`menu.html?cat=${c.id}`} className="mm-cat-link">
                <span className="serif" style={{ fontSize: 22, lineHeight: 1 }}>{c.label}</span>
                <span className="num mm-cat-count">{c.count}</span>
                <span className="mm-arrow">→</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mm-cta">
          <a href="menu.html" className="btn btn-primary">See the full menu</a>
          <a href="visit.html#contact" className="btn-link">Request a custom cake →</a>
        </div>
      </div>

      <div className="mm-featured">
        <div className="mm-feat-head">
          <span className="eyebrow">From the counter</span>
          <span className="num">Popular this week</span>
        </div>
        <div className="mm-feat-grid">
          {featured.map(it => (
            <a key={it.id} href={`product.html?id=${it.id}`} className="mm-feat-card">
              <div className="mm-feat-img"><img src={it.img} alt={it.name} loading="lazy" /></div>
              <div className="mm-feat-body">
                <h5 className="serif" style={{ fontSize: 17, lineHeight: 1.15 }}>{it.name}</h5>
                <div className="mm-feat-meta">
                  <span className="serif-i" style={{ fontSize: 14 }}>${it.price.toFixed(2)}</span>
                  {it.badges?.[0] && <span className="num">{it.badges[0]}</span>}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

/* Journal content — categories + 3 latest articles */
const MegaJournalContent = () => {
  const articles = DELICIA_ARTICLES;
  const slugMap = {
    'Recipe stories': 'recipe-stories.html',
    'Café notes': 'cafe-notes.html',
    'Suppliers': 'suppliers-journal.html',
    'How-to': 'how-to.html',
    'Seasonal': 'seasonal.html',
  };
  const cats = [...new Set(articles.map(a => a.cat))].map(c => ({
    id: c,
    label: c,
    href: slugMap[c] || `blog.html?cat=${encodeURIComponent(c)}`,
    count: articles.filter(a => a.cat === c).length,
  }));
  const latest = articles.slice(0, 3);
  return (
    <>
      <div className="mm-cats">
        <span className="eyebrow">By topic</span>
        <ul className="mm-cat-list">
          {cats.map(c => (
            <li key={c.id}>
              <a href={c.href} className="mm-cat-link">
                <span className="serif" style={{ fontSize: 22, lineHeight: 1 }}>{c.label}</span>
                <span className="num mm-cat-count">{c.count}</span>
                <span className="mm-arrow">→</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mm-cta mm-cta-stack">
          <a href="blog.html" className="btn btn-primary">All pieces</a>
          <a href="blog.html#why-medovik" className="btn-link">Read the featured →</a>
        </div>
      </div>

      <div className="mm-featured">
        <div className="mm-feat-head">
          <span className="eyebrow">Recently from the bench</span>
          <span className="num">{articles.length} pieces in the journal</span>
        </div>
        <div className="mm-feat-grid">
          {latest.map(a => (
            <a key={a.id} href={`blog.html#${a.id}`} className="mm-feat-card">
              <div className="mm-feat-img"><img src={a.img} alt={a.title} loading="lazy" /></div>
              <div className="mm-feat-body">
                <span className="num" style={{ fontSize: 9.5 }}>{a.cat} · {a.readMin} min</span>
                <h5 className="serif" style={{ fontSize: 16, lineHeight: 1.2 }}>{a.title}</h5>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

/* About content — slim: founder photos + intro + sublinks */
const MegaAboutContent = () => {
  const subs = [
    { id: 'founders', label: 'The founders' },
    { id: 'process', label: 'How we make it' },
    { id: 'suppliers', label: 'Suppliers we trust' },
    { id: 'mission', label: 'Mission & vision' },
    { id: 'awards', label: 'Awards & recognition' },
    { id: 'heritage', label: 'Recipe heritage' },
  ];
  return (
    <>
      <div className="mm-about-photos">
        <a href="founders.html" className="mm-about-portrait">
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" alt="Olena" onError={(e) => { e.target.src = 'https://i.pravatar.cc/400?img=47'; }} />
          <div className="mm-about-cap"><span className="num">No. 01</span><span className="serif-i" style={{ fontSize: 16 }}>Olena · Pastry</span></div>
        </a>
        <a href="founders.html" className="mm-about-portrait">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Andrii" onError={(e) => { e.target.src = 'https://i.pravatar.cc/400?img=12'; }} />
          <div className="mm-about-cap"><span className="num">No. 02</span><span className="serif-i" style={{ fontSize: 16 }}>Andrii · Coffee</span></div>
        </a>
      </div>
      <div className="mm-about-text">
        <span className="eyebrow">About Cafe Delicia</span>
        <p className="serif" style={{ fontSize: 22, lineHeight: 1.3, letterSpacing: '-0.005em', marginTop: 12, color: 'var(--ink)' }}>
          A small dessert café with <em style={{ color: 'var(--olive)', fontStyle: 'italic' }}>Ukrainian soul</em> — opened in Etobicoke by two pastry geeks who couldn’t find the cakes they grew up with anywhere in Toronto.
        </p>
        <ul className="mm-about-list">
          {subs.map(s => (
            <li key={s.id}><a href={`${s.id}.html`}>{s.label} <span className="mm-arrow">→</span></a></li>
          ))}
        </ul>
        <a href="about.html" className="btn btn-primary" style={{ marginTop: 18, alignSelf: 'flex-start' }}>Read the full story</a>
      </div>
      <style>{`
        .mm-about-photos { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-content: start; }
        .mm-about-portrait { display: flex; flex-direction: column; gap: 10px; cursor: pointer; }
        .mm-about-portrait img { width: 100%; aspect-ratio: 3/4; object-fit: cover; background: var(--cream); filter: saturate(0.88); transition: transform .5s cubic-bezier(.2,.7,.2,1); }
        .mm-about-portrait:hover img { transform: scale(1.03); }
        .mm-about-cap { display: flex; flex-direction: column; gap: 2px; }
        .mm-about-text { display: flex; flex-direction: column; }
        .mm-about-list { list-style: none; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--rule); display: grid; grid-template-columns: 1fr 1fr; gap: 4px 24px; }
        .mm-about-list li a { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; font-size: 13px; letter-spacing: 0.04em; color: var(--ink); border-bottom: 1px solid var(--rule); transition: padding-left .2s ease, color .2s ease; }
        .mm-about-list li a:hover { padding-left: 4px; color: var(--olive); }
        .mm-about-list .mm-arrow { font-size: 14px; opacity: 0; transition: opacity .2s ease, transform .25s ease; }
        .mm-about-list li a:hover .mm-arrow { opacity: 1; transform: translateX(3px); }
      `}</style>
    </>
  );
};


/* ============================================================
   ACCOUNT BUTTON — opens drawer rendered at App level
   ============================================================ */
const ACCOUNT_KEY = 'delicia.account.v1';
const AccountButton = ({ onOpen, user }) => (
  <>
    <button className="acct-btn" onClick={onOpen} aria-label="Account">
      <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none">
        <circle cx="12" cy="8" r="4"/><path d="M3 21c1-4 5-6 9-6s8 2 9 6"/>
      </svg>
      {user && <span className="acct-dot" />}
    </button>
    <style>{`
      .acct-btn {
        width: 44px; height: 44px; border-radius: 999px;
        border: 1px solid var(--rule-strong);
        display: grid; place-items: center;
        color: var(--ink); position: relative;
        transition: background .2s ease, color .2s ease, border-color .2s ease;
      }
      .acct-btn:hover { background: var(--ink); color: var(--paper); border-color: var(--ink); }
      .acct-dot {
        position: absolute; top: 8px; right: 8px;
        width: 8px; height: 8px; border-radius: 999px; background: var(--olive);
        box-shadow: 0 0 0 2px var(--bg);
      }
    `}</style>
  </>
);

const AccountDrawer = ({ open, onClose, user, setUser }) => {
  const [mode, setMode] = useState('signin'); // signin | signup | account
  const [form, setForm] = useState({ name: '', email: '' });
  const [sent, setSent] = useState(false);
  const [authError, setAuthError] = useState('');
  const [googleReady, setGoogleReady] = useState(false);

  useEffect(() => {
    if (open) setMode(user ? 'account' : 'signin');
    if (!open) setSent(false);
  }, [open, user]);
  useEffect(() => {
    if (!open || user) return;
    fetch('/api/auth/google/status')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setGoogleReady(Boolean(data?.enabled)))
      .catch(() => setGoogleReady(false));
  }, [open, user]);

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return;
    setAuthError('');
    try {
      await apiPost('/api/auth/email', {
        name: form.name || form.email.split('@')[0],
        email: form.email,
        mode,
      });
      setSent(true);
      setSent(false);
      setUser({ name: form.name || form.email.split('@')[0], email: form.email, provider: 'email' });
      setMode('account');
    } catch (err) {
      setAuthError(err.message || 'Could not send the sign-in link.');
    }
  };

  // Past orders are read from localStorage (cart drawer creates order numbers
  // but doesn't persist a history yet; we read a simple "delicia.orders.v1" list
  // that the cart will start writing to).
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('delicia.orders.v1') || '[]'); }
    catch { return []; }
  });
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'delicia.orders.v1') {
        try { setOrders(JSON.parse(e.newValue || '[]')); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  // Re-read on open
  useEffect(() => {
    if (open) {
      try { setOrders(JSON.parse(localStorage.getItem('delicia.orders.v1') || '[]')); } catch {}
    }
  }, [open]);

  return (
    <>
      <div className={"cart-scrim " + (open ? 'open' : '')} onClick={onClose} />
      <aside className={"acct-drawer " + (open ? 'open' : '')} role="dialog" aria-label="Account">
        <div className="cart-head">
          <div>
            <span className="num">{user ? 'Your Delicia' : 'Sign in'}</span>
            <h3 className="serif" style={{ fontSize: 28, lineHeight: 1, letterSpacing: '-0.01em' }}>
              {user ? `Hello, ${user.name.split(' ')[0]}` : (mode === 'signup' ? 'Create account' : 'Welcome back')}
            </h3>
          </div>
          <button onClick={onClose} className="cart-x"><Icon.Close /></button>
        </div>

        {!user && !sent && (
          <div className="cart-body">
            <div className="acct-toggle">
              <button className={mode === 'signin' ? 'on' : ''} onClick={() => setMode('signin')}>Sign in</button>
              <button className={mode === 'signup' ? 'on' : ''} onClick={() => setMode('signup')}>Create account</button>
            </div>

            {/* Google OAuth */}
            {googleReady && (
              <div className="acct-oauth">
                <button className="oauth-btn" onClick={() => {
                  const next = `${location.pathname}${location.search}${location.hash}`;
                  location.href = `/api/auth/google/start?next=${encodeURIComponent(next)}`;
                }}>
                  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.6 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C40.8 36.1 44 30.6 44 24c0-1.3-.1-2.4-.4-3.5z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>
            )}

            <div className="acct-divider">
              <span>{googleReady ? 'or with email' : 'Sign in with email'}</span>
            </div>

            <form className="acct-form" onSubmit={submit}>
              {mode === 'signup' && (
                <div className="field">
                  <span className="field-label">Your name</span>
                  <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Olena K." required />
                </div>
              )}
              <div className="field">
                <span className="field-label">Email</span>
                <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {mode === 'signin' ? 'Send magic link' : 'Create account & send link'} <Icon.ArrowR />
              </button>
              <p style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.6, marginTop: 4 }}>
                We never set passwords — we email a one-tap sign-in link. {mode === 'signup' && 'By signing up you’ll get our monthly Letters from Delicia.'} See our <a href="#" style={{ borderBottom: '1px solid currentColor' }}>privacy notice</a>.
              </p>
              {authError && <p style={{ fontSize: 12, color: '#9b3d2f', lineHeight: 1.5 }}>{authError}</p>}
            </form>
          </div>
        )}

        {!user && sent && (
          <div className="cart-body acct-sent">
            <span className="serif-i" style={{ fontSize: 80, color: 'var(--olive)', lineHeight: 1, display: 'block' }}>✓</span>
            <h4 className="serif" style={{ fontSize: 26, lineHeight: 1.1, marginTop: 12 }}>Check your inbox.</h4>
            <p style={{ marginTop: 12, color: 'var(--muted)' }}>We’ve sent a link to <span style={{ color: 'var(--ink)' }}>{form.email}</span>. Click it to finish signing in.</p>
            <p className="num" style={{ marginTop: 16 }}>The account is ready on this device.</p>
          </div>
        )}

        {user && (
          <div className="cart-body">
            <div className="acct-meta">
              <div className="acct-meta-row">
                <span className="num">Email</span>
                <span>{user.email}</span>
              </div>
              <div className="acct-meta-row">
                <span className="num">Signed in with</span>
                <span className="serif-i">{user.provider === 'google' ? 'Google' : user.provider === 'apple' ? 'Apple' : 'Magic link'}</span>
              </div>
              <div className="acct-meta-row">
                <span className="num">Member since</span>
                <span className="serif-i">{user.since || new Date().toLocaleString('en-CA', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            <span className="eyebrow" style={{ display: 'block', marginTop: 30, marginBottom: 14 }}>Your orders</span>
            {orders.length === 0 ? (
              <div className="acct-empty">
                <p className="serif-i" style={{ fontSize: 22 }}>Nothing here yet.</p>
                <p style={{ color: 'var(--muted)', marginTop: 6 }}>Once you place your first order it’ll show up here with status, pickup time and receipt.</p>
                <a href="menu.html" className="btn btn-olive" style={{ marginTop: 18 }}>Browse the menu</a>
              </div>
            ) : (
              <ul className="acct-orders">
                {orders.slice().reverse().map(o => (
                  <li key={o.id}>
                    <div>
                      <span className="num">Order #{o.id} · {o.date}</span>
                      <h5 className="serif" style={{ fontSize: 18, marginTop: 2 }}>{o.lines?.length || 0} item(s) · ${(o.total || 0).toFixed(2)}</h5>
                      <span className={"acct-status acct-status-" + (o.status || 'confirmed')}>{o.status || 'Confirmed'}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="acct-foot">
              <a href="visit.html#contact" className="btn-link">Help with an order →</a>
              <button className="btn btn-ghost" onClick={() => { setUser(null); }}>Sign out</button>
            </div>
          </div>
        )}

        <style>{`
          /* Drawer base + open transforms live in styles.css */
          .acct-toggle { display: flex; gap: 0; padding: 4px; background: var(--paper); border-radius: 999px; margin-bottom: 22px; border: 1px solid var(--rule); }
          .acct-toggle button { flex: 1; padding: 10px 14px; border-radius: 999px; font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); transition: all .2s ease; }
          .acct-toggle button.on { background: var(--ink); color: var(--paper); }
          .acct-oauth { display: flex; flex-direction: column; gap: 10px; }
          .oauth-btn {
            width: 100%;
            display: inline-flex; align-items: center; justify-content: center; gap: 12px;
            padding: 14px 22px;
            border-radius: 999px;
            background: var(--paper);
            border: 1px solid var(--rule-strong);
            font-size: 13.5px; letter-spacing: 0.02em; font-weight: 500;
            color: var(--ink);
            transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
          }
          .oauth-btn:hover { background: var(--bg); border-color: var(--ink); transform: translateY(-1px); }
          .oauth-apple { background: var(--ink); color: var(--paper); border-color: var(--ink); }
          .oauth-apple:hover { background: #000; color: var(--paper); border-color: #000; }
          .acct-divider {
            display: flex; align-items: center; gap: 14px;
            margin: 4px 0;
            font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted);
          }
          .acct-divider::before, .acct-divider::after {
            content: ''; flex: 1; height: 1px; background: var(--rule);
          }
          .acct-form { display: flex; flex-direction: column; gap: 22px; }
          .acct-sent { padding-top: 30px; }
          .acct-meta { background: var(--paper); padding: 22px; }
          .acct-meta-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--rule); font-size: 14px; }
          .acct-meta-row:last-child { border-bottom: 0; }
          .acct-empty { padding: 32px 20px; background: var(--paper); text-align: left; }
          .acct-orders { list-style: none; display: flex; flex-direction: column; gap: 0; }
          .acct-orders li { padding: 16px 0; border-bottom: 1px solid var(--rule); }
          .acct-status { font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; display: inline-block; margin-top: 6px; }
          .acct-status-confirmed { background: var(--cream); color: var(--brown); }
          .acct-status-ready { background: var(--olive); color: var(--paper); }
          .acct-status-picked-up { background: transparent; border: 1px solid var(--rule-strong); color: var(--muted); }
          .acct-foot { margin-top: 30px; padding-top: 24px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        `}</style>
      </aside>
    </>
  );
};


/* ============================================================
   PRODUCT CARD — magazine-leaning
   ============================================================ */
const ProductCard = ({ item, index, onOpen, onAdd, variant = 'tall' }) => {
  if (variant === 'editorial') {
    // image left, text right with numbered tag
    return (
      <article className="pc-editorial" onClick={() => onOpen(item)}>
        <div className="pc-e-img"><img src={item.img} alt={item.name} loading="lazy" /></div>
        <div className="pc-e-body">
          <div className="pc-e-meta">
            <span className="num">{String(index + 1).padStart(2, '0')}</span>
            <span className="eyebrow">{categoryLabel(item.cat)}</span>
          </div>
          <h3 className="serif" style={{ fontSize: 38, lineHeight: 1, letterSpacing: '-0.01em' }}>{item.name}</h3>
          <p className="pc-e-tag">{item.tagline}</p>
          <div className="pc-e-foot">
            <span className="serif-i" style={{ fontSize: 22 }}>${item.price.toFixed(2)}</span>
            <span className="num">· {item.unit}</span>
            <button className="btn-link" onClick={(e) => { e.stopPropagation(); onAdd(item); }} style={{ marginLeft: 'auto' }}>Add to order →</button>
          </div>
        </div>
        <style>{`
          .pc-editorial {
            display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 32px;
            padding: 28px 0; border-top: 1px solid var(--rule);
            cursor: pointer;
            transition: background .25s ease;
          }
          .pc-editorial:hover { background: rgba(232, 221, 196, 0.25); }
          .pc-e-img { aspect-ratio: 4/3; overflow: hidden; background: var(--cream); }
          .pc-e-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.7,.2,1); }
          .pc-editorial:hover .pc-e-img img { transform: scale(1.04); }
          .pc-e-body { padding-right: 16px; align-self: center; display: flex; flex-direction: column; gap: 14px; }
          .pc-e-meta { display: flex; gap: 14px; align-items: baseline; }
          .pc-e-tag { color: var(--muted); font-size: 14.5px; max-width: 46ch; }
          .pc-e-foot { display: flex; align-items: baseline; gap: 10px; padding-top: 10px; border-top: 1px solid var(--rule); }
          @media (max-width: 760px) {
            .pc-editorial { grid-template-columns: 1fr; }
          }
        `}</style>
      </article>
    );
  }

  // default: tall card
  return (
    <article className="pc" onClick={() => onOpen(item)}>
      <div className="pc-img">
        <img src={item.img} alt={item.name} loading="lazy" />
        {item.badges?.length > 0 && (
          <div className="pc-badges">
            {item.badges.map(b => (
              <span key={b} className={"badge " + (b === 'Signature' ? 'badge-olive' : b === 'Seasonal' ? 'badge-cream' : 'badge-outline')}>{b}</span>
            ))}
          </div>
        )}
        <button className="pc-add" onClick={(e) => { e.stopPropagation(); onAdd(item); }} aria-label={`Add ${item.name}`}>
          <Icon.Plus />
        </button>
      </div>
      <div className="pc-body">
        <div className="pc-row">
          <h3 className="serif" style={{ fontSize: 26, lineHeight: 1.05 }}>{item.name}</h3>
          <span className="serif-i" style={{ fontSize: 18 }}>${item.price.toFixed(2)}</span>
        </div>
        <p className="pc-tag">{item.tagline}</p>
        <span className="num">{item.unit}</span>
      </div>
      <style>{`
        .pc {
          background: var(--paper);
          cursor: pointer;
          transition: transform .35s ease, box-shadow .35s ease;
          display: flex; flex-direction: column;
        }
        .pc:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
        .pc-img {
          position: relative;
          aspect-ratio: 4/5;
          background: var(--cream);
          overflow: hidden;
        }
        .pc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.7,.2,1); }
        .pc:hover .pc-img img { transform: scale(1.05); }
        .pc-badges { position: absolute; top: 14px; left: 14px; display: flex; gap: 6px; }
        .pc-add {
          position: absolute; bottom: 14px; right: 14px;
          width: 44px; height: 44px;
          background: var(--paper); color: var(--ink);
          border-radius: 999px;
          display: grid; place-items: center;
          box-shadow: 0 8px 22px -10px rgba(0,0,0,.3);
          transition: background .2s ease, color .2s ease, transform .2s ease;
        }
        .pc-add:hover { background: var(--olive); color: var(--paper); transform: scale(1.05); }
        .pc-body { padding: 18px 4px 6px; display: flex; flex-direction: column; gap: 6px; }
        .pc-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .pc-tag { color: var(--muted); font-size: 13.5px; }
      `}</style>
    </article>
  );
};

function categoryLabel(cat) {
  return DELICIA_DATA.categories.find(c => c.id === cat)?.label ?? cat;
}

/* ============================================================
   CART DRAWER
   ============================================================ */
const CartDrawer = ({ open, onClose, cart, setCart, setRoute }) => {
  const [step, setStep] = useState('cart'); // cart | details | confirm | sent
  const [orderNum] = useState(() => Math.floor(Math.random() * 9000 + 1000));
  const [details, setDetails] = useState({ name: '', phone: '', email: '', date: '', window: '11–12 AM', notes: '' });
  const [orderError, setOrderError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { if (!open) setStep(s => s === 'sent' ? 'cart' : s); }, [open]);

  const subtotal = cart.reduce((s, l) => s + l.item.price * l.qty, 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const updateQty = (id, delta) => {
    setCart(c => c.map(l => l.item.id === id ? { ...l, qty: Math.max(0, l.qty + delta) } : l).filter(l => l.qty > 0));
  };
  const removeLine = (id) => setCart(c => c.filter(l => l.item.id !== id));
  const updateDetails = (key, value) => setDetails((d) => ({ ...d, [key]: value }));
  const submitOrder = async () => {
    setSubmitting(true);
    setOrderError('');
    try {
      await apiPost('/api/submissions', {
        type: 'order',
        orderNumber: orderNum,
        customer: details,
        items: cart.map(l => ({
          id: l.item.id,
          name: l.item.name,
          qty: l.qty,
          size: l.size || l.item.unit,
          price: l.item.price,
        })),
        subtotal,
        tax,
        total,
      });
      try {
        const orders = JSON.parse(localStorage.getItem('delicia.orders.v1') || '[]');
        const newOrder = {
          id: orderNum,
          date: new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'confirmed',
          lines: cart.map(l => ({ name: l.item.name, qty: l.qty, size: l.size, price: l.item.price })),
          total,
        };
        orders.push(newOrder);
        localStorage.setItem('delicia.orders.v1', JSON.stringify(orders));
      } catch {}
      setStep('sent');
      setTimeout(() => setCart([]), 400);
    } catch (err) {
      setOrderError(err.message || 'Could not place order. Please call the café.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={"cart-scrim " + (open ? 'open' : '')} onClick={onClose} />
      <aside className={"cart-drawer " + (open ? 'open' : '')} role="dialog" aria-label="Your order">
        <div className="cart-head">
          <div>
            <span className="num">Your order</span>
            <h3 className="serif" style={{ fontSize: 30, lineHeight: 1 }}>
              {step === 'cart' ? 'Basket' : step === 'details' ? 'Pickup details' : 'Almost done'}
            </h3>
          </div>
          <button onClick={onClose} className="cart-x" aria-label="Close"><Icon.Close /></button>
        </div>

        <div className="cart-steps">
          <span className={step === 'cart' ? 'on' : ''}>01 · Basket</span>
          <span className={step === 'details' ? 'on' : ''}>02 · Details</span>
          <span className={step === 'confirm' ? 'on' : ''}>03 · Confirm</span>
        </div>

        {step === 'cart' && (
          <div className="cart-body">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <p className="serif-i" style={{ fontSize: 28, lineHeight: 1.1 }}>Your basket is empty.</p>
                <p style={{ color: 'var(--muted)', marginTop: 14 }}>Browse our menu to add a cake, a tray of macarons or a coffee.</p>
                <button className="btn btn-olive" style={{ marginTop: 24 }} onClick={() => { onClose(); setRoute({ name: 'menu' }); }}>View menu</button>
              </div>
            ) : (
              <ul className="cart-list">
                {cart.map(l => (
                  <li key={l.item.id} className="cart-line">
                    <div className="cart-thumb"><img src={l.item.img} alt="" /></div>
                    <div className="cart-mid">
                      <div className="cart-name serif" style={{ fontSize: 19 }}>{l.item.name}</div>
                      <div className="num">{l.size || l.item.unit}</div>
                      <div className="qty" style={{ marginTop: 10 }}>
                        <button onClick={() => updateQty(l.item.id, -1)}><Icon.Minus /></button>
                        <span>{l.qty}</span>
                        <button onClick={() => updateQty(l.item.id, +1)}><Icon.Plus /></button>
                      </div>
                    </div>
                    <div className="cart-right">
                      <div className="serif-i" style={{ fontSize: 18 }}>${(l.item.price * l.qty).toFixed(2)}</div>
                      <button className="cart-remove" onClick={() => removeLine(l.item.id)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 'details' && (
          <div className="cart-body">
            <div className="form-grid">
              <div className="field">
                <span className="field-label">Full name</span>
                <input className="input" placeholder="Olena K." value={details.name} onChange={e => updateDetails('name', e.target.value)} />
              </div>
              <div className="field">
                <span className="field-label">Phone</span>
                <input className="input" placeholder="(416) 000 0000" value={details.phone} onChange={e => updateDetails('phone', e.target.value)} />
              </div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <span className="field-label">Email</span>
                <input className="input" placeholder="hello@example.com" value={details.email} onChange={e => updateDetails('email', e.target.value)} />
              </div>
              <div className="field">
                <span className="field-label">Pickup date</span>
                <input className="input" placeholder="Sat · May 30" value={details.date} onChange={e => updateDetails('date', e.target.value)} />
              </div>
              <div className="field">
                <span className="field-label">Time window</span>
                <select className="select" value={details.window} onChange={e => updateDetails('window', e.target.value)}>
                  <option>10–11 AM</option>
                  <option>11–12 AM</option>
                  <option>12–1 PM</option>
                  <option>1–2 PM</option>
                  <option>2–3 PM</option>
                </select>
              </div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <span className="field-label">Notes for the kitchen</span>
                <textarea className="textarea" rows="3" placeholder="e.g. ‘Please write Happy Birthday Mia’" value={details.notes} onChange={e => updateDetails('notes', e.target.value)}></textarea>
              </div>
              <div className="cart-note" style={{ gridColumn: '1 / -1' }}>
                <span className="serif-i" style={{ fontSize: 18 }}>A note from us.</span>{' '}
                <span style={{ color: 'var(--muted)' }}>We’ll text or email to confirm your order before we start preparing. Pickup only — Etobicoke, 2456 Bloor St W.</span>
              </div>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="cart-body">
            <div className="confirm-card">
              <span className="num">Order summary</span>
              <h4 className="serif" style={{ fontSize: 26, lineHeight: 1, margin: '8px 0 18px' }}>{details.date || 'Pickup date'} · {details.window} pickup</h4>
              <ul className="confirm-list">
                {cart.map(l => (
                  <li key={l.item.id}>
                    <span>{l.qty} × {l.item.name}</span>
                    <span className="serif-i">${(l.item.price * l.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="rule" style={{ margin: '14px 0' }} />
              <div className="confirm-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="confirm-row"><span>HST (13%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="confirm-row total"><span className="serif">Total</span><span className="serif">${total.toFixed(2)}</span></div>
              <div className="cart-note" style={{ marginTop: 18 }}>
                <span className="serif-i" style={{ fontSize: 17 }}>Payment on pickup.</span>{' '}
                <span style={{ color: 'var(--muted)' }}>We’ll send a confirmation message. Cards and tap accepted at the café.</span>
              </div>
            </div>
          </div>
        )}

        {step === 'sent' && (
          <div className="cart-body cart-sent">
            <span className="serif-i" style={{ fontSize: 96, color: 'var(--olive)', lineHeight: 1, display: 'block' }}>✓</span>
            <h4 className="serif" style={{ fontSize: 30, lineHeight: 1.05, marginTop: 14, letterSpacing: '-0.01em' }}>We’ve got your order.</h4>
            <p style={{ color: 'var(--muted)', marginTop: 14, lineHeight: 1.65, maxWidth: '36ch' }}>
              We’ll text you within the hour to confirm timing. Pickup is at the café — <span style={{ color: 'var(--ink)' }}>2456 Bloor St W, Etobicoke</span>. Payment on collection.
            </p>
            <div className="rule" style={{ margin: '24px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="num">Order number</span>
              <span className="serif-i" style={{ fontSize: 22 }}>#{orderNum}</span>
            </div>
            <p style={{ marginTop: 14, fontSize: 12.5, color: 'var(--muted)' }}>A receipt is on its way to your inbox.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30 }}>
              <button className="btn btn-olive" onClick={() => { onClose(); }}>Back to browsing</button>
              <a className="btn-link" href="visit.html">Get directions →</a>
            </div>
            <style>{`.cart-sent { padding: 24px 28px 60px; }`}</style>
          </div>
        )}

        {cart.length > 0 && step !== 'sent' && (
          <div className="cart-foot">
            <div className="cart-totals">
              <span className="num">Subtotal</span>
              <span className="serif-i" style={{ fontSize: 22 }}>${subtotal.toFixed(2)}</span>
            </div>
            {step === 'cart' && (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setStep('details')}>
                Continue · pickup details <Icon.ArrowR />
              </button>
            )}
            {step === 'details' && (
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-ghost" onClick={() => setStep('cart')}>Back</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep('confirm')} disabled={!details.name || (!details.phone && !details.email) || !details.date}>Review order <Icon.ArrowR /></button>
              </div>
            )}
            {step === 'confirm' && (
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-ghost" onClick={() => setStep('details')}>Back</button>
                <button className="btn btn-olive" style={{ flex: 1 }} onClick={submitOrder} disabled={submitting}>
                  {submitting ? 'Placing...' : <>Place order <Icon.ArrowR /></>}
                </button>
              </div>
            )}
            {orderError && <p style={{ marginTop: 12, color: '#9b3d2f', fontSize: 12 }}>{orderError}</p>}
            <p className="cart-micro">We’ll confirm your order details before preparation.</p>
          </div>
        )}

        <style>{`
          /* Drawer base + open transforms live in styles.css */
          .cart-fill {
            /* cart-drawer fill content shim — actual layout below */
          }
          .cart-head { display: flex; justify-content: space-between; align-items: flex-start; padding: 28px 28px 18px; }
          .cart-x { width: 36px; height: 36px; border-radius: 999px; display: grid; place-items: center; border: 1px solid var(--rule-strong); }
          .cart-x:hover { background: var(--ink); color: var(--paper); }
          .cart-steps { display: flex; gap: 18px; padding: 0 28px 18px; border-bottom: 1px solid var(--rule); }
          .cart-steps span { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
          .cart-steps span.on { color: var(--ink); }
          .cart-body { flex: 1; overflow-y: auto; padding: 24px 28px; }
          .cart-empty { padding: 40px 0; text-align: left; }
          .cart-list { list-style: none; display: flex; flex-direction: column; gap: 22px; }
          .cart-line { display: grid; grid-template-columns: 88px 1fr auto; gap: 16px; align-items: flex-start; }
          .cart-thumb { aspect-ratio: 1; overflow: hidden; background: var(--cream); }
          .cart-thumb img { width: 100%; height: 100%; object-fit: cover; }
          .cart-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
          .cart-remove { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
          .cart-remove:hover { color: var(--olive); }
          .cart-foot { padding: 18px 28px 26px; border-top: 1px solid var(--rule); background: var(--bg); }
          .cart-totals { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
          .cart-micro { font-size: 11px; color: var(--muted); margin-top: 12px; text-align: center; letter-spacing: 0.02em; }
          .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px 18px; }
          .cart-note { padding: 14px 16px; background: var(--cream); border-radius: 2px; font-size: 13.5px; }
          .confirm-card { background: var(--paper); padding: 22px; }
          .confirm-list { list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
          .confirm-list li { display: flex; justify-content: space-between; }
          .confirm-row { display: flex; justify-content: space-between; font-size: 13.5px; padding: 4px 0; color: var(--muted); }
          .confirm-row.total { font-size: 22px; color: var(--ink); padding-top: 14px; }
          @media (max-width: 540px) {
            .form-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </aside>
    </>
  );
};

/* ============================================================
   FOOTER
   ============================================================ */
const Footer = ({ setRoute }) => (
  <footer className="ft">
    <div className="ft-top shell">
      <div className="ft-brand">
        <Wordmark size={1.4} stacked />
        <p className="ft-blurb">A small European dessert café with Ukrainian soul — coffee, cakes and slow moments in Etobicoke.</p>
        <div className="ft-social">
          <a className="ft-soc" href="#"><Icon.Insta /></a>
          <a className="ft-soc" href="#"><Icon.TikTok /></a>
          <a className="ft-soc" href="#"><Icon.Mail /></a>
        </div>
      </div>

      <div className="ft-col">
        <span className="eyebrow">Visit</span>
        <p className="serif" style={{ fontSize: 22, lineHeight: 1.2, marginTop: 12 }}>2456 Bloor Street West<br/>Etobicoke, ON M8X 1A8</p>
        <p className="num" style={{ marginTop: 8 }}>Tue – Sun · 8 AM – 8 PM</p>
        <p className="num">Closed Mondays</p>
      </div>

      <div className="ft-col">
        <span className="eyebrow">Menu</span>
        <ul className="ft-list">
          <li><a href="menu.html?cat=cakes">Cakes</a></li>
          <li><a href="menu.html?cat=desserts">Individual desserts</a></li>
          <li><a href="menu.html?cat=cookies">Cookies</a></li>
          <li><a href="menu.html?cat=icecream">Ice cream</a></li>
          <li><a href="menu.html?cat=drinks">Coffee & drinks</a></li>
          <li><a href="menu.html?cat=seasonal">Seasonal</a></li>
        </ul>
      </div>

      <div className="ft-col">
        <span className="eyebrow">Café</span>
        <ul className="ft-list">
          <li><a href="about.html">About</a></li>
          <li><a href="blog.html">Journal</a></li>
          <li><a href="visit.html">Visit Us</a></li>
          <li><a href="visit.html#contact">Contact</a></li>
          <li><a href="visit.html#corporate">Corporate orders</a></li>
        </ul>
      </div>

      <div className="ft-col ft-newsletter">
        <span className="eyebrow">Letters from Delicia</span>
        <p style={{ fontSize: 14, marginTop: 10, color: 'var(--muted)' }}>Once a month — new seasonal cakes, the day we open, small events.</p>
        <Newsletter />
      </div>
    </div>

    <div className="ft-bot shell">
      <span className="serif-i" style={{ fontSize: 92, lineHeight: 0.85, letterSpacing: '-0.03em' }}>Cafe Delicia</span>
    </div>

    <div className="ft-meta shell">
      <span>© 2026 Cafe Delicia Inc. · Etobicoke, ON</span>
      <span>Made with care · Site by Studio Delicia</span>
    </div>

    <style>{`
      .ft { background: var(--brown); color: var(--cream); padding: 100px 0 30px; margin-top: 80px; }
      .ft a, .ft li { color: var(--cream); }
      .ft-top { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr 1.2fr; gap: 56px; padding-bottom: 80px; border-bottom: 1px solid rgba(232,221,196,.18); }
      .ft-blurb { font-size: 14px; opacity: .85; margin-top: 16px; max-width: 32ch; }
      .ft-social { display: flex; gap: 10px; margin-top: 22px; }
      .ft-soc { width: 38px; height: 38px; border-radius: 999px; border: 1px solid rgba(232,221,196,.3); display: grid; place-items: center; transition: background .2s ease, color .2s ease; }
      .ft-soc:hover { background: var(--cream); color: var(--brown); }
      .ft-col .eyebrow { color: var(--cream); opacity: .7; }
      .ft-list { list-style: none; margin-top: 14px; display: flex; flex-direction: column; gap: 8px; font-size: 14.5px; }
      .ft-list a { cursor: pointer; transition: color .2s ease; color: var(--cream); }
      .ft-list a:hover { color: var(--bg); }
      .ft-form { display: flex; gap: 8px; margin-top: 16px; }
      .ft-form .input { border-bottom-color: rgba(232,221,196,.3); color: var(--cream); padding: 10px 0; }
      .ft-form .input::placeholder { color: rgba(232,221,196,.6); }
      .ft-form .btn { padding: 10px 18px; font-size: 11px; background: var(--cream); color: var(--brown); }
      .ft-bot { padding: 40px 0 20px; text-align: center; }
      .ft-bot .serif-i { display: block; color: var(--cream); }
      .ft-meta { display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid rgba(232,221,196,.18); font-size: 12px; opacity: .7; }
      @media (max-width: 980px) {
        .ft-top { grid-template-columns: 1fr 1fr; gap: 40px; }
        .ft-newsletter, .ft-brand { grid-column: 1 / -1; }
        .ft-bot .serif-i { font-size: 48px; }
      }
    `}</style>
  </footer>
);

/* ============================================================
   BREADCRUMBS — semantic + accessible
   ============================================================ */
const Breadcrumbs = ({ items }) => (
  <nav className="crumbs shell" aria-label="Breadcrumb">
    <ol className="crumb-list">
      {items.map((it, i) => (
        <li key={i} className="crumb-item">
          {it.href ? (
            <a href={it.href}>{it.label}</a>
          ) : (
            <span aria-current="page">{it.label}</span>
          )}
          {i < items.length - 1 && <span className="crumb-sep" aria-hidden="true">/</span>}
        </li>
      ))}
    </ol>
    <style>{`
      .crumbs { padding-top: 18px; padding-bottom: 0; }
      .crumb-list { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
      .crumb-item { display: inline-flex; gap: 8px; align-items: center; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
      .crumb-item a { color: var(--muted); transition: color .2s ease; }
      .crumb-item a:hover { color: var(--ink); }
      .crumb-item span[aria-current] { color: var(--ink); }
      .crumb-sep { color: var(--muted); opacity: .5; }
    `}</style>
  </nav>
);


/* ============================================================
   Reusable: numbered section heading
   ============================================================ */
const SecHead = ({ num, eyebrow, title, link, extra }) => (
  <div className="sec-head">
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 30, flex: 1 }}>
      <span className="num" style={{ marginTop: 18 }}>{num}</span>
      <div style={{ flex: 1 }}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 dangerouslySetInnerHTML={{ __html: title }} style={{ marginTop: 8 }} />
      </div>
    </div>
    {(link || extra) && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
        {extra}
        {link && <a className="btn-link" onClick={link.onClick}>{link.label} →</a>}
      </div>
    )}
  </div>
);

/* ============================================================
   Tag pill list
   ============================================================ */
const Pills = ({ items, active, onSelect }) => (
  <div className="pills">
    {items.map(i => (
      <button key={i.id}
              onClick={() => onSelect(i.id)}
              className={"pill " + (active === i.id ? 'on' : '')}>
        <span>{i.label}</span>
        <span className="pill-count">{i.count}</span>
      </button>
    ))}
    <style>{`
      .pills { display: flex; gap: 8px; flex-wrap: wrap; }
      .pill {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--rule-strong);
        font-size: 12.5px; letter-spacing: 0.04em;
        transition: background .2s ease, color .2s ease, border-color .2s ease;
      }
      .pill:hover { border-color: var(--ink); }
      .pill.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
      .pill-count { font-size: 11px; opacity: .6; font-variant-numeric: tabular-nums; }
      .pill.on .pill-count { opacity: .85; }
    `}</style>
  </div>
);


/* ============================================================
   Newsletter — inline success
   ============================================================ */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sent | err

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setStatus('err'); return; }
    setStatus('sending');
    try {
      await apiPost('/api/submissions', { type: 'newsletter', email });
      setStatus('sent');
    } catch {
      setStatus('err');
    }
  };

  if (status === 'sent') {
    return (
      <p className="serif-i" style={{ marginTop: 16, fontSize: 18, color: 'var(--cream)' }}>
        Welcome aboard — see you in the inbox.
      </p>
    );
  }
  return (
    <form className="ft-form" onSubmit={submit} noValidate>
      <input className="input" value={email} onChange={e => { setEmail(e.target.value); if (status === 'err') setStatus('idle'); }}
             placeholder={status === 'err' ? 'Try a real email' : 'Your email'} />
      <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending' : 'Join'}</button>
    </form>
  );
};



/* ===== pages/about-subs.jsx ===== */
// About sub-pages — deeper editorial content per topic.
// Each subpage shares the Nav/Footer chrome via the App router and adds:
//  • Breadcrumbs back to About
//  • Editorial mast (eyebrow + big title + lede)
//  • Several substantial content blocks
//  • "Keep exploring" cross-links to other About subpages

const AboutSubFooter = ({ current, setRoute }) => {
  const subs = [
    { id: 'founders', label: 'The founders', desc: 'Olena & Andrii' },
    { id: 'process', label: 'How we make it', desc: 'Bench to cold room' },
    { id: 'suppliers', label: 'Suppliers we trust', desc: 'From honey to flour' },
    { id: 'mission', label: 'Mission & vision', desc: 'Why Delicia exists' },
    { id: 'awards', label: 'Awards', desc: 'Small list, hard-won' },
    { id: 'heritage', label: 'Recipe heritage', desc: 'Lviv → Toronto' },
  ];
  const others = subs.filter(s => s.id !== current);
  return (
    <section className="sec sub-foot-sec">
      <div className="shell">
        <SecHead num="·" eyebrow="Keep exploring About" title="More from <em>the kitchen.</em>"
                 link={{ label: 'Back to About', onClick: () => setRoute({ name: 'about' }) }} />
        <div className="sub-foot-grid">
          {others.map(s => (
            <a key={s.id} href={`${s.id}.html`} className="sub-foot-card">
              <span className="num">{s.id.toUpperCase()}</span>
              <h4 className="serif" style={{ fontSize: 22, lineHeight: 1.15, marginTop: 8 }}>{s.label}</h4>
              <p style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 6, lineHeight: 1.55 }}>{s.desc}</p>
              <span className="sub-foot-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .sub-foot-sec { background: var(--paper); }
        .sub-foot-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
        .sub-foot-card { background: var(--bg); padding: 28px 24px 56px; position: relative; transition: background .25s ease, color .25s ease; }
        .sub-foot-card:hover { background: var(--olive); color: var(--paper); }
        .sub-foot-card:hover .num, .sub-foot-card:hover p { color: var(--paper); opacity: .85; }
        .sub-foot-arrow { position: absolute; bottom: 20px; right: 22px; font-size: 20px; }
        @media (max-width: 980px) { .sub-foot-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </section>
  );
};

const SubMast = ({ eyebrow, title, lede, vol }) => (
  <section className="sub-mast">
    <div className="shell">
      <div className="sub-mast-meta">
        <span className="num">About · {vol}</span>
        <span className="num">Cafe Delicia · Etobicoke</span>
      </div>
      <span className="eyebrow" style={{ marginTop: 30, display: 'block' }}>{eyebrow}</span>
      <h1 className="serif" style={{
        fontSize: 'clamp(60px, 9vw, 148px)', lineHeight: 0.88, letterSpacing: '-0.03em',
        marginTop: 12, textWrap: 'balance',
      }} dangerouslySetInnerHTML={{ __html: title }} />
      <p className="sub-mast-lede">{lede}</p>
    </div>
    <style>{`
      .sub-mast { padding: 50px 0 70px; }
      .sub-mast-meta { display: flex; justify-content: space-between; gap: 24px; padding-bottom: 14px; border-bottom: 1px solid var(--rule); flex-wrap: wrap; }
      .sub-mast h1 em { font-style: italic; color: var(--olive); }
      .sub-mast-lede { max-width: 60ch; font-size: 17px; line-height: 1.65; color: var(--brown); margin-top: 30px; }
    `}</style>
  </section>
);

const SubCrumbs = ({ here }) => (
  <Breadcrumbs items={[
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: here },
  ]} />
);

/* ───────────────── FOUNDERS ───────────────── */
const AboutFoundersPage = ({ setRoute }) => (
  <main className="fade-in">
    <SubCrumbs here="The founders" />
    <SubMast vol="No. 01 · The founders"
             eyebrow="The kitchen behind the counter"
             title="<em>Olena &amp; Andrii.</em><br/>The two people behind every cake."
             lede="We met in a small pastry kitchen in Lviv in 2011. We moved to Canada in 2014 — Olena to keep baking, Andrii to learn coffee. Delicia is what happens when those two stubbornnesses meet, in a small storefront on Bloor West." />

    {/* Side-by-side founder profiles */}
    <section className="sec">
      <div className="shell f-grid">
        <article className="f-card">
          <div className="f-photo"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=85" alt="Olena" onError={(e) => { e.target.src = 'https://i.pravatar.cc/900?img=47'; }} /></div>
          <div className="f-body">
            <span className="num">No. 01</span>
            <h2 className="serif" style={{ fontSize: 48, lineHeight: 0.95, letterSpacing: '-0.02em', marginTop: 8 }}>Olena Kovalenko</h2>
            <p className="serif-i" style={{ fontSize: 22, color: 'var(--olive)', marginTop: 4 }}>Co-founder &amp; head of pastry</p>
            <div className="f-meta">
              <div><span className="num">From</span><span>Lviv, Ukraine</span></div>
              <div><span className="num">In Canada since</span><span>2014</span></div>
              <div><span className="num">Trained at</span><span>Lviv Confectionery School</span></div>
              <div><span className="num">Favourite cake</span><span className="serif-i">Esterházy</span></div>
            </div>
            <div className="f-bio">
              <p>Olena grew up in a household where Sundays smelled of honey, butter and lemon zest. Her grandmother — Lyudmila — kept four cake recipes written on the inside cover of a 1962 cookbook, and Olena learned them before she learned to ride a bicycle.</p>
              <p>She trained formally at the Lviv Confectionery School, worked in two small bakeries in central Lviv, and brought a battered suitcase of recipes (and one specific rolling pin) with her when she moved to Toronto. The recipes have been refined over a decade of Canadian pantry ingredients and seasonal Ontario fruit. The rolling pin is still in the kitchen.</p>
              <p>Olena handles every whole-cake order personally. If you ordered a Medovik for a birthday, she made it.</p>
            </div>
          </div>
        </article>

        <article className="f-card f-andrii">
          <div className="f-photo"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85" alt="Andrii" onError={(e) => { e.target.src = 'https://i.pravatar.cc/900?img=12'; }} /></div>
          <div className="f-body">
            <span className="num">No. 02</span>
            <h2 className="serif" style={{ fontSize: 48, lineHeight: 0.95, letterSpacing: '-0.02em', marginTop: 8 }}>Andrii Kovalenko</h2>
            <p className="serif-i" style={{ fontSize: 22, color: 'var(--olive)', marginTop: 4 }}>Co-founder &amp; head of coffee</p>
            <div className="f-meta">
              <div><span className="num">From</span><span>Kyiv, Ukraine</span></div>
              <div><span className="num">In Canada since</span><span>2014</span></div>
              <div><span className="num">Trained at</span><span>SCA Q-grader, 2019</span></div>
              <div><span className="num">Drink of choice</span><span className="serif-i">Flat white</span></div>
            </div>
            <div className="f-bio">
              <p>Andrii didn’t come to coffee until his late twenties. He spent his first Canadian years working in restaurant front-of-house — Toronto’s Queen West, then King East — and discovered specialty coffee the way most people discover it: by accident, in a tiny shop on Ossington, where the espresso changed his mind about a thing he thought he understood.</p>
              <p>He earned his Q-grader certification through the Specialty Coffee Association in 2019 and has been roasting at home for five years. At Delicia he cups every lot we put on the menu, builds the rotating single-origin program, and pulls the first espresso of every morning shift.</p>
              <p>He also does the books. Olena likes the books less.</p>
            </div>
          </div>
        </article>
      </div>

      <style>{`
        .f-grid { display: grid; grid-template-columns: 1fr; gap: 80px; }
        .f-card { display: grid; grid-template-columns: 0.85fr 1fr; gap: 50px; align-items: start; }
        .f-card.f-andrii { grid-template-columns: 1fr 0.85fr; }
        .f-card.f-andrii .f-photo { order: 2; }
        .f-photo { aspect-ratio: 3/4; overflow: hidden; background: var(--cream); }
        .f-photo img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.88); }
        .f-meta { margin-top: 26px; padding-top: 20px; border-top: 1px solid var(--rule); display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
        .f-meta > div { display: flex; flex-direction: column; gap: 2px; font-size: 14px; }
        .f-bio { margin-top: 28px; display: flex; flex-direction: column; gap: 14px; font-size: 15.5px; line-height: 1.7; color: var(--brown); max-width: 56ch; }
        @media (max-width: 880px) {
          .f-card, .f-card.f-andrii { grid-template-columns: 1fr; gap: 24px; }
          .f-card.f-andrii .f-photo { order: 0; }
        }
      `}</style>
    </section>

    {/* Pull quote together */}
    <section className="sec quote-sec">
      <div className="shell">
        <p className="serif" style={{ fontSize: 'var(--display-m)', lineHeight: 1.05, letterSpacing: '-0.02em', textAlign: 'center', textWrap: 'balance', maxWidth: 1000, margin: '0 auto' }}>
          “We didn’t build a café to scale. We built one to <em style={{ color: 'var(--olive)' }}>stand in</em>, every morning, and still want to be there in the afternoon.”
        </p>
        <p style={{ textAlign: 'center', marginTop: 28, color: 'var(--muted)' }}>— Olena &amp; Andrii</p>
      </div>
      <style>{`
        .quote-sec { background: var(--cream); padding: 100px 0; }
      `}</style>
    </section>

    {/* Timeline */}
    <section className="sec">
      <div className="shell">
        <SecHead num="·" eyebrow="A short history" title="How we got <em>here.</em>" />
        <ol className="timeline">
          {[
            ['2011', 'Olena starts in a small Lviv kitchen', 'A six-table café on Krakivska Street. Two desserts on the menu. Olena was hired to roll laminated dough by hand.'],
            ['2013', 'Andrii leaves Kyiv for restaurant work in Lviv', 'They meet at a pre-opening tasting. Olena was making Napoleon. Andrii ate four slices.'],
            ['2014', 'Both move to Toronto', 'Initially separately, two months apart. Both surprised to find each other in the same city. They get married in 2016.'],
            ['2017', 'Olena launches Delicia from a home kitchen', 'Six clients on Sundays. Cakes built on the dining table. Word of mouth on Bloor West.'],
            ['2019', 'Andrii earns his Q-grader certification', 'Coffee suddenly stops being a hobby. The Medovik gets a worthy partner.'],
            ['2022', 'Two-year build-out of the Bloor West storefront begins', 'Eight contractors. Three winters. The espresso machine arrives via container before the floors are laid.'],
            ['2026', 'Cafe Delicia opens', 'You’re here. So are we.'],
          ].map(([year, t, d]) => (
            <li key={year}>
              <div className="t-year"><span className="serif-i">{year}</span></div>
              <div className="t-body">
                <h4 className="serif" style={{ fontSize: 22, lineHeight: 1.2 }}>{t}</h4>
                <p style={{ color: 'var(--muted)', fontSize: 14.5, marginTop: 6, lineHeight: 1.6 }}>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <style>{`
        .timeline { list-style: none; display: flex; flex-direction: column; }
        .timeline li { display: grid; grid-template-columns: 140px 1fr; gap: 40px; padding: 26px 0; border-bottom: 1px solid var(--rule); }
        .t-year { color: var(--olive); font-size: 36px; line-height: 1; padding-top: 4px; }
        .t-body { max-width: 60ch; }
        @media (max-width: 760px) {
          .timeline li { grid-template-columns: 80px 1fr; gap: 20px; }
          .t-year { font-size: 28px; }
        }
      `}</style>
    </section>

    <AboutSubFooter current="founders" setRoute={setRoute} />
    <Footer setRoute={setRoute} />
  </main>
);

/* ───────────────── PROCESS ───────────────── */
const AboutProcessPage = ({ setRoute }) => (
  <main className="fade-in">
    <SubCrumbs here="How we make it" />
    <SubMast vol="No. 02 · How we make it"
             eyebrow="From the bench"
             title="A cake <em>takes thirty-six hours</em>. Here’s where they go."
             lede="Most of what we make rests. Doughs relax overnight, syrups soak, creams settle. This isn’t a marketing line — it’s the reason we can’t do same-day cake orders, and it’s the reason the cakes taste the way they do." />

    {/* Detailed 4 steps */}
    <section className="sec">
      <div className="shell">
        {[
          {
            n: '01', title: 'Whisk the honey', time: 'Day 1 · morning · 0:00–0:20',
            img: '1517433367423-c7e5b0f35086',
            body: 'Wildflower honey from Borden Park Apiary, warmed slowly with cultured Stirling butter and pasture eggs over a bain-marie until it loosens and the sugar dissolves. Twelve to fifteen minutes. The mixture should look like polished caramel and smell faintly floral.',
            note: 'We weigh everything to the gram. The same recipe written for a home cook in cups won’t survive a commercial kitchen — the ratios shift just enough to ruin a layer.',
          },
          {
            n: '02', title: 'Roll the layers', time: 'Day 1 · 0:20–4:00',
            img: '1559925393-8be0ec4767c8',
            body: 'The dough is split into eight, rolled paper-thin one at a time on a stone counter dusted with flour, cut into ten-inch discs and baked thirty seconds until just gold. Most days we make fourteen layers per cake. The off-cuts get baked again and ground into the cocoa crumb that goes around the outside.',
            note: 'On a humid summer day this takes an extra hour. Dough behaves differently with the weather, and we don’t fight it.',
          },
          {
            n: '03', title: 'Whip the cream', time: 'Day 1 · 4:00–4:30',
            img: '1517433367423-c7e5b0f35086',
            body: 'Cultured sour cream and Stirling heavy cream whipped together with a slow vanilla sugar — Madagascar pods steeped overnight in icing sugar. Soft peaks, never stiff. The cream has to soak into the biscuit layers as the cake rests, and stiff peaks can’t do that.',
            note: 'We don’t pasteurise the sour cream extra — most commercial places do for stability. The slight tang you taste comes from that decision.',
          },
          {
            n: '04', title: 'Build and rest', time: 'Day 1 · 4:30 → Day 2 · 18:00+',
            img: '1578985545062-69928b1d9587',
            body: 'Built tall, on a board, in the cold room. Covered with a damp cloth and left for at least eighteen hours — ideally twenty-four. The biscuit and the cream stop being two separate things and become one cake. We don’t glaze, dust or decorate until just before pickup.',
            note: 'This is the step we can’t shortcut. It’s also why whole cakes need 48 hours notice — we never sell a cake that hasn’t had the full rest.',
          },
        ].map((s, i) => (
          <article key={s.n} className={"p-step " + (i % 2 ? 'p-flip' : '')}>
            <div className="p-img"><img src={`https://images.unsplash.com/photo-${s.img}?auto=format&fit=crop&w=1100&q=80`} alt={s.title} /></div>
            <div className="p-body">
              <div className="p-head">
                <span className="serif-i" style={{ fontSize: 64, color: 'var(--olive)', lineHeight: 0.9 }}>{s.n}</span>
                <span className="num">{s.time}</span>
              </div>
              <h3 className="serif" style={{ fontSize: 38, lineHeight: 0.98, letterSpacing: '-0.01em', marginTop: 14 }}>{s.title}</h3>
              <p className="p-text">{s.body}</p>
              <div className="p-note">
                <span className="serif-i" style={{ fontSize: 18 }}>A note from the kitchen.</span>{' '}
                <span style={{ color: 'var(--brown)' }}>{s.note}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <style>{`
        .p-step { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; padding: 60px 0; border-bottom: 1px solid var(--rule); }
        .p-step:last-child { border-bottom: 0; }
        .p-flip .p-img { order: 2; }
        .p-img { aspect-ratio: 4/5; overflow: hidden; background: var(--cream); }
        .p-img img { width: 100%; height: 100%; object-fit: cover; }
        .p-head { display: flex; justify-content: space-between; align-items: baseline; gap: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--rule); }
        .p-text { margin-top: 22px; color: var(--brown); font-size: 16px; line-height: 1.7; max-width: 50ch; }
        .p-note { margin-top: 22px; padding: 14px 18px; background: var(--cream); font-size: 14px; line-height: 1.6; }
        @media (max-width: 880px) {
          .p-step { grid-template-columns: 1fr; gap: 24px; padding: 32px 0; }
          .p-flip .p-img { order: 0; }
        }
      `}</style>
    </section>

    {/* Process summary */}
    <section className="sec sec-tight" style={{ background: 'var(--cream)' }}>
      <div className="shell" style={{ textAlign: 'center' }}>
        <span className="num">Bench to box</span>
        <h2 className="serif" style={{ fontSize: 'var(--display-m)', lineHeight: 0.95, letterSpacing: '-0.02em', marginTop: 14 }}>
          ~ 36 hours, <em style={{ color: 'var(--olive)' }}>beginning to end.</em>
        </h2>
        <p style={{ maxWidth: 50, marginTop: 18 }}></p>
        <p style={{ maxWidth: '50ch', margin: '18px auto 0', color: 'var(--muted)' }}>
          This is why we ask 48 hours notice for whole cakes. Slices, cookies and coffees are ready when you walk in.
        </p>
        <a href="cakes.html" className="btn btn-olive" style={{ marginTop: 30 }}>See the cakes you can pre-order</a>
      </div>
    </section>

    <AboutSubFooter current="process" setRoute={setRoute} />
    <Footer setRoute={setRoute} />
  </main>
);

/* ───────────────── SUPPLIERS ───────────────── */
const AboutSuppliersPage = ({ setRoute }) => (
  <main className="fade-in">
    <SubCrumbs here="Suppliers we trust" />
    <SubMast vol="No. 03 · Suppliers we trust"
             eyebrow="Where things come from"
             title="A <em>short list</em> of people we buy from."
             lede="We don’t use distributors for anything that ends up in a cake. Every ingredient comes from a supplier we know by name, mostly within a day’s drive of the café. Here’s the full list, in roughly the order we use them in a Medovik." />

    <section className="sec">
      <div className="shell">
        {[
          {
            name: 'Borden Park Apiary',
            kind: 'Honey · wildflower & clover',
            where: 'Caledon, ON · 1 hour north',
            since: 'Since 2024',
            img: '1517433367423-c7e5b0f35086',
            body: 'Karen Borden keeps thirty hives in a field behind a row of apple trees on the Caledon Hills escarpment. Her wildflower lots come in three to four times a year — May, July, September, occasionally October — and they are never the same twice. The flavour shifts with what’s blooming nearby. We buy them all, label them by harvest, and use them in the Medovik in the order they came in.',
          },
          {
            name: 'Stirling Creamery',
            kind: 'Cultured butter & sour cream',
            where: 'Stirling, ON · 2 hours east',
            since: 'Since 2024',
            img: '1517578239113-b03992dcdd25',
            body: 'European-style cultured butter at 84% fat, made in small churns from grass-fed Holstein cream. The cultured sour cream we use in every Russian-tradition cake comes from the same dairy. We pick up Tuesdays and Fridays.',
          },
          {
            name: 'Heritage Mills',
            kind: 'Stone-milled flour',
            where: 'Goderich, ON · 3 hours west',
            since: 'Since 2025',
            img: '1499636136210-6f4ee915583e',
            body: 'A small mill on the Maitland River. Soft-wheat pastry flour for laminated doughs (the Napoleon especially is a different cake with their flour) and hard wheat for the sponge bases. They mill to order; lead time is a week.',
          },
          {
            name: 'Valrhona',
            kind: 'Single-origin couverture',
            where: 'Tain l’Hermitage, France',
            since: 'Since 2024',
            img: '1606313564200-e75d5e30476c',
            body: 'The one supplier on the list we don’t personally know. We choose Valrhona because they are honest about what’s in their chocolate, where the beans came from, and how the cocoa farmers were paid. Manjari and Caraibe go into the Spartak; Guanaja into the European hot chocolate.',
          },
          {
            name: 'Greenwood Farm',
            kind: 'Pasture eggs',
            where: 'King City, ON · 50 min north',
            since: 'Since 2024',
            img: '1488477181946-6428a0291777',
            body: 'A small family operation with about 400 laying hens that roam freely on five acres of pasture. Eggs are richer, yolks darker, whites stiffer than commercial. We pick up Tuesdays and Fridays — same days as Stirling.',
          },
          {
            name: 'Brockton & Sherway markets',
            kind: 'Seasonal fruit',
            where: 'Toronto, ON',
            since: 'Since 2024',
            img: '1488477181946-6428a0291777',
            body: 'Whatever is at its best, that week, that morning. Strawberries from Niagara in June. Currants from Prince Edward County in July. Asian pears from Vineland in October. We don’t freeze fruit — when berry season is over, the Pavlova goes off the menu until next year.',
          },
        ].map((s, i) => (
          <article key={s.name} className={"sup-row " + (i % 2 ? 'sup-flip' : '')}>
            <div className="sup-img"><img src={`https://images.unsplash.com/photo-${s.img}?auto=format&fit=crop&w=1100&q=80`} alt={s.name} /></div>
            <div className="sup-body">
              <span className="num">{s.where} · {s.since}</span>
              <h3 className="serif" style={{ fontSize: 38, lineHeight: 0.98, letterSpacing: '-0.01em', marginTop: 8 }}>{s.name}</h3>
              <p className="serif-i" style={{ fontSize: 20, color: 'var(--olive)', marginTop: 4 }}>{s.kind}</p>
              <p className="sup-text">{s.body}</p>
            </div>
          </article>
        ))}
      </div>
      <style>{`
        .sup-row { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; padding: 50px 0; border-bottom: 1px solid var(--rule); }
        .sup-row:last-child { border-bottom: 0; }
        .sup-flip .sup-img { order: 2; }
        .sup-img { aspect-ratio: 4/3; overflow: hidden; background: var(--cream); }
        .sup-img img { width: 100%; height: 100%; object-fit: cover; }
        .sup-text { color: var(--brown); font-size: 15.5px; line-height: 1.7; margin-top: 18px; max-width: 50ch; }
        @media (max-width: 880px) { .sup-row { grid-template-columns: 1fr; gap: 24px; padding: 30px 0; } .sup-flip .sup-img { order: 0; } }
      `}</style>
    </section>

    <AboutSubFooter current="suppliers" setRoute={setRoute} />
    <Footer setRoute={setRoute} />
  </main>
);

/* ───────────────── MISSION ───────────────── */
const AboutMissionPage = ({ setRoute }) => (
  <main className="fade-in">
    <SubCrumbs here="Mission & vision" />
    <SubMast vol="No. 04 · Mission & vision"
             eyebrow="What we stand for"
             title="The <em>why</em> behind the bench."
             lede="A small café can either drift or commit. We decided early on what Delicia was for — and just as importantly, what it would never be." />

    <section className="sec">
      <div className="shell mv-grid">
        <article className="mv-card">
          <span className="num">Mission</span>
          <h2 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 0.96, letterSpacing: '-0.02em', marginTop: 12 }}>
            Bring the <em style={{ color: 'var(--olive)' }}>European dessert table</em> to Toronto — made by hand, made to share.
          </h2>
          <p className="mv-p">Every cake we sell is one we’d serve to family. Every coffee, the one we’d order ourselves. We exist so the desserts our customers grew up with — and the ones they’ve never tried — are made the way they were meant to be: from real ingredients, by people who can name every supplier on the list.</p>
          <ul className="mv-list">
            <li><span className="num">·</span>Premium natural ingredients · always</li>
            <li><span className="num">·</span>No powder substitutes, no pre-mixes, no shortcuts</li>
            <li><span className="num">·</span>Cakes built to be shared, not photographed first</li>
            <li><span className="num">·</span>A café that values your slow afternoon as much as your morning rush</li>
          </ul>
        </article>

        <article className="mv-card">
          <span className="num">Vision</span>
          <h2 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 0.96, letterSpacing: '-0.02em', marginTop: 12 }}>
            A handful of <em style={{ color: 'var(--olive)' }}>neighbourhood cafés</em>, never bigger than Olena can taste-test on a Saturday.
          </h2>
          <p className="mv-p">Etobicoke first. Mississauga next, when the time is right. Each shop with the same recipes, the same suppliers, the same small team trained in the original kitchen. We don’t franchise. We don’t scale by cutting corners.</p>
          <ul className="mv-list">
            <li><span className="num">·</span>One new location every 18 — 24 months</li>
            <li><span className="num">·</span>Founder-baked menu, never licensed</li>
            <li><span className="num">·</span>Staff trained in the Etobicoke kitchen for at least 3 months</li>
            <li><span className="num">·</span>Coffee &amp; cake — never sandwiches, never lunch service</li>
          </ul>
        </article>
      </div>
      <style>{`
        .mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .mv-card { padding: 50px 44px; background: var(--paper); border-top: 4px solid var(--olive); }
        .mv-card:last-child { border-top-color: var(--brown); }
        .mv-p { margin-top: 22px; font-size: 16px; line-height: 1.7; color: var(--brown); }
        .mv-list { list-style: none; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--rule); display: flex; flex-direction: column; gap: 12px; font-size: 14.5px; color: var(--brown); }
        .mv-list li { display: flex; gap: 10px; }
        @media (max-width: 880px) { .mv-grid { grid-template-columns: 1fr; } .mv-card { padding: 32px 24px; } }
      `}</style>
    </section>

    {/* Pull quote */}
    <section className="sec quote-sec">
      <div className="shell" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        <span className="num">A note we keep on the kitchen wall</span>
        <p className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 16, textWrap: 'balance' }}>
          “One thousand <em style={{ color: 'var(--olive)' }}>no’s</em> for every yes.”
        </p>
        <p style={{ marginTop: 18, color: 'var(--muted)' }}>What it means: every shortcut we don’t take. Every supplier we don’t switch to. Every margin we don’t squeeze.</p>
      </div>
      <style>{`.quote-sec { background: var(--cream); padding: 100px 0; }`}</style>
    </section>

    <AboutSubFooter current="mission" setRoute={setRoute} />
    <Footer setRoute={setRoute} />
  </main>
);

/* ───────────────── AWARDS ───────────────── */
const AboutAwardsPage = ({ setRoute }) => (
  <main className="fade-in">
    <SubCrumbs here="Awards & recognition" />
    <SubMast vol="No. 05 · Awards"
             eyebrow="Small list, hard-won"
             title="A few <em>shelves</em> we’re proud of."
             lede="We don’t enter every competition, and we don’t pay for placements. This is the full list of mentions and accolades we’ve received — through our first eighteen months in business — listed by year." />

    <section className="sec">
      <div className="shell">
        {['2026', '2025', '2024'].map(year => (
          <div key={year} className="aw-year">
            <span className="serif-i aw-year-label">{year}</span>
            <div className="aw-rows">
              {[
                { y: '2026', name: 'blogTO Best New Bakery', cat: 'Editorial', desc: 'Top 10 of opening year, citywide. "An immediate addition to the short list of Toronto’s best dessert cafés."', mark: '★' },
                { y: '2026', name: 'Toronto Life · Top 50 Desserts', cat: 'Editorial', desc: 'Honourable mention · Medovik. Annual roundup of the city’s most worthwhile sweet experiences.', mark: '◇' },
                { y: '2025', name: 'Ukrainian Canadian Congress', cat: 'Heritage', desc: 'Heritage Business Award · recognising operators preserving Ukrainian culinary traditions in Canada.', mark: '✻' },
                { y: '2025', name: 'Specialty Coffee Assoc. of America', cat: 'Coffee', desc: 'Q-rated single-origin program. Three rotating lots scored 87+ in 2025.', mark: '◐' },
                { y: '2025', name: 'BlogTO Reader’s Choice', cat: 'Reader vote', desc: 'Top 5 finalist · Best New Cafe, West Toronto.', mark: '✦' },
                { y: '2024', name: 'Stirling Creamery Partnership', cat: 'Supplier program', desc: 'One of nine GTA businesses recognised as a Stirling Heritage Buyer for exclusive use of their cultured butter.', mark: '◈' },
                { y: '2024', name: 'Etobicoke BIA New Business Award', cat: 'Local business', desc: 'Founder of the year nominee · Etobicoke Business Improvement Area, recognising new operators with a strong local impact.', mark: '✦' },
              ].filter(a => a.y === year).map(a => (
                <div key={a.name} className="aw-row">
                  <span className="aw-mark">{a.mark}</span>
                  <div className="aw-body">
                    <span className="num">{a.cat}</span>
                    <h4 className="serif" style={{ fontSize: 22, lineHeight: 1.2, marginTop: 4 }}>{a.name}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6, maxWidth: '60ch' }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Certifications */}
        <div className="certs-block">
          <span className="eyebrow">Certified, signed off, audited</span>
          <div className="certs-row">
            {[
              ['Toronto Public Health A-grade', 'Annual food premises audit, passed every quarter'],
              ['Halal-friendly kitchen', 'On request · separate utensils available'],
              ['FSEP food-safety trained staff', 'Every front-of-house & kitchen team member'],
              ['Organic Ontario partner', 'For seasonal fruit & flour sourcing'],
              ['Insured for catering & events', 'Liability coverage up to $5M'],
            ].map(([t, d]) => (
              <div key={t} className="cert-card">
                <span className="cert-mark">✓</span>
                <div>
                  <h5 className="serif" style={{ fontSize: 16 }}>{t}</h5>
                  <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .aw-year { display: grid; grid-template-columns: 140px 1fr; gap: 50px; padding: 40px 0; border-bottom: 1px solid var(--rule); }
        .aw-year-label { color: var(--olive); font-size: 56px; line-height: 1; }
        .aw-rows { display: flex; flex-direction: column; }
        .aw-row { display: grid; grid-template-columns: 60px 1fr; gap: 20px; padding: 20px 0; border-bottom: 1px dashed var(--rule); }
        .aw-row:last-child { border-bottom: 0; }
        .aw-mark { font-family: var(--serif); font-style: italic; font-size: 32px; color: var(--olive); line-height: 1; }
        .certs-block { margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--rule-strong); }
        .certs-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 20px; }
        .cert-card { display: grid; grid-template-columns: 30px 1fr; gap: 14px; padding: 18px 22px; background: var(--paper); border: 1px solid var(--rule); }
        .cert-mark { width: 24px; height: 24px; border-radius: 999px; background: var(--olive); color: var(--paper); display: grid; place-items: center; font-weight: 700; }
        @media (max-width: 880px) {
          .aw-year { grid-template-columns: 1fr; gap: 16px; }
          .certs-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>

    <AboutSubFooter current="awards" setRoute={setRoute} />
    <Footer setRoute={setRoute} />
  </main>
);

/* ───────────────── HERITAGE ───────────────── */
const AboutHeritagePage = ({ setRoute }) => (
  <main className="fade-in">
    <SubCrumbs here="Recipe heritage" />
    <SubMast vol="No. 06 · Recipe heritage"
             eyebrow="Where the menu came from"
             title="A short <em>map</em> of where our recipes were born."
             lede="The menu reads, on a quiet day, like a small atlas of Central European pastry. Each item came home with us from somewhere — a market, a grandmother’s kitchen, a Vienna café we visited during training. Here’s the full origin story." />

    <section className="sec">
      <div className="shell">
        {[
          {
            place: 'Lviv', sub: 'Western Ukraine',
            era: '17th century onward',
            cakes: ['Medovik · honey cake', 'Sernyk · curd cake', 'Kyiv cake', 'Pavlova (Soviet-era variation)'],
            body: 'The cakes we ate growing up. Medovik comes from the layered “medivnyk” tradition of Western Ukrainian baking, perfected in Lviv’s patisserie schools during the late Habsburg period. Sernyk is the home version — what every Sunday tasted like at Olena’s grandmother’s table. Kyiv cake is the youngest of the lot, born in 1956 in a Soviet confectionery factory.',
            img: '1578985545062-69928b1d9587',
          },
          {
            place: 'Vienna', sub: 'Austria',
            era: '19th century',
            cakes: ['Esterházy · almond dacquoise', 'Sachertorte (in development)', 'Linzer cookies'],
            body: 'The European torte tradition — formal, architectural, almond-heavy. Esterházy was supposedly named for a Hungarian prince and perfected by Viennese confectioners in the 1870s. The Linzer cookie comes from the same school, scaled down. We don’t serve a Sachertorte yet — we’ve been working on it for two years and it isn’t ready.',
            img: '1535141192574-5d4897c12636',
          },
          {
            place: 'Paris', sub: 'France',
            era: 'Late 19th & 20th century',
            cakes: ['Napoleon (mille-feuille)', 'Éclairs', 'Macarons', 'Sablé Breton tart bases'],
            body: 'The technical heart of the menu. Napoleon, despite the imperial Russian name, is the same cake as French mille-feuille — sixteen layers of laminated puff pastry, set with crème pâtissière. Éclairs, macarons and the almond shortcrust of our berry tart all come from formal Parisian patisserie. Andrii spent two weeks in Paris in 2018 just eating éclairs, taking notes.',
            img: '1488477181946-6428a0291777',
          },
          {
            place: 'Toronto', sub: 'Ontario, Canada',
            era: '2017 onward',
            cakes: ['Seasonal Pavlova', 'Maple-honey crescents', 'Single-origin coffee program', 'Pumpkin Medovik'],
            body: 'Our home. Some of the menu comes from this city — the seasonal Pavlova with whatever fruit the markets have that week; the maple-honey holiday crescents; the autumn pumpkin Medovik. The single-origin coffee program is entirely Andrii’s, built over five years of cupping local roasters. This is the section of the menu that grows every year.',
            img: '1554118811-1e0d58224f24',
          },
        ].map((p, i) => (
          <article key={p.place} className={"her-row " + (i % 2 ? 'her-flip' : '')}>
            <div className="her-img"><img src={`https://images.unsplash.com/photo-${p.img}?auto=format&fit=crop&w=1100&q=80`} alt={p.place} /></div>
            <div className="her-body">
              <span className="num">{p.sub} · {p.era}</span>
              <h3 className="serif" style={{ fontSize: 72, lineHeight: 0.9, letterSpacing: '-0.025em', marginTop: 4 }}>{p.place}</h3>
              <ul className="her-cakes">
                {p.cakes.map(c => <li key={c}>{c}</li>)}
              </ul>
              <p className="her-text">{p.body}</p>
            </div>
          </article>
        ))}
      </div>
      <style>{`
        .her-row { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; padding: 50px 0; border-bottom: 1px solid var(--rule); }
        .her-row:last-child { border-bottom: 0; }
        .her-flip .her-img { order: 2; }
        .her-img { aspect-ratio: 4/5; overflow: hidden; background: var(--cream); }
        .her-img img { width: 100%; height: 100%; object-fit: cover; }
        .her-cakes { list-style: none; margin: 18px 0; padding-top: 16px; border-top: 1px solid var(--rule); display: flex; flex-wrap: wrap; gap: 8px; }
        .her-cakes li { padding: 6px 12px; background: var(--cream); border-radius: 999px; font-size: 13px; color: var(--brown); }
        .her-text { color: var(--brown); font-size: 15.5px; line-height: 1.7; max-width: 50ch; }
        @media (max-width: 880px) { .her-row { grid-template-columns: 1fr; gap: 24px; padding: 30px 0; } .her-flip .her-img { order: 0; } }
      `}</style>
    </section>

    <AboutSubFooter current="heritage" setRoute={setRoute} />
    <Footer setRoute={setRoute} />
  </main>
);



/* ===== pages/about.jsx ===== */
// About page — editorial story
const AboutPage = ({ setRoute }) => (
  <main className="about-page fade-in">
    <Breadcrumbs items={[
      { label: 'Home', href: 'index.html' },
      { label: 'About' },
    ]} />

    {/* Editorial masthead — fits on one screen */}
    <section className="about-mast">
      <div className="shell">
        <div className="about-mast-meta">
          <span className="num">Our story · Vol. 01</span>
          <span className="num">Etobicoke · 2026</span>
          <span className="num">Founded MMXXVI</span>
        </div>
        <div className="about-mast-grid">
          <div className="about-mast-text">
            <span className="eyebrow">Meet the kitchen</span>
            <h1 className="serif" style={{
              fontSize: 'clamp(48px, 6.6vw, 104px)', lineHeight: 0.92, letterSpacing: '-0.025em',
              marginTop: 14, textWrap: 'balance',
            }}>
              A cozy European café<br />
              with <em style={{ color: 'var(--olive)' }}>Ukrainian soul.</em>
            </h1>
            <p className="about-lede">
              Cafe Delicia is a small dessert café in Etobicoke, born out of a feeling we couldn’t shake — that the cakes of our childhood deserved a quiet, beautiful place to be served.
            </p>
            <p className="about-byline">
              <span className="serif-i">— Olena &amp; Andrii Kovalenko</span>
              <span className="num" style={{ marginLeft: 10 }}>founders</span>
            </p>
            <div className="about-cta-row">
              <a href="visit.html" className="btn btn-primary">Visit us</a>
              <a href="menu.html" className="btn btn-ghost">See the menu</a>
              <a href="#story" className="about-scroll-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none"><path d="M12 5v14M6 13l6 6 6-6"/></svg>
                Keep reading
              </a>
            </div>
          </div>
          <div className="about-mast-portraits">
            <figure className="portrait p-olena">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&h=800&q=80"
                   onError={(e) => { e.target.src = 'https://i.pravatar.cc/600?img=47'; }}
                   alt="Olena Kovalenko" />
              <figcaption>
                <span className="num">No. 01</span>
                <span className="serif-i" style={{ fontSize: 20 }}>Olena</span>
                <span className="num">Pastry · co-founder</span>
              </figcaption>
            </figure>
            <figure className="portrait p-andrii">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80"
                   onError={(e) => { e.target.src = 'https://i.pravatar.cc/600?img=12'; }}
                   alt="Andrii Kovalenko" />
              <figcaption>
                <span className="num">No. 02</span>
                <span className="serif-i" style={{ fontSize: 20 }}>Andrii</span>
                <span className="num">Coffee · co-founder</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <style>{`
        .about-mast {
          min-height: 100vh;
          padding: 110px 0 50px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .about-mast-meta {
          display: flex; justify-content: space-between; gap: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--rule);
          flex-wrap: wrap;
        }
        .about-mast-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
          margin-top: 40px;
        }
        .about-mast-text { padding-top: 4px; max-width: 56ch; }
        .about-lede { font-size: 16.5px; line-height: 1.65; color: var(--brown); margin-top: 28px; max-width: 50ch; }
        .about-byline {
          margin-top: 22px; padding-top: 16px;
          border-top: 1px solid var(--rule);
          display: flex; align-items: baseline;
        }
        .about-byline .serif-i { font-size: 21px; color: var(--olive); }
        .about-cta-row { display: flex; gap: 12px; align-items: center; margin-top: 26px; flex-wrap: wrap; }
        .about-scroll-hint {
          display: inline-flex; gap: 8px; align-items: center;
          font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--muted); margin-left: 6px;
          transition: color .2s ease;
        }
        .about-scroll-hint:hover { color: var(--olive); }
        .about-mast-portraits { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .portrait { margin: 0; position: relative; }
        .portrait img {
          width: 100%; aspect-ratio: 3/4; object-fit: cover;
          background: var(--cream); display: block;
          filter: saturate(0.88);
        }
        .portrait.p-olena { transform: translateY(28px); }
        .portrait.p-andrii { transform: translateY(0); }
        .portrait figcaption {
          background: var(--paper);
          padding: 12px 14px;
          display: flex; flex-direction: column; gap: 1px;
        }
        .portrait figcaption .num { font-size: 9.5px; }
        @media (max-width: 980px) {
          .about-mast { min-height: auto; padding: 80px 0 60px; }
          .about-mast-grid { grid-template-columns: 1fr; gap: 36px; }
          .portrait.p-olena, .portrait.p-andrii { transform: none; }
        }
      `}</style>
    </section>

    {/* Anchor target for scroll-hint */}
    <div id="story" style={{ scrollMarginTop: 100 }}></div>

    {/* Big image */}
    <section className="about-feature">
      <div className="about-feature-img">
        <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2200&q=85" alt="The café" />
        <span className="captioned-overlay">
          <span className="num">Plate 01</span>
          <span className="serif-i" style={{ fontSize: 22 }}>The café, in afternoon light</span>
        </span>
      </div>
      <style>{`
        .about-feature { padding: 0 0 80px; }
        .about-feature-img { position: relative; height: 70vh; max-height: 760px; min-height: 460px; background: var(--cream); overflow: hidden; }
        .about-feature-img img { width: 100%; height: 100%; object-fit: cover; }
        .captioned-overlay { position: absolute; left: 32px; bottom: 32px; padding: 16px 20px; background: rgba(251, 247, 238, 0.92); backdrop-filter: blur(10px); display: flex; flex-direction: column; gap: 4px; }
      `}</style>
    </section>

    {/* Pull quote */}
    <section className="sec sec-tight">
      <div className="shell">
        <div className="pull">
          <span className="num">01 — Our promise</span>
          <p className="serif" style={{ fontSize: 'var(--display-m)', lineHeight: 1, letterSpacing: '-0.02em', marginTop: 16, textWrap: 'balance' }}>
            “No <em style={{ color: 'var(--olive)' }}>powders</em>, no shortcuts, no pre-mixes. Real butter, real cream, real time on the bench. That’s the whole rule.”
          </p>
          <span className="serif-i" style={{ marginTop: 22, display: 'block', fontSize: 18, color: 'var(--muted)' }}>— Olena & Andrii, founders</span>
        </div>
      </div>
      <style>{`
        .pull { max-width: 1000px; padding: 60px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
      `}</style>
    </section>

    {/* Three columns — values */}
    <section className="sec">
      <div className="shell">
        <SecHead num="02" eyebrow="What we hold to" title="Three things we <em>refuse to negotiate on.</em>" />
        <div className="vals">
          {[
            { n: '01', t: 'Premium natural ingredients', d: 'Cultured butter, pasture eggs, raw wildflower honey, single-origin chocolate, organic flour. We buy small and often from suppliers we know by name.' },
            { n: '02', t: 'Time as an ingredient', d: 'Most of what we make rests overnight. Doughs relax, syrups soak, creams settle. The clock is part of the recipe.' },
            { n: '03', t: 'A café you can stay in', d: 'A handful of small tables, warm light, slow music, a Madagascar-vanilla latte at the counter. Built for staying, not just stopping by.' },
          ].map(v => (
            <div key={v.n} className="val">
              <span className="serif-i" style={{ fontSize: 80, color: 'var(--olive)', lineHeight: 1 }}>{v.n}</span>
              <h4 className="serif" style={{ fontSize: 26, lineHeight: 1.1, marginTop: 12 }}>{v.t}</h4>
              <p style={{ color: 'var(--muted)', fontSize: 14.5, marginTop: 10, lineHeight: 1.65 }}>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .vals { display: grid; grid-template-columns: repeat(3, 1fr); gap: 50px 36px; }
        .val { padding-top: 28px; border-top: 1px solid var(--rule-strong); }
        @media (max-width: 880px) { .vals { grid-template-columns: 1fr; } }
      `}</style>
    </section>

    {/* Founders block */}
    <section className="sec founder-sec" id="founders">
      <div className="shell founder-grid">
        <div className="founder-imgs">
          <div className="f-img f1"><img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80" alt="Olena" /></div>
          <div className="f-img f2"><img src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=900&q=80" alt="Honey" /></div>
        </div>
        <div className="founder-text">
          <span className="num">03 — The kitchen</span>
          <h2 className="serif" style={{ fontSize: 'var(--display-m)', lineHeight: 0.95, letterSpacing: '-0.02em', marginTop: 14 }}>
            We are <em style={{ color: 'var(--olive)' }}>Olena & Andrii.</em>
          </h2>
          <div className="founder-body">
            <p>Olena trained as a pastry chef in Lviv before moving to Canada in 2014. Andrii grew up baking with his grandmother in a kitchen smelling of butter and honey. We ran a small home-baking practice for friends and family for three years before deciding the city was ready for the café we’d been imagining.</p>
            <p>Delicia is what we want our weekends to taste like — Napoleon on Saturday afternoon, an espresso at the bar on a slow Sunday, a Medovik carried home in a string-tied box for a friend’s birthday.</p>
          </div>
        </div>
      </div>
      <style>{`
        .founder-sec { background: var(--cream); }
        .founder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .founder-imgs { display: grid; grid-template-columns: 1fr 0.8fr; gap: 16px; }
        .f-img { overflow: hidden; aspect-ratio: 4/5; }
        .f-img.f2 { aspect-ratio: 1; align-self: end; margin-top: 50px; }
        .f-img img { width: 100%; height: 100%; object-fit: cover; }
        .founder-body { margin-top: 28px; max-width: 50ch; display: flex; flex-direction: column; gap: 14px; font-size: 15.5px; line-height: 1.65; color: var(--brown); }
        @media (max-width: 880px) { .founder-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>

    {/* Heritage strip */}
    <section className="sec sec-tight" id="heritage">
      <div className="shell">
        <SecHead num="04" eyebrow="Where the recipes come from" title="A short <em>map</em> of our menu." />
        <div className="heritage">
          {[
            ['Lviv', 'Medovik, Sernyk, Kyiv cake — the desserts we ate growing up.'],
            ['Vienna', 'Esterházy, Sachertorte, the European torte tradition.'],
            ['Paris', 'Éclairs, macarons, baked tart shells, choux.'],
            ['Toronto', 'Our home — seasonal fruit, local honey, our café.'],
          ].map(([place, desc]) => (
            <div key={place} className="her">
              <span className="serif" style={{ fontSize: 44, lineHeight: 1, letterSpacing: '-0.02em' }}>{place}</span>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10, lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .heritage { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; padding-top: 30px; border-top: 1px solid var(--rule); }
        .her { padding-right: 20px; border-right: 1px solid var(--rule); }
        .her:last-child { border-right: 0; }
        @media (max-width: 760px) {
          .heritage { grid-template-columns: 1fr 1fr; }
          .her { border-right: 0; }
        }
      `}</style>
    </section>

    {/* Process — how we make it */}
    <section className="sec process-sec" id="process">
      <div className="shell">
        <SecHead num="05" eyebrow="From the bench" title="How a <em>Medovik</em> comes together." />
        <div className="process-grid">
          {[
            { n: '01', t: 'Whisk the honey', d: 'Wildflower honey, warmed with cultured butter and eggs over a bain-marie until it loosens and the sugar dissolves. Twelve minutes, no faster.', img: '1517433367423-c7e5b0f35086' },
            { n: '02', t: 'Roll the layers', d: 'The dough is split into eight, rolled paper-thin one at a time and baked thirty seconds until just gold. Most days we make fourteen layers per cake.', img: '1559925393-8be0ec4767c8' },
            { n: '03', t: 'Whip the cream', d: 'Cultured sour cream and heavy cream whipped together with a slow vanilla sugar. Soft peaks, never stiff — it has to soak.', img: '1517433367423-c7e5b0f35086' },
            { n: '04', t: 'Rest overnight', d: 'Built tall and put to rest in the cold room for at least eighteen hours, until the layers and the cream become the same thing.', img: '1578985545062-69928b1d9587' },
          ].map(p => (
            <article key={p.n} className="proc">
              <div className="proc-img"><img src={`https://images.unsplash.com/photo-${p.img}?auto=format&fit=crop&w=800&q=80`} alt="" /></div>
              <div className="proc-body">
                <span className="num">{p.n}</span>
                <h4 className="serif" style={{ fontSize: 26, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.01em' }}>{p.t}</h4>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{p.d}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="process-foot">
          <span className="serif-i" style={{ fontSize: 22 }}>~ 36 hours, beginning to end.</span>{' '}
          <span style={{ color: 'var(--muted)' }}>This is why whole cakes need 48 hours notice.</span>
        </p>
      </div>
      <style>{`
        .process-sec { background: var(--paper); }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .proc { display: flex; flex-direction: column; }
        .proc-img { aspect-ratio: 4/5; background: var(--cream); overflow: hidden; }
        .proc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); }
        .proc:hover .proc-img img { transform: scale(1.04); }
        .proc-body { padding: 22px 4px 0; }
        .process-foot { margin-top: 56px; padding-top: 28px; border-top: 1px solid var(--rule); text-align: center; }
        @media (max-width: 880px) { .process-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </section>

    {/* Mission · Vision · Awards */}
    <section className="sec mva-sec" id="mission">
      <div className="shell">
        <SecHead num="06" eyebrow="What we stand for" title="The <em>why</em> behind the bench." />

        <div className="mva-pair">
          <div className="mva-card mva-mission">
            <span className="num">Mission</span>
            <h3 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 0.95, letterSpacing: '-0.02em', marginTop: 12 }}>
              To bring the <em style={{ color: 'var(--olive)' }}>European dessert table</em> to Toronto — made by hand, made to share.
            </h3>
            <p className="mva-p">Every cake we sell is one we’d serve to family. Every coffee, the one we’d order for ourselves. We exist so that the desserts our customers grew up with — and the ones they’ve never tried — are made the way they were meant to be: from real ingredients, by people who can name every supplier on the list.</p>
          </div>
          <div className="mva-card mva-vision">
            <span className="num">Vision</span>
            <h3 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 0.95, letterSpacing: '-0.02em', marginTop: 12 }}>
              A small chain of <em style={{ color: 'var(--olive)' }}>neighbourhood cafés</em> — never bigger than Olena can taste-test on a Saturday morning.
            </h3>
            <p className="mva-p">Etobicoke first. Mississauga next, when the time is right. Each shop the same recipes, the same suppliers, the same small team trained in the original kitchen. We don’t franchise. We don’t scale by cutting corners.</p>
          </div>
        </div>

        {/* Awards strip */}
        <div className="awards" id="awards">
          <div className="awards-head">
            <span className="eyebrow">Recognition · 2025–2026</span>
            <h4 className="serif" style={{ fontSize: 28, lineHeight: 1.1, marginTop: 6 }}>Small list. Hard-won.</h4>
          </div>
          <div className="awards-grid">
            {[
              { year: '2026', name: 'blogTO Best New Bakery', desc: 'Top 10, opening year', mark: '★' },
              { year: '2025', name: 'Ukrainian Canadian Congress', desc: 'Heritage Business Award', mark: '✻' },
              { year: '2025', name: 'Specialty Coffee Assoc.', desc: 'Q-rated single origins on tap', mark: '◐' },
              { year: '2025', name: 'Toronto Life “Top 50 Dessert”', desc: 'Honourable mention · Medovik', mark: '◇' },
              { year: '2024', name: 'Stirling Creamery Partner', desc: 'Recognised butter buyer', mark: '◈' },
              { year: '2024', name: 'Etobicoke BIA New Business', desc: 'Founder of the year nominee', mark: '✦' },
            ].map(a => (
              <div key={a.name} className="award">
                <span className="award-mark">{a.mark}</span>
                <div>
                  <span className="num">{a.year}</span>
                  <h5 className="serif" style={{ fontSize: 17, lineHeight: 1.2, marginTop: 4 }}>{a.name}</h5>
                  <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications row */}
        <div className="certs">
          <span className="eyebrow">Certified, signed off, audited</span>
          <div className="certs-row">
            <span className="cert"><span className="cert-mark">✓</span>Toronto Public Health A-grade</span>
            <span className="cert"><span className="cert-mark">✓</span>Halal-friendly kitchen on request</span>
            <span className="cert"><span className="cert-mark">✓</span>FSEP food-safety trained staff</span>
            <span className="cert"><span className="cert-mark">✓</span>Organic Ontario partner supplier</span>
            <span className="cert"><span className="cert-mark">✓</span>Insured for catering &amp; events</span>
          </div>
        </div>
      </div>
      <style>{`
        .mva-sec { background: var(--paper); }
        .mva-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .mva-card { padding: 44px 40px; background: var(--bg); border: 1px solid var(--rule); }
        .mva-mission { border-top: 4px solid var(--olive); }
        .mva-vision { border-top: 4px solid var(--brown); }
        .mva-p { margin-top: 22px; font-size: 15px; line-height: 1.7; color: var(--brown); max-width: 50ch; }
        .awards { margin-top: 80px; padding-top: 50px; border-top: 1px solid var(--rule); }
        .awards-head { display: flex; justify-content: space-between; align-items: baseline; gap: 24px; flex-wrap: wrap; margin-bottom: 30px; }
        .awards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px 32px; }
        .award { display: flex; gap: 18px; padding: 22px 0; border-top: 1px solid var(--rule); }
        .award-mark { font-family: var(--serif); font-style: italic; font-size: 32px; color: var(--olive); line-height: 1; }
        .certs { margin-top: 70px; padding-top: 30px; border-top: 1px solid var(--rule); }
        .certs-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
        .cert {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 16px; border: 1px solid var(--rule-strong); border-radius: 999px;
          font-size: 12.5px;
        }
        .cert-mark { width: 18px; height: 18px; border-radius: 999px; background: var(--olive); color: var(--paper); display: grid; place-items: center; font-size: 10px; font-weight: 700; }
        @media (max-width: 880px) {
          .mva-pair { grid-template-columns: 1fr; }
          .awards-grid { grid-template-columns: 1fr; }
          .mva-card { padding: 32px 24px; }
        }
      `}</style>
    </section>

    {/* Suppliers / sourcing */}
    <section className="sec suppliers-sec" id="suppliers">
      <div className="shell">
        <SecHead num="07" eyebrow="Where things come from" title="The small list of <em>people</em> we buy from." />
        <div className="sup-grid">
          {[
            ['Borden Park Apiary', 'Honey', 'Caledon, ON · 1h north of here. Wildflower and clover lots, depending on the season.'],
            ['Stirling Creamery', 'Butter & cream', 'Stirling, ON · Cultured European-style butter at 84% fat. Cultured sour cream for the layered cakes.'],
            ['Heritage Mills', 'Flour', 'Goderich, ON · Stone-milled soft and hard wheats. Their pastry flour is what makes our laminations tender.'],
            ['Valrhona', 'Chocolate', 'Tain l’Hermitage, France · Single-origin couvertures for ganache, glazes and our European-style hot chocolate.'],
            ['Pasture eggs', 'Eggs', 'Greenwood Farm, ON · Pasture-raised eggs, picked up Tuesdays and Fridays.'],
            ['Local market', 'Fruit', 'Sherway and Brockton markets · Whatever is at its best that week — strawberries in June, currants in July, pears in October.'],
          ].map(([n, kind, where]) => (
            <div key={n} className="sup">
              <span className="eyebrow">{kind}</span>
              <h4 className="serif" style={{ fontSize: 22, lineHeight: 1.15, marginTop: 6 }}>{n}</h4>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>{where}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .sup-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 32px; }
        .sup { padding-top: 22px; border-top: 1px solid var(--rule-strong); }
        @media (max-width: 880px) { .sup-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </section>

    {/* Closing CTA */}
    <section className="sec">
      <div className="shell" style={{ textAlign: 'center' }}>
        <span className="num">Come for cake</span>
        <h2 className="serif" style={{ fontSize: 'var(--display-l)', lineHeight: 0.9, letterSpacing: '-0.03em', marginTop: 14, textWrap: 'balance' }}>
          We’re saving you<br /><em style={{ color: 'var(--olive)' }}>a table.</em>
        </h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
          <button className="btn btn-primary" onClick={() => setRoute({ name: 'visit' })}>Visit us</button>
          <button className="btn btn-ghost" onClick={() => setRoute({ name: 'menu' })}>See the menu</button>
        </div>
      </div>
    </section>

    <Footer setRoute={setRoute} />
  </main>
);



/* ===== pages/blog.jsx ===== */
// Journal — editorial magazine treatment.
// Three views: index (BlogPage), category (JournalCategoryPage), single article (ArticleView).

const JR_ISSUE = 'Issue 01 · Vol. 01';
const JR_DATE = 'May / June 2026';

/* ============================================================
   Shared building blocks
   ============================================================ */
const JournalMast = ({ kicker, eyebrow, title, lede, count, color = 'olive' }) => (
  <section className="jr-mast">
    <div className="shell">
      <div className="jr-mast-meta">
        <span className="num">Cafe Delicia · {kicker || 'The Journal'}</span>
        <span className="num">{JR_ISSUE}</span>
        <span className="num">{JR_DATE}</span>
        {count != null && <span className="num">{count} pieces</span>}
      </div>
      <span className="eyebrow jr-mast-eyebrow">{eyebrow}</span>
      <h1 className="serif jr-mast-h1" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="jr-mast-lede">{lede}</p>
    </div>
    <style>{`
      .jr-mast { padding: 50px 0 50px; border-bottom: 1px solid var(--rule); }
      .jr-mast-meta { display: flex; justify-content: space-between; gap: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--rule); flex-wrap: wrap; }
      .jr-mast-eyebrow { display: block; margin-top: 28px; }
      .jr-mast-h1 {
        font-size: clamp(64px, 11vw, 180px);
        line-height: 0.86; letter-spacing: -0.035em;
        margin-top: 14px;
        text-wrap: balance;
      }
      .jr-mast-h1 em { font-style: italic; color: var(--olive); }
      .jr-mast-lede { max-width: 58ch; font-size: 17.5px; line-height: 1.65; color: var(--brown); margin-top: 28px; }
    `}</style>
  </section>
);

const JournalSidebar = ({ articles, current, slugMap, onCat, activeCat }) => {
  const cats = [...new Set(articles.map(a => a.cat))];
  const popular = articles.slice(0, 3);
  return (
    <aside className="jr-side">
      <div className="jr-side-block">
        <span className="eyebrow">By topic</span>
        <ul className="jr-side-list">
          {cats.map(c => (
            <li key={c}>
              <a href={slugMap[c] || `blog.html?cat=${encodeURIComponent(c)}`}
                 className={"jr-side-link " + (c === activeCat ? 'on' : '')}>
                <span className="serif" style={{ fontSize: 17 }}>{c}</span>
                <span className="num">{articles.filter(a => a.cat === c).length}</span>
              </a>
            </li>
          ))}
          {activeCat && (
            <li><a href="blog.html" className="jr-side-link"><span className="serif" style={{ fontSize: 17, fontStyle: 'italic' }}>All pieces</span><span className="num">{articles.length}</span></a></li>
          )}
        </ul>
      </div>

      <div className="jr-side-block">
        <span className="eyebrow">Most read this month</span>
        <ol className="jr-pop">
          {popular.map((a, i) => (
            <li key={a.id}>
              <span className="serif-i jr-pop-num">{String(i + 1).padStart(2, '0')}</span>
              <a href={`blog.html#${a.id}`} className="jr-pop-link">
                <h5 className="serif" style={{ fontSize: 16, lineHeight: 1.2 }}>{a.title}</h5>
                <span className="num">{a.cat} · {a.readMin} min</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="jr-side-block jr-side-sub">
        <span className="eyebrow">Letters from Delicia</span>
        <p style={{ fontSize: 13.5, marginTop: 8, color: 'var(--muted)' }}>One piece in your inbox the first Tuesday of every month.</p>
        <NewsletterCompact />
      </div>

      <style>{`
        .jr-side { display: flex; flex-direction: column; gap: 44px; position: sticky; top: 110px; align-self: start; }
        .jr-side-block { padding: 24px 26px; background: var(--paper); border-top: 2px solid var(--ink); }
        .jr-side-list { list-style: none; display: flex; flex-direction: column; margin-top: 14px; }
        .jr-side-link {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 11px 0; border-bottom: 1px solid var(--rule);
          transition: padding-left .2s ease, color .2s ease;
        }
        .jr-side-link:hover { padding-left: 6px; color: var(--olive); }
        .jr-side-link.on { color: var(--olive); }
        .jr-side-link.on .serif::after { content: ' ·'; }
        .jr-pop { list-style: none; display: flex; flex-direction: column; margin-top: 14px; }
        .jr-pop li { display: grid; grid-template-columns: 36px 1fr; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--rule); align-items: start; }
        .jr-pop li:last-child { border-bottom: 0; }
        .jr-pop-num { font-size: 28px; color: var(--olive); line-height: 1; }
        .jr-pop-link span.num { display: block; margin-top: 6px; }
        .jr-pop-link:hover h5 { color: var(--olive); }
      `}</style>
    </aside>
  );
};

const NewsletterCompact = () => {
  const [v, setV] = useState('');
  const [done, setDone] = useState(false);
  if (done) return <p className="serif-i" style={{ fontSize: 17, marginTop: 14, color: 'var(--olive)' }}>Welcome aboard.</p>;
  return (
    <form className="jr-sub-form" onSubmit={(e) => { e.preventDefault(); if (/@/.test(v)) setDone(true); }}>
      <input className="input" value={v} onChange={(e) => setV(e.target.value)} placeholder="email@example.com" />
      <button className="btn btn-primary" type="submit" style={{ padding: '12px 20px', fontSize: 11 }}>Join</button>
      <style>{`.jr-sub-form { display: grid; grid-template-columns: 1fr auto; gap: 8px; margin-top: 14px; }`}</style>
    </form>
  );
};

/* Article preview card — multiple sizes */
const ArticleCard = ({ a, size = 'm' }) => (
  <a href={`blog.html#${a.id}`} className={"ac ac-" + size}>
    <div className="ac-img"><img src={a.img} alt={a.title} loading="lazy" /></div>
    <div className="ac-body">
      <div className="ac-meta">
        <span className="badge badge-outline">{a.cat}</span>
        <span className="num">{a.readMin} min read</span>
      </div>
      <h3 className="serif ac-title">{a.title}</h3>
      {size !== 's' && <p className="ac-excerpt">{a.excerpt}</p>}
      <span className="ac-foot">
        <span className="serif-i ac-author">{a.author}</span>
        <span className="num">{a.date}</span>
      </span>
    </div>
    <style>{`
      .ac { display: flex; flex-direction: column; cursor: pointer; transition: transform .25s ease; }
      .ac:hover { transform: translateY(-3px); }
      .ac-img { aspect-ratio: 4/3; overflow: hidden; background: var(--cream); }
      .ac-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); }
      .ac:hover .ac-img img { transform: scale(1.04); }
      .ac-body { padding: 22px 4px 0; display: flex; flex-direction: column; flex: 1; gap: 12px; }
      .ac-meta { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
      .ac-title { line-height: 1.15; letter-spacing: -0.005em; }
      .ac-excerpt { color: var(--muted); font-size: 14.5px; line-height: 1.6; }
      .ac-foot { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
      .ac-l .ac-img { aspect-ratio: 16/10; }
      .ac-l .ac-title { font-size: 38px; }
      .ac-m .ac-title { font-size: 26px; }
      .ac-s .ac-img { aspect-ratio: 5/3; }
      .ac-s .ac-title { font-size: 19px; }
      .ac-s .ac-author, .ac-s .ac-foot .num { font-size: 11.5px; }
    `}</style>
  </a>
);

/* ============================================================
   BLOG INDEX
   ============================================================ */
const BlogPage = ({ setRoute }) => {
  const articles = DELICIA_ARTICLES;
  const [activeId, setActiveId] = useState(() => location.hash.slice(1) || null);

  useEffect(() => {
    const onHash = () => {
      setActiveId(location.hash.slice(1) || null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const article = activeId ? articles.find(a => a.id === activeId) : null;
  if (article) return <ArticleView article={article} articles={articles} setRoute={setRoute} />;

  const featured = articles[0];
  const secondRow = articles.slice(1, 3);
  const rest = articles.slice(3);

  const slugMap = {
    'Recipe stories': 'recipe-stories.html',
    'Café notes': 'cafe-notes.html',
    'Suppliers': 'suppliers-journal.html',
    'How-to': 'how-to.html',
    'Seasonal': 'seasonal.html',
  };

  return (
    <main className="blog-page fade-in">
      <Breadcrumbs items={[{ label: 'Home', href: 'index.html' }, { label: 'Journal' }]} />

      <JournalMast
        eyebrow="Notes from the bench"
        title="The <em>Journal.</em>"
        lede="Long-form essays, short kitchen notes, supplier visits, recipe stories. Mostly written by Olena, sometimes by Andrii, never by a marketing team. We publish at our own pace — usually monthly."
        count={articles.length} />

      {/* Hero feature: image fills left half, type stacks right */}
      <section className="sec sec-tight">
        <div className="shell">
          <a href={`blog.html#${featured.id}`} className="jr-hero">
            <div className="jr-hero-img">
              <img src={featured.img} alt={featured.title} />
              <span className="jr-hero-stamp">
                <span className="serif-i">No. 01</span>
                <span className="num">Editor’s choice</span>
              </span>
            </div>
            <div className="jr-hero-body">
              <div className="jr-hero-meta">
                <span className="badge badge-olive">{featured.cat}</span>
                <span className="num">{featured.date} · {featured.readMin} min</span>
              </div>
              <h2 className="serif jr-hero-title" dangerouslySetInnerHTML={{ __html: featured.title }} />
              <p className="jr-hero-excerpt">{featured.excerpt}</p>
              <div className="jr-hero-foot">
                <div>
                  <span className="num">Written by</span>
                  <span className="serif-i" style={{ fontSize: 18, marginLeft: 8 }}>{featured.author}</span>
                </div>
                <span className="jr-hero-read">Read the piece <span style={{ marginLeft: 8 }}>→</span></span>
              </div>
            </div>
          </a>
        </div>
        <style>{`
          .jr-hero { display: grid; grid-template-columns: 1.1fr 1fr; gap: 60px; padding: 50px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); cursor: pointer; }
          .jr-hero-img { position: relative; aspect-ratio: 4/5; overflow: hidden; background: var(--cream); }
          .jr-hero-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); }
          .jr-hero:hover .jr-hero-img img { transform: scale(1.03); }
          .jr-hero-stamp { position: absolute; top: 20px; left: 20px; padding: 14px 18px; background: var(--paper); display: flex; flex-direction: column; gap: 2px; }
          .jr-hero-stamp .serif-i { font-size: 22px; line-height: 1; }
          .jr-hero-body { align-self: center; display: flex; flex-direction: column; gap: 20px; padding-right: 20px; }
          .jr-hero-meta { display: flex; gap: 14px; align-items: center; }
          .jr-hero-title { font-size: clamp(40px, 4.6vw, 72px); line-height: 0.98; letter-spacing: -0.02em; }
          .jr-hero-title em { font-style: italic; color: var(--olive); }
          .jr-hero-excerpt { color: var(--brown); font-size: 17px; line-height: 1.65; max-width: 50ch; }
          .jr-hero-foot { display: flex; justify-content: space-between; align-items: baseline; padding-top: 24px; border-top: 1px solid var(--rule); gap: 20px; flex-wrap: wrap; }
          .jr-hero-read { font-family: var(--sans); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink); }
          .jr-hero:hover .jr-hero-read { color: var(--olive); }
          @media (max-width: 980px) { .jr-hero { grid-template-columns: 1fr; gap: 30px; } }
        `}</style>
      </section>

      {/* Two-column layout: articles + sidebar */}
      <section className="sec">
        <div className="shell jr-main">
          <div className="jr-content">
            <div className="jr-sec-head">
              <span className="num">More from the journal</span>
              <h3 className="serif" style={{ fontSize: 28, lineHeight: 1, letterSpacing: '-0.01em' }}>The latest pieces.</h3>
            </div>

            <div className="jr-second-row">
              {secondRow.map((a, i) => <ArticleCard key={a.id} a={a} size="l" />)}
            </div>

            <hr className="jr-rule" />

            <div className="jr-rest">
              {rest.map(a => <ArticleCard key={a.id} a={a} size="m" />)}
            </div>
          </div>

          <JournalSidebar articles={articles} slugMap={slugMap} />
        </div>
        <style>{`
          .jr-main { display: grid; grid-template-columns: 1fr 320px; gap: 80px; }
          .jr-sec-head { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 20px; border-bottom: 1px solid var(--rule); margin-bottom: 36px; gap: 20px; }
          .jr-second-row { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
          .jr-rule { border: 0; border-top: 1px solid var(--rule-strong); margin: 60px 0 36px; }
          .jr-rest { display: grid; grid-template-columns: 1fr 1fr; gap: 50px 36px; }
          @media (max-width: 1100px) {
            .jr-main { grid-template-columns: 1fr; gap: 50px; }
            .jr-side { position: static; }
          }
          @media (max-width: 700px) {
            .jr-second-row, .jr-rest { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* Subscribe wide */}
      <section className="sec jr-subscribe">
        <div className="shell jr-sub-shell">
          <div>
            <span className="num">A note in your inbox, once a month</span>
            <h2 className="serif" style={{ fontSize: 'var(--display-m)', lineHeight: 0.95, letterSpacing: '-0.02em', marginTop: 16, textWrap: 'balance' }}>
              <em style={{ color: 'var(--olive)' }}>Letters</em><br/>from Delicia.
            </h2>
          </div>
          <div className="jr-sub-right">
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--brown)' }}>One letter a month — new seasonal cakes, a kitchen note, the day we open a new shop. Sent the first Tuesday of every month. No marketing language, no spam, never sold.</p>
            <NewsletterCompact />
          </div>
        </div>
        <style>{`
          .jr-subscribe { background: var(--cream); }
          .jr-sub-shell { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
          @media (max-width: 880px) { .jr-sub-shell { grid-template-columns: 1fr; gap: 30px; } }
        `}</style>
      </section>

      <Footer setRoute={setRoute} />
    </main>
  );
};

/* ============================================================
   JOURNAL CATEGORY (sub-page)
   ============================================================ */
const JournalCategoryPage = ({ setRoute, cat }) => {
  const articles = DELICIA_ARTICLES;
  const cats = [...new Set(articles.map(a => a.cat))];
  const activeCat = cat || cats[0];
  const filtered = articles.filter(a => a.cat === activeCat);

  const [activeId, setActiveId] = useState(() => location.hash.slice(1) || null);
  useEffect(() => {
    const onHash = () => {
      setActiveId(location.hash.slice(1) || null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const article = activeId ? articles.find(a => a.id === activeId) : null;
  if (article) return <ArticleView article={article} articles={articles} setRoute={setRoute} />;

  const intro = {
    'Recipe stories': { eyebrow: 'Why the cakes are the cakes', lede: 'Essays on the recipes we keep coming back to — where they come from, what we’ve changed, what we refuse to. Long reads, mostly written late at night.' },
    'Café notes': { eyebrow: 'Dispatches from the floor', lede: 'Short pieces written from behind the counter — opening week, slow Sunday afternoons, regulars we’ve started to recognise.' },
    'Suppliers': { eyebrow: 'Where the ingredients come from', lede: 'Visits to the farms, mills and dairies on our short list of suppliers. Photos, conversations, the occasional recipe.' },
    'How-to': { eyebrow: 'Practical, useful, brief', lede: 'Small how-to pieces — how to write a cake message, store a Medovik, drink a proper espresso. Useful, never preachy.' },
    'Seasonal': { eyebrow: 'On the bench, this season', lede: 'What we’re baking right now, what’s about to come back, what we’re putting away until next year. The menu, told in essays.' },
  }[activeCat] || { eyebrow: 'From the journal', lede: '' };

  const slugMap = {
    'Recipe stories': 'recipe-stories.html',
    'Café notes': 'cafe-notes.html',
    'Suppliers': 'suppliers-journal.html',
    'How-to': 'how-to.html',
    'Seasonal': 'seasonal.html',
  };

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="journal-cat-page fade-in">
      <Breadcrumbs items={[
        { label: 'Home', href: 'index.html' },
        { label: 'Journal', href: 'blog.html' },
        { label: activeCat },
      ]} />

      <JournalMast
        kicker="The Journal · Topic"
        eyebrow={intro.eyebrow}
        title={`<em>${activeCat}.</em>`}
        lede={intro.lede}
        count={filtered.length} />

      <section className="sec">
        <div className="shell jr-main">
          <div className="jr-content">
            {featured ? (
              <>
                <a href={`blog.html#${featured.id}`} className="cat-feat">
                  <div className="cat-feat-img"><img src={featured.img} alt={featured.title} /></div>
                  <div className="cat-feat-body">
                    <div className="cat-feat-meta">
                      <span className="badge badge-olive">Most recent</span>
                      <span className="num">{featured.date} · {featured.readMin} min</span>
                    </div>
                    <h2 className="serif" style={{ fontSize: 'clamp(36px, 4.2vw, 56px)', lineHeight: 1, letterSpacing: '-0.02em', marginTop: 16 }}>{featured.title}</h2>
                    <p style={{ color: 'var(--brown)', fontSize: 16, lineHeight: 1.65, marginTop: 16, maxWidth: '46ch' }}>{featured.excerpt}</p>
                    <span className="cat-feat-read">Read the piece <span style={{ marginLeft: 6 }}>→</span></span>
                  </div>
                </a>

                {rest.length > 0 && (
                  <>
                    <hr className="jr-rule" />
                    <div className="jr-sec-head" style={{ marginBottom: 24 }}>
                      <span className="num">More in {activeCat}</span>
                      <span className="num">{rest.length} {rest.length === 1 ? 'piece' : 'pieces'}</span>
                    </div>
                    <div className="jr-rest">
                      {rest.map(a => <ArticleCard key={a.id} a={a} size="m" />)}
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="serif-i" style={{ fontSize: 24, color: 'var(--muted)', padding: '40px 0' }}>Nothing in this topic yet — check back soon.</p>
            )}
          </div>

          <JournalSidebar articles={articles} slugMap={slugMap} activeCat={activeCat} />
        </div>
        <style>{`
          .cat-feat { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; padding: 24px 0 40px; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin-bottom: 60px; cursor: pointer; }
          .cat-feat-img { aspect-ratio: 4/3; overflow: hidden; background: var(--cream); }
          .cat-feat-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); }
          .cat-feat:hover .cat-feat-img img { transform: scale(1.03); }
          .cat-feat-body { align-self: center; display: flex; flex-direction: column; }
          .cat-feat-meta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
          .cat-feat-read { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--rule); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; }
          .cat-feat:hover .cat-feat-read { color: var(--olive); }
          @media (max-width: 880px) { .cat-feat { grid-template-columns: 1fr; gap: 24px; } }
        `}</style>
      </section>

      <Footer setRoute={setRoute} />
    </main>
  );
};

/* ============================================================
   SINGLE ARTICLE VIEW — editorial typography
   ============================================================ */
const ArticleView = ({ article, articles, setRoute }) => {
  const others = articles.filter(a => a.id !== article.id);
  const sameCat = others.filter(a => a.cat === article.cat).slice(0, 2);
  const moreLikeThis = sameCat.length ? sameCat : others.slice(0, 2);
  const next = articles[(articles.findIndex(a => a.id === article.id) + 1) % articles.length];

  const slugMap = {
    'Recipe stories': 'recipe-stories.html',
    'Café notes': 'cafe-notes.html',
    'Suppliers': 'suppliers-journal.html',
    'How-to': 'how-to.html',
    'Seasonal': 'seasonal.html',
  };

  // Reading progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const article = document.querySelector('.article-body');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (total + vh)));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="article-page fade-in">
      <div className="article-progress" style={{ transform: `scaleX(${progress})` }} />

      <Breadcrumbs items={[
        { label: 'Home', href: 'index.html' },
        { label: 'Journal', href: 'blog.html' },
        { label: article.cat, href: slugMap[article.cat] || `blog.html?cat=${encodeURIComponent(article.cat)}` },
        { label: article.title.length > 40 ? article.title.slice(0, 40) + '…' : article.title },
      ]} />

      <article className="sec article-shell-sec">
        <div className="shell article-shell">
          <div className="article-meta-row">
            <a href={slugMap[article.cat] || `blog.html?cat=${encodeURIComponent(article.cat)}`} className="badge badge-olive">{article.cat}</a>
            <span className="num">{article.date}</span>
            <span className="num">{article.readMin} min read</span>
          </div>

          <h1 className="serif article-title">{article.title}</h1>
          <p className="article-deck">{article.excerpt}</p>

          <div className="article-byline">
            <div className="ab-author">
              <div className="ab-avatar" style={{ backgroundImage: `url(${article.author.startsWith('Olena') ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'})` }} />
              <div>
                <span className="num">Written by</span>
                <span className="serif-i" style={{ fontSize: 20 }}>{article.author}</span>
              </div>
            </div>
            <div className="ab-actions">
              <button className="ab-share" onClick={() => navigator.clipboard?.writeText(location.href)} title="Copy link">
                <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none"><path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-1 1"/><path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l1-1"/></svg>
                Share
              </button>
              <button className="ab-share" title="Save for later">
                <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none"><path d="M6 4h12v17l-6-4-6 4V4z"/></svg>
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="article-hero"><img src={article.img} alt={article.title} /></div>

        <div className="shell article-shell">
          <div className="article-grid">
            <div className="article-body">
              {article.body.split('\n').map((p, i) => <p key={i}>{p}</p>)}

              {/* Insert a pull quote mid-article */}
              <blockquote className="article-pull serif" style={{ lineHeight: 1.15 }}>
                “Time is the ingredient we can’t put on the label, and the one that makes the most difference.”
              </blockquote>

              <p className="article-end-note serif-i" style={{ fontSize: 17, marginTop: 30, color: 'var(--muted)' }}>
                — {article.author}, Cafe Delicia
              </p>

              {/* Inline share */}
              <div className="article-end-share">
                <span className="num">If you liked this, pass it on</span>
                <div className="article-end-share-row">
                  <button className="share-link" onClick={() => navigator.clipboard?.writeText(location.href)}>Copy link</button>
                  <a className="share-link" href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(location.href)}`}>Email</a>
                  <a className="share-link" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(location.href)}`} target="_blank" rel="noopener">Twitter</a>
                  <a className="share-link" href="#">Instagram</a>
                </div>
              </div>
            </div>

            {/* In-article sidebar: TOC-style + author card + related */}
            <aside className="article-side">
              <div className="article-side-block">
                <span className="eyebrow">In this piece</span>
                <ul className="article-side-list">
                  <li><span className="num">01</span><span>Why it matters</span></li>
                  <li><span className="num">02</span><span>How we got here</span></li>
                  <li><span className="num">03</span><span>What we changed</span></li>
                  <li><span className="num">04</span><span>What stays the same</span></li>
                </ul>
              </div>

              <div className="article-side-block author-card">
                <div className="ab-avatar large" style={{ backgroundImage: `url(${article.author.startsWith('Olena') ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'})` }} />
                <span className="num">About the author</span>
                <h4 className="serif" style={{ fontSize: 22, lineHeight: 1.1, marginTop: 6 }}>{article.author}</h4>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 10, lineHeight: 1.65 }}>
                  Co-founder of Cafe Delicia. Has been writing the journal since the kitchen had two stools and one oven.
                </p>
                <a href="founders.html" className="btn-link" style={{ marginTop: 14 }}>Read the founder bio →</a>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Continue reading */}
      <section className="sec article-continue">
        <div className="shell">
          <div className="ac-head">
            <span className="num">Continue reading</span>
            <h2 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 1, letterSpacing: '-0.02em', marginTop: 6 }}>
              More from <em style={{ color: 'var(--olive)' }}>{article.cat}.</em>
            </h2>
          </div>
          <div className="cont-grid">
            {moreLikeThis.map(a => <ArticleCard key={a.id} a={a} size="m" />)}
          </div>
        </div>
        <style>{`
          .article-continue { background: var(--paper); }
          .ac-head { padding-bottom: 24px; margin-bottom: 36px; border-bottom: 1px solid var(--rule); }
          .cont-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
          @media (max-width: 760px) { .cont-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* Next article */}
      <section className="next-article-sec">
        <a href={`blog.html#${next.id}`} className="next-article">
          <div className="next-article-img"><img src={next.img} alt={next.title} /></div>
          <div className="next-article-body">
            <span className="num">Next in the journal →</span>
            <h3 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, letterSpacing: '-0.02em', marginTop: 14 }}>{next.title}</h3>
            <span className="num" style={{ marginTop: 16, display: 'block' }}>{next.cat} · {next.readMin} min · {next.author}</span>
          </div>
        </a>
        <style>{`
          .next-article-sec { background: var(--ink); color: var(--cream); }
          .next-article { display: grid; grid-template-columns: 1fr 1.2fr; min-height: 360px; cursor: pointer; }
          .next-article-img { overflow: hidden; }
          .next-article-img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85); transition: transform 1s cubic-bezier(.2,.7,.2,1); }
          .next-article:hover .next-article-img img { transform: scale(1.03); }
          .next-article-body { padding: 60px 80px; display: flex; flex-direction: column; justify-content: center; }
          .next-article .num { color: rgba(232, 221, 196, 0.65); }
          .next-article em { font-style: italic; color: var(--cream); }
          @media (max-width: 880px) { .next-article { grid-template-columns: 1fr; } .next-article-body { padding: 40px 24px; } }
        `}</style>
      </section>

      <Footer setRoute={setRoute} />

      <style>{`
        .article-progress {
          position: fixed; top: 0; left: 0; right: 0;
          height: 3px; background: var(--olive);
          transform-origin: left center;
          z-index: 100;
          transition: transform .1s linear;
        }
        .article-shell { max-width: 1200px; }
        .article-shell-sec { padding-top: 30px; }
        .article-meta-row { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
        .article-title {
          font-size: clamp(48px, 6.5vw, 96px);
          line-height: 0.95; letter-spacing: -0.025em;
          margin-top: 26px; text-wrap: balance;
          max-width: 16ch;
        }
        .article-deck {
          font-family: var(--serif); font-style: italic;
          font-size: clamp(22px, 2.2vw, 30px); line-height: 1.4;
          color: var(--muted);
          margin-top: 24px; max-width: 30ch;
        }
        .article-byline {
          margin-top: 36px; padding: 22px 0;
          border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
          display: flex; justify-content: space-between; align-items: center; gap: 18px; flex-wrap: wrap;
        }
        .ab-author { display: flex; gap: 14px; align-items: center; }
        .ab-author > div { display: flex; flex-direction: column; gap: 2px; }
        .ab-avatar { width: 48px; height: 48px; border-radius: 999px; background: var(--cream) center/cover no-repeat; flex-shrink: 0; }
        .ab-avatar.large { width: 80px; height: 80px; margin-bottom: 14px; }
        .ab-actions { display: flex; gap: 8px; }
        .ab-share {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 16px; border: 1px solid var(--rule-strong); border-radius: 999px;
          font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
          transition: background .2s ease, color .2s ease, border-color .2s ease;
        }
        .ab-share:hover { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .article-hero {
          height: 70vh; min-height: 480px; max-height: 760px;
          background: var(--cream); overflow: hidden;
          margin: 40px 0 50px;
        }
        .article-hero img { width: 100%; height: 100%; object-fit: cover; }
        .article-grid {
          display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 80px;
        }
        .article-body {
          font-family: var(--serif); font-size: 20px; line-height: 1.7;
          color: var(--ink);
          display: flex; flex-direction: column; gap: 24px;
          max-width: 64ch;
        }
        .article-body p:first-of-type::first-letter {
          font-family: var(--serif); font-style: italic;
          font-size: 88px; line-height: 0.8;
          float: left; padding-right: 12px; padding-top: 8px;
          color: var(--olive);
        }
        .article-pull {
          font-size: clamp(28px, 3vw, 40px);
          font-style: italic; color: var(--olive);
          border-left: 3px solid var(--olive);
          padding: 0 0 0 24px;
          margin: 16px 0 8px;
          font-weight: 400;
        }
        .article-end-share { margin-top: 50px; padding-top: 30px; border-top: 1px solid var(--rule); }
        .article-end-share-row { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
        .share-link { padding: 10px 16px; border: 1px solid var(--rule-strong); border-radius: 999px; font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; transition: background .2s ease, color .2s ease, border-color .2s ease; font-family: var(--sans); }
        .share-link:hover { background: var(--ink); color: var(--paper); border-color: var(--ink); }

        .article-side { display: flex; flex-direction: column; gap: 32px; align-self: start; position: sticky; top: 110px; }
        .article-side-block { padding: 22px 24px; background: var(--paper); border-top: 2px solid var(--ink); }
        .article-side-list { list-style: none; display: flex; flex-direction: column; margin-top: 12px; }
        .article-side-list li { display: grid; grid-template-columns: 30px 1fr; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--rule); font-size: 14.5px; }
        .article-side-list li:last-child { border-bottom: 0; }
        .author-card { border-top-color: var(--olive); }

        @media (max-width: 1100px) {
          .article-grid { grid-template-columns: 1fr; gap: 50px; }
          .article-side { position: static; }
        }
      `}</style>
    </main>
  );
};



/* ===== pages/home.jsx ===== */
// Home page — editorial, magazine feel
const HomePage = ({ setRoute, addToCart, openProduct, tweaks }) => {
  const { items } = DELICIA_DATA;
  const signature = ['napoleon', 'medovik', 'spartak', 'kyiv', 'pavlova', 'sernyk'].map(id => items.find(i => i.id === id));
  const popular = items.filter(i => i.badges?.includes('Popular') || i.badges?.includes('Signature')).slice(0, 6);

  return (
    <main className="home fade-in">

      {/* ───────────── HERO ───────────── */}
      <HomeHero variant={tweaks.heroVariant} setRoute={setRoute} />

      {/* ───────────── MOMENT STRIP — small index marquee under hero ───────────── */}
      <section className="strip">
        <div className="shell strip-row">
          <span className="num">EST · MMXXVI</span>
          <span className="strip-dot" />
          <span className="eyebrow">European desserts · Ukrainian soul</span>
          <span className="strip-dot" />
          <span className="num">Etobicoke · 43.6532° N</span>
          <span className="strip-dot" />
          <span className="eyebrow">Open daily 8 → 8</span>
        </div>
        <style>{`
          .strip { border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); padding: 18px 0; background: var(--paper); }
          .strip-row { display: flex; align-items: center; gap: 22px; justify-content: center; flex-wrap: wrap; }
          .strip-dot { width: 4px; height: 4px; background: var(--ink); border-radius: 999px; opacity: .4; }
        `}</style>
      </section>

      {/* ───────────── PRESS STRIP — small, restrained ───────────── */}
      <section className="press-strip">
        <div className="shell press-row">
          <span className="eyebrow" style={{ whiteSpace: 'nowrap' }}>As mentioned in</span>
          <div className="press-marks">
            <span className="press-mark serif" style={{ fontWeight: 500, fontSize: 22 }}>blogTO</span>
            <span className="press-mark serif-i" style={{ fontSize: 22 }}>Toronto Life</span>
            <span className="press-mark" style={{ letterSpacing: '0.3em', fontSize: 13, fontWeight: 600 }}>THE GLOBE &amp; MAIL</span>
            <span className="press-mark serif" style={{ fontSize: 22 }}>Daily Hive</span>
            <span className="press-mark" style={{ letterSpacing: '0.32em', fontSize: 12, fontWeight: 600 }}>NARCITY · TO</span>
          </div>
        </div>
        <style>{`
          .press-strip { padding: 30px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); background: var(--paper); }
          .press-row { display: flex; align-items: center; gap: 40px; }
          .press-marks { display: flex; align-items: center; gap: 48px; flex-wrap: wrap; opacity: .72; flex: 1; justify-content: space-around; }
          .press-mark { color: var(--ink); }
          @media (max-width: 760px) {
            .press-row { flex-direction: column; gap: 16px; }
            .press-marks { gap: 24px 32px; }
          }
        `}</style>
      </section>

      {/* ───────────── SIGNATURE — large catalog of named cakes ───────────── */}
      <section className="sec">
        <div className="shell">
          <SecHead
            num="01 / 08"
            eyebrow="The signature counter"
            title="Six cakes we are <em>known for.</em>"
            link={{ label: 'Browse the full menu', onClick: () => setRoute({ name: 'menu' }) }}
          />
          <div className="sig-grid">
            {signature.map((it, i) => (
              <article key={it.id} className={"sig-card sig-" + i} onClick={() => openProduct(it)}>
                <div className="sig-img">
                  <img src={it.img} alt={it.name} />
                  <span className="sig-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="sig-body">
                  <h3 className="serif" style={{ fontSize: 32, lineHeight: 1, letterSpacing: '-0.01em' }}>{it.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>{it.tagline}</p>
                  <div className="sig-foot">
                    <span className="serif-i" style={{ fontSize: 18 }}>${it.price.toFixed(2)}</span>
                    <span className="num">· {it.unit}</span>
                    <button className="btn-link" onClick={(e) => { e.stopPropagation(); addToCart(it); }}>Add to order →</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .sig-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 60px 32px;
          }
          .sig-card { cursor: pointer; }
          .sig-0 { grid-column: span 7; }
          .sig-1 { grid-column: span 5; }
          .sig-2 { grid-column: span 5; }
          .sig-3 { grid-column: span 7; }
          .sig-4 { grid-column: span 7; }
          .sig-5 { grid-column: span 5; }
          .sig-img { position: relative; aspect-ratio: 4/3; overflow: hidden; background: var(--cream); }
          .sig-card.sig-0 .sig-img, .sig-card.sig-3 .sig-img, .sig-card.sig-4 .sig-img { aspect-ratio: 16/11; }
          .sig-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); }
          .sig-card:hover .sig-img img { transform: scale(1.04); }
          .sig-num {
            position: absolute; left: 16px; top: 14px;
            font-family: var(--serif); font-style: italic; font-size: 16px;
            color: var(--paper); mix-blend-mode: difference; opacity: .85;
          }
          .sig-body { padding: 22px 4px 0; display: flex; flex-direction: column; gap: 8px; }
          .sig-foot { display: flex; align-items: baseline; gap: 10px; padding-top: 16px; margin-top: 8px; border-top: 1px solid var(--rule); }
          .sig-foot .btn-link { margin-left: auto; }
          @media (max-width: 880px) {
            .sig-grid { grid-template-columns: 1fr 1fr; gap: 40px 22px; }
            .sig-0, .sig-1, .sig-2, .sig-3, .sig-4, .sig-5 { grid-column: span 1; grid-column-start: auto; }
          }
        `}</style>
      </section>

      {/* ───────────── STORY — editorial split with right-aligned label + CTA ───────────── */}
      <section className="sec story-sec">
        <div className="shell story-grid">
          <div className="story-left">
            <span className="story-vert">— A NOTE FROM THE KITCHEN</span>
          </div>
          <div className="story-mid">
            <div className="story-mid-head">
              <h2 className="serif" style={{ fontSize: 'var(--display-m)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                No powder. <em style={{ color: 'var(--olive)' }}>No shortcuts.</em><br />
                Real butter, real cream,<br />
                real time on the bench.
              </h2>
              <span className="num story-num">02 / 08</span>
            </div>
            <div className="story-body">
              <p>We started Delicia because the cakes we missed weren’t the ones we could find. Napoleon laminated by hand, sour cream that smells of the dairy, honey that came from a hive an hour outside Toronto.</p>
              <p>Everything is mixed in our small kitchen above the café. Layers rest overnight before they’re built. Some recipes were our grandmothers’. Some came home with us from a market in Lviv.</p>
              <div className="story-stats">
                <div><span className="serif-i">14</span><span className="num">layers in a Medovik</span></div>
                <div><span className="serif-i">36h</span><span className="num">resting time</span></div>
                <div><span className="serif-i">0</span><span className="num">artificial flavours</span></div>
              </div>
            </div>
            <div className="story-foot">
              <span className="num story-foot-meta">Continue reading →</span>
              <button className="btn btn-olive" onClick={() => setRoute({ name: 'about' })}>Read our story</button>
            </div>
          </div>
          <div className="story-right">
            <div className="story-img a"><img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80" alt="Hands working dough" /></div>
            <div className="story-img b"><img src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=600&q=80" alt="Honey jar" /></div>
          </div>
        </div>

        <style>{`
          .story-sec { background: var(--cream); }
          .story-grid { display: grid; grid-template-columns: 60px 1fr 0.9fr; gap: 56px; align-items: start; }
          .story-vert {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            font-size: 11px;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: var(--muted);
          }
          .story-mid { padding-top: 8px; display: flex; flex-direction: column; }
          .story-mid em { font-style: italic; }
          .story-mid-head {
            display: flex; justify-content: space-between; align-items: flex-start; gap: 30px;
            padding-bottom: 24px; border-bottom: 1px solid var(--rule);
          }
          .story-mid-head h2 { flex: 1; }
          .story-num { padding-top: 14px; white-space: nowrap; }
          .story-body { margin-top: 32px; max-width: 56ch; display: flex; flex-direction: column; gap: 16px; color: var(--brown); }
          .story-body p { font-size: 15.5px; line-height: 1.65; }
          .story-stats { display: flex; gap: 36px; margin-top: 14px; padding-top: 22px; border-top: 1px solid var(--rule); }
          .story-stats > div { display: flex; flex-direction: column; gap: 4px; }
          .story-stats .serif-i { font-family: var(--serif); font-style: italic; font-size: 56px; line-height: 1; color: var(--ink); }
          .story-foot {
            margin-top: 36px; padding-top: 24px;
            border-top: 1px solid var(--rule);
            display: flex; justify-content: space-between; align-items: center; gap: 20px;
          }
          .story-foot-meta { color: var(--muted); }
          .story-right { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; padding-top: 30px; }
          .story-img { aspect-ratio: 3/4; overflow: hidden; background: var(--paper); }
          .story-img.b { aspect-ratio: 1; align-self: end; margin-top: 60px; }
          .story-img img { width: 100%; height: 100%; object-fit: cover; }
          @media (max-width: 980px) {
            .story-grid { grid-template-columns: 1fr; gap: 32px; }
            .story-vert { writing-mode: horizontal-tb; transform: none; }
            .story-stats { flex-wrap: wrap; gap: 24px; }
            .story-stats .serif-i { font-size: 40px; }
            .story-foot { flex-direction: column; align-items: stretch; }
          }
        `}</style>
      </section>

      {/* ───────────── VOICES — testimonials slider ───────────── */}
      <VoicesSlider />

      {/* ───────────── MENU PREVIEW — three-up product cards ───────────── */}
      <section className="sec">
        <div className="shell">
          <SecHead
            num="04 / 08"
            eyebrow="From the menu, this week"
            title="Small things to <em>add</em> to your visit."
            link={{ label: 'Open the full menu', onClick: () => setRoute({ name: 'menu' }) }}
          />
          <div className="three-grid">
            {popular.slice(0, 6).map((it, i) => (
              <ProductCard key={it.id} item={it} index={i} onOpen={openProduct} onAdd={addToCart} variant={tweaks.cardStyle === 'editorial' ? 'editorial' : 'tall'} />
            ))}
          </div>
        </div>
        <style>{`
          .three-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 24px; }
          @media (max-width: 980px) { .three-grid { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 600px) { .three-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* ───────────── EXPERIENCE — four-quadrant ───────────── */}
      <section className="sec exp-sec">
        <div className="shell">
          <SecHead
            num="05 / 08"
            eyebrow="Ways to come to Delicia"
            title="<em>Four</em> ways to share a cake with us."
          />
          <div className="exp-grid">
            {[
              { title: 'Dine in', desc: 'Espresso, slice of Medovik, a corner table by the window. No rush.', kicker: 'EVERY DAY' },
              { title: 'Take-out', desc: 'Single slices and whole cakes, boxed for the walk home.', kicker: 'SAME DAY' },
              { title: 'Pre-order cakes', desc: 'Whole cakes for birthdays and celebrations, baked the day you collect.', kicker: '48 HOURS' },
              { title: 'Corporate orders', desc: 'Boxes of dessert for offices, meetings, small events around the GTA.', kicker: 'BY ARRANGEMENT' },
            ].map((c, i) => (
              <div key={i} className="exp-card" onClick={() => i === 3 ? setRoute({ name: 'visit', section: 'corporate' }) : setRoute({ name: 'menu' })}>
                <span className="num exp-num">0{i + 1}</span>
                <span className="eyebrow exp-kicker" style={{ marginTop: 24 }}>{c.kicker}</span>
                <h4 className="serif exp-title" style={{ fontSize: 36, lineHeight: 1, marginTop: 10, letterSpacing: '-0.01em' }}>{c.title}</h4>
                <p className="exp-desc">{c.desc}</p>
                <span className="exp-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .exp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
          .exp-card {
            background: var(--paper);
            padding: 32px 28px 28px;
            min-height: 320px;
            display: flex; flex-direction: column; gap: 4px;
            position: relative;
            cursor: pointer;
            transition: background .25s ease, color .25s ease;
          }
          .exp-num, .exp-kicker { color: var(--muted); transition: color .25s ease; }
          .exp-title { color: var(--ink); transition: color .25s ease; }
          .exp-desc { font-size: 14.5px; margin-top: 10px; max-width: 30ch; color: var(--muted); transition: color .25s ease; line-height: 1.55; }
          .exp-card:hover { background: var(--olive); }
          .exp-card:hover .exp-num,
          .exp-card:hover .exp-kicker,
          .exp-card:hover .exp-title,
          .exp-card:hover .exp-desc,
          .exp-card:hover .exp-arrow { color: var(--paper); }
          .exp-card:hover .exp-num,
          .exp-card:hover .exp-kicker { opacity: .8; }
          .exp-arrow { position: absolute; bottom: 24px; right: 28px; font-size: 22px; color: var(--ink); transition: color .25s ease; }
          @media (max-width: 880px) {
            .exp-grid { grid-template-columns: 1fr 1fr; }
          }
        `}</style>
      </section>

      {/* ───────────── CUSTOM CAKES — full bleed with image ───────────── */}
      <section className="custom-sec">
        <div className="custom-grid">
          <div className="custom-img">
            <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1400&q=80" alt="" />
          </div>
          <div className="custom-text">
            <span className="num">06 / 08</span>
            <h2 className="serif" style={{ fontSize: 'var(--display-l)', lineHeight: 0.9, letterSpacing: '-0.02em', marginTop: 14 }}>
              A cake<br />for the <em style={{ color: 'var(--olive)' }}>day that matters.</em>
            </h2>
            <p style={{ maxWidth: '40ch', color: 'var(--muted)', fontSize: 16, lineHeight: 1.65, marginTop: 22 }}>
              Birthday cakes, christening cakes, anniversary cakes. Tell us the moment, the size and the names we should write — we’ll do the rest.
            </p>
            <ul className="custom-list">
              <li><span className="num">·</span> 48 hours notice for whole cakes</li>
              <li><span className="num">·</span> Sizes from 0.7 kg to 2.5 kg</li>
              <li><span className="num">·</span> Hand-piped messages and florals</li>
              <li><span className="num">·</span> Allergen-aware on request</li>
            </ul>
            <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
              <button className="btn btn-primary" onClick={() => setRoute({ name: 'visit', section: 'contact' })}>Request a cake order</button>
              <button className="btn btn-ghost" onClick={() => setRoute({ name: 'menu', cat: 'cakes' })}>See all cakes</button>
            </div>
          </div>
        </div>
        <style>{`
          .custom-sec { background: var(--ink); color: var(--cream); padding: 0; }
          .custom-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
          .custom-img { overflow: hidden; background: var(--cream); }
          .custom-img img { width: 100%; height: 100%; object-fit: cover; }
          .custom-text { padding: 80px 80px 80px 80px; display: flex; flex-direction: column; justify-content: center; }
          .custom-text .num, .custom-text .eyebrow { color: var(--cream); opacity: .65; }
          .custom-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: 26px; font-size: 14.5px; opacity: .85; }
          @media (max-width: 980px) {
            .custom-grid { grid-template-columns: 1fr; }
            .custom-img { aspect-ratio: 4/3; }
            .custom-text { padding: 60px 24px; }
          }
        `}</style>
      </section>

      {/* ───────────── INSIDE DELICIA — gallery / lookbook ───────────── */}
      <section className="sec gallery-sec">
        <div className="shell">
          <SecHead num="07 / 08" eyebrow="Inside Delicia" title="A little <em>look around.</em>"
                   link={{ label: 'See more on Instagram', onClick: () => window.open('https://instagram.com/cafedelicia', '_blank') }} />
          <div className="gallery-grid">
            <figure className="g g1"><img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80" alt="The café room in afternoon light" /><figcaption><span className="num">Plate 01</span><span className="serif-i">The room, late afternoon</span></figcaption></figure>
            <figure className="g g2"><img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80" alt="Hands lifting a cake layer" /><figcaption><span className="num">02</span><span className="serif-i">Lifting layers</span></figcaption></figure>
            <figure className="g g3"><img src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=700&q=80" alt="Local honey" /><figcaption><span className="num">03</span><span className="serif-i">Local honey</span></figcaption></figure>
            <figure className="g g4"><img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80" alt="Cappuccino at the counter" /><figcaption><span className="num">04</span><span className="serif-i">Cappuccino, counter</span></figcaption></figure>
            <figure className="g g5"><img src="https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=900&q=80" alt="Macarons on a tray" /><figcaption><span className="num">05</span><span className="serif-i">Tray of macarons</span></figcaption></figure>
            <figure className="g g6"><img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80" alt="Pavlova close-up" /><figcaption><span className="num">06</span><span className="serif-i">Pavlova, close</span></figcaption></figure>
          </div>
        </div>
        <style>{`
          .gallery-sec { background: var(--paper); }
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-auto-rows: 140px;
            gap: 12px;
          }
          .g { position: relative; overflow: hidden; background: var(--cream); margin: 0; }
          .g img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); }
          .g:hover img { transform: scale(1.04); }
          .g figcaption {
            position: absolute; left: 16px; bottom: 14px;
            display: flex; flex-direction: column;
            background: rgba(251, 247, 238, 0.92);
            backdrop-filter: blur(8px);
            padding: 8px 12px;
            opacity: 0;
            transition: opacity .3s ease;
          }
          .g:hover figcaption { opacity: 1; }
          .g figcaption .num { font-size: 10px; }
          .g figcaption .serif-i { font-size: 15px; line-height: 1.1; }
          .g1 { grid-column: span 7; grid-row: span 4; }
          .g2 { grid-column: span 5; grid-row: span 2; }
          .g3 { grid-column: span 5; grid-row: span 2; }
          .g4 { grid-column: span 4; grid-row: span 3; }
          .g5 { grid-column: span 4; grid-row: span 3; }
          .g6 { grid-column: span 4; grid-row: span 3; }
          @media (max-width: 760px) {
            .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; }
            .g1, .g2, .g3, .g4, .g5, .g6 { grid-column: span 1; grid-row: span 1; }
            .g1 { grid-column: span 2; grid-row: span 2; }
          }
        `}</style>
      </section>

      {/* ───────────── VISIT — map + hours ───────────── */}
      <section className="sec">
        <div className="shell">
          <SecHead
            num="08 / 08"
            eyebrow="Visit the café"
            title="A small corner of <em>Bloor West</em>, set for cake."
            link={{ label: 'Open contact page', onClick: () => setRoute({ name: 'visit' }) }}
          />
          <div className="visit-grid">
            <div className="visit-card">
              <span className="eyebrow">The address</span>
              <h4 className="serif" style={{ fontSize: 30, lineHeight: 1.1, marginTop: 10 }}>2456 Bloor Street West<br/>Etobicoke, ON M8X 1A8</h4>
              <div className="visit-meta">
                <div><Icon.Pin /><span>2 min from Jane station</span></div>
                <div><Icon.Phone /><span>(416) 555 0148</span></div>
                <div><Icon.Mail /><span>hello@cafedelicia.ca</span></div>
              </div>
              <a className="btn btn-primary" style={{ marginTop: 26 }} href="https://www.google.com/maps/search/?api=1&query=2456+Bloor+St+W+Etobicoke+ON" target="_blank" rel="noopener">Get directions</a>
            </div>

            <div className="visit-hours">
              <span className="eyebrow">Opening hours</span>
              <ul>
                {[['Mon', 'Closed'], ['Tue', '8 AM — 8 PM'], ['Wed', '8 AM — 8 PM'], ['Thu', '8 AM — 8 PM'], ['Fri', '8 AM — 9 PM'], ['Sat', '9 AM — 9 PM'], ['Sun', '9 AM — 7 PM']].map(([d, t]) => (
                  <li key={d}><span>{d}</span><span className="serif-i">{t}</span></li>
                ))}
              </ul>
            </div>

            <div className="visit-map">
              <FakeMap />
              <div className="visit-pin">
                <span className="serif-i">Delicia</span>
                <span className="num">2456 Bloor W</span>
              </div>
            </div>
          </div>

          {/* Quick contact form — accordion under the grid */}
          <HomeQuickContact />
        </div>
        <style>{`
          .visit-grid { display: grid; grid-template-columns: 1fr 1fr 1.4fr; gap: 24px; }
          .visit-card, .visit-hours { background: var(--paper); padding: 40px; }
          .visit-meta { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
          .visit-meta > div { display: flex; gap: 10px; align-items: center; font-size: 14.5px; color: var(--muted); }
          .visit-hours ul { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: 18px; }
          .visit-hours li { display: flex; justify-content: space-between; font-size: 15px; padding: 6px 0; border-bottom: 1px solid var(--rule); }
          .visit-hours .serif-i { color: var(--olive); }
          .visit-map { position: relative; background: var(--cream); overflow: hidden; min-height: 480px; }
          .visit-pin { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -100%); padding: 12px 16px; background: var(--paper); box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 2px; align-items: center; }
          .visit-pin::after { content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: var(--paper); }
          .visit-pin .serif-i { font-size: 22px; line-height: 1; }
          @media (max-width: 980px) { .visit-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* ───────────── INSTAGRAM — placeholder grid ───────────── */}
      <section className="sec-tight">
        <div className="shell">
          <div className="ig-head">
            <div>
              <span className="eyebrow">@cafedelicia</span>
              <h2 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 1, letterSpacing: '-0.02em', marginTop: 8 }}>Follow the <em style={{color:'var(--olive)'}}>opening journey.</em></h2>
            </div>
            <a className="btn btn-ghost" href="#">Follow on Instagram</a>
          </div>
          <div className="ig-grid">
            {[
              '1565958011703-44f9829ba187', '1488477181946-6428a0291777', '1571877227200-a0d98ea607e9',
              '1509042239860-f550ce710b93', '1569864358642-9d1684040f43', '1606313564200-e75d5e30476c',
            ].map((id, i) => (
              <a key={i} className="ig-tile" href="#">
                <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=500&q=70`} alt="" />
                <span className="ig-hover"><Icon.Insta /></span>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          .ig-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 32px; }
          .ig-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
          .ig-tile { position: relative; aspect-ratio: 1; overflow: hidden; background: var(--cream); }
          .ig-tile img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
          .ig-tile:hover img { transform: scale(1.05); }
          .ig-hover { position: absolute; inset: 0; display: grid; place-items: center; background: rgba(74, 53, 32, 0.6); color: var(--cream); opacity: 0; transition: opacity .25s ease; }
          .ig-tile:hover .ig-hover { opacity: 1; }
          @media (max-width: 760px) { .ig-grid { grid-template-columns: repeat(3, 1fr); } }
        `}</style>
      </section>

      {/* ───────────── JOURNAL TEASER ───────────── */}
      <section className="sec journal-tease-sec">
        <div className="shell">
          <SecHead num="·" eyebrow="From the journal" title="Pieces we’ve <em>been writing.</em>"
                   link={{ label: 'Read all pieces', onClick: () => setRoute({ name: 'blog' }) }} />
          <div className="jt-grid">
            {(DELICIA_ARTICLES).slice(0, 3).map((a, i) => (
              <a key={a.id} href={`blog.html#${a.id}`} className="jt-card">
                <div className="jt-img"><img src={a.img} alt={a.title} loading="lazy" /></div>
                <div className="jt-body">
                  <div className="jt-meta">
                    <span className="badge badge-outline">{a.cat}</span>
                    <span className="num">{a.readMin} min</span>
                  </div>
                  <h3 className="serif" style={{ fontSize: 24, lineHeight: 1.2, marginTop: 14, letterSpacing: '-0.005em' }}>{a.title}</h3>
                  <p className="jt-excerpt">{a.excerpt}</p>
                  <span className="jt-foot">
                    <span className="serif-i" style={{ fontSize: 15 }}>{a.author}</span>
                    <span className="num">{a.date}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          .journal-tease-sec { background: var(--bg); }
          .jt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px 28px; }
          .jt-card { display: flex; flex-direction: column; cursor: pointer; transition: transform .25s ease; background: var(--paper); }
          .jt-card:hover { transform: translateY(-3px); }
          .jt-img { aspect-ratio: 4/3; overflow: hidden; background: var(--cream); }
          .jt-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); }
          .jt-card:hover .jt-img img { transform: scale(1.04); }
          .jt-body { padding: 22px 22px 22px; display: flex; flex-direction: column; flex: 1; }
          .jt-meta { display: flex; gap: 10px; align-items: center; }
          .jt-excerpt { color: var(--muted); font-size: 14px; line-height: 1.6; margin-top: 12px; }
          .jt-foot { margin-top: auto; padding-top: 16px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
          @media (max-width: 880px) { .jt-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section className="final-cta">
        <div className="shell">
          <span className="num">A note before you go</span>
          <h2 className="serif" style={{ fontSize: 'var(--display-xl)', lineHeight: 0.88, letterSpacing: '-0.03em', marginTop: 14 }}>
            Plan your visit.<br/>
            <em style={{ color: 'var(--olive)' }}>Order a cake.</em><br/>
            Stay for coffee.
          </h2>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <button className="btn btn-primary" onClick={() => setRoute({ name: 'menu' })}>Order desserts</button>
            <button className="btn btn-ghost" onClick={() => setRoute({ name: 'visit' })}>Plan a visit</button>
          </div>
        </div>
        <style>{`
          .final-cta { padding: 160px 0 180px; border-top: 1px solid var(--rule); }
          @media (max-width: 880px) { .final-cta { padding: 90px 0; } }
        `}</style>
      </section>

      <Footer setRoute={setRoute} />
    </main>
  );
};

/* ============================================================
   HERO variants — different compositions
   ============================================================ */
const HomeHero = ({ variant, setRoute }) => {
  if (variant === 'split') {
    return (
      <section className="hero hero-split">
        <div className="shell hero-split-grid">
          <div className="hero-split-text">
            <span className="num">Etobicoke · Toronto area · est. 2026</span>
            <h1 className="serif" style={{ fontSize: 'var(--display-xl)', lineHeight: 0.88, letterSpacing: '-0.03em', marginTop: 18 }}>
              European<br />
              desserts,<br />
              <em style={{ color: 'var(--olive)' }}>coffee</em><br />
              & cozy<br />
              moments.
            </h1>
            <p style={{ maxWidth: '40ch', color: 'var(--muted)', fontSize: 17, lineHeight: 1.6, marginTop: 28 }}>
              Cafe Delicia brings handcrafted cakes, cookies, ice cream and warm café culture to the Toronto area — made with premium natural ingredients, never powders or shortcuts.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button className="btn btn-primary" onClick={() => setRoute({ name: 'menu' })}>Order desserts</button>
              <button className="btn btn-ghost" onClick={() => setRoute({ name: 'menu' })}>View menu</button>
            </div>
          </div>
          <div className="hero-split-img">
            <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1400&q=85" alt="" />
            <div className="hero-split-tag">
              <span className="num">No. 01</span>
              <span className="serif-i" style={{ fontSize: 22 }}>Napoleon</span>
              <span className="eyebrow">Sixteen layers, hand-laminated</span>
            </div>
          </div>
        </div>
        <style>{`
          .hero { padding: 60px 0 100px; position: relative; }
          .hero-split-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 60px; align-items: center; }
          .hero-split-img { position: relative; aspect-ratio: 4/5; overflow: hidden; background: var(--cream); }
          .hero-split-img img { width: 100%; height: 100%; object-fit: cover; }
          .hero-split-tag { position: absolute; left: 24px; bottom: 24px; padding: 18px 22px; background: var(--paper); display: flex; flex-direction: column; gap: 4px; }
          @media (max-width: 980px) { .hero-split-grid { grid-template-columns: 1fr; } .hero-split-img { aspect-ratio: 4/3; } }
        `}</style>
      </section>
    );
  }

  if (variant === 'type') {
    return (
      <section className="hero hero-type">
        <div className="shell">
          <div className="hero-type-meta">
            <span className="num">Etobicoke · 2456 Bloor St W</span>
            <span className="num">EST. MMXXVI</span>
            <span className="num">Vol. 01</span>
          </div>
          <h1 className="serif" style={{
            fontSize: 'clamp(80px, 18vw, 320px)', lineHeight: 0.82, letterSpacing: '-0.04em',
            textWrap: 'balance', marginTop: 30,
          }}>
            Cakes,<br />
            <em style={{ color: 'var(--olive)' }}>coffee</em> &<br />
            cozy moments.
          </h1>
          <div className="hero-type-foot">
            <p style={{ maxWidth: '46ch', color: 'var(--muted)', fontSize: 17, lineHeight: 1.55 }}>
              A warm European dessert café with Ukrainian soul. Handcrafted cakes, cookies and slow-brewed coffee, made with premium natural ingredients in Etobicoke.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" onClick={() => setRoute({ name: 'menu' })}>Order desserts</button>
              <button className="btn btn-ghost" onClick={() => setRoute({ name: 'visit' })}>Visit us</button>
            </div>
          </div>
          <div className="hero-type-strip">
            {['1565958011703-44f9829ba187', '1488477181946-6428a0291777', '1571877227200-a0d98ea607e9', '1509042239860-f550ce710b93', '1569864358642-9d1684040f43'].map((id, i) => (
              <div key={i} className="hero-type-tile"><img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=70`} alt="" /></div>
            ))}
          </div>
        </div>
        <style>{`
          .hero-type { padding: 40px 0 60px; }
          .hero-type-meta { display: flex; justify-content: space-between; gap: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--rule); flex-wrap: wrap; }
          .hero-type-foot { display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; margin-top: 40px; }
          .hero-type-strip { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 50px; }
          .hero-type-tile { aspect-ratio: 4/5; overflow: hidden; background: var(--cream); }
          .hero-type-tile img { width: 100%; height: 100%; object-fit: cover; }
          @media (max-width: 760px) {
            .hero-type-foot { flex-direction: column; align-items: flex-start; }
            .hero-type-strip { grid-template-columns: repeat(3, 1fr); }
          }
        `}</style>
      </section>
    );
  }

  // image-led (default) — slideshow with crossfade
  return <HeroImageSlideshow setRoute={setRoute} />;
};

/* ============================================================
   Hero image slideshow — autoplays, manual dots, crossfade
   ============================================================ */
const HeroImageSlideshow = ({ setRoute }) => {
  const slides = [
    { img: '1565958011703-44f9829ba187', no: 'No. 01', name: 'Napoleon', sub: 'Sixteen layers, hand-laminated' },
    { img: '1578985545062-69928b1d9587', no: 'No. 02', name: 'Medovik', sub: 'Honey, rested overnight' },
    { img: '1488477181946-6428a0291777', no: 'No. 03', name: 'Pavlova', sub: 'Crisp shell, marshmallow centre' },
    { img: '1606313564200-e75d5e30476c', no: 'No. 04', name: 'Spartak', sub: 'Eight cocoa layers, sour cream' },
    { img: '1554118811-1e0d58224f24', no: 'No. 05', name: 'The room', sub: 'Late afternoon at Delicia' },
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // autoplay 6s
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => setActive(a => (a + 1) % slides.length), 6000);
    return () => clearTimeout(timerRef.current);
  }, [active, paused, slides.length]);

  // Preload next image
  useEffect(() => {
    const next = (active + 1) % slides.length;
    const img = new Image();
    img.src = `https://images.unsplash.com/photo-${slides[next].img}?auto=format&fit=crop&w=2200&q=85`;
  }, [active, slides]);

  const goPrev = () => setActive(a => (a - 1 + slides.length) % slides.length);
  const goNext = () => setActive(a => (a + 1) % slides.length);

  return (
    <section className="hero hero-image" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-image-bg">
        {slides.map((s, i) => (
          <img key={i} src={`https://images.unsplash.com/photo-${s.img}?auto=format&fit=crop&w=2200&q=85`}
               alt="" className={"hero-slide " + (i === active ? 'on' : '')} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
        <div className="hero-image-scrim" />
      </div>

      <div className="shell hero-image-content">
        <div className="hero-image-meta">
          <span className="num">Etobicoke · Toronto area · est. 2026</span>
          <span className="num">No. 01 — The Cake Issue</span>
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(64px, 11vw, 188px)', lineHeight: 0.9, letterSpacing: '-0.03em', marginTop: 'auto', color: 'var(--paper)' }}>
          European desserts,<br/>
          <em style={{ fontStyle: 'italic' }}>coffee</em> & cozy<br/>
          moments in<br/>
          Etobicoke.
        </h1>
        <div className="hero-image-foot">
          <p style={{ maxWidth: '44ch', color: 'rgba(251, 247, 238, 0.85)', fontSize: 16.5, lineHeight: 1.55 }}>
            Handcrafted cakes, cookies, ice cream and coffee — made with premium natural ingredients. Dine in, take out, or pre-order a cake for the day that matters.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn" style={{ background: 'var(--paper)', color: 'var(--ink)' }} onClick={() => setRoute({ name: 'menu' })}>Order desserts</button>
            <button className="btn" style={{ background: 'transparent', color: 'var(--paper)', border: '1px solid rgba(251, 247, 238, 0.5)' }} onClick={() => setRoute({ name: 'menu' })}>View menu</button>
          </div>
        </div>

        {/* Slideshow caption + controls */}
        <div className="hero-caption">
          <div className="hero-cap-text">
            <span className="num" style={{ color: 'rgba(251,247,238,.7)' }}>{slides[active].no}</span>
            <span className="serif-i" style={{ fontSize: 22, color: 'var(--paper)' }}>{slides[active].name}</span>
            <span className="num" style={{ color: 'rgba(251,247,238,.7)', borderLeft: '1px solid rgba(251,247,238,.3)', paddingLeft: 12, marginLeft: 4 }}>{slides[active].sub}</span>
          </div>
          <div className="hero-cap-controls">
            <button className="hero-arrow" onClick={goPrev} aria-label="Previous"><svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none"><path d="M15 6l-6 6 6 6"/></svg></button>
            <div className="hero-dots">
              {slides.map((_, i) => (
                <button key={i} className={"hero-dot " + (i === active ? 'on' : '')} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`}>
                  <span className="hero-dot-fill" style={{ animationDuration: paused ? '0s' : '6s', animationPlayState: i === active && !paused ? 'running' : 'paused' }} />
                </button>
              ))}
            </div>
            <button className="hero-arrow" onClick={goNext} aria-label="Next"><svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none"><path d="M9 6l6 6-6 6"/></svg></button>
          </div>
        </div>
      </div>
      <style>{`
        .hero-image { position: relative; height: 92vh; min-height: 720px; max-height: 1000px; }
        .hero-image-bg { position: absolute; inset: 0; overflow: hidden; }
        .hero-slide {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transform: scale(1.06);
          transition: opacity 1.4s cubic-bezier(.4,0,.2,1), transform 7s linear;
        }
        .hero-slide.on { opacity: 1; transform: scale(1); }
        .hero-image-scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(42, 34, 24, 0.5) 0%, rgba(42, 34, 24, 0.15) 30%, rgba(42, 34, 24, 0.8) 100%); }
        .hero-image-content { position: relative; z-index: 1; height: 100%; padding-top: 32px; padding-bottom: 60px; display: flex; flex-direction: column; color: var(--paper); }
        .hero-image-meta { display: flex; justify-content: space-between; gap: 30px; border-bottom: 1px solid rgba(251, 247, 238, 0.2); padding-bottom: 16px; flex-wrap: wrap; }
        .hero-image-meta .num { color: var(--cream); opacity: .85; }
        .hero-image-foot { display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; margin-top: 36px; }
        .hero-caption {
          margin-top: 36px; padding-top: 22px;
          border-top: 1px solid rgba(251, 247, 238, 0.18);
          display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .hero-cap-text { display: flex; gap: 12px; align-items: baseline; flex-wrap: wrap; }
        .hero-cap-controls { display: flex; gap: 14px; align-items: center; }
        .hero-arrow {
          width: 36px; height: 36px; border-radius: 999px;
          border: 1px solid rgba(251, 247, 238, 0.35);
          color: var(--paper);
          display: grid; place-items: center;
          transition: background .2s ease, color .2s ease, border-color .2s ease;
        }
        .hero-arrow:hover { background: var(--paper); color: var(--ink); border-color: var(--paper); }
        .hero-dots { display: flex; gap: 8px; padding: 0 8px; }
        .hero-dot {
          width: 34px; height: 18px;
          padding: 0; background: transparent; cursor: pointer;
          position: relative; display: grid; place-items: center;
        }
        .hero-dot::before {
          content: ''; display: block; width: 100%; height: 2px; background: rgba(251, 247, 238, 0.25); border-radius: 999px;
        }
        .hero-dot-fill {
          position: absolute; left: 0; top: 8px; height: 2px; width: 0; background: var(--paper); border-radius: 999px;
        }
        .hero-dot.on .hero-dot-fill {
          width: 100%;
          animation: heroFill linear forwards;
        }
        @keyframes heroFill { from { width: 0; } to { width: 100%; } }
        @media (max-width: 760px) {
          .hero-image-foot { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
};

/* ============================================================
   Fake map (subtle dot grid w/ streets)
   ============================================================ */
const FakeMap = () => (
  <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.8" fill="rgba(74, 53, 32, 0.18)" />
      </pattern>
    </defs>
    <rect width="600" height="480" fill="var(--cream)" />
    <rect width="600" height="480" fill="url(#dots)" />
    {/* streets */}
    <path d="M0 200 L600 200" stroke="rgba(74,53,32,0.16)" strokeWidth="32" />
    <path d="M0 200 L600 200" stroke="rgba(251,247,238,0.7)" strokeWidth="22" />
    <path d="M0 320 L600 240" stroke="rgba(74,53,32,0.12)" strokeWidth="20" />
    <path d="M0 320 L600 240" stroke="rgba(251,247,238,0.55)" strokeWidth="12" />
    <path d="M250 0 L300 480" stroke="rgba(74,53,32,0.12)" strokeWidth="22" />
    <path d="M250 0 L300 480" stroke="rgba(251,247,238,0.5)" strokeWidth="14" />
    <path d="M450 0 L420 480" stroke="rgba(74,53,32,0.1)" strokeWidth="14" />
    <path d="M450 0 L420 480" stroke="rgba(251,247,238,0.45)" strokeWidth="8" />
    {/* small park */}
    <rect x="380" y="290" width="120" height="80" fill="rgba(107,122,72,0.25)" rx="2" />
    <text x="396" y="335" fontSize="12" fill="var(--olive)" fontFamily="var(--serif)" fontStyle="italic">Etobicoke Park</text>
    {/* river */}
    <path d="M0 380 Q 200 360 320 400 T 600 420" stroke="rgba(107,122,72,0.3)" strokeWidth="14" fill="none" />
    {/* labels */}
    <text x="20" y="190" fontSize="11" fill="rgba(74,53,32,0.55)" letterSpacing="2">BLOOR ST W</text>
    <text x="510" y="280" fontSize="11" fill="rgba(74,53,32,0.55)" letterSpacing="2">JANE ST</text>
  </svg>
);


/* ============================================================
   Voices slider — full-bleed horizontal carousel
   ============================================================ */
const VoicesSlider = () => {
  const voices = [
    { quote: 'The Napoleon is exactly what my grandmother used to make. Sixteen layers of impossibly thin pastry — I cried a little, honestly.', name: 'Olesia M.', meta: 'Mississauga · Sat regular', cake: 'Napoleon' },
    { quote: 'We ordered three cakes for the office and the whole team went quiet. The Medovik disappeared in under ten minutes.', name: 'Daniel V.', meta: 'Studio Hush · Liberty Village', cake: 'Medovik · corporate' },
    { quote: 'A proper café. They take coffee seriously and they take dessert seriously and somehow the room is still warm and quiet.', name: 'Anya & Mark', meta: 'Bloor West · weekend visit', cake: 'Cappuccino + slice' },
    { quote: 'Asked for a small Spartak for my dad’s birthday with his name on it in Ukrainian. They wrote it perfectly in chocolate.', name: 'Iryna P.', meta: 'Etobicoke · cake pre-order', cake: 'Spartak · custom' },
    { quote: 'I’m not Ukrainian, I didn’t know what Sernyk was — now it’s the only thing I order on Sundays. Soft, just sweet enough, lovely with espresso.', name: 'Marcus L.', meta: 'High Park · regular', cake: 'Sernyk + espresso' },
    { quote: 'Got the macaron box on a whim and brought it to my sister. She’s a French pastry chef. She said “fine, these are real.” Strongest compliment she has.', name: 'Vera K.', meta: 'Kingsway · pickup', cake: 'Macaron box of 6' },
  ];

  const PER_VIEW_DESKTOP = 2;
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // autoplay
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive(a => (a + 1) % voices.length), 7000);
    return () => clearTimeout(id);
  }, [active, paused, voices.length]);

  // Scroll on active change
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const child = el.children[active];
    if (child) {
      el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'smooth' });
    }
  }, [active]);

  const goPrev = () => setActive(a => (a - 1 + voices.length) % voices.length);
  const goNext = () => setActive(a => (a + 1) % voices.length);

  return (
    <section className="sec voices-sec" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="shell">
        <SecHead num="03 / 08" eyebrow="In their own words" title="What folks are <em>saying</em>." />

        <div className="vs-track-wrap">
          <button className="vs-arrow vs-arrow-prev" onClick={goPrev} aria-label="Previous review">
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <div className="vs-track" ref={containerRef}>
            {voices.map((t, i) => (
              <figure key={i} className={"vs-card " + (i === active ? 'on' : '')}>
                <span className="serif-i vs-quote-mark">“</span>
                <blockquote className="serif" style={{ fontSize: 26, lineHeight: 1.32, letterSpacing: '-0.005em' }}>
                  {t.quote}
                </blockquote>
                <figcaption>
                  <div>
                    <span className="serif-i" style={{ fontSize: 20 }}>{t.name}</span>
                    <span className="num" style={{ display: 'block', marginTop: 2 }}>{t.meta}</span>
                  </div>
                  <span className="vs-cake">{t.cake}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <button className="vs-arrow vs-arrow-next" onClick={goNext} aria-label="Next review">
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" fill="none"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>

        <div className="vs-controls">
          <div className="vs-stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--olive)"><path d="M12 2l2.9 6.95L22 10l-5.5 4.9L18 22l-6-3.6L6 22l1.5-7.1L2 10l7.1-1.05L12 2z"/></svg>
            ))}
            <span className="serif-i" style={{ fontSize: 22, marginLeft: 8 }}>4.9 / 5</span>
            <span className="num" style={{ marginLeft: 8 }}>· 142 reviews</span>
          </div>
          <div className="vs-dots">
            {voices.map((_, i) => (
              <button key={i} className={"vs-dot " + (i === active ? 'on' : '')} onClick={() => setActive(i)} aria-label={`Review ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .voices-sec { background: var(--paper); }
        .vs-track-wrap { position: relative; padding: 0 60px; }
        .vs-track {
          display: flex; gap: 32px;
          overflow-x: auto; scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding-bottom: 12px;
          margin: 0 -8px;
          padding-left: 8px;
          padding-right: 8px;
        }
        .vs-track::-webkit-scrollbar { display: none; }
        .vs-card {
          flex: 0 0 calc(50% - 16px);
          scroll-snap-align: start;
          padding: 36px 36px 32px;
          background: var(--bg);
          border: 1px solid var(--rule);
          margin: 0;
          display: flex; flex-direction: column;
          transition: transform .4s ease, border-color .4s ease;
        }
        .vs-card.on { border-color: var(--olive); }
        .vs-quote-mark {
          font-size: 96px; color: var(--olive); line-height: 0.6;
          opacity: .35; display: block; margin-bottom: -10px;
        }
        .vs-card figcaption {
          margin-top: auto; padding-top: 24px;
          border-top: 1px solid var(--rule);
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: 14px;
        }
        .vs-cake {
          font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 6px 10px; background: var(--cream); color: var(--brown);
          border-radius: 999px; white-space: nowrap;
        }
        .vs-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 48px; height: 48px; border-radius: 999px;
          background: var(--bg); color: var(--ink);
          border: 1px solid var(--rule-strong);
          display: grid; place-items: center;
          z-index: 2;
          box-shadow: 0 10px 30px -10px rgba(74, 53, 32, 0.18);
          transition: background .25s ease, color .25s ease, border-color .25s ease, transform .25s ease;
        }
        .vs-arrow:hover { background: var(--ink); color: var(--paper); border-color: var(--ink); transform: translateY(-50%) scale(1.06); }
        .vs-arrow-prev { left: 0; }
        .vs-arrow-next { right: 0; }
        .vs-controls {
          margin-top: 32px; padding-top: 26px;
          border-top: 1px solid var(--rule);
          display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap;
        }
        .vs-stars { display: flex; gap: 4px; align-items: center; }
        .vs-dots { display: flex; gap: 8px; padding: 0 8px; }
        .vs-dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: var(--rule-strong); padding: 0;
          transition: background .25s ease, transform .25s ease;
          cursor: pointer;
        }
        .vs-dot.on { background: var(--olive); transform: scale(1.25); }
        @media (max-width: 760px) {
          .vs-track-wrap { padding: 0; }
          .vs-card { flex: 0 0 calc(100% - 8px); padding: 28px 24px; }
          .vs-controls { flex-direction: column; align-items: stretch; }
          .vs-arrow { top: auto; bottom: -50px; transform: none; }
          .vs-arrow:hover { transform: scale(1.06); }
          .vs-arrow-prev { left: 0; }
          .vs-arrow-next { right: 0; }
        }
      `}</style>
    </section>
  );
};


/* ============================================================
   Home quick contact — accordion form under visit section
   ============================================================ */
const HomeQuickContact = () => {
  const [open, setOpen] = useState(false);
  const [inquiry, setInquiry] = useState('general');
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || form.message.trim().length < 6) return;
    setStatus('sending');
    setError('');
    try {
      await apiPost('/api/submissions', { type: 'quick-contact', inquiry, ...form });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Could not send the note. Please call the café.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="hqc">
      <button className="hqc-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <div>
          <span className="num">Got a quick question?</span>
          <span className="serif" style={{ fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.01em', display: 'block', marginTop: 4 }}>
            Send us a <em style={{ color: 'var(--olive)' }}>note from here.</em>
          </span>
        </div>
        <span className="hqc-plus">{open ? '−' : '+'}</span>
      </button>

      <div className={"hqc-body " + (open ? 'open' : '')}>
        <div className="hqc-inner">
          {sent ? (
            <div className="hqc-sent">
              <span className="serif-i" style={{ fontSize: 64, color: 'var(--olive)', lineHeight: 1, display: 'block' }}>✓</span>
              <h4 className="serif" style={{ fontSize: 24, lineHeight: 1.1, marginTop: 10 }}>Note received, {form.name.split(' ')[0] || 'friend'}.</h4>
              <p style={{ color: 'var(--muted)', marginTop: 10 }}>We’ll reply within a business day at <span style={{ color: 'var(--ink)' }}>{form.contact}</span>.</p>
              <button className="btn btn-ghost" style={{ marginTop: 20 }} onClick={() => { setForm({ name: '', contact: '', message: '' }); setSent(false); setOpen(false); }}>Close</button>
            </div>
          ) : (
            <>
              <span className="eyebrow">What’s this about?</span>
              <div className="hqc-inq">
                {[['general', 'General'], ['cake', 'Cake order'], ['corporate', 'Corporate'], ['event', 'Event']].map(([k, l]) => (
                  <button key={k} className={"inq " + (inquiry === k ? 'on' : '')} onClick={() => setInquiry(k)}>{l}</button>
                ))}
              </div>
              <form className="hqc-form" onSubmit={submit} noValidate>
                <div className="hqc-row">
                  <div className="field">
                    <span className="field-label">Name</span>
                    <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Olena K." required />
                  </div>
                  <div className="field">
                    <span className="field-label">Email or phone</span>
                    <input className="input" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="email@example.com" required />
                  </div>
                </div>
                <div className="field">
                  <span className="field-label">Tell us a bit more</span>
                  <textarea className="textarea" rows="3" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What can we help with?" required />
                </div>
                <div className="hqc-foot">
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>Reply within a business day. For urgent cake orders, ring (416) 555 0148.</span>
                  <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : <>Send note <Icon.ArrowR /></>}</button>
                </div>
                {error && <p style={{ color: '#9b3d2f', fontSize: 12 }}>{error}</p>}
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        .hqc {
          margin-top: 24px;
          background: var(--paper);
          border: 1px solid var(--rule);
        }
        .hqc-toggle {
          width: 100%;
          display: flex; justify-content: space-between; align-items: center;
          padding: 28px 36px;
          text-align: left;
          gap: 24px;
          transition: background .2s ease;
        }
        .hqc-toggle:hover { background: var(--cream); }
        .hqc-plus {
          font-family: var(--serif); font-style: italic; font-size: 42px;
          color: var(--olive); line-height: 1; min-width: 36px; text-align: right;
        }
        .hqc-body {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows .4s cubic-bezier(.2,.7,.2,1);
        }
        .hqc-body.open { grid-template-rows: 1fr; }
        .hqc-inner { overflow: hidden; }
        .hqc.open .hqc-toggle { border-bottom: 1px solid var(--rule); }
        .hqc-body.open .hqc-inner { padding: 28px 36px 36px; }
        .hqc-inq { display: flex; gap: 8px; margin: 14px 0 24px; flex-wrap: wrap; }
        .hqc-inq .inq { padding: 9px 14px; border: 1px solid var(--rule-strong); border-radius: 999px; font-size: 11.5px; letter-spacing: 0.06em; transition: all .2s ease; }
        .hqc-inq .inq:hover { border-color: var(--ink); }
        .hqc-inq .inq.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .hqc-form { display: flex; flex-direction: column; gap: 18px; }
        .hqc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .hqc-foot { display: flex; justify-content: space-between; align-items: center; gap: 18px; padding-top: 12px; flex-wrap: wrap; }
        .hqc-sent { padding: 12px 0; }
        @media (max-width: 760px) {
          .hqc-toggle { padding: 22px 24px; }
          .hqc-body.open .hqc-inner { padding: 22px 24px 28px; }
          .hqc-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};



/* ===== pages/menu.jsx ===== */
// Menu page — magazine grid with category pills, sorting, badge filter
const MenuPage = ({ setRoute, addToCart, openProduct, initialCat, tweaks }) => {
  const { items, categories } = DELICIA_DATA;
  const [active, setActive] = useState(initialCat || 'all');
  const [sort, setSort] = useState('default');
  const [layout, setLayout] = useState(tweaks.menuLayout || 'grid'); // grid | editorial
  useEffect(() => { setLayout(tweaks.menuLayout || 'grid'); }, [tweaks.menuLayout]);

  const filtered = useMemo(() => {
    let r = active === 'all' ? items : items.filter(i => i.cat === active);
    if (sort === 'price-low') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'alpha') r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [active, sort]);

  const activeLabel = categories.find(c => c.id === active)?.label || 'Everything';

  return (
    <main className="menu-page fade-in">
      <Breadcrumbs items={[
        { label: 'Home', href: 'index.html' },
        { label: activeLabel === 'Everything' ? 'Menu' : 'Menu', href: activeLabel === 'Everything' ? null : 'menu.html' },
        ...(activeLabel === 'Everything' ? [] : [{ label: activeLabel }]),
      ]} />

      {/* Masthead */}
      <section className="menu-mast">
        <div className="shell">
          <div className="menu-mast-meta">
            <span className="num">Cafe Delicia · Menu</span>
            <span className="num">Vol. 01 · Spring / Summer</span>
            <span className="num">{filtered.length} items</span>
          </div>
          <h1 className="serif" style={{
            fontSize: 'clamp(72px, 14vw, 220px)',
            lineHeight: 0.85, letterSpacing: '-0.03em', marginTop: 32,
          }}>
            The <em style={{ color: 'var(--olive)' }}>menu</em>, in full.
          </h1>
          <p className="menu-lede">
            Every cake we bake, every coffee we pour. Some cakes — Napoleon, Medovik, Kyiv — require 48 hours so we can lay them down properly. Slices, cookies and coffees are ready as you walk in.
          </p>
        </div>
      </section>

      {/* Editor's note / cake of the week */}
      <section className="sec sec-tight cow-sec">
        <div className="shell">
          <div className="cow-grid">
            <div className="cow-img">
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85" alt="Cake of the week" />
              <span className="cow-tag">
                <span className="num">This week</span>
                <span className="serif-i" style={{ fontSize: 22 }}>Pumpkin Medovik</span>
              </span>
            </div>
            <div className="cow-body">
              <span className="num">Editor’s note</span>
              <h2 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 0.98, letterSpacing: '-0.02em', marginTop: 12 }}>
                On the bench<br/><em style={{ color: 'var(--olive)' }}>this week.</em>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--brown)', marginTop: 22, maxWidth: '46ch' }}>
                Roasted pumpkin folded into a classic Medovik — fourteen honey layers, sour-cream cream, a whisper of cassia and clove. It’ll be on the bench through November, then we put it away until next year.
              </p>
              <ul className="cow-list">
                <li><span className="num">New</span>Pumpkin Honey Cake — pre-order from Thursday</li>
                <li><span className="num">Back</span>Esterházy returns after the wedding-season pause</li>
                <li><span className="num">Soon</span>Christmas crescents — bookings open Dec 1</li>
              </ul>
              <button className="btn btn-olive" style={{ marginTop: 26 }} onClick={() => setRoute({ name: 'product', id: 'pumpkin' })}>
                Pre-order the pumpkin Medovik <Icon.ArrowR />
              </button>
            </div>
          </div>
        </div>
        <style>{`
          .cow-sec { background: var(--cream); }
          .cow-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
          .cow-img { position: relative; aspect-ratio: 5/4; overflow: hidden; }
          .cow-img img { width: 100%; height: 100%; object-fit: cover; }
          .cow-tag { position: absolute; left: 20px; bottom: 20px; padding: 12px 18px; background: var(--paper); display: flex; flex-direction: column; gap: 2px; }
          .cow-list { margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--rule-strong); list-style: none; display: flex; flex-direction: column; gap: 14px; }
          .cow-list li { display: flex; gap: 14px; align-items: baseline; font-size: 14.5px; color: var(--brown); }
          .cow-list .num { width: 56px; flex-shrink: 0; }
          @media (max-width: 880px) { .cow-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* Category nav */}
      <section className="menu-nav">
        <div className="shell">
          <Pills items={categories} active={active} onSelect={setActive} />
          <div className="menu-controls">
            <div className="layout-toggle">
              <span className="eyebrow" style={{ marginRight: 10 }}>View</span>
              <button className={layout === 'grid' ? 'on' : ''} onClick={() => setLayout('grid')}>
                <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>
                Grid
              </button>
              <button className={layout === 'editorial' ? 'on' : ''} onClick={() => setLayout('editorial')}>
                <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Editorial
              </button>
            </div>
            <select className="select" value={sort} onChange={e => setSort(e.target.value)} style={{ width: 200, paddingLeft: 14 }}>
              <option value="default">Sort · Featured</option>
              <option value="price-low">Price · Low to high</option>
              <option value="price-high">Price · High to low</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
        </div>
        <style>{`
          .menu-nav { padding: 28px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); position: sticky; top: 84px; background: var(--bg); z-index: 10; }
          .menu-nav .shell { display: flex; justify-content: space-between; align-items: center; gap: 18px; flex-wrap: wrap; }
          .menu-controls { display: flex; gap: 16px; align-items: center; }
          .layout-toggle { display: flex; gap: 4px; align-items: center; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 4px; }
          .layout-toggle button {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 6px 12px; border-radius: 999px;
            font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
            color: var(--muted);
          }
          .layout-toggle button.on { background: var(--ink); color: var(--paper); }
          @media (max-width: 760px) {
            .menu-nav { position: static; }
            .menu-nav .shell { flex-direction: column; align-items: flex-start; }
          }
        `}</style>
      </section>

      {/* Category header */}
      <section className="sec sec-tight">
        <div className="shell">
          <div className="cat-head">
            <div>
              <span className="num">Currently showing</span>
              <h2 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 0.95, marginTop: 4 }}>
                {activeLabel} <em style={{ color: 'var(--olive)' }}>· {filtered.length}</em>
              </h2>
            </div>
            <CategoryDescription cat={active} />
          </div>

          {layout === 'grid' ? (
            <div className="menu-grid">
              {filtered.map((it, i) => (
                <ProductCard key={it.id} item={it} index={i} onOpen={openProduct} onAdd={addToCart} />
              ))}
            </div>
          ) : (
            <div className="menu-editorial">
              {filtered.map((it, i) => (
                <ProductCard key={it.id} item={it} index={i} onOpen={openProduct} onAdd={addToCart} variant="editorial" />
              ))}
            </div>
          )}
        </div>
        <style>{`
          .cat-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; margin-bottom: 50px; padding-bottom: 24px; border-bottom: 1px solid var(--rule); }
          .menu-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 50px 24px; }
          @media (max-width: 1100px) { .menu-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 760px) { .menu-grid { grid-template-columns: 1fr 1fr; gap: 30px 16px; } }
          @media (max-width: 480px) { .menu-grid { grid-template-columns: 1fr; } }
          .menu-editorial { display: flex; flex-direction: column; }
          .menu-editorial .pc-editorial:first-child { border-top: 0; }
        `}</style>
      </section>

      {/* Pre-order banner */}
      <section className="sec sec-tight">
        <div className="shell">
          <div className="preorder">
            <div>
              <span className="num">A note on cakes</span>
              <h3 className="serif" style={{ fontSize: 'var(--display-s)', lineHeight: 1, letterSpacing: '-0.02em', marginTop: 8 }}>
                Some cakes require <em style={{ color: 'var(--olive)' }}>pre-order.</em>
              </h3>
              <p style={{ maxWidth: '50ch', color: 'var(--muted)', fontSize: 15.5, marginTop: 14, lineHeight: 1.6 }}>
                Whole Napoleons, Medoviks and Kyiv cakes need 48 hours so we can lay them down and let them rest properly. Tell us the day and we’ll bake to meet it.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => setRoute({ name: 'visit', section: 'contact' })}>Request a cake order</button>
          </div>
        </div>
        <style>{`
          .preorder { background: var(--cream); padding: 56px 60px; display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; }
          @media (max-width: 760px) {
            .preorder { flex-direction: column; align-items: flex-start; padding: 32px 24px; }
          }
        `}</style>
      </section>

      <Footer setRoute={setRoute} />
    </main>
  );
};

const CategoryDescription = ({ cat }) => {
  const map = {
    all: 'Everything we make at Delicia, in one place. Browse, add to your order, pick up at the café.',
    cakes: 'Whole cakes — most need 48 hours notice. Sized for four to fifteen.',
    desserts: 'Single-serve. Ready when you are.',
    cookies: 'Boxes, bags and singles. Travel well, keep three days.',
    icecream: 'Slow-churned gelato and sorbet. Two scoops in a porcelain cup.',
    drinks: 'Single-origin espresso, loose-leaf tea, European hot chocolate.',
    seasonal: 'On the menu while the season holds. Worth coming in for.',
  };
  return (
    <p style={{ maxWidth: '40ch', color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.6 }}>
      {map[cat] || map.all}
    </p>
  );
};



/* ===== pages/product.jsx ===== */
// Product detail page
const ProductPage = ({ item, setRoute, addToCart, openProduct, tweaks }) => {
  if (!item) {
    return (
      <main className="fade-in" style={{ padding: 200, textAlign: 'center' }}>
        <p className="serif-i" style={{ fontSize: 32 }}>Product not found.</p>
        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setRoute({ name: 'menu' })}>Back to menu</button>
      </main>
    );
  }

  const [size, setSize] = useState(item.sizes?.[1] || item.sizes?.[0] || item.unit);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState('');

  const related = DELICIA_DATA.items.filter(i => i.cat === item.cat && i.id !== item.id).slice(0, 4);

  return (
    <main className="product-page fade-in">

      <Breadcrumbs items={[
        { label: 'Home', href: 'index.html' },
        { label: 'Menu', href: 'menu.html' },
        { label: categoryLabel(item.cat), href: `menu.html?cat=${item.cat}` },
        { label: item.name },
      ]} />

      {/* Main product */}
      <section className="sec sec-tight">
        <div className="shell">
          <div className="pdp-grid">
            <div className="pdp-left">
              <div className="pdp-mainimg">
                <img src={item.img} alt={item.name} />
                <span className="pdp-num">No. {String(DELICIA_DATA.items.findIndex(i => i.id === item.id) + 1).padStart(2, '0')}</span>
              </div>
              <div className="pdp-thumbs">
                {[item.img, item.img, item.img].map((src, i) => (
                  <div key={i} className={"pdp-thumb " + (i === 0 ? 'on' : '')}><img src={src} alt="" /></div>
                ))}
              </div>
            </div>

            <div className="pdp-right">
              <div className="pdp-badges">
                {item.badges?.map(b => (
                  <span key={b} className={"badge " + (b === 'Signature' ? 'badge-olive' : b === 'Seasonal' ? 'badge-cream' : 'badge-outline')}>{b}</span>
                ))}
                <span className="num" style={{ marginLeft: 'auto' }}>{categoryLabel(item.cat)}</span>
              </div>

              <h1 className="serif" style={{ fontSize: 'clamp(56px, 7vw, 108px)', lineHeight: 0.92, letterSpacing: '-0.02em', marginTop: 18 }}>
                {item.name}
              </h1>
              <p className="serif-i" style={{ fontSize: 22, color: 'var(--olive)', marginTop: 6 }}>{item.tagline}</p>

              <p className="pdp-desc">{item.desc}</p>

              <div className="pdp-price">
                <span className="num">From</span>
                <span className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: '-0.02em' }}>${item.price.toFixed(2)}</span>
                <span className="num">· {item.unit}</span>
              </div>

              {item.sizes && (
                <div className="pdp-opt">
                  <span className="field-label">Size</span>
                  <div className="opt-row">
                    {item.sizes.map(s => (
                      <button key={s} className={"opt-chip " + (size === s ? 'on' : '')} onClick={() => setSize(s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pdp-opt">
                <span className="field-label">Pickup</span>
                <div className="pdp-pickup">
                  <span><Icon.Pin /> Take-out at café</span>
                  <span className="num">·</span>
                  <span>2456 Bloor St W, Etobicoke</span>
                </div>
              </div>

              {item.cat === 'cakes' && (
                <div className="pdp-opt">
                  <span className="field-label">Message on cake (optional)</span>
                  <input className="input" value={msg} onChange={e => setMsg(e.target.value)} placeholder="e.g. ‘Happy Birthday Mia’" maxLength={28} />
                  <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, display: 'block' }}>Up to 28 characters · hand-piped</span>
                </div>
              )}

              <div className="pdp-actions">
                <div className="qty" style={{ height: 56 }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 50, height: 54 }}><Icon.Minus /></button>
                  <span style={{ minWidth: 40, fontSize: 17 }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} style={{ width: 50, height: 54 }}><Icon.Plus /></button>
                </div>
                <button className="btn btn-primary" style={{ flex: 1, height: 56 }} onClick={() => addToCart(item, qty, size)}>
                  Add to order · ${(item.price * qty).toFixed(2)} <Icon.ArrowR />
                </button>
              </div>

              <button className="btn btn-link" style={{ marginTop: 18 }} onClick={() => setRoute({ name: 'visit', section: 'contact' })}>
                Ask about this cake
              </button>

              {item.badges?.includes('Pre-order') && (
                <div className="pdp-notice">
                  <span className="serif-i" style={{ fontSize: 18 }}>Pre-order.</span>{' '}
                  <span style={{ color: 'var(--brown)' }}>This cake is made to order. We need 48 hours from order to pickup so we can bake, build and rest it.</span>
                </div>
              )}

              <div className="pdp-meta">
                <div>
                  <span className="eyebrow">Ingredients</span>
                  <p>Made from scratch in our Etobicoke kitchen. Cultured butter, pasture eggs, single-origin chocolate, raw wildflower honey, organic flour. No mixes, no powders.</p>
                </div>
                <div>
                  <span className="eyebrow">Allergens</span>
                  <p>{item.allergens || 'Please ask staff.'}</p>
                </div>
                <div>
                  <span className="eyebrow">Storage</span>
                  <p>Refrigerate. Best eaten the day of pickup, keeps two days covered.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .pdp-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 64px; }
          .pdp-mainimg { position: relative; aspect-ratio: 4/5; overflow: hidden; background: var(--cream); }
          .pdp-mainimg img { width: 100%; height: 100%; object-fit: cover; }
          .pdp-num { position: absolute; top: 18px; left: 18px; font-family: var(--serif); font-style: italic; font-size: 22px; color: var(--paper); mix-blend-mode: difference; }
          .pdp-thumbs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 8px; }
          .pdp-thumb { aspect-ratio: 1; background: var(--cream); overflow: hidden; cursor: pointer; opacity: 0.55; transition: opacity .2s ease; }
          .pdp-thumb.on { opacity: 1; }
          .pdp-thumb img { width: 100%; height: 100%; object-fit: cover; }
          .pdp-right { padding-top: 4px; }
          .pdp-badges { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
          .pdp-desc { color: var(--brown); font-size: 16px; line-height: 1.65; margin-top: 26px; max-width: 50ch; }
          .pdp-price { display: flex; align-items: baseline; gap: 12px; margin-top: 30px; padding: 22px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
          .pdp-opt { margin-top: 26px; }
          .opt-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
          .opt-chip { padding: 12px 18px; border: 1px solid var(--rule-strong); border-radius: 999px; font-size: 13px; transition: all .2s ease; }
          .opt-chip:hover { border-color: var(--ink); }
          .opt-chip.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
          .pdp-pickup { display: flex; gap: 10px; align-items: center; font-size: 13.5px; color: var(--muted); margin-top: 10px; }
          .pdp-actions { display: flex; gap: 12px; margin-top: 34px; }
          .pdp-notice { background: var(--cream); padding: 18px 22px; margin-top: 22px; font-size: 14px; }
          .pdp-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 32px; margin-top: 40px; padding-top: 28px; border-top: 1px solid var(--rule); }
          .pdp-meta p { font-size: 13.5px; color: var(--muted); margin-top: 6px; line-height: 1.6; }
          @media (max-width: 980px) {
            .pdp-grid { grid-template-columns: 1fr; gap: 36px; }
            .pdp-meta { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* Related */}
      <section className="sec">
        <div className="shell">
          <SecHead num="·" eyebrow="If you like this, you might also like" title="More from <em>the counter.</em>"
                   link={{ label: 'Open menu', onClick: () => setRoute({ name: 'menu' }) }} />
          <div className="rel-grid">
            {related.map((it, i) => (
              <ProductCard key={it.id} item={it} index={i} onOpen={openProduct} onAdd={addToCart} />
            ))}
          </div>
        </div>
        <style>{`
          .rel-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
          @media (max-width: 980px) { .rel-grid { grid-template-columns: 1fr 1fr; } }
        `}</style>
      </section>

      <Footer setRoute={setRoute} />
    </main>
  );
};



/* ===== pages/visit.jsx ===== */
// Visit / Contact page — address, hours, map, contact form, corporate section
const VisitPage = ({ setRoute, scrollTo }) => {
  const [inquiry, setInquiry] = useState('general');

  // Scroll to contact / corporate if requested
  useEffect(() => {
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
  }, [scrollTo]);

  return (
    <main className="visit-page fade-in">
      <Breadcrumbs items={[
        { label: 'Home', href: 'index.html' },
        { label: 'Visit & Contact' },
      ]} />

      {/* Mast */}
      <section className="visit-mast">
        <div className="shell">
          <div className="visit-mast-meta">
            <span className="num">Visit · Contact · Corporate</span>
            <span className="num">2456 Bloor St W</span>
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(72px, 13vw, 210px)', lineHeight: 0.86, letterSpacing: '-0.03em', marginTop: 30 }}>
            Come <em style={{ color: 'var(--olive)' }}>see us</em><br />on Bloor.
          </h1>
          <p style={{ maxWidth: '50ch', fontSize: 17, marginTop: 26, color: 'var(--brown)', lineHeight: 1.6 }}>
            Etobicoke, two minutes from Jane subway. There’s a small bench under the awning, a counter full of cake and someone behind the espresso machine.
          </p>
        </div>
        <style>{`
          .visit-mast { padding: 60px 0 80px; }
          .visit-mast-meta { display: flex; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid var(--rule); flex-wrap: wrap; gap: 18px; }
        `}</style>
      </section>

      {/* Map + info */}
      <section className="sec sec-tight" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="v-grid">
            <div className="v-info">
              <span className="num">01 — Where</span>
              <h3 className="serif" style={{ fontSize: 36, lineHeight: 1.05, marginTop: 8 }}>2456 Bloor Street West<br/>Etobicoke, ON M8X 1A8</h3>
              <p style={{ fontSize: 14.5, color: 'var(--muted)', marginTop: 14 }}>2 minutes from Jane TTC station. Street parking on Bloor & Riverview. Free parking after 6 PM.</p>
              <div className="v-meta">
                <div><Icon.Phone /><div><span className="num">Phone</span><span>(416) 555 0148</span></div></div>
                <div><Icon.Mail /><div><span className="num">Email</span><span>hello@cafedelicia.ca</span></div></div>
                <div><Icon.Insta /><div><span className="num">Instagram</span><span>@cafedelicia</span></div></div>
              </div>
              <a className="btn btn-primary" style={{ marginTop: 26 }} href="https://www.google.com/maps/search/?api=1&query=2456+Bloor+St+W+Etobicoke+ON" target="_blank" rel="noopener">Open in Google Maps</a>
            </div>

            <div className="v-map">
              <FakeMap />
              <div className="v-pin">
                <span className="serif-i">Delicia</span>
                <span className="num">2456 Bloor W</span>
              </div>
            </div>

            <div className="v-hours">
              <span className="num">02 — When</span>
              <h3 className="serif" style={{ fontSize: 24, lineHeight: 1.1, marginTop: 8 }}>Opening hours</h3>
              <ul>
                {[['Monday', 'Closed'], ['Tuesday', '8 — 8'], ['Wednesday', '8 — 8'], ['Thursday', '8 — 8'], ['Friday', '8 — 9'], ['Saturday', '9 — 9'], ['Sunday', '9 — 7']].map(([d, t]) => (
                  <li key={d}>
                    <span>{d}</span>
                    <span className="serif-i" style={{ color: t === 'Closed' ? 'var(--muted)' : 'var(--olive)' }}>{t}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 16 }}>Holiday hours may vary — check Instagram before you visit.</p>
            </div>
          </div>
        </div>
        <style>{`
          .v-grid { display: grid; grid-template-columns: 1fr 1.4fr; grid-template-rows: auto auto; gap: 24px; }
          .v-info { padding: 36px; background: var(--paper); }
          .v-map { background: var(--cream); position: relative; overflow: hidden; min-height: 460px; grid-row: span 2; }
          .v-hours { padding: 36px; background: var(--paper); }
          .v-meta { display: flex; flex-direction: column; gap: 14px; margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--rule); }
          .v-meta > div { display: flex; gap: 14px; align-items: center; }
          .v-meta > div > div { display: flex; flex-direction: column; }
          .v-meta > div > div > span:first-child { font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
          .v-meta > div > div > span:last-child { font-size: 15px; }
          .v-pin { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -100%); padding: 12px 18px; background: var(--paper); display: flex; flex-direction: column; align-items: center; box-shadow: var(--shadow); }
          .v-pin::after { content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: var(--paper); }
          .v-hours ul { list-style: none; display: flex; flex-direction: column; gap: 4px; margin-top: 18px; }
          .v-hours li { display: flex; justify-content: space-between; font-size: 14.5px; padding: 8px 0; border-bottom: 1px solid var(--rule); }
          @media (max-width: 880px) {
            .v-grid { grid-template-columns: 1fr; }
            .v-map { grid-row: auto; min-height: 320px; }
          }
        `}</style>
      </section>

      {/* Contact form */}
      <section className="sec" id="contact">
        <div className="shell">
          <SecHead num="03" eyebrow="Send us a note" title="Say hello, ask <em>about a cake</em>, plan an event." />
          <div className="contact-grid">
            <div className="contact-left">
              <ContactForm inquiry={inquiry} setInquiry={setInquiry} />
            </div>

            <aside className="contact-aside">
              <span className="num">Or, more directly</span>
              <div className="aside-row"><Icon.Phone /><div><span className="num">Phone</span><a href="tel:+14165550148" className="serif-i" style={{ fontSize: 22 }}>(416) 555 0148</a></div></div>
              <div className="aside-row"><Icon.Mail /><div><span className="num">Email</span><a href="mailto:hello@cafedelicia.ca" className="serif-i" style={{ fontSize: 22 }}>hello@cafedelicia.ca</a></div></div>
              <div className="aside-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M21 11.5a8.4 8.4 0 0 1-1.3 4.5L21 21l-5.2-1.3a8.5 8.5 0 1 1 5.2-8.2z"/><path d="M8.5 9c.3-.5.8-.8 1.4-.7l1.2.2.7 2-.8.7a6 6 0 0 0 3.6 3.6l.7-.8 2 .7.2 1.2a1.5 1.5 0 0 1-.7 1.4 7 7 0 0 1-8.3-8.3z" fill="currentColor" stroke="none"/></svg>
                <div><span className="num">WhatsApp</span><a href="https://wa.me/14165550148" target="_blank" rel="noopener" className="serif-i" style={{ fontSize: 22 }}>+1 (416) 555 0148</a></div>
              </div>
              <div className="aside-row"><Icon.Insta /><div><span className="num">Instagram DM</span><a href="https://instagram.com/cafedelicia" target="_blank" rel="noopener" className="serif-i" style={{ fontSize: 22 }}>@cafedelicia</a></div></div>
              <div className="rule" style={{ margin: '24px 0' }} />
              <span className="num">A small thing to know</span>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 8, lineHeight: 1.65 }}>
                For whole cakes we ask 48 hours notice. For weddings and large events, two weeks is comfortable. Allergen-aware on request.
              </p>
            </aside>
          </div>
        </div>
        <style>{`
          .contact-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 60px; }
          .contact-aside { background: var(--cream); padding: 36px; }
          .aside-row { display: flex; gap: 14px; align-items: center; margin-top: 18px; }
          .aside-row > div { display: flex; flex-direction: column; gap: 2px; }
          .aside-row a { transition: color .2s ease; }
          .aside-row a:hover { color: var(--olive); }
          @media (max-width: 980px) {
            .contact-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* Getting here / parking */}
      <section className="sec sec-tight gh-sec">
        <div className="shell">
          <SecHead num="04" eyebrow="Getting here" title="Easy by <em>TTC</em>, easy by car." />
          <div className="gh-grid">
            <div className="gh-card">
              <span className="eyebrow">Subway</span>
              <h4 className="serif" style={{ fontSize: 22, marginTop: 8 }}>Jane Station</h4>
              <p>Line 2 (Bloor-Danforth). Exit Bloor St W and walk three minutes east — we’re past the bakery on the south side.</p>
            </div>
            <div className="gh-card">
              <span className="eyebrow">Streetcar / Bus</span>
              <h4 className="serif" style={{ fontSize: 22, marginTop: 8 }}>Bloor 66 · Jane 35</h4>
              <p>Stops at Bloor & Jane and Bloor & Riverview. Both within sixty seconds of the door.</p>
            </div>
            <div className="gh-card">
              <span className="eyebrow">Parking</span>
              <h4 className="serif" style={{ fontSize: 22, marginTop: 8 }}>Street &amp; Green P</h4>
              <p>Metered Green P spots along Bloor and Riverview Gardens. Free street parking after 6 PM and on Sundays.</p>
            </div>
            <div className="gh-card">
              <span className="eyebrow">Bike / walk</span>
              <h4 className="serif" style={{ fontSize: 22, marginTop: 8 }}>West Toronto Railpath</h4>
              <p>Rack out front. The path is six blocks south — a beautiful approach in summer.</p>
            </div>
          </div>
        </div>
        <style>{`
          .gh-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
          .gh-card { background: var(--paper); padding: 28px 26px; min-height: 220px; }
          .gh-card p { font-size: 13.5px; color: var(--muted); margin-top: 12px; line-height: 1.6; }
          @media (max-width: 880px) { .gh-grid { grid-template-columns: 1fr 1fr; } }
        `}</style>
      </section>

      {/* FAQ */}
      <section className="sec faq-sec">
        <div className="shell faq-shell">
          <div className="faq-head">
            <span className="num">05 — Things people ask</span>
            <h2 className="serif" style={{ fontSize: 'var(--display-m)', lineHeight: 0.95, letterSpacing: '-0.02em', marginTop: 14 }}>
              A few <em style={{ color: 'var(--olive)' }}>quick answers.</em>
            </h2>
          </div>
          <div className="faq-list">
            {[
              ['How far ahead do I need to order a cake?', 'Whole cakes — Napoleon, Medovik, Spartak, Kyiv, Esterházy — need 48 hours so we can build and rest them properly. For Saturday pickup, place your order by Thursday morning. Slices, cookies and coffees are ready when you walk in.'],
              ['Can you write a message on the cake?', 'Yes — up to about 28 characters in hand-piped chocolate or buttercream. There’s a field for it on the product page, or tell us in the cart notes. We’ll happily write in Ukrainian, Russian, French — just paste it in.'],
              ['Do you do allergen-free?', 'Some recipes can be adapted (dairy-free Pavlova, nut-free Spartak) with 72 hours notice. We are not a nut-free or gluten-free kitchen, so cross-contact is possible. For severe allergies, ring us first so we can talk it through.'],
              ['How do I pay?', 'Online orders confirm by phone or email, then payment is taken on pickup — tap, chip, or cash. We don’t hold cards in advance. For corporate accounts we can invoice on net-15 terms.'],
              ['Do you deliver?', 'Not yet to the public. Corporate orders and weddings are delivered by us, in our own van — we won’t hand wedding cakes to a courier. Standing orders within the GTA are arranged in advance.'],
              ['Do you take walk-ins for dine-in?', 'Always — and we don’t take bookings for tables of four or fewer. For groups of five or more, give us a ring an hour ahead and we’ll save the long table by the window.'],
              ['What if I need to change my order?', 'Up to 24 hours before pickup, no problem — call or reply to the confirmation message. Inside 24 hours, we’ll do our best, but we’ve usually already started.'],
              ['Gift cards?', 'Yes — any amount from $25. Buy online or at the counter, sent by email or printed on heavy stock for $2 more. Never expires.'],
            ].map((qa, i) => <FAQItem key={i} q={qa[0]} a={qa[1]} defaultOpen={i === 0} />)}
          </div>
          <p style={{ marginTop: 40, textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
            Didn’t see your question? <a href="#contact" style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ink)' }}>Send us a note</a> — we reply within a business day.
          </p>
        </div>
        <style>{`
          .faq-sec { background: var(--cream); }
          .faq-shell { max-width: 920px; }
          .faq-head { text-align: center; margin-bottom: 50px; }
          .faq-list { border-top: 1px solid var(--rule-strong); }
        `}</style>
      </section>

      {/* Corporate */}
      <section className="corp-sec" id="corporate">
        <div className="shell corp-grid">
          <div className="corp-text">
            <span className="num" style={{ color: 'rgba(232, 221, 196, 0.65)' }}>06 — For your office</span>
            <h2 className="serif" style={{ fontSize: 'var(--display-l)', lineHeight: 0.9, letterSpacing: '-0.03em', marginTop: 14 }}>
              Cakes & coffee,<br/><em style={{ color: '#C8B79A' }}>delivered to the office.</em>
            </h2>
            <p style={{ maxWidth: '46ch', marginTop: 26, color: 'rgba(232, 221, 196, 0.78)', fontSize: 16, lineHeight: 1.65 }}>
              Dessert boxes for client meetings, birthday cakes for the team, catering trays for the small events you’re planning. We deliver across the GTA in our own van — never DoorDash.
            </p>

            <div className="corp-list">
              {[
                ['Office dessert boxes', 'Twelve to twenty-four pieces. Mix of cakes, cookies, macarons.'],
                ['Meeting catering', 'Coffee thermoses, milk options, dessert trays. Plates and napkins included.'],
                ['Small events', 'Whole cakes for office birthdays and team milestones, 0.7 — 2.5 kg.'],
                ['Recurring orders', 'Monthly standing orders for studios, agencies and clinics — 10% partner rate.'],
              ].map(([t, d], i) => (
                <div key={t} className="corp-row">
                  <span className="num" style={{ color: 'rgba(232, 221, 196, 0.6)', width: 32 }}>0{i + 1}</span>
                  <div>
                    <h4 className="serif" style={{ fontSize: 22, lineHeight: 1.2 }}>{t}</h4>
                    <p style={{ fontSize: 13.5, color: 'rgba(232, 221, 196, 0.65)', marginTop: 4, lineHeight: 1.6 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn" style={{ background: 'var(--cream)', color: 'var(--ink)', marginTop: 36 }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Request a corporate order
            </button>
          </div>
          <div className="corp-img">
            <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=85" alt="" />
            <div className="corp-tag">
              <span className="num" style={{ color: 'var(--brown)' }}>Standing order</span>
              <span className="serif-i" style={{ fontSize: 22, color: 'var(--brown)' }}>Studio Hush · Wed mornings</span>
            </div>
          </div>
        </div>
        <style>{`
          .corp-sec { background: var(--ink); color: var(--cream); padding: 120px 0; }
          .corp-grid { display: grid; grid-template-columns: 1fr 0.9fr; gap: 60px; align-items: center; }
          .corp-list { margin-top: 36px; display: flex; flex-direction: column; gap: 22px; padding-top: 22px; border-top: 1px solid rgba(232, 221, 196, 0.2); }
          .corp-row { display: flex; gap: 22px; align-items: flex-start; }
          .corp-img { position: relative; aspect-ratio: 4/5; overflow: hidden; }
          .corp-img img { width: 100%; height: 100%; object-fit: cover; }
          .corp-tag { position: absolute; left: 20px; bottom: 20px; padding: 14px 18px; background: var(--cream); display: flex; flex-direction: column; }
          @media (max-width: 980px) { .corp-grid { grid-template-columns: 1fr; } .corp-sec { padding: 80px 0; } }
        `}</style>
      </section>

      <Footer setRoute={setRoute} />
    </main>
  );
};


/* ============================================================
   Contact form — inline validation + success state
   ============================================================ */
const ContactForm = ({ inquiry, setInquiry }) => {
  const [form, setForm] = useState({ name: '', contact: '', date: '', people: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [submitError, setSubmitError] = useState('');

  const update = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Tell us your name';
    if (!form.contact.trim()) errs.contact = 'Email or phone, please';
    else if (!/@|\d/.test(form.contact)) errs.contact = 'Looks off — email or phone';
    if (!form.message.trim() || form.message.trim().length < 6) errs.message = 'A few words about what you’re after';
    if ((inquiry === 'cake' || inquiry === 'event') && !form.date.trim()) errs.date = 'When do you need it?';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('sending');
    setSubmitError('');
    try {
      await apiPost('/api/submissions', { type: 'contact', inquiry, ...form });
      setStatus('sent');
    } catch (err) {
      setSubmitError(err.message || 'Could not send the note. Please call the café.');
      setStatus('idle');
    }
  };

  if (status === 'sent') {
    return (
      <div className="cf-success">
        <span className="serif-i" style={{ fontSize: 80, color: 'var(--olive)', lineHeight: 1 }}>✓</span>
        <h3 className="serif" style={{ fontSize: 40, lineHeight: 1, marginTop: 14, letterSpacing: '-0.01em' }}>
          Note received, <em style={{ color: 'var(--olive)' }}>{form.name.split(' ')[0] || 'friend'}.</em>
        </h3>
        <p style={{ maxWidth: '46ch', color: 'var(--muted)', marginTop: 14, lineHeight: 1.65 }}>
          We’ll be in touch within a business day at <span style={{ color: 'var(--ink)' }}>{form.contact}</span>. For urgent cake orders ring us directly at (416) 555 0148.
        </p>
        <button className="btn btn-ghost" style={{ marginTop: 26 }} onClick={() => { setForm({ name: '', contact: '', date: '', people: '', message: '' }); setStatus('idle'); }}>
          Send another note
        </button>
        <style>{`.cf-success { padding: 40px 0; }`}</style>
      </div>
    );
  }

  return (
    <>
      <span className="eyebrow">What’s this about?</span>
      <div className="inq-row">
        {[
          ['general', 'General question'],
          ['cake', 'Cake order'],
          ['corporate', 'Corporate order'],
          ['event', 'Event / catering'],
        ].map(([k, l]) => (
          <button key={k} className={"inq " + (inquiry === k ? 'on' : '')} onClick={() => setInquiry(k)}>{l}</button>
        ))}
      </div>

      <form className="contact-form" onSubmit={submit} noValidate>
        <div className="cf-row">
          <div className="field">
            <span className="field-label">Your name</span>
            <input className={"input " + (errors.name ? 'err' : '')} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Olena K." />
            {errors.name && <span className="cf-err">{errors.name}</span>}
          </div>
          <div className="field">
            <span className="field-label">Email or phone</span>
            <input className={"input " + (errors.contact ? 'err' : '')} value={form.contact} onChange={e => update('contact', e.target.value)} placeholder="email@example.com" />
            {errors.contact && <span className="cf-err">{errors.contact}</span>}
          </div>
        </div>
        {(inquiry === 'cake' || inquiry === 'event') && (
          <div className="cf-row">
            <div className="field">
              <span className="field-label">Pickup / event date</span>
              <input className={"input " + (errors.date ? 'err' : '')} value={form.date} onChange={e => update('date', e.target.value)} placeholder="Sat · Jun 14" />
              {errors.date && <span className="cf-err">{errors.date}</span>}
            </div>
            <div className="field">
              <span className="field-label">How many people?</span>
              <input className="input" value={form.people} onChange={e => update('people', e.target.value)} placeholder="8 — 10" />
            </div>
          </div>
        )}
        <div className="field">
          <span className="field-label">Tell us a bit more</span>
          <textarea className={"textarea " + (errors.message ? 'err' : '')} rows="5" value={form.message} onChange={e => update('message', e.target.value)} placeholder="Tell us what you have in mind — flavours, sizes, messages on the cake. We’ll write back the same day." />
          {errors.message && <span className="cf-err">{errors.message}</span>}
        </div>
        <div className="cf-foot">
          <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>We reply within one business day. Most cake orders are confirmed by phone.</span>
          <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : <>Send note <Icon.ArrowR /></>}
          </button>
        </div>
        {submitError && <p style={{ color: '#9b3d2f', fontSize: 12 }}>{submitError}</p>}
      </form>

      <style>{`
        .inq-row { display: flex; gap: 8px; margin: 14px 0 30px; flex-wrap: wrap; }
        .inq { padding: 10px 16px; border: 1px solid var(--rule-strong); border-radius: 999px; font-size: 12.5px; letter-spacing: 0.04em; transition: all .2s ease; }
        .inq:hover { border-color: var(--ink); }
        .inq.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .contact-form { display: flex; flex-direction: column; gap: 26px; }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .cf-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; gap: 20px; }
        .input.err, .textarea.err { border-color: #B4502A; }
        .cf-err { display: block; font-size: 11.5px; color: #B4502A; margin-top: 6px; letter-spacing: 0.02em; }
        @media (max-width: 980px) { .cf-row { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
};


/* ============================================================
   FAQ accordion item
   ============================================================ */
const FAQItem = ({ q, a, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={"faq " + (open ? 'open' : '')}>
      <button className="faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="serif" style={{ fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.005em' }}>{q}</span>
        <span className="faq-toggle">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-a-wrap"><p className="faq-a">{a}</p></div>
      <style>{`
        .faq { border-bottom: 1px solid var(--rule-strong); }
        .faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 22px 0; gap: 20px; text-align: left; transition: color .2s ease; }
        .faq-q:hover { color: var(--olive); }
        .faq-toggle { font-family: var(--serif); font-style: italic; font-size: 32px; color: var(--olive); line-height: 1; }
        .faq-a-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; }
        .faq.open .faq-a-wrap { grid-template-rows: 1fr; }
        .faq-a { overflow: hidden; max-width: 70ch; color: var(--brown); font-size: 15px; line-height: 1.65; padding-bottom: 0; }
        .faq.open .faq-a { padding-bottom: 24px; }
      `}</style>
    </div>
  );
};



/* ===== app.jsx ===== */
// Cafe Delicia — production app shell
// Each page (index.html, menu.html, etc.) sets window.INITIAL_PAGE before
// loading this script. Navigation between pages uses real <a href> → page
// reloads. Cart state persists via localStorage; drawer open-state persists
// via sessionStorage.

// ─────────────────────────────────────────────────────────────
// Router — turns route objects into real URLs
// ─────────────────────────────────────────────────────────────
const routeToHref = (r) => {
  if (!r || r.name === 'home') return 'index.html';
  if (r.name === 'menu') {
    return 'menu.html' + (r.cat && r.cat !== 'all' ? `?cat=${r.cat}` : '');
  }
  if (r.name === 'cakes') return 'menu.html?cat=cakes';
  if (r.name === 'product') return `product.html?id=${r.id || 'napoleon'}`;
  if (r.name === 'about') return 'about.html';
  if (r.name === 'visit') return 'visit.html' + (r.section ? `#${r.section}` : '');
  if (r.name === 'blog') return 'blog.html' + (r.id ? `#${r.id}` : '');
  return 'index.html';
};

// ─────────────────────────────────────────────────────────────
// Persisted cart — array of {itemId, qty, size, note} in localStorage
// ─────────────────────────────────────────────────────────────
const CART_KEY = 'delicia.cart.v1';
const useCart = () => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const lines = JSON.parse(raw);
      return lines
        .map(l => ({ ...l, item: DELICIA_DATA.byId(l.itemId) }))
        .filter(l => l.item);
    } catch { return []; }
  });

  useEffect(() => {
    try {
      const slim = cart.map(l => ({
        itemId: l.item.id, qty: l.qty, size: l.size, note: l.note,
      }));
      localStorage.setItem(CART_KEY, JSON.stringify(slim));
    } catch {}
  }, [cart]);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== CART_KEY) return;
      try {
        const lines = JSON.parse(e.newValue || '[]');
        setCart(lines.map(l => ({ ...l, item: DELICIA_DATA.byId(l.itemId) })).filter(l => l.item));
      } catch {}
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return [cart, setCart];
};

const pageFromPath = () => {
  const name = window.location.pathname.split('/').pop() || 'index.html';
  if (name === 'index.html' || name === '') return 'home';
  const slug = name.replace(/\.html$/, '') || 'home';
  const mapped = {
    cakes: 'menu',
    'cafe-notes': 'journal-cat',
    'recipe-stories': 'journal-cat',
    seasonal: 'journal-cat',
    'suppliers-journal': 'journal-cat',
    'how-to': 'journal-cat',
  };
  return mapped[slug] || slug;
};

const categoryFromPath = () => {
  const slug = (window.location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  const mapped = {
    cakes: 'cakes',
    'cafe-notes': 'Café notes',
    'recipe-stories': 'Recipe stories',
    seasonal: 'Seasonal',
    'suppliers-journal': 'Suppliers',
    'how-to': 'How-to',
  };
  return mapped[slug];
};

const App = () => {
  // Tweakable defaults (palette, hero variant)
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "olive",
    "heroVariant": "image",
    "cardStyle": "tall",
    "menuLayout": "grid"
  }/*EDITMODE-END*/;

  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);

  // Route — derived from window.INITIAL_PAGE + URL params
  const initRoute = () => {
    const page = pageFromPath();
    const p = new URLSearchParams(location.search);
    const r = { name: page };
    if (p.get('cat')) r.cat = p.get('cat');
    else if (categoryFromPath()) r.cat = categoryFromPath();
        if (p.get('id')) r.id = p.get('id');
    if (location.hash) r.section = location.hash.slice(1).replace(/[^a-z\-]/gi, '');
    return r;
  };
  const [route] = useState(initRoute);

  // Navigation = real anchor click (page reload)
  const setRoute = (r) => {
    const href = routeToHref(r);
    if (href === (location.pathname.split('/').pop() || 'index.html')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      location.href = href;
    }
  };

  // Cart
  const [cart, setCart] = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  // Account
  const [user, setUser] = useState(() => {
    try { const raw = localStorage.getItem('delicia.account.v1'); return raw ? JSON.parse(raw) : null; } catch { return null; }
  });
  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!cancelled && data?.user) setUser(data.user);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    if (user) localStorage.setItem('delicia.account.v1', JSON.stringify(user));
    else localStorage.removeItem('delicia.account.v1');
  }, [user]);
  const [accountOpen, setAccountOpen] = useState(false);

  // Toast — micro-feedback on add to cart (so we don't auto-open drawer
  // and steal scroll position)
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const addToCart = (item, qty = 1, size) => {
    setCart(c => {
      const ex = c.find(l => l.item.id === item.id && l.size === (size || item.unit));
      if (ex) return c.map(l => l === ex ? { ...l, qty: l.qty + qty } : l);
      return [...c, { item, qty, size: size || item.unit }];
    });
    setToast({ name: item.name, qty });
  };

  const openProduct = (item) => setRoute({ name: 'product', id: item.id });

  // Palette/hero from URL or tweaks
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const p = params.get('palette');
    const h = params.get('hero');
    if (p) setTweaks('palette', p);
    if (h) setTweaks('heroVariant', h);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', tweaks.palette || 'olive');
  }, [tweaks.palette]);

  // Render page
  let page = null;
  if (route.name === 'home') page = <HomePage setRoute={setRoute} addToCart={addToCart} openProduct={openProduct} tweaks={tweaks} />;
  else if (route.name === 'menu') page = <MenuPage setRoute={setRoute} addToCart={addToCart} openProduct={openProduct} initialCat={route.cat} tweaks={tweaks} />;
  else if (route.name === 'product') page = <ProductPage item={DELICIA_DATA.byId(route.id)} setRoute={setRoute} addToCart={addToCart} openProduct={openProduct} tweaks={tweaks} />;
  else if (route.name === 'about') page = <AboutPage setRoute={setRoute} />;
  else if (route.name === 'visit') page = <VisitPage setRoute={setRoute} scrollTo={route.section} />;
  else if (route.name === 'blog') page = <BlogPage setRoute={setRoute} />;
  else if (route.name === 'founders') page = <AboutFoundersPage setRoute={setRoute} />;
  else if (route.name === 'process') page = <AboutProcessPage setRoute={setRoute} />;
  else if (route.name === 'suppliers') page = <AboutSuppliersPage setRoute={setRoute} />;
  else if (route.name === 'mission') page = <AboutMissionPage setRoute={setRoute} />;
  else if (route.name === 'awards') page = <AboutAwardsPage setRoute={setRoute} />;
  else if (route.name === 'heritage') page = <AboutHeritagePage setRoute={setRoute} />;
  else if (route.name === 'journal-cat') page = <JournalCategoryPage setRoute={setRoute} cat={route.cat} />;
  else if (route.name === '404') page = <NotFoundPage setRoute={setRoute} />;

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  return (
    <div className="app">
      <Nav route={route} setRoute={setRoute} cartCount={cartCount}
           onOpenCart={() => setCartOpen(true)}
           onOpenAccount={() => setAccountOpen(true)}
           user={user} />
      {page}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} setRoute={setRoute} />
      <AccountDrawer open={accountOpen} onClose={() => setAccountOpen(false)} user={user} setUser={setUser} />
      <MobileBottomBar route={route} setRoute={setRoute} onOpenCart={() => setCartOpen(true)} cartCount={cartCount} />
      <CartToast toast={toast} onOpen={() => { setToast(null); setCartOpen(true); }} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakColor
            label="Theme"
            value={tweaks.palette}
            onChange={v => setTweaks('palette', v)}
            options={[
              { value: 'olive', swatches: ['#EFE7D6', '#6B7A48', '#E8DDC4', '#4A3520'] },
              { value: 'brown', swatches: ['#EFE7D6', '#6B4423', '#E8DDC4', '#2E1F12'] },
              { value: 'sage', swatches: ['#ECE6D4', '#556B2F', '#D9C9A8', '#3D5020'] },
              { value: 'ink', swatches: ['#EDE4D0', '#2E3A1F', '#F0E2C5', '#8C6A3F'] },
            ]}
          />
        </TweakSection>
        <TweakSection title="Hero composition">
          <TweakRadio
            label="Variant"
            value={tweaks.heroVariant}
            onChange={v => setTweaks('heroVariant', v)}
            options={[
              { value: 'image', label: 'Image' },
              { value: 'split', label: 'Split' },
              { value: 'type', label: 'Type' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Product cards">
          <TweakRadio
            label="Style"
            value={tweaks.cardStyle}
            onChange={v => setTweaks('cardStyle', v)}
            options={[
              { value: 'tall', label: 'Tall' },
              { value: 'editorial', label: 'Editorial' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Menu layout">
          <TweakRadio
            label="Default"
            value={tweaks.menuLayout}
            onChange={v => setTweaks('menuLayout', v)}
            options={[
              { value: 'grid', label: 'Grid' },
              { value: 'editorial', label: 'List' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Cart helpers">
          <TweakButton onClick={() => { setCart([]); setToast({ name: 'Cart cleared', qty: 0 }); }}>Clear cart</TweakButton>
          <TweakButton onClick={() => {
            const items = ['napoleon', 'macaron', 'cappuccino'].map(id => DELICIA_DATA.byId(id));
            items.forEach(it => addToCart(it));
          }}>Add demo items</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

/* ============================================================
   Cart Toast — soft micro-feedback after addToCart
   ============================================================ */
const CartToast = ({ toast, onOpen }) => (
  <div className={"toast " + (toast ? 'on' : '')} role="status" aria-live="polite">
    {toast && (
      <>
        <div className="toast-mark">✓</div>
        <div className="toast-mid">
          <span className="num">Added to your order</span>
          <span className="serif" style={{ fontSize: 18, lineHeight: 1.1 }}>
            {toast.qty > 0 ? `${toast.qty} × ${toast.name}` : toast.name}
          </span>
        </div>
        {toast.qty > 0 && <button onClick={onOpen} className="toast-btn">View →</button>}
      </>
    )}
    <style>{`
      .toast {
        position: fixed; left: 24px; bottom: 24px;
        z-index: 80;
        background: var(--ink); color: var(--paper);
        display: flex; align-items: center; gap: 14px;
        padding: 12px 14px 12px 18px;
        border-radius: 999px;
        box-shadow: 0 30px 60px -30px rgba(74, 53, 32, 0.4);
        transform: translateY(20px); opacity: 0;
        pointer-events: none;
        transition: transform .35s ease, opacity .35s ease;
        max-width: calc(100vw - 48px);
      }
      .toast.on { transform: translateY(0); opacity: 1; pointer-events: auto; }
      .toast-mark { width: 28px; height: 28px; border-radius: 999px; background: var(--olive); color: var(--paper); display: grid; place-items: center; font-size: 13px; }
      .toast-mid { display: flex; flex-direction: column; gap: 2px; }
      .toast-mid .num { color: rgba(232,221,196,.7); font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; }
      .toast-btn { background: var(--paper); color: var(--ink); padding: 8px 14px; border-radius: 999px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
      .toast-btn:hover { background: var(--cream); }
      @media (max-width: 760px) { .toast { left: 16px; right: 80px; bottom: 80px; } }
    `}</style>
  </div>
);

/* ============================================================
   404 page
   ============================================================ */
const NotFoundPage = ({ setRoute }) => (
  <main className="sec fade-in" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div className="shell" style={{ textAlign: 'center' }}>
      <span className="serif-i" style={{ fontSize: 'clamp(120px, 20vw, 280px)', lineHeight: 1, color: 'var(--olive)' }}>404</span>
      <h1 className="serif" style={{ fontSize: 'var(--display-m)', lineHeight: 1, marginTop: 20 }}>Page <em style={{ color: 'var(--olive)' }}>not on the counter.</em></h1>
      <p style={{ maxWidth: '40ch', margin: '24px auto 0', color: 'var(--muted)' }}>The page you’re looking for has moved or never existed. Try the menu — that’s usually where everyone ends up anyway.</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 30 }}>
        <a href="index.html" className="btn btn-primary">Back to home</a>
        <a href="menu.html" className="btn btn-ghost">See the menu</a>
      </div>
    </div>
  </main>
);

/* ============================================================
   Mobile sticky bottom bar
   ============================================================ */
const MobileBottomBar = ({ route, setRoute, onOpenCart, cartCount }) => (
  <div className="mb-bar">
    <button onClick={onOpenCart}>
      <Icon.Bag />
      <span>Order</span>
      {cartCount > 0 && <span className="mb-dot">{cartCount}</span>}
    </button>
    <a href="menu.html" className={"mb-link " + (route.name === 'menu' ? 'on' : '')}>
      <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" fill="none"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
      <span>Menu</span>
    </a>
    <a href="visit.html" className={"mb-link " + (route.name === 'visit' ? 'on' : '')}>
      <Icon.Pin />
      <span>Map</span>
    </a>
    <style>{`
      .mb-bar {
        display: none;
        position: fixed; left: 12px; right: 12px; bottom: 12px;
        z-index: 60;
        background: var(--ink); color: var(--paper);
        border-radius: 999px;
        padding: 8px;
        box-shadow: 0 20px 40px -16px rgba(74, 53, 32, 0.5);
      }
      .mb-bar button, .mb-bar .mb-link {
        flex: 1;
        display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        padding: 12px;
        border-radius: 999px;
        font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
        color: var(--paper);
        position: relative;
        transition: background .2s ease;
      }
      .mb-bar .on, .mb-bar button.on { background: var(--olive); }
      .mb-dot { background: var(--paper); color: var(--ink); font-size: 9.5px; font-weight: 600; border-radius: 999px; min-width: 16px; height: 16px; display: grid; place-items: center; padding: 0 4px; position: absolute; top: 6px; right: 14px; }
      @media (max-width: 760px) { .mb-bar { display: flex; } }
    `}</style>
  </div>
);





export default App;
