var categories = [
  {id: 1, name: 'Intenso'},
  {id: 2, name: 'Espresso'},
  {id: 3, name: 'Pure Origin'},
  {id: 4, name: 'Lungo'},
  {id: 5, name: 'Decaffeinato'},
  {id: 6, name: 'Variations'}
];

var confections = [
  {size: 25, name: 'Ristretto'},
  {size: 40, name: 'Espresso'},
  {size: 110, name: 'Lungo'}
];

var articles = [
  // Intenso
  {id: 1, intensity: 12, category: 1, price: 39, confections: [25, 40], name: 'Accio', color: '#25334F'},
  {id: 2, intensity: 10, category: 1, price: 35, confections: [25, 40], name: 'Flagrante', color: '#000000'},
  {id: 3, intensity: 11, category: 1, price: 39, confections: [25, 40], name: 'Gemino', color: '#1E3A40'},
  {id: 4, intensity: 8, category: 1, price: 35, confections: [25, 40], name: 'Confundo', color: '#685B56'},
  {id: 5, intensity: 9, category: 1, price: 35, confections: [25, 40], name: 'Prior Incantado', color: '#512B7E'},
  // Espresso
  {id: 6, intensity: 3, category: 2, price: 35, confections: [25], name: 'Sectumsempra', color: '#432013'},
  {id: 7, intensity: 5, category: 2, price: 35, confections: [25], name: 'Silencio', color: '#154134'},
  {id: 8, intensity: 4, category: 2, price: 35, confections: [25], name: 'Orchideus', color: '#A3783D'},
  {id: 9, intensity: 6, category: 2, price: 35, confections: [25], name: 'Lumos', color: '#81491E'},
  // Pure Origin
  {id: 10, intensity: 10, category: 3, price: 39, confections: [25, 40], name: 'Expulso', color: '#484536'},
  {id: 11, intensity: 3, category: 3, price: 39, confections: [110], name: 'Densaugeo', color: '#A56850'},
  {id: 12, intensity: 4, category: 3, price: 39, confections: [40], name: 'Waddiwasi', color: '#D3BDA6'},
  {id: 13, intensity: 6, category: 3, price: 39, confections: [40], name: 'Sonorus', color: '#CDBDC1'},
  // Lungo
  {id: 14, intensity: 4, category: 4, price: 37, confections: [110], name: 'Quietus', color: '#306CA8'},
  {id: 15, intensity: 4, category: 4, price: 37, confections: [110], name: 'Ratzeputz', color: '#DB903E'},
  {id: 16, intensity: 8, category: 4, price: 37, confections: [110], name: 'Relaschio', color: '#286264'},
  // Decaffeinato
  {id: 17, intensity: 4, category: 5, price: 37, confections: [40], name: 'Impedimenta', color: '#CD953D'},
  {id: 18, intensity: 7, category: 5, price: 37, confections: [40], name: 'Glisseo', color: '#460008'},
  {id: 19, intensity: 4, category: 5, price: 39, confections: [110], name: 'Incendio', color: '#D35B51'},
  {id: 20, intensity: 9, category: 5, price: 37, confections: [25, 110], name: 'Morsmordre', color: '#D81E41'},
  // Variations
  {id: 21, intensity: 6, category: 6, price: 42, confections: [40], name: 'Muffliato', color: '#B56F29'},
  {id: 22, intensity: 6, category: 6, price: 42, confections: [40], name: 'Alohomora', color: '#E1DB9F'},
  {id: 23, intensity: 6, category: 6, price: 42, confections: [40], name: 'Confringo', color: '#301A0F'}
];

module.exports = {
  categories: categories,
  confections: confections,
  articles: articles
};
