import React, {Component, PropTypes} from 'react';

class FooterForm extends Component {

  render() {
    const {label} = this.props;
    return (
      <div className="wizard-footer">
        <div className="pull-right">
          <input type="submit" className="btn btn-next btn-fill btn-success btn-wd btn-sm" name="next" value="Volgende stap"/>
        </div>
        <div className="pull-left">
          <input type="button" className="btn btn-previous btn-fill btn-default btn-wd btn-sm disabled" name="previous" value="Previous"/>
        </div>
        <div className="clearfix"></div>
      </div>
    );

  }
}

export default FooterForm;
