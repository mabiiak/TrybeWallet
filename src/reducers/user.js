// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_USER = {
  email: '',
};

export default function user(state = INITIAL_USER, action) {
  switch (action.type) {
  case 'NEW_EMAIL':
    return {
      ...state,
      email: action.state.email };
  default:
    return state;
  }
}
