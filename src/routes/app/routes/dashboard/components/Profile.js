import React from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import APPCONFIG from 'constants/Config';
import QueueAnim from 'rc-queue-anim';

class ProfileCards extends React.Component {

  render() {
    const { profile } = this.props;

    return (
      <article className="article">
        <div className="row">
          <div className="col-xl-6">
            <Card style={{backgroundColor: APPCONFIG.color.primary}}>
              <CardHeader
                title="Personal Info"
                subtitle={profile.info.name}
                actAsExpander
                showExpandableButton
                titleColor="#fff"
                subtitleColor="#e1e1e1"
                style={{color: '#fff'}}
                            />
              <CardText
                expandable
                style={{color: '#fff'}}
              >
                <p>Location: { profile.info.location }</p>
                <p>Role: { profile.info.role }</p>
                <p>Phone: { profile.info.phone }</p>
              </CardText>
              <CardActions
                expandable
                style={{color: '#fff'}}
                            >
                <FlatButton label="Update Profile" style={{color: '#fff'}} />
              </CardActions>
            </Card>
          </div>
          <div className="col-xl-6">
            <Card>
              <CardHeader
                title="Project Info"
                subtitle={profile.info.initiative.name}
                actAsExpander
                showExpandableButton
              />
              <CardText expandable>
                <p>Type: { profile.info.initiative.type }</p>
                <p>Location: { profile.info.initiative.location }</p>
              </CardText>
              <CardActions expandable>
                <FlatButton label="Change Project" />
              </CardActions>
            </Card>
          </div>
        </div>
      </article>
    );
  }
}

class Transactions extends React.Component {

  componentWillMount() {
    const { profile } = this.props;
  }

  render() {
    const { profile } = this.props;

    return (
      <article className="article">
        <h2 className="article-title">Recent Transactions</h2>
        <h6>Transaction count: {profile.transactions[0]}</h6>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Send/Receive</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Account ID</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
          >
            { profile.transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableRowColumn>{transaction.send}</TableRowColumn>
                <TableRowColumn>{transaction.amount}</TableRowColumn>
                <TableRowColumn>{transaction.address}</TableRowColumn>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </article>
    );
  }
}

class MainProfile extends React.Component {
  render() {
    const { profile } = this.props;
    return (
      <section className="container-fluid with-maxwidth chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <ProfileCards {...this.props} />
            <Transactions {...this.props} />
          </div>
        </QueueAnim>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({

});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainProfile);

