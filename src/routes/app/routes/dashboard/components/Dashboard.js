import React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import ProfileCards from './Profile';
import TransactionTable from './Transactions';
import { fetchUser } from '../../../../../actions/users';

class Main extends React.Component {

  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-xl-12">
          <div className="box box-default">
            <div className="box-body">
              <ProfileCards {...this.props} />
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="box box-default">
            <div className="box-body">
              <TransactionTable {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Dashboard extends React.Component {

  componentWillMount() {
    const { fetchUser } = this.props;
    const { phone, profile } = this.props;
    fetchUser(phone);
  }

  render() {
    const { phone, info } = this.props;

    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">
        <QueueAnim type="bottom" className="ui-animate">
          <Main {...this.props} />
        </QueueAnim>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  phone: sessionStorage.phone,
  profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({
  handleChange: (phone) => {
    dispatch(changePhone(phone));
  },
  fetchUser: (phone) => {
    dispatch(fetchUser(phone));
  }
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
