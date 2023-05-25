// frontend/src/store.js
import { combineReducers, createStore, applyMiddleware } from 'redux';
import taskReducer from './reducers/taskReducer';
import { sortTasksByCreateDate } from './actions/sortActions'; // sortTasksByCreateDate fonksiyonunu import edin

const rootReducer = combineReducers({
  tasks: taskReducer,
});

// Redux store oluşturulurken bir ara işleyici (middleware) kullanarak görevleri sıralayabilirsiniz
const store = createStore(
  rootReducer,
  applyMiddleware((store) => (next) => (action) => {
    if (action.type === 'SET_TASKS') {
      const { sortOrder } = action.payload;
      const sortedTasks = sortTasksByCreateDate(action.payload.tasks, sortOrder);
      action.payload.tasks = sortedTasks;
    }
    return next(action);
  })
);

export default store;
