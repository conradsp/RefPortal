import React from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import QueueAnim from 'rc-queue-anim';

import { fetchAccounts } from '../../../../../actions/accounts';


class TransactionTable extends React.Component {

  componentWillMount() {
    const { fetchAccounts, fetchAllTransactions } = this.props;
    const { accounts, info } = this.props;
    fetchAccounts();
  }

  render() {
    const { accounts } = this.props;

    return (
      <div className="container-fluid with-maxwidth chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <article className="article">
            <h2 className="article-title">All Accounts</h2>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Balance</TableHeaderColumn>
                  <TableHeaderColumn>Account ID</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
              >
                { accounts.accounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{account.name}</TableRowColumn>
                    <TableRowColumn>{account.balance}</TableRowColumn>
                    <TableRowColumn>{account.address}</TableRowColumn>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </article>
        </QueueAnim>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.account.accounts,
  info: state.user.profile.info
});

const mapDispatchToProps = dispatch => ({
  fetchAccounts: () => {
    dispatch(fetchAccounts());
  }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionTable);
