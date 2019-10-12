import {
  ADD_RECIPE_TO_STORAGE,
  CHANGE_FAVORITED_RECIPE,
  INC_QUERY_NUMBER,
} from '../constants/action-types';

const initialState = {
  recipes: {},
  queryNumber: [0, 0, 0],
};

const RecipeStorage = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE_TO_STORAGE: {
      if (state[action.payload.id] === undefined) {
        const newState = {
          ...state,
          favorites: { ...state.favorites, [action.payload.id]: action.payload.data },
        };
        newState.favorites[action.payload.id].favorite = action.payload.bool;
        return newState;
      }
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [action.payload.id]: { ...[action.payload.id], favorite: action.payload.bool },
        },
      };
    }
    case CHANGE_FAVORITED_RECIPE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [action.payload.id]: { ...[action.payload.id], favorite: action.payload.bool },
        },
      };
    case INC_QUERY_NUMBER:
      return {
        ...state,
        queryNumber: state.queryNumber.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return item + 1;
        }),
      };
    default:
      return state;
  }
};

export default RecipeStorage;
