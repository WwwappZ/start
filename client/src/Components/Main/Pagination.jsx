import React from 'react';
import {Link} from 'react-router-dom';
import styles from './style.css';
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: this.props.limit,
      total: this.props.total
    }
  }
  updateState(element, i) {
    this.props.SetPageNumber(element+1);
  }
  render() {
    const getObjects = () => {
      let objs = []
      let pages = this.props.total / this.props.limit;
      for (let i = 0; i < Math.ceil(pages); i++) {
        if (i + 1 == this.props.page) {
          objs.push(
            <li key={i} className="page-item active">
              <button className="page-link" to="#">{i + 1}</button>
            </li>
          )
        } else {
          objs.push(
            <li key={i} className="page-item">
              <button onClick={this.updateState.bind(this, i)} className="page-link" >{i + 1}</button>
            </li>
          )
        }
      }
      return objs;
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button onClick={this.updateState.bind(this, this.props.page -2)} className="page-link" to="#">Vorige</button>
          </li>
          {getObjects()}
          <li className="page-item">
            <button onClick={this.updateState.bind(this, this.props.page)} className="page-link" to="#">Volgende</button>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Pagination;
