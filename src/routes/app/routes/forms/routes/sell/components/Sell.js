import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';

const SellForm = () => (
  <article className="article">
    <h2 className="article-title">Sell Product</h2>
    <div className="box box-default">
      <div className="box-body padding-xl">

        <form role="form">
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-md-2 control-label">Product Name</label>
            <div className="col-md-10">
              <input type="text" className="form-control" id="inputEmail3" placeholder="Name" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputCategory" className="col-md-2 control-label">Category</label>
            <div className="col-md-10">
              <select className="form-control" name="category">
                <option value="food">Food</option>
                <option value="livestock">Livestock</option>
                <option value="machinery">Machinery</option>
                <option value="services">Services</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-md-2 control-label">Description</label>
            <div className="col-md-10">
              <input type="text" className="form-control" id="inputPassword3" placeholder="Description" />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-md-2 col-md-10">
              <RaisedButton label="Create Listing" className="btn-w-md" primary />
            </div>
          </div>
        </form>

      </div>
    </div>
  </article>
);

const Page = () => (
  <section className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="2"><SellForm /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;
