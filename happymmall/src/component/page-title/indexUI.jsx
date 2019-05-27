import React from 'react'

const PageTitleUI = props => {
  return (
    <div className="row">
      <div className="col-md-12">
        <h1 className="page-header">{props.title}</h1>
        {props.children}
      </div>
    </div>
  )
}

export default PageTitleUI
