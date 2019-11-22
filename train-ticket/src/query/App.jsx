import React from 'react'
import { connect } from 'react-redux'

import './App.css'

import Nav from 'common/Nav'
import List from 'query/List'
import Bottom from 'query/Bottom'

const App = props => {
	return (
		<div>
			<Nav></Nav>
			<List></List>
			<Bottom></Bottom>
		</div>
	)
}

const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => {}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
