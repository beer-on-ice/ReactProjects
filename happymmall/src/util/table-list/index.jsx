import React from 'react'

class TableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLoading: true
    }
  }
  componentWillReceiveProps() {
    // 列表只有在第一次挂载的时候，firstLoading为true,其他情况为false
    this.setState({
      isFirstLoading: false
    })
  }
  render() {
    let tableHeader = this.props.tableHeads.map((tableHead, index) => {
      if (typeof tableHead === 'object') {
        return (
          <th key={index} width={tableHead.width}>
            {tableHead.name}
          </th>
        )
      } else if (typeof tableHead === 'String') {
        return <th key={index}>{tableHead}</th>
      }
    })
    let tableListBody = this.props.children
    let listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length} className="text-center">
          {this.state.firstLoading ? '正在加载...' : '没有找到相应的结果'}
        </td>
      </tr>
    )
    let tableBody = tableListBody.length > 0 ? tableListBody : listInfo
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>{tableHeader}</tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TableList
