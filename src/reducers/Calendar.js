import {
  CHANGE_MEAL_EVENT,
  GENERATE_MODAL_VISIBLE,
  DETAIL_MODAL_VISIBLE,
  ADD_RECIPE_TO_CALENDAR,
  REMOVE_RECIPE_FROM_CALENDAR,
} from '../constants/action-types';

const initialState = {
  markedDays: {},
  recipes: {},
  generateModalVisible: false,
  detailModalVisible: false,
};

const Calendar = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MEAL_EVENT: {
      const update = {
        ...state.markedDays,
        ...{ [action.payload.date]: { marked: action.payload.bool } },
      };
      return { ...state, markedDays: update };
    }
    case ADD_RECIPE_TO_CALENDAR: {
      const update = {
        ...state.recipes,
        ...{ [action.payload.date]: { ...action.payload.recipe } },
      };
      return { ...state, recipes: update };
    }
    case REMOVE_RECIPE_FROM_CALENDAR: {
      const update = {
        ...state.recipes,
      };
      delete update[action.payload.date];
      return { ...state, recipes: update };
    }
    case GENERATE_MODAL_VISIBLE:
      return { ...state, generateModalVisible: action.payload };
    case DETAIL_MODAL_VISIBLE:
      return { ...state, detailModalVisible: action.payload };
    default:
      return state;
  }
};

export default Calendar;
