import React from 'react';
import {connect} from 'react-redux';
import {editbedrijf, getbedrijf} from './Reducers/actions';
import BedrijvenForm from './Components/edit'
class BedrijfEditPage extends React.Component {
  state = {
    errors: {},
    loaded: false
  }


  componentWillMount() {
    this.setState({ loaded: false });

        this.props.getbedrijf(this.props.match.params.id).then(data => {
            this.setState({ loaded: true });
        })
  }

  submit = vals => {
      this.props.editbedrijf(this.props.match.params.id,vals).then(data => {
        if (data.type ==="BEDRIJD_ERROR") {
          alert(data.payload);
          return false;
        } else {
              this.props.history.push('/admin/bedrijven/');
        }
      });
  }

  render() {
    return (
      <div className="box box-default">
        <div className="box-header with-border">
          <h3 className="box-title"> Bedrijven wijzigen</h3>
        </div>

      <div className="row">
      <div className="col-md-12 no-float">
        <div className="box box-primary">
          <div className="box-body box-profile">
          {this.state.loaded &&
            <BedrijvenForm onSubmit={this.submit}/>
            }</div>
        </div>
      </div>
    </div>
  </div>);
  }
};
function mapStateToProps(state) {
  return {username: state.auth.user, bedrijven: state.bedrijven.item};
}

export default connect(mapStateToProps, {editbedrijf, getbedrijf})(BedrijfEditPage);
