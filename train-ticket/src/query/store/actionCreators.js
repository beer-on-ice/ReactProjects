import * as actionTypes from './actionTypes'
import { ORDER_DEPART, ORDER_DURATION } from './../constant'
import { h0 } from 'common/util/fp'

export const setFrom = from => ({
	type: actionTypes.ACTION_SET_FROM,
	payload: from,
})

export const setTo = to => ({
	type: actionTypes.ACTION_SET_TO,
	payload: to,
})

export const setDepartDate = departDate => ({
	type: actionTypes.ACTION_SET_DEPART_DATE,
	payload: departDate,
})

export const setHighSpeed = highSpeed => ({
	type: actionTypes.ACTION_SET_HIGH_SPEED,
	payload: highSpeed,
})

export const toggleHighSpeed = () => (dispatch, getState) => {
	const { highSpeed } = getState()
	dispatch(setHighSpeed(!highSpeed))
}

export const setTrainList = trainList => ({
	type: actionTypes.ACTION_SET_TRAIN_LIST,
	payload: trainList,
})

export const toggleOrderType = () => {
	return (dispatch, getState) => {
		const { orderType } = getState()
		if (orderType === ORDER_DEPART) {
			dispatch({
				type: actionTypes.ACTION_SET_ORDER_TYPE,
				payload: ORDER_DURATION,
			})
		} else {
			dispatch({
				type: actionTypes.ACTION_SET_ORDER_TYPE,
				payload: ORDER_DEPART,
			})
		}
	}
}

export const toggleOnlyTickets = () => (dispatch, getState) => {
	const { onlyTickets } = getState()
	dispatch({
		type: actionTypes.ACTION_SET_ONLY_TICKETS,
		payload: !onlyTickets,
	})
}

export const setTicketTypes = ticketTypes => ({
	type: actionTypes.ACTION_SET_TICKET_TYPES,
	payload: ticketTypes,
})

export const setCheckedTicketTypes = checkedTicketTypes => ({
	type: actionTypes.ACTION_SET_CHECKED_TICKET_TYPES,
	payload: checkedTicketTypes,
})

export const setTrainTypes = trainTypes => ({
	type: actionTypes.ACTION_SET_TRAIN_TYPES,
	payload: trainTypes,
})

export const setCheckedTrainTypes = checkedTrainTypes => ({
	type: actionTypes.ACTION_SET_CHECKED_TRAIN_TYPES,
	payload: checkedTrainTypes,
})

export const setDepartStations = departStations => ({
	type: actionTypes.ACTION_SET_DEPART_STATIONS,
	payload: departStations,
})

export const setCheckedDepartStations = checkedDepartStations => ({
	type: actionTypes.ACTION_SET_CHECKED_DEPART_STATIONS,
	payload: checkedDepartStations,
})

export const setArriveStations = arriveStations => ({
	type: actionTypes.ACTION_SET_ARRIVE_STATIONS,
	payload: arriveStations,
})

export const setCheckedArriveStations = checkedArriveStations => ({
	type: actionTypes.ACTION_SET_CHECKED_ARRIVE_STATIONS,
	payload: checkedArriveStations,
})

export const setDepartTimeStart = departTimeStart => ({
	type: actionTypes.ACTION_SET_DEPART_TIME_START,
	payload: departTimeStart,
})

export const setDepartTimeEnd = () => ({
	type: actionTypes.ACTION_SET_DEPART_TIME_END,
	payload: DEPART_TIME_END,
})

export const setArriveTimeStart = arriveTimeStart => ({
	type: actionTypes.ACTION_SET_ARRIVE_TIME_START,
	payload: arriveTimeStart,
})

export const setArriveTimeEnd = arriveTimeEnd => ({
	type: actionTypes.ACTION_SET_ARRIVE_TIME_END,
	payload: arriveTimeEnd,
})

export const toggleIsFiltersVisible = () => (dispatch, getState) => {
	const { isFiltersVisible } = getState()
	dispatch({
		type: actionTypes.ACTION_SET_IS_FILTERS_VISIBLE,
		payload: !isFiltersVisible,
	})
}

export const setSearchParsed = searchParsed => ({
	type: actionTypes.ACTION_SET_SEARCH_PARSED,
	payload: searchParsed,
})

export const nextDate = () => (dispatch, getState) => {
	const {
		query: { departDate },
	} = getState()
	dispatch(setDepartDate(h0(departDate) + 86400 * 1000))
}

export const prevDate = () => (dispatch, getState) => {
	const {
		query: { departDate },
	} = getState()
	dispatch(setDepartDate(h0(departDate) - 86400 * 1000))
}
