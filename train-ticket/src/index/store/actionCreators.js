import * as actionTypes from './actionTypes'

export function setFrom(from) {
	return {
		type: actionTypes.ACTION_SET_FROM,
		payload: from,
	}
}

export function setTo(to) {
	return {
		type: actionTypes.ACTION_SET_TO,
		payload: to,
	}
}

export function setIsLoadingCityData(data) {
	return {
		type: actionTypes.ACTION_SET_IS_LOADING_CITY_DATA,
		payload: data,
	}
}

export function setCityData(data) {
	return {
		type: actionTypes.ACTION_SET_CITY_DATA,
		payload: data,
	}
}

export function toggleHighSpeed() {
	return (dispatch, getState) => {
		const {
			home: { highSpeed },
		} = getState()
		dispatch({
			type: actionTypes.ACTION_SET_HIGH_SPEED,
			payload: !highSpeed,
		})
	}
}

export function showCitySelector(currentSelectingLeftCity) {
	return dispatch => {
		dispatch({
			type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
			payload: true,
		})
		dispatch({
			type: actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
			payload: currentSelectingLeftCity,
		})
	}
}

export function hideCitySelector(currentSelectingLeftCity) {
	return dispatch => {
		dispatch({
			type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
			payload: false,
		})
		dispatch({
			type: actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
			payload: currentSelectingLeftCity,
		})
	}
}

export function setSelectCity(city) {
	return (dispatch, getState) => {
		const {
			home: { currentSelectingLeftCity },
		} = getState()
		if (currentSelectingLeftCity) {
			dispatch(setFrom(city))
		} else {
			dispatch(setTo(city))
		}
		dispatch(hideCitySelector())
	}
}

export function showDateSelector() {
	return dispatch => {
		dispatch({
			type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
			payload: true,
		})
	}
}

export function hideDateSelector() {
	return dispatch => {
		dispatch({
			type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
			payload: false,
		})
	}
}

export function exchangeFromTo() {
	return (dispatch, getState) => {
		const {
			home: { from, to },
		} = getState()

		dispatch(setFrom(to))
		dispatch(setTo(from))
	}
}
export function setDepartDate(date) {
	return {
		type: actionTypes.ACTION_SET_DEPART_DATE,
		payload: date,
	}
}

export function fetchCityData() {
	return (dispatch, getState) => {
		const { isLoadingCityData } = getState()
		if (isLoadingCityData) return

		const cache = JSON.parse(localStorage.getItem('city_data_cache'))
		if (Date.now() < cache.expires) {
			dispatch(setCityData(cache.data))
			return
		}

		dispatch(setIsLoadingCityData(true))
		fetch(`/rest/cities?_${Date.now()}`)
			.then(res => res.json())
			.then(cityData => {
				dispatch(setCityData(cityData))
				localStorage.setItem(
					'city_data_cache',
					JSON.stringify({
						expires: Date.now() + 60 * 1000,
						data: cityData,
					})
				)
				dispatch(setIsLoadingCityData(false))
			})
			.catch(() => {
				dispatch(setIsLoadingCityData(false))
			})
	}
}
