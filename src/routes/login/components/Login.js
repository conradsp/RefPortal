import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import arcLogo from '../../../assets/images/ArcLogo.jpg';
import { manualLogin, logOut } from '../../../actions/users';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillMount() {
    // Log the user out if already logged in
    const { logOut } = this.props;
    logOut();
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin } = this.props;
    const phone = this.phone.input.value;
    const password = this.password.input.value;

    manualLogin({ phone, password });
  }

  render() {
    const { message } = this.props.user;

    return (
      <div className="page-login">
        <div className="main-body">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="1">
              <div className="body-inner">
                <div className="card bg-white">
                  <div className="card-content">

                    <section className="logo text-center">
                      <a href="#/"><img src={arcLogo} alt="ARC Logo" /></a>
                    </section>

                    <form className="form-horizontal" >
                      <fieldset>
                        <div className="form-group">
                          <TextField
                            floatingLabelText="Phone"
                            ref={(input) => { this.phone = input; }}
                            fullWidth
                          />
                        </div>
                        <div className="form-group">
                          <TextField
                            floatingLabelText="Password"
                            type="password"
                            ref={(input) => { this.password = input; }}
                            fullWidth
                            />
                        </div>
                      </fieldset>
                      <p
                        className="message"
                      >{message}</p>
                    </form>
                  </div>
                  <div className="card-action no-border text-right">
                    <a href="#/" className="color-primary" onClick={this.handleOnSubmit}>Login</a>
                  </div>
                </div>

                <div className="additional-info">
                  <a href="#/sign-up">Sign up</a>
                  <span className="divider-h" />
                  <a href="#/forgot-password">Forgot your password?</a>
                </div>
              </div>
            </div>
          </QueueAnim>
        </div>
      </div>
    );
  }
}


Login.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
  return {
    user
  };
}

module.exports = connect(mapStateToProps, { manualLogin, logOut })(Login);
