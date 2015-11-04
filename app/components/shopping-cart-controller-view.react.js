let React = require('react');
let Navigation = require('./navigation.react.js');
let utils = require('../utils.js');

let ShoppingCartControllerView = React.createClass({
  getInitialState() {
    return {
      shoppingCartContent: this.props.store.getShoppingCartContent()
    };
  },

  fetchData() {
    this.setState(
      {
        shoppingCartContent: this.props.store.getShoppingCartContent()
      }
    );
  },

  componentDidMount() {
    this.deregisterChangeListener = this.props.store.addChangeListener('changed', this.fetchData);
  },

  componentWillUnmount() {
    this.deregisterChangeListener();
  },

  _getCouponCodeInput() {
    if (this.state.shoppingCartContent.items.length === 0) return '';
    let couponCode = this.state.shoppingCartContent.couponCode;
    if (couponCode.hasValue && couponCode.value.isValid) return '';

    let couponCodeWarning = this.state.shoppingCartContent.couponCodeInvalid
      ? <div className='shoppingCart__couponCodeWarning'>Der eingegebene Coupon-Code ist ungültig!</div>
      : '';

      let redeemCoupon = function() {
        let couponCode = this.refs.couponCode.value;
        this.props.actionCreator.redeemCoupon(couponCode);
      }.bind(this);

    return <div className="shoppingCart__couponInput">
              <span>Geben Sie hier Ihren Coupon-Code ein:</span>
              <input type="text" className="shoppingCart__couponInput__couponCode" ref="couponCode" placeholder="xxxx-xx-xx-xx"></input>
              <button onClick={redeemCoupon} className="shoppingCart__couponInput__redeemCoupon">einlösen</button>
              {couponCodeWarning}
            </div>;
  },

  _getArticleItems() {
    return this.state.shoppingCartContent.items.map((item) => {
      let addToCart = () => {
        this.props.actionCreator.addArticleToShoppingCart(item.id, 10);
      };

      let removeFromCart = () => {
        this.props.actionCreator.removeArticleFromShoppingCart(item.id, 10);
      };

      let itemPrice = utils.formatAsPrice(item.price / 100);
      let itemTotalPrice = utils.formatAsPrice(item.amount * item.price / 100);

      let itemStyles = {
        backgroundColor: item.color
      };

      return <tr key={item.id} className="shoppingCartItem">
        <td className="shoppingCartItem__name">
          <div className="articleDetails__image" style={itemStyles}/>
          <br/>
          {item.name}
        </td>
        <td className="shoppingCartItem__price">{itemPrice}</td>
        <td>
          <span className="shoppingCartItem__amount">{item.amount}</span>
          <br/>
          <button className='shoppingCartItem__removeFromCart' onClick={removeFromCart}>-</button> <button className='shoppingCartItem__addToCart' onClick={addToCart}>+</button>
        </td>
        <td className="shoppingCartItem__totalPrice">{itemTotalPrice}</td>
      </tr>;
    });
  },

  render() {
    let packagingSizeWarning = this.state.shoppingCartContent.packagingSizeInvalid
      ? <div className='shoppingCart__packagingSizeWarning'>Gesamtmenge muss ein Vielfaches von 50 sein!</div>
      : '';

    let articleItems = this._getArticleItems();
    let totalPrice = this.state.shoppingCartContent.totalPrice / 100;
    let couponDiscount = this.state.shoppingCartContent.couponDiscount / 100;
    let reducedTotalPrice = totalPrice - couponDiscount;
    let formattedTotalPrice = utils.formatAsPrice(totalPrice);
    let formattedCouponDiscount = utils.formatAsPrice(couponDiscount);
    let formattedReducedTotalPrice = utils.formatAsPrice(reducedTotalPrice);

    let alertIt = function() {
      alert('Sorry, just a demo!');
    };

    let footerRows = [
      <tr key='totalPrice'>
        <td>Gesamt:</td>
        <td></td>
        <td>{this.state.shoppingCartContent.totalAmount}</td>
        <td>{formattedTotalPrice}</td>
      </tr>
    ];

    let couponCodeInput = this._getCouponCodeInput();

    if (this.state.shoppingCartContent.couponCode.hasValue && this.state.shoppingCartContent.couponCode.value.isValid) {
      footerRows.push(
        <tr key='couponDiscount' className='shoppingCart__footer__couponDiscount'>
          <td>Rabatt:</td>
          <td></td>
          <td></td>
          <td>- {formattedCouponDiscount}</td>
        </tr>);
      footerRows.push(
        <tr key='reducedtotalPrice' className='shoppingCart__footer__reducedTotalPrice'>
          <td>Zu zahlen:</td>
          <td></td>
          <td></td>
          <td>{formattedReducedTotalPrice}</td>
        </tr>);
    }
    return <div className="shoppingCart">
      <Navigation/>
      <div className="container contentWrapper">
        <a href="#"><i className="fa fa-chevron-left"></i> Back to articles overview</a>
        <br/>
        <br/>

        <table>
          <thead>
            <tr>
              <th>Artikel</th>
              <th>Einzelpreis</th>
              <th>Anzahl</th>
              <th>Gesamtpreis</th>
            </tr>
          </thead>
          <tfoot className="shoppingCart__footer">
            {footerRows}
          </tfoot>
          <tbody>
            {articleItems}
          </tbody>
        </table>

        {packagingSizeWarning}

        {couponCodeInput}
        <button onClick={alertIt} className="shoppingCart__cashPoint">Buy it</button>
      </div>
    </div>;
  }
});

module.exports = ShoppingCartControllerView;
