import React, { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './App.css'

import Header from 'common/Header'
import CitySelector from 'common/CitySelector'
import DateSelector from 'common/DateSelector'

import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

import { h0 } from 'common/util/fp'

import {
	exchangeFromTo,
	showCitySelector,
	hideCitySelector,
	fetchCityData,
	setSelectCity,
	showDateSelector,
	hideDateSelector,
	setDepartDate,
	toggleHighSpeed,
} from './store/actionCreators'

/*
 * useMemo返回缓存的变量，useCallback返回缓存的函数
 * useCallback(fn,deps) === useMemo(()=>fn,deps)
 */

const App = props => {
	const {
		home: {
			from,
			to,
			isCitySelectorVisible,
			isDateSelectorVisible,
			cityData,
			isLoadingCityData,
			departDate,
			highSpeed,
		},
		dispatch,
	} = { ...props }

	// useCallback Hook, 用来‘缓存’函数, 保持回调的不变性
	const onBack = useCallback(() => {
		window.history.back()
	}, [])

	const cbs = useMemo(() => {
		return bindActionCreators(
			{
				exchangeFromTo,
				showCitySelector,
			},
			dispatch
		)
	}, [])

	const citySelectorCbs = useMemo(() => {
		return bindActionCreators(
			{
				onBack: hideCitySelector,
				fetchCityData,
				onSelect: setSelectCity,
			},
			dispatch
		)
	}, [])

	const dateSelectorCbs = useMemo(() => {
		return bindActionCreators(
			{
				onBack: hideDateSelector,
			},
			dispatch
		)
	}, [])

	const departDateCbs = useMemo(() => {
		return bindActionCreators(
			{
				onClick: showDateSelector,
			},
			dispatch
		)
	}, [])

	const highSpeedCbs = useMemo(() => {
		return bindActionCreators(
			{
				toggle: toggleHighSpeed,
			},
			dispatch
		)
	}, [])

	const onSelectDate = useCallback(day => {
		if (!day) return
		if (day < h0()) return

		dispatch(setDepartDate(day))
		dispatch(hideDateSelector())
	}, [])

	return (
		<div>
			<div className='header-wrapper'>
				<Header title='火车票' onBack={onBack}></Header>
			</div>
			<form action='./query.html' className='form'>
				<Journey from={from} to={to} {...cbs}></Journey>
				<DepartDate time={departDate} {...departDateCbs}></DepartDate>
				<HighSpeed highSpeed={highSpeed} {...highSpeedCbs}></HighSpeed>
				<Submit></Submit>
			</form>
			<CitySelector
				show={isCitySelectorVisible}
				cityData={cityData}
				isLoading={isLoadingCityData}
				{...citySelectorCbs}
			></CitySelector>
			<DateSelector
				show={isDateSelectorVisible}
				onSelect={onSelectDate}
				{...dateSelectorCbs}
			></DateSelector>
		</div>
	)
}

const mapStateToProps = state => state // store里面的state
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
