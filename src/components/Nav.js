import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {
  handleAdd = (event) => {
    event.preventDefault();
    this.props.changeEditStatus();
    this.props.changeAddStatus();
  }
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark mb-4" style={{backgroundColor: 'black'}}>
  <a className="navbar-brand" href="#">Evaluate Sleep Tracking Week</a>
  <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
  <div className="collapse justify-content-end navbar-collapse" id="collapsibleNavId">
    <ul className="navbar-nav mt-2 mt-lg-0">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a onClick={(event) => this.handleAdd(event)} className="nav-link" href="#">Thêm ghi chú</a>
      </li>
    </ul>
  </div>
</nav>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      //editStatus: state.isEdit
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      changeEditStatus: () => {
        dispatch({
          type:"CHANGE_EDIT_STATUS"
      })
      },
      changeAddStatus: () => {
        dispatch({
          type:"CHANGE_ADD_STATUS"
      })
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

