import {
	ACTION_SET_FROM,
	ACTION_SET_TO,
	ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
	ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
	ACTION_SET_CITY_DATA,
	ACTION_SET_IS_LOADING_CITY_DATA,
	ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
	ACTION_SET_HIGH_SPEED,
} from './actionTypes'

const defaultState = {
	from: '北京',
	to: '上海',
	isCitySelectorVisible: false,
	currentSelectingLeftCity: false,
	cityData: null,
	isLoadingCityData: false,
	isDateSelectorVisible: false,
	highSpeed: false,
	departDate: Date.now(),
}

const from = (state, action) => {
	const { payload } = action
	return { ...state, from: payload }
}

const to = (state, action) => {
	const { payload } = action
	return { ...state, to: payload }
}

const isCitySelectorVisible = (state, action) => {
	const { payload } = action
	return { ...state, isCitySelectorVisible: payload }
}

const currentSelectingLeftCity = (state, action) => {
	const { payload } = action
	return { ...state, currentSelectingLeftCity: payload }
}

const cityData = (state, action) => {
	const { payload } = action
	return { ...state, cityData: payload }
}

const isLoadingCityData = (state, action) => {
	const { payload } = action
	return { ...state, isLoadingCityData: payload }
}

const isDateSelectorVisible = (state, action) => {
	const { payload } = action
	return { ...state, isDateSelectorVisible: payload }
}

const highSpeed = (state, action) => {
	const { payload } = action
	return { ...state, highSpeed: payload }
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case ACTION_SET_FROM:
			return from(state, action)
		case ACTION_SET_TO:
			return to(state, action)
		case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
			return isCitySelectorVisible(state, action)
		case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
			return currentSelectingLeftCity(state, action)
		case ACTION_SET_CITY_DATA:
			return cityData(state, action)
		case ACTION_SET_IS_LOADING_CITY_DATA:
			return isLoadingCityData(state, action)
		case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
			return isDateSelectorVisible(state, action)
		case ACTION_SET_HIGH_SPEED:
			return highSpeed(state, action)
		default:
			return state
	}
}
