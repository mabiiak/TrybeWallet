import React from 'react';
import Header from '../components/header/header';
import FormDespesas from '../components/FormDespesas';
import Tabela from '../components/tabela/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormDespesas />
        <Tabela />
      </div>
    );
  }
}

export default Wallet;
