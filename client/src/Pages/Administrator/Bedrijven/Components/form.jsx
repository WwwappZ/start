import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { required } from "redux-form-validators";
import { renderField } from "../../../../Components/Forms/renders";

class BedrijvenForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }


  componentDidMount() {

  }
  render() {
    const { handleSubmit, input } = this.props;
    return (
      <div className="box box-default">
      <form onSubmit={handleSubmit}>
        <div className="box-body">
         <div className="row">
         <div className="col-12">
          <Field
            name="naam"
            type="input"
              validate={[required()]}
            component={renderField}
            label="Naam Bedrijf"
          />
          <Field
            name="group"
            type="input"
            component={renderField}
            label="Vul een groupnaam in als nodig"
          />
          <Field
            name="website"
            type="input"
            component={renderField}
            label="Website waar activiteiten staan"
          />
          </div>
          </div>
          <div className="pull-left submit">
            <input
              type="submit"
              className="btn btn-next btn-fill btn-success btn-wd btn-mg"
              name="next"
              value="Aanmaken"
            />
            </div>
        </div>
      </form>
      </div>
    );
  }
}
BedrijvenForm = reduxForm({
  form: "bedrijfinsert" // a unique identifier for this form
})(BedrijvenForm);

// You have to connect() to any reducers that you wish to connect to yourself
BedrijvenForm = connect()(BedrijvenForm);


export default BedrijvenForm;
