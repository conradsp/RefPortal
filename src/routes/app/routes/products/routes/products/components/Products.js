import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { fetchAllProducts } from '../../../../../../../actions/products';

class Products extends React.Component {

  componentWillMount() {
    const { fetchAllProducts } = this.props;
    const { products } = this.props;
    fetchAllProducts();
  }

  render() {
    const { products } = this.props;

    return (
      <section className="container-fluid with-maxwidth no-breadcrumbs chapter" >
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="row">
              {
                products.products.map((product, index) => (
                  <div className="col-xl-3 col-lg-6" key={index}>
                    <a href={'#/app/products/product/' + product._id} className="item-card">
                      <div className="card__image">
                        <img alt="product" src={product.photos[0].filename} />
                      </div>
                      <div className="card__body card-white">
                        <div className="card__title">
                          <h6>{product.category}</h6>
                          <h4>{product.name}</h4>
                        </div>
                        <div className="card__price">
                          <span>${product.price} {product.pricing_unit}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>
        </QueueAnim>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products
});

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => {
    dispatch(fetchAllProducts());
  }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
