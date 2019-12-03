import { h0 } from 'common/util/fp'
import { ORDER_DEPART } from 'query/constant'
import {
	ACTION_SET_FROM,
	ACTION_SET_TO,
	ACTION_SET_DEPART_DATE,
	ACTION_SET_HIGH_SPEED,
	ACTION_SET_TRAIN_LIST,
	ACTION_SET_ORDER_TYPE,
	ACTION_SET_ONLY_TICKETS,
	ACTION_SET_TICKET_TYPES,
	ACTION_SET_CHECKED_TICKET_TYPES,
	ACTION_SET_TRAIN_TYPES,
	ACTION_SET_CHECKED_TRAIN_TYPES,
	ACTION_SET_DEPART_STATIONS,
	ACTION_SET_CHECKED_DEPART_STATIONS,
	ACTION_SET_ARRIVE_STATIONS,
	ACTION_SET_CHECKED_ARRIVE_STATIONS,
	ACTION_SET_DEPART_TIME_START,
	ACTION_SET_DEPART_TIME_END,
	ACTION_SET_ARRIVE_TIME_START,
	ACTION_SET_ARRIVE_TIME_END,
	ACTION_SET_IS_FILTERS_VISIBLE,
	ACTION_SET_SEARCH_PARSED,
} from './actionTypes'

const defaultState = {
	from: null,
	to: null,
	departDate: h0(Date.now()),
	highSpeed: false,
	trainList: [],
	orderType: ORDER_DEPART,
	onlyTickets: false,
	ticketTypes: [],
	checkedTicketTypes: {},
	trainTypes: [],
	checkedTrainTypes: {},
	departStations: [],
	checkedDepartStations: {},
	arriveStations: [],
	checkedArriveStations: {},
	departTimeStart: 0,
	departTimeEnd: 24,
	arriveTimeStart: 0,
	arriveTimeEnd: 24,
	isFiltersVisible: false,
	searchParsed: false,
}

const from = (state, action) => {
	const { payload } = action
	return { ...state, from: payload }
}

const to = (state, action) => {
	const { payload } = action
	return { ...state, to: payload }
}

const departDate = (state, action) => {
	const { payload } = action
	return { ...state, departDate: payload }
}

const highSpeed = (state, action) => {
	const { payload } = action
	return { ...state, highSpeed: payload }
}

const trainList = (state, action) => {
	const { payload } = action
	return { ...state, trainList: payload }
}

const orderType = (state, action) => {
	const { payload } = action
	return { ...state, orderType: payload }
}

const onlyTickets = (state, action) => {
	const { payload } = action
	return { ...state, onlyTickets: payload }
}

const ticketTypes = (state, action) => {
	const { payload } = action
	return { ...state, ticketTypes: payload }
}

const checkedTicketTypes = (state, action) => {
	const { payload } = action
	return { ...state, checkedTicketTypes: payload }
}

const trainTypes = (state, action) => {
	const { payload } = action
	return { ...state, trainTypes: payload }
}

const checkedTrainTypes = (state, action) => {
	const { payload } = action
	return { ...state, checkedTrainTypes: payload }
}

const departStations = (state, action) => {
	const { payload } = action
	return { ...state, departStations: payload }
}
const checkedDepartStations = (state, action) => {
	const { payload } = action
	return { ...state, checkedDepartStations: payload }
}

const arriveStations = (state, action) => {
	const { payload } = action
	return { ...state, arriveStations: payload }
}

const checkedArriveStations = (state, action) => {
	const { payload } = action
	return { ...state, checkedArriveStations: payload }
}
const departTimeStart = (state, action) => {
	const { payload } = action
	return { ...state, departTimeStart: payload }
}

const departTimeEnd = (state, action) => {
	const { payload } = action
	return { ...state, departTimeEnd: payload }
}
const arriveTimeStart = (state, action) => {
	const { payload } = action
	return { ...state, arriveTimeStart: payload }
}

const arriveTimeEnd = (state, action) => {
	const { payload } = action
	return { ...state, arriveTimeEnd: payload }
}

const isFiltersVisible = (state, action) => {
	const { payload } = action
	return { ...state, isFiltersVisible: payload }
}
const searchParsed = (state, action) => {
	const { payload } = action
	return { ...state, searchParsed: payload }
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case ACTION_SET_FROM:
			return from(state, action)
		case ACTION_SET_TO:
			return to(state, action)
		case ACTION_SET_DEPART_DATE:
			return departDate(state, action)
		case ACTION_SET_HIGH_SPEED:
			return highSpeed(state, action)
		case ACTION_SET_TRAIN_LIST:
			return trainList(state, action)
		case ACTION_SET_ORDER_TYPE:
			return orderType(state, action)
		case ACTION_SET_ONLY_TICKETS:
			return onlyTickets(state, action)
		case ACTION_SET_TICKET_TYPES:
			return ticketTypes(state, action)
		case ACTION_SET_CHECKED_TICKET_TYPES:
			return checkedTicketTypes(state, action)
		case ACTION_SET_TRAIN_TYPES:
			return trainTypes(state, action)
		case ACTION_SET_CHECKED_TRAIN_TYPES:
			return checkedTrainTypes(state, action)
		case ACTION_SET_DEPART_STATIONS:
			return departStations(state, action)
		case ACTION_SET_CHECKED_DEPART_STATIONS:
			return checkedDepartStations(state, action)
		case ACTION_SET_ARRIVE_STATIONS:
			return arriveStations(state, action)
		case ACTION_SET_CHECKED_ARRIVE_STATIONS:
			return checkedArriveStations(state, action)
		case ACTION_SET_DEPART_TIME_START:
			return departTimeStart(state, action)
		case ACTION_SET_DEPART_TIME_END:
			return departTimeEnd(state, action)
		case ACTION_SET_ARRIVE_TIME_START:
			return arriveTimeStart(state, action)
		case ACTION_SET_ARRIVE_TIME_END:
			return arriveTimeEnd(state, action)
		case ACTION_SET_IS_FILTERS_VISIBLE:
			return isFiltersVisible(state, action)
		case ACTION_SET_SEARCH_PARSED:
			return searchParsed(state, action)
		default:
			return state
	}
}
