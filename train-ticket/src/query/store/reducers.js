import { h0 } from 'common/util/fp'
import { ORDER_DEPART, ORDER_DURATION } from 'query/constant'

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
export default {}
