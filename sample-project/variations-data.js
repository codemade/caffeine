var categories = [
  {id: 1, name: 'Intenso'},
  {id: 2, name: 'Espresso'},
  {id: 3, name: 'Pure Origin'},
  {id: 4, name: 'Lungo'},
  {id: 5, name: 'Decaffeinato'},
  {id: 6, name: 'Variations'}
];

var variations = [
  // Intenso
  {id:  1, intensity: 12, category: 1, price: 0.39, name: 'Kazaar'},
  {id:  2, intensity: 10, category: 1, price: 0.35, name: 'Ristretto'},
  {id:  3, intensity: 11, category: 1, price: 0.39, name: 'Dharkan'},
  {id:  4, intensity:  8, category: 1, price: 0.35, name: 'Roma'},
  {id:  5, intensity:  9, category: 1, price: 0.35, name: 'Arpeggio'},
  // Espresso
  {id:  6, intensity:  3, category: 2, price: 0.35, name: 'Cosi'},
  {id:  7, intensity:  5, category: 2, price: 0.35, name: 'Capriccio'},
  {id:  8, intensity:  4, category: 2, price: 0.35, name: 'Volluto'},
  {id:  9, intensity:  6, category: 2, price: 0.35, name: 'Livanto'},
  // Pure Origin
  {id: 10, intensity: 10, category: 3, price: 0.39, name: 'Indriya from India'},
  {id: 11, intensity:  3, category: 3, price: 0.39, name: 'Bukeela ka Ethiopia'},
  {id: 12, intensity:  4, category: 3, price: 0.39, name: 'Dulsão do Brasil'},
  {id: 13, intensity:  6, category: 3, price: 0.39, name: 'Rosabaya de Colombia'},
  // Lungo
  {id: 14, intensity:  4, category: 4, price: 0.37, name: 'Vivalto Lungo'},
  {id: 15, intensity:  4, category: 4, price: 0.37, name: 'Linizio Lungo'},
  {id: 16, intensity:  8, category: 4, price: 0.37, name: 'Fortissio Lungo'},
  // Decaffeinato
  {id: 17, intensity:  4, category: 5, price: 0.37, name: 'Volluto Decaffeinato'},
  {id: 18, intensity:  7, category: 5, price: 0.37, name: 'Decaffeinato Intenso'},
  {id: 19, intensity:  4, category: 5, price: 0.39, name: 'Vivalto Lungo Decaffeinato'},
  {id: 20, intensity:  9, category: 5, price: 0.37, name: 'Arpeggio Decaffeinato'},
  // Variations
  {id: 21, intensity:  6, category: 6, price: 0.42, name: 'Caramelito'},
  {id: 22, intensity:  6, category: 6, price: 0.42, name: 'Vanilio'},
  {id: 23, intensity:  6, category: 6, price: 0.42, name: 'Ciocattino'}
]

module.exports = {categories: categories, variations: variations};
