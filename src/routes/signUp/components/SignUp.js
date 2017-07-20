import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import arcLogo from '../../../assets/images/ArcLogo.jpg';
import { manualLogin, signUp, toggleLoginMode } from '../../../actions/users';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { signUp, user: { isLogin } } = this.props;

    signUp({ phone, password });
  }

  render() {
    return (
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
                    floatingLabelText="Email"
                    ref={(input) => { this.email = input; }}
                    type="email"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    ref={(input) => { this.password = input; }}
                    type="password"
                    fullWidth
                  />
                </div>
                <div className="divider" />
                <div className="form-group">
                  <p className="text-small">By clicking on sign up, you agree to <a href="javascript:;"><i>terms</i></a> and <a href="javascript:;"><i>privacy policy</i></a></p>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/login" className="color-gray-light">Login</a>
            <a href="#/" className="color-primary" onSubmit={this.handleOnSubmit}>Sign Up</a>
          </div>
        </div>

      </div>
    );
  }
}

const Page = () => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <SignUp />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
