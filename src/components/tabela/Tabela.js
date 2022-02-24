import React from 'react';
import { connect } from 'react-redux';
import './tabela.css';
import PropTypes from 'prop-types';

class Gastos extends React.Component {
  render() {
    const { despesas } = this.props;

    return (
      <table className="table">
        <thead className="cabecalho">
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody className="detalhes">
          {
            despesas.map((despesa) => (
              <tr key={ despesa.id }>
                <td>{ despesa.description }</td>
                <td>{ despesa.tag }</td>
                <td className="method">{ despesa.method }</td>
                <td className="value">{ despesa.value }</td>
                <td className="currency-name">
                  { despesa.exchangeRates[despesa.currency].name }
                </td>
                <td>
                  { (Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2)) }
                </td>
                <td className="value-BR">
                  {
                    Number(despesa.value * (despesa.exchangeRates[despesa.currency].ask))
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button type="button">
                    Editar/Excluir
                  </button>
                </td>
              </tr>))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

Gastos.propTypes = {
  despesas: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Gastos);
