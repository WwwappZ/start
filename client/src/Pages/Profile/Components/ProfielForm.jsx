 import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { required, email } from "redux-form-validators";
import { renderField } from "../../../Components/Forms/renders";
class ProfielForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }
  componentWillMount() {  
  if (!this.props.initialValues && !this.props.initialValues._id) this.props.initialize();
  }
  render() {
    const { handleSubmit, input } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="box-body">
          <Field
            name="naam"
            validate={[required({ allowBlank: true })]}
            type="input"
            component={renderField}
            label="Naam"
          />
          <Field
            name="email"
            validate={[email({ allowBlank: true })]}
            type="input"
            component={renderField}
            label="E-mailadres"
          />
          <Field
            name="telefoonnummer"
            type="input"
            component={renderField}
            label="Telefoonnummer"
          />
          <Field
            name="straat"
            type="input"
            component={renderField}
            label="Straat"
          />
          <Field
            name="postcode"
            type="input"
            component={renderField}
            label="Poscode"
          />
          <Field
            name="plaats"
            type="input"
            component={renderField}
            label="Plaats"
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
ProfielForm = reduxForm({
  form: "formprofiel" // a unique identifier for this form
})(ProfielForm);

// You have to connect() to any reducers that you wish to connect to yourself
ProfielForm = connect(
  state => ({
    initialValues: state.profile // pull initial values from account reducer
  }) // bind account loading action creator
)(ProfielForm);

export default ProfielForm;
