class Store {
  constructor(){
    this.subscriber = [];
  }

  subscribe(callback){
    this.subscriber.push(callback);
  }

  initialize(data){
    this.data = data;

    this.subscriber.forEach((callback) => {
      callback(this.data);
    });
  }
}

module.exports = Store;
