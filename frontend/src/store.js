// frontend/src/store.js
import { combineReducers, createStore, applyMiddleware } from 'redux';
import taskReducer from './reducers/taskReducer';
import { sortTasksByCreateDate } from './actions/sortActions';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware((store) => (next) => (action) => {
    if (action.type === 'SET_TASKS' || action.type === 'UPDATE_TASK') {
      const { sortOrder } = store.getState().tasks;
      const sortedTasks = sortTasksByCreateDate(store.getState().tasks.tasks, sortOrder);
      action.payload.tasks = sortedTasks;
    }
    return next(action);
  })
);

export default store;

