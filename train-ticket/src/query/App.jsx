import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import URI from 'urijs'
import dayjs from 'dayjs'

import useNav from 'common/Nav/useNav'

import './App.css'
import {
	setFrom,
	setTo,
	setDepartDate,
	setHighSpeed,
	setSearchParsed,
	setTrainList,
	setTicketTypes,
	setTrainTypes,
	setDepartStations,
	setArriveStations,
	prevDate,
	nextDate,
} from './store/actionCreators'

import Header from 'common/Header'
import Nav from 'common/Nav'
import { h0 } from 'common/util/fp'

import List from 'query/List'
import Bottom from 'query/Bottom'

const App = props => {
	const {
		query: {
			from,
			to,
			departDate,
			highSpeed,
			searchParsed,
			orderType,
			onlyTickets,
			checkedTicketTypes,
			checkedTrainTypes,
			checkedDepartStations,
			checkedArriveStations,
			departTimeStart,
			departTimeEnd,
			arriveTimeStart,
			arriveTimeEnd,
		},
		dispatch,
	} = props
	const onBack = useCallback(() => {
		window.history.back()
	}, [])

	useEffect(() => {
		const queries = URI.parseQuery(window.location.search)
		const { from, to, date, highSpeed } = queries
		dispatch(setFrom(from))
		dispatch(setTo(to))
		dispatch(setDepartDate(h0(dayjs(date).valueOf())))
		dispatch(setHighSpeed(highSpeed === 'true'))
		dispatch(setSearchParsed(true))
	}, [])

	useEffect(() => {
		if (!searchParsed) return

		const url = new URI('/rest/query')
			.setSearch('from', from)
			.setSearch('to', to)
			.setSearch('departDate', dayjs(departDate).format('YYYY-MM-DD'))
			.setSearch('highSpeed', highSpeed)
			.setSearch('orderType', orderType)
			.setSearch('onlyTickets', onlyTickets)
			.setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
			.setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
			.setSearch(
				'checkedDepartStations',
				Object.keys(checkedDepartStations).join()
			)
			.setSearch(
				'checkedArriveStations',
				Object.keys(checkedArriveStations).join()
			)
			.setSearch('departTimeStart', departTimeStart)
			.setSearch('departTimeEnd', departTimeEnd)
			.setSearch('arriveTimeStart', arriveTimeStart)
			.setSearch('arriveTimeEnd', arriveTimeEnd)
			.toString()
		fetch(url)
			.then(res => res.json())
			.then(result => {
				const {
					dataMap: {
						directTrainInfo: {
							trains,
							filter: { arrStation, depStation, ticketType, trainType },
						},
					},
				} = result

				dispatch(setTrainList(trains))
				dispatch(setTicketTypes(ticketType))
				dispatch(setTrainTypes(trainType))
				dispatch(setDepartStations(depStation))
				dispatch(setArriveStations(arrStation))
			})
	}, [
		searchParsed,
		from,
		to,
		departDate,
		highSpeed,
		orderType,
		onlyTickets,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations,
		departTimeStart,
		departTimeEnd,
		arriveTimeStart,
		arriveTimeEnd,
	])
	const { isPrevDisable, isNextDisable, prev, next } = useNav(
		departDate,
		dispatch,
		prevDate,
		nextDate
	)
	if (!searchParsed) return null
	return (
		<div>
			<div className='header-wrapper'>
				<Header title={`${from} → ${to}`} onBack={onBack}></Header>
			</div>
			<Nav
				date={departDate}
				isPrevDisable={isPrevDisable}
				isNextDisable={isNextDisable}
				prev={prev}
				next={next}
			></Nav>
			<List></List>
			<Bottom></Bottom>
		</div>
	)
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
