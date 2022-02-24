import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Login.css';
import { newEmail } from '../actions/index';
import Input from '../components/Inputs';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      email: '',
      senha: '',
      disableButton: true,
    };
  }

  onClick(e) {
    e.preventDefault();
    const { history, insertEmail } = this.props;

    insertEmail(this.state);
    history.push('/carteira');
  }

  validate() {
    const { email, senha } = this.state;
    const min = 6;

    // Feito com ajuda do Ivan, e monitoria com a Samanta e o Felipe
    // Retirado do site --> https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

    const mailFormat = /\S+@\S+\.\S+/;

    if (senha.length >= min && email.match(mailFormat)) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({ [name]: value }, () => this.validate());
  }

  render() {
    const { disableButton } = this.state;

    return (
      <form className="pageLogin" onSubmit={ this.onClick }>
        <div className="tittleLogin">
          <h1>
            TrybeWallet
            <span role="img" aria-labelledby="coin">💸</span>
          </h1>
        </div>
        <p> Login </p>
        <Input // email
          nome="mail"
          dataTest="email-input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={ this.handleChange }
        />

        <Input // senha
          nome="senha"
          dataTest="password-input"
          type="password"
          id="senha"
          name="senha"
          placeholder="Senha"
          onChange={ this.handleChange }
        />

        <button type="submit" disabled={ disableButton }>
          Entrar (usuario ficticio)
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
  insertEmail: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  insertEmail: (state) => dispatch(newEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
