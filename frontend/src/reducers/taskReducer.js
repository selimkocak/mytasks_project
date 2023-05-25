// src/reducers/taskReducer.js
import { sortTasksByCreateDate } from '../actions/sortActions';

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SORT_TASKS':
      const { sortOrder } = action.payload;
      const sortedTasks = sortTasksByCreateDate(state.tasks, sortOrder);
      return {
        ...state,
        tasks: sortedTasks,
      };
    default:
      return state;
  }
};

export default taskReducer;
