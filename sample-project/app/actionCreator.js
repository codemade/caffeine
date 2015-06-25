var actionCreator = function(api, store) {
  return {
    initialize: () => {
      var data = api.getCategoriesAndArticles();
    }
  };
};

module.exports = actionCreator;
