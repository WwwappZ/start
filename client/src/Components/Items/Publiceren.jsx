import React, {Component, PropTypes} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import Rodal from 'rodal';
import {SetOnline, SetOffline, DelItem} from '../../Reducers/items/actions';

class Publiceren extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      visible: false
    }
  }

  show() {
    this.setState({visible: true});
  }

  hide() {
    this.setState({visible: false});
  }
  publiceer() {
    if (this.props.item._id) {
      this.props.SetOnline(this.props.item._id, this.props.item).then(() => {
        if (this.props.item._id) {
          //this.props.history.push('/items/edit/waar/' + this.state.trcid);
        }
      });
    }
  }

  setoffline() {
    if (this.props.item._id) {
      this.props.SetOffline(this.props.item._id, this.props.item).then(() => {
        if (this.props.item._id) {
          //this.props.history.push('/items/edit/waar/' + this.state.trcid);
        }
      });
    }
  }

  delitem() {
    if (this.props.item._id) {
      this.props.DelItem(this.props.item._id).then(() => {
          this.hide();
          this.props.history.push('/items');
      });
    }
  }

  actionitems(item) {
    return (<div className="btn-group">
      <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
        <span className="caret"></span>
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu" role="menu">
        <li>
          <a onClick={(e) => this.setoffline()}>Offline Plaatsen</a>
        </li>
        <li>
          <a href="#">Dubliceren</a>
        </li>
        <li className="divider"></li>
        { item.metadata.online == false &&
        <li>
          <a onClick={(e) => this.show()}>Verwijderen</a>
        </li>
      }
      </ul>
      <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
        <div className="box box-danger">
            <div className="box-header"><h3 className="box-title">Let op</h3></div>
          <div className="box-body">Weet je zeker dat je dit item wil verwijderen. Het item wordt permanent verwijderd</div>
          <div className="box-footer">
            <button className="btn btn-info pull-left" onClick={this.hide.bind(this)}>Annuleren</button>
            <button className="btn btn-danger pull-right" onClick={this.delitem.bind(this)}>Verwijderen</button>
          </div>
        </div>

      </Rodal>
    </div>)
  }

  render() {

    if (this.props.item._id) {
      if (this.props.item.metadata.online && !this.props.item.metadata.newupdate) {
        return (<div>
          <div className="label label-primary"><i className="fa fa-clock-o"></i> Gepubliceerd op: {moment(this.props.item.metadata.onlinedate).format("DD-MM-YYYY HH:ss")}</div>
          <span>
            <button type="button" className="btn btn-info">Action</button>
            {this.actionitems(this.props.item)}</span>
        </div>);
      }
      if (this.props.item.metadata.online && this.props.item.metadata.newupdate) {
        return (<div>
          <button type="button" onClick={(e) => this.publiceer()} className="btn-danger btn btn-box btn-mg">
            <i className="fa fa-globe"></i>
            &nbsp; Nieuwe update publiceren</button>
          <span>
            {this.actionitems(this.props.item)}</span>
        </div>);
      }

      if (!this.props.item.metadata.online) {
        return (<div>
          <button type="button" onClick={(e) => this.publiceer()} className="btn-danger btn btn-box btn-mg">
            <i className="fa fa-globe"></i>
            &nbsp; Publiceren</button>
          <span>
            {this.actionitems(this.props.item)}</span>
        </div>);
      }

    } else
      return null
  }

}

function mapStateToProps(state) {
  return {errors: state.auth.error, item: state.items.item};
}
export default withRouter(connect(mapStateToProps, {SetOnline, SetOffline, DelItem})(Publiceren));
