import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom'

// 页面
import Layout from 'component/layout/index.jsx'
import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Login} />
          <Route
            path="/"
            render={() => (
              <Layout>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/product" component={Home} />
                  <Route path="/product-category" component={Home} />
                  <Route path="/order" component={Home} />
                </Switch>
              </Layout>
            )}
          />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
