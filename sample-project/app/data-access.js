class DataAccess {
  getCategoriesAndArticles(){
    return require('../article-data.js');
  }
};

module.exports = DataAccess;
