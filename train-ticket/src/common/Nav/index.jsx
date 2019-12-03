import React, { useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import './index.css'

const Nav = memo(props => {
	const { date, prev, next, isPrevDisable, isNextDisable } = props

	const currentString = useMemo(() => {
		const d = dayjs(date)
		return d.format('M月D日 ') + d.locale('zh-cn').format('ddd')
	}, [date])

	return (
		<div className='nav'>
			<span
				onClick={prev}
				className={classnames('nav-prev', {
					'nav-disabled': isPrevDisable,
				})}
			>
				前一天
			</span>
			<span className='nav-current'>{currentString}</span>
			<span
				onClick={next}
				className={classnames('nav-next', {
					'nav-disabled': isNextDisable,
				})}
			>
				后一天
			</span>
		</div>
	)
})

Nav.protoTypes = {
	date: PropTypes.number.isRequired,
	prev: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
	isPrevDisable: PropTypes.bool.isRequired,
	isNextDisable: PropTypes.bool.isRequired,
}

export default Nav
