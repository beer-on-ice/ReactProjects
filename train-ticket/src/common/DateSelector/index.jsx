import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import Header from 'common/Header'

import './index.css'

import { h0 } from 'common/util/fp'

const Day = props => {
	const { day, onSelect } = props
	if (!day) {
		return <td className='null'></td>
	}
	const classes = []
	const now = h0()

	if (day < now) classes.push('disabled')
	if ([6, 0].includes(new Date(day).getDay())) classes.push('weekend')

	const dateString = now === day ? '今天' : new Date(day).getDate()
	return (
		<td className={classnames(classes)} onClick={() => onSelect(day)}>
			{dateString}
		</td>
	)
}

const Week = props => {
	const { days, onSelect } = props
	return (
		<tr className='date-table-days'>
			{days.map((day, index) => (
				<Day key={index} onSelect={onSelect} day={day}></Day>
			))}
		</tr>
	)
}

const Month = props => {
	// 每个月的第一天0时0分0秒
	const { startingTimeInMonth, onSelect } = props

	// 当前月和后2个月的 1号的时间戳
	const startDay = new Date(startingTimeInMonth)
	const currentDay = new Date(startingTimeInMonth)

	let days = []
	while (currentDay.getMonth() === startDay.getMonth()) {
		days.push(currentDay.getTime())
		// 循环天数一直加一，直到到了下个月不符合判断条件时截止，所以一直push进去一个月每天的时间戳
		currentDay.setDate(currentDay.getDate() + 1)
	}

	// 补齐前面的 - 当每个月第一天是星期日就补齐6个，不是星期日startDay.getDay() - 1个null
	days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
		.fill(null)
		.concat(days)

	const lastDay = new Date(days[days.length - 1])
	// 补齐后面的 - 当每个月最后一天是周日不补齐，否则补齐7 - lastDay.getDay()个null
	days = days.concat(
		new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
	)

	//按周分割days数组,days数组长度必为7的整数
	const weeks = []
	for (let row = 0; row < days.length / 7; ++row) {
		const week = days.slice(row * 7, (row + 1) * 7)
		weeks.push(week)
	}

	return (
		<table className='date-table'>
			<thead>
				<tr>
					<td colSpan='7'>
						<h5>
							{startDay.getFullYear()}年{startDay.getMonth() + 1}月
						</h5>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr className='date-table-weeks'>
					<th>周一</th>
					<th>周二</th>
					<th>周三</th>
					<th>周四</th>
					<th>周五</th>
					<th className='weekend'>周六</th>
					<th className='weekend'>周日</th>
				</tr>
				{weeks.map((week, index) => {
					return <Week key={index} days={week} onSelect={onSelect}></Week>
				})}
			</tbody>
		</table>
	)
}

const DateSelector = props => {
	const { show, onSelect, onBack } = props

	// 将当前月设为1号的0时0分0秒
	const now = new Date()
	now.setHours(0)
	now.setMinutes(0)
	now.setSeconds(0)
	now.setMilliseconds(0)
	now.setDate(1)
	// 后两个月
	const monthSequence = [now.getTime()]
	now.setMonth(now.getMonth() + 1)
	monthSequence.push(now.getTime())
	now.setMonth(now.getMonth() + 1)
	monthSequence.push(now.getTime())

	return (
		<div className={classnames('date-selector', { hidden: !show })}>
			<Header title='日期选择' onBack={onBack}></Header>
			<div className='date-selector-tables'>
				{monthSequence.map(month => {
					return (
						<Month
							key={month}
							onSelect={onSelect}
							startingTimeInMonth={month}
						></Month>
					)
				})}
			</div>
		</div>
	)
}

Day.propTypes = {
	day: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
}

Week.protoTypes = {
	days: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired,
}

Month.propTypes = {
	startingTimeInMonth: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired,
}

DateSelector.propTypes = {
	show: PropTypes.bool.isRequired,
	onSelect: PropTypes.func.isRequired,
	onBack: PropTypes.func.isRequired,
}

export default DateSelector
