// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_WALLET, action) {
  switch (action.type) {
  case 'NEW_EXPENSE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.despesa],
    };

  case 'RECEIVE_CURRENCIE':
    return { ...state,
      currencies: Object.keys(action.payload).filter((current) => current !== 'USDT'),
    };

  default:
    return state;
  }
}
