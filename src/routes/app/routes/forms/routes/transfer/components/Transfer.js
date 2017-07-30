import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';

import { fetchAccounts, transferMoney } from '../../../../../../../actions/accounts';

class TransferForm extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.doTransfer = this.doTransfer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.phone = 6124145040;
    this.amount = 0;
  }

  componentWillMount() {
    const { fetchAccounts, transferMoney } = this.props;
    const { accounts } = this.props;
    fetchAccounts();
  }

  doTransfer(e) {
    const { transferMoney } = this.props;
    transferMoney(this.phone, this.amount);
  }

  handleChange(e) {
    this.phone = e.target.value;
  }

  handleAmount(e) {
    this.amount = e.target.value;
  }

  render() {
    const { accounts } = this.props;

    return (
      <section className="container-fluid with-maxwidth chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <article className="article">
            <h2 className="article-title">Transfer Money</h2>
            <div className="box box-default">
              <div className="box-body padding-xl">

                <form role="form">
                  <div className="form-group row">
                    <label htmlFor="inputCategory" className="col-md-2 control-label">To Account</label>
                    <div className="col-md-10">
                      <select className="form-control" name="category" onChange={this.handleChange}>
                        { accounts.accounts.map((account, index) => (
                          <option key={index} value={account.phone}>{account.name}</option>
                        )) }
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputAmount" className="col-md-2 control-label">Amount</label>
                    <div className="col-md-10">
                      <input type="number" className="form-control" id="amount" onChange={this.handleAmount} placeholder="Amount" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="offset-md-2 col-md-10">
                      <RaisedButton label="Send Money" className="btn-w-md" primary onClick={this.doTransfer} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </article>
        </QueueAnim>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.account.accounts
});

const mapDispatchToProps = dispatch => ({
  fetchAccounts: () => {
    dispatch(fetchAccounts());
  },
  transferMoney: (phone, amount) => {
    dispatch(transferMoney(phone, amount));
  }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferForm);
