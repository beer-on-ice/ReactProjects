import React, { memo } from 'react'
import './index.css'

const Submit = memo(() => {
	return (
		<div className='submit'>
			<button className='submit-button' type='submit'>
				搜索
			</button>
		</div>
	)
})
export default Submit
