import React from 'react';
import PropTypes from 'prop-types';
import './form.css';
import { connect } from 'react-redux';
import { fetchAPI, newExpense } from '../actions/index';
import Input from './Inputs';
import Select from './Select';

class FormDespesas extends React.Component {
  constructor() {
    super();
    this.state = {
      despesas: [],
      value: '',
      description: '',
      method: '',
      tag: '',
      currency: '',
      id: 0,
      exchangeRates: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.atribuiExchanges = this.atribuiExchanges.bind(this);
  }

  componentDidMount() {
    this.atribuiExchanges();
  }

  onClick(e) {
    e.preventDefault();
    const { createExpense, objCurrence } = this.props;
    const {
      despesas, value, description, method, tag, currency, id, exchangeRates,
    } = this.state;

    objCurrence();

    // cria localmente todas as despesas para gerar o id, e limpa os inputs
    this.setState((prevState) => ({
      id: despesas.length + 1,
      despesas: [
        prevState.despesas, { value, description, method, tag, currency, id }],
      value: '',
      description: '',
      method: '',
      tag: '',
      currency: '',
    }));

    createExpense({ value, description, method, tag, currency, id, exchangeRates });
  }

  async atribuiExchanges() { // Tatamento feito com ajuda do João Veidz
    const { objCurrence } = this.props;
    const aboutCurrency = await objCurrence();
    this.setState({ exchangeRates: aboutCurrency.payload });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { nameCurrences } = this.props;
    const { value, description, method, tag, currency } = this.state;
    const nameCurrence = [];
    const formaDePagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tiposDeTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form className="despesas">
        <Input // descrição
          type="text"
          dataTest="description-input"
          name="description"
          value={ description }
          placeholder="Descrição"
          onChange={ this.handleChange }
        />

        <Select // tipo de tag
          dataTest="tag-input"
          id="Tag"
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
          arrayOptions={ tiposDeTag }
        />

        <Select // tipo de pagamento
          dataTest="method-input"
          id="Método de pagamento"
          name="method"
          onChange={ this.handleChange }
          value={ method }
          arrayOptions={ formaDePagamento }
        />

        <Input // valor
          type="number"
          dataTest="value-input"
          name="value"
          value={ value }
          placeholder="Valor"
          onChange={ this.handleChange }
        />

        <Select // tipo de moeda
          dataTest="currency-input"
          id="moeda"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
          arrayOptions={ nameCurrence }
          { ...nameCurrences.map((moeda) => nameCurrence.push(moeda)) }
        />

        <button type="submit" onClick={ this.onClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  objCurrence: () => dispatch(fetchAPI()),
  createExpense: (obj) => dispatch(newExpense(obj)),
});

const mapStateToProps = (state) => ({
  nameCurrences: state.wallet.currencies,
});

FormDespesas.propTypes = {
  objCurrence: PropTypes.func.isRequired,
  nameCurrences: PropTypes.objectOf(Array).isRequired,
  createExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesas);
