import test from 'node:test';
import assert from 'node:assert/strict';

// Test utils and normalization
function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function formatPrice(amount, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

test('Format price utility outputs French currency standard', () => {
  const formatted1 = formatPrice(1250);
  assert.match(formatted1, /1[\s\u202f]?250/);
  assert.match(formatted1, /€/);

  const formatted2 = formatPrice(390);
  assert.match(formatted2, /390/);
});

test('Accent and case normalization works correctly', () => {
  assert.equal(normalizeString('Élégance'), 'elegance');
  assert.equal(normalizeString('ÉCHARPE EN CACHEMIRE'), 'echarpe en cachemire');
  assert.equal(normalizeString('  Prêt-à-Porter  '), 'pret-a-porter');
  assert.equal(normalizeString('Matière'), 'matiere');
});

test('Cart calculations and shipping threshold', () => {
  const items = [
    { id: 'item-1', unitPrice: 120, quantity: 2 }, // 240€
    { id: 'item-2', unitPrice: 50, quantity: 1 },  // 50€
  ];

  const subtotal1 = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  assert.equal(subtotal1, 290);
  // under 300 -> 15€ shipping
  const shipping1 = subtotal1 >= 300 ? 0 : 15;
  assert.equal(shipping1, 15);
  assert.equal(subtotal1 + shipping1, 305);

  // Add 1 more item -> 340€
  items.push({ id: 'item-3', unitPrice: 50, quantity: 1 });
  const subtotal2 = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  assert.equal(subtotal2, 340);
  // over 300 -> 0€ shipping
  const shipping2 = subtotal2 >= 300 ? 0 : 15;
  assert.equal(shipping2, 0);
  assert.equal(subtotal2 + shipping2, 340);
});

test('Search logic with accent and keyword matching', () => {
  const sampleProducts = [
    {
      id: '1',
      name: 'Manteau Long en Cachemire & Laine',
      categoryLabel: 'Vêtements',
      description: 'Pièce maîtresse en cachemire mongol.',
      tags: ['manteau', 'cachemire', 'hiver'],
    },
    {
      id: '2',
      name: 'Écharpe Volumineuse en Cachemire Pur Dégraissé',
      categoryLabel: 'Accessoires',
      description: 'Douceur extrême et tissage aéré.',
      tags: ['echarpe', 'cachemire', 'hiver'],
    },
    {
      id: '3',
      name: 'Le Cabas « Sculptura » en Cuir Pleine Fleur',
      categoryLabel: 'Maroquinerie',
      description: 'Cuir de veau grainé au tannage végétal.',
      tags: ['sac', 'cabas', 'cuir'],
    },
  ];

  function search(query) {
    const q = normalizeString(query);
    if (!q) return [];
    return sampleProducts.filter((p) => {
      const name = normalizeString(p.name);
      const cat = normalizeString(p.categoryLabel);
      const desc = normalizeString(p.description);
      const tags = p.tags.map(normalizeString).join(' ');
      return name.includes(q) || cat.includes(q) || desc.includes(q) || tags.includes(q);
    });
  }

  // Accent-insensitive test: searching without accent finds item with accent
  const resEcharpe = search('echarpe');
  assert.equal(resEcharpe.length, 1);
  assert.equal(resEcharpe[0].id, '2');

  // Case-insensitive test: uppercase query
  const resCachemire = search('CACHEMIRE');
  assert.equal(resCachemire.length, 2);

  // Category search:
  const resMaroquinerie = search('maroquinerie');
  assert.equal(resMaroquinerie.length, 1);
  assert.equal(resMaroquinerie[0].id, '3');

  // Empty or non-matching query:
  assert.equal(search('').length, 0);
  assert.equal(search('introuvable_xyz').length, 0);
});
