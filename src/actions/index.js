import {
  CHANGE_MEAL_EVENT,
  GENERATE_MODAL_VISIBLE,
  DETAIL_MODAL_VISIBLE,
  ADD_RECIPE_TO_STORAGE,
  CHANGE_FAVORITED_RECIPE,
  ADD_RECIPE_TO_CALENDAR,
  REMOVE_RECIPE_FROM_CALENDAR,
  INC_QUERY_NUMBER,
} from '../constants/action-types';

export const changeMealEvent = (change) => ({
  type: CHANGE_MEAL_EVENT,
  payload: { date: change.date, bool: change.bool },
});

export const setGenerateModalVisible = (visible) => ({
  type: GENERATE_MODAL_VISIBLE,
  payload: visible,
});

export const setDetailModalVisible = (visible) => ({
  type: DETAIL_MODAL_VISIBLE,
  payload: visible,
});

export const addRecipeToStorage = (recipe, bool) => ({
  type: ADD_RECIPE_TO_STORAGE,
  payload: {
    id: recipe.id,
    data: { ...recipe },
    bool,
  },
});

export const changeFavoritedRecipe = (id, bool) => ({
  type: CHANGE_FAVORITED_RECIPE,
  payload: {
    id,
    bool,
  },
});

export const addRecipeToCalendar = (date, recipe) => ({
  type: ADD_RECIPE_TO_CALENDAR,
  payload: {
    date,
    recipe,
  },
});

export const removeRecipeFromCalendar = (date) => ({
  type: REMOVE_RECIPE_FROM_CALENDAR,
  payload: {
    date,
  },
});

export const incQueryNumber = (index) => ({
  type: INC_QUERY_NUMBER,
  payload: {
    index,
  },
});
