import { CHANGE_INPUT_VALUE, ADD_NEW_ITEM, DELETE_ITEM } from './actionTypes'

export const changeInputValue = value => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const addNewItem = () => ({
  type: ADD_NEW_ITEM
})

export const deleteItem = index => ({
  type: DELETE_ITEM,
  index
})
