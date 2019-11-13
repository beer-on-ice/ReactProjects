import React, { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './App.css'

import Header from 'common/Header'
import CitySelector from 'common/CitySelector'

import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

import {
	exchangeFromTo,
	showCitySelector,
	hideCitySelector,
	fetchCityData,
	setSelectCity,
	showDateSelector,
} from './store/actionCreators'

const App = props => {
	const {
		home: {
			from,
			to,
			isCitySelectorVisible,
			cityData,
			isLoadingCityData,
			departDate,
		},
		dispatch,
	} = { ...props }

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

	const departDateCbs = useMemo(() => {
		return bindActionCreators(
			{
				onClick: showDateSelector,
			},
			dispatch
		)
	}, [])

	return (
		<div>
			<div className='header-wrapper'>
				<Header title='火车票' onBack={onBack}></Header>
			</div>
			<form action='' className='form'>
				<Journey from={from} to={to} {...cbs}></Journey>
				<DepartDate time={departDate} {...departDateCbs}></DepartDate>
				<HighSpeed></HighSpeed>
				<Submit></Submit>
			</form>
			<CitySelector
				show={isCitySelectorVisible}
				cityData={cityData}
				isLoading={isLoadingCityData}
				{...citySelectorCbs}
			></CitySelector>
		</div>
	)
}

const mapStateToProps = state => {
	return state
}
const mapDispatchToProps = dispatch => {
	return { dispatch }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
