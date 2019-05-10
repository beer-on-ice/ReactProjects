import React from 'react'

import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'
import './index.scss'
// 通用富文本编辑器，依赖jQuery
class RichEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadEditor()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail)
      this.smiditor.setValue(nextProps.defaultDetail)
  }

  loadEditor() {
    let element = this.refs['textarea']

    this.smiditor = new Simditor({
      textarea: $(element),
      defaultValue: this.props.placeholder || '请输入内容',
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    })
    this.bindEditorEvent()
  }

  // 初始化富文本编辑器事件
  bindEditorEvent() {
    this.smiditor.on('valuechanged', e => {
      this.props.onValueChange(this.smiditor.getValue())
    })
  }

  render() {
    return (
      <div className="rich-editor">
        {' '}
        <textarea ref="textarea" />{' '}
      </div>
    )
  }
}

export default RichEditor
