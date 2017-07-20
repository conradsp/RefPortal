import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { fetchProduct } from '../../../../../../../actions/products';
import { buyProduct } from '../../../../../../../actions/accounts';

class Product extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.doBuy = this.doBuy.bind(this);
  }

  componentWillMount() {
    const { fetchProduct, buyProduct } = this.props;
    const { currProduct } = this.props;
    const { params, info, message } = this.props;
    fetchProduct(params.id);
  }

  doBuy() {
    const { buyProduct } = this.props;
    const { currProduct } = this.props;
    const { info } = this.props;
    buyProduct(currProduct, info.blockchain_id);
  }

  handleRequestClose = () => {

  };

  render() {
    const { currProduct, message } = this.props;

    return (
      <section className="container-fluid with-maxwidth no-breadcrumbs chapter" >
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="row">
              <div className="col-lg-5 card__image">
                <img alt="product" src={currProduct.photos[0].filename} />
              </div>
              <div className="col-lg-5 card__body card-white">
                <div className="card__title">
                  <h6>{currProduct.category}</h6>
                  <h4>{currProduct.name}</h4>
                  <span>Seller: {currProduct.seller}</span>
                  <h6>{currProduct.desc}</h6>
                </div>
                <div className="card__price">
                  <span>${currProduct.price} {currProduct.pricing_unit}</span>
                </div>
                <div className="card-action no-border text-left">
                  <div className="divider" />
                  <RaisedButton label="Buy" primary onClick={this.doBuy} />
                  <div className="divider" />
                </div>
              </div>
            </div>
          </div>
          <Snackbar
            open={(message !== '')}
            message={message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </QueueAnim>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currProduct: state.product.products.currProduct,
  info: state.user.profile.info,
  message: state.account.message
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: (prodid) => {
    dispatch(fetchProduct(prodid));
  },
  buyProduct: (product, buyer) => {
    dispatch(buyProduct(product, buyer));
  }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
