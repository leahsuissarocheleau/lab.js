import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from '../Form'
import { Control } from 'react-redux-form'

import Card from '../../../Card'
import Grid from '../../../Grid'
import ButtonCell from '../../../Grid/components/buttonCell'

import { dataURItoIcon } from '../../../../logic/util/fileType'

const GridCell = ({ cellData, rowIndex, colIndex, colName }) =>
  <div>
    <Control.text
      model={ `.rows[${ rowIndex }][${ colIndex }]['path']` }
      className="form-control"
      placeholder="path"
      style={{
        fontFamily: 'Fira Mono',
      }}
      debounce={ 300 }
    />
  </div>

const HeaderCell = () =>
  <div>
    Path
  </div>

const LeftColumn = ({ icon }) => {
  return <ButtonCell
    icon={ icon }
    onClick={ () => null }
  />
}

const mapStateToProps = (state, ownProps) => {
  const file = state.files.files[ownProps.rowData[0].file]

  // If the file can't be found, something is wrong
  const icon = file
    ? dataURItoIcon(file.content)
    : 'file-exclamation'

  return { icon }
}

const ConnectedLeftColumn = connect(mapStateToProps)(LeftColumn)

export default class FileGrid extends Component {
  render() {
    const { id, data } = this.props

    return <Card title="Files" wrapContent={ false }>
      <Form
        id={ id }
        data={ data }
        keys={ ['files'] }
        getDispatch={ d => this.dispatch = d }
      >
        <Grid
          className="border-top-0"
          model=".files"
          BodyContent={ GridCell }
          HeaderContent={ HeaderCell }
          LeftColumn={ ConnectedLeftColumn }
          columnWidths={ [ 90 ] }
          columns={ ['path'] }
          defaultRow={ [ { path: '', file: '' }, ] }
          data={ data.files.rows }
          formDispatch={ action => this.dispatch(action) }
        />
      </Form>
    </Card>
  }
}
