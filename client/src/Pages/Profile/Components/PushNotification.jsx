import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import multiSelectDagen from "../../../Components/Forms/multiselect";

class ProfielFormPush extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }
  componentDidMount() {    
    if (!this.props.initialValues && !this.props.initialValues._id) this.props.initialize();
    }
  render() {
    const { handleSubmit, input } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="box-body">
          <Field
            name='planning'
            type="input"
            options={[
              { id: 1, name: "maandag" },
              { id: 2, name: "dinsdag" },
              { id: 3, name: "woensdag" },
              { id: 4, name: "donderdag" },
              { id: 5, name: "vrijdag" },
              { id: 6, name: "zaterdag" },
              { id: 7, name: "zondag" }
            ]
          }
            mvalue="id"
            mtextfield="name"
            component={multiSelectDagen}
            label="Op welke dagen wil je alerts ontvangen?"
          />
          <div className="pull-left submit">
            <input
              type="submit"
              className="btn btn-next btn-fill btn-success btn-wd btn-sm"
              name="next"
              value="Update"
            />
          </div>
        </div>
      </form>
    );
  }
}
ProfielFormPush = reduxForm({
  form: "profielpush" ,
   enableReinitialize: true
})(ProfielFormPush);

// You have to connect() to any reducers that you wish to connect to yourself
ProfielFormPush = connect(
  state => ({
    initialValues: state.push // pull initial values from account reducer
  }) // bind account loading action creator
)(ProfielFormPush);

export default ProfielFormPush;
