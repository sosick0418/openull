import reducers from '../reducers';
import { createStore, Store, Action } from 'redux';

export default function initStore(): Store<unknown, Action<any>> {
  const store = createStore(reducers);
  return store;
}
