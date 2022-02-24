// Coloque aqui suas actions

export const newEmail = (state) => ({
  type: 'NEW_EMAIL',
  state,
});

// ------------------------------------------------------

export const newExpense = (despesa) => ({
  type: 'NEW_EXPENSE',
  despesa,
});

// -------------------------------------------------------

export const returnFetch = (json) => ({
  type: 'RECEIVE_CURRENCIE', payload: json,
});

export function fetchAPI() {
  return (dispatch) => (fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json()
      .then(
        (json) => dispatch(returnFetch(json)),
      ))
  );
}
