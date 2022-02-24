import React from 'react';
import './header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// referencia casas decimais: https://www.w3schools.com/jsref/jsref_tofixed.asp

class Header extends React.Component {
  render() {
    const { email, expensesValues } = this.props;
    let valor = 0;
    let moedaEmRealBR = '';
    let valorConvertido = 0;

    expensesValues.map((despesa) => {
      valor = Number(despesa.value);
      moedaEmRealBR = Object.values(despesa.exchangeRates)
        .find((coin) => coin.code === despesa.currency).ask; // ajuda do Mateus Turola para identificar essa ask
      valorConvertido += (valor * Number(moedaEmRealBR));
      return valorConvertido;
    });

    return (
      <div className="headerInfo">
        <span role="img" aria-labelledby="coin">💸</span>
        <p data-testid="email-field">{ email }</p>
        { console.log(expensesValues)}
        <p data-testid="total-field">
          { valorConvertido.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesValues: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expensesValues: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
