import React, { Component, Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// import './style.css'
import './transition.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { show: true, list: [] }
    this.handleToggle = this.handleToggle.bind(this)
  }
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          {this.state.list.map((item, index) => {
            return (
              <CSSTransition
                key={index}
                in={this.state.show}
                timeout={1000}
                classNames="fade"
                unmountOnExit
                onEntered={el => {
                  el.style.color = 'red'
                }}
                appear={true}
              >
                <div>hello</div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
        <button onClick={this.handleToggle}>toggle</button>
      </Fragment>
    )
  }
  handleToggle() {
    this.setState(prevState => {
      return {
        list: [...prevState.list, 'item']
      }
    })
  }
}

export default App
