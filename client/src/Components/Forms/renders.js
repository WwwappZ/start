import React from "react";

export const setadres = values => {
  return values;
};

export const validate = values => {
  const errors = {};
  if (values.what && values.what.title && !values.what.title.value) {
    errors.titel = "Verplicht";
  } else if (values.what && values.what.title.value.length < 4) {
    errors.titel = "De titel moet minimaal 4 letters bevatten";
  }

  if (!values.korteomschrijving) {
    errors.korteomschrijving = "Verplicht";
  } else if (values.korteomschrijving.length < 20) {
    errors.korteomschrijving =
      "De omschrijving moet minimaal 20 letters bevatten";
  }

  return errors;
};

export const warn = values => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = "Hmm, you seem a bit young...";
  }
  return warnings;
};

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        {...input}
        className="form-control"
        placeholder={label}
        type={type}
      />{" "}
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const renderAField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? "async-validating" : ""}>
      <input
        {...input}
        type={type}
        className="form-control"
        placeholder={label}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);
const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
export const renderFieldUpload = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  label,
  type,
  meta: { asyncValidating, touched, error },
  ...props
}) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? "async-validating" : ""}>
      <input
        {...props.input}
        {...props}
        type="file"
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        value={null}
        className="form-control"
        placeholder={label}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea
        {...input}
        className="form-control"
        placeholder={label}
        type={type}
      />{" "}
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const renderselect = props => {
  const renderSelectOptions = (key, index) => {
    return (
      <option key={`${index}-${key}`} value={key}>
        {props.options[key]}
      </option>
    );
  };

  if (props && props.options) {
    return (
      <div>
        <label>{props.label}</label>
        <div>
          <select {...props.input} className="form-control">
            <option value="">Maak een keuze</option>
            {Object.keys(props.options).map(renderSelectOptions)}
          </select>
          {props.meta.touched &&
            ((props.meta.error && (
              <span className="text-danger">{props.meta.error}</span>
            )) ||
              (props.meta.warning && <span>{props.meta.warning}</span>))}
        </div>
      </div>
    );
  }
  return <div></div>;
};

export const renderselectapi = props => {
  const renderSelectOptions = (key, index) => {
    return (
      <option key={key._id} value={key._id}>
        {key.naam}
      </option>
    );
  };

  if (props && props.options) {
    return (
      <div>
        <label>{props.label}</label>
        <div>
          <select
            {...props.input}
            value={props.input.value._id}
            className="form-control selectpicker"
            data-selected-text-format="count"
          >
            <option value="">Maak een keuze</option>
            {props.options.map(renderSelectOptions)}
          </select>
          {props.meta.touched &&
            ((props.meta.error && (
              <span className="text-danger">{props.meta.error}</span>
            )) ||
              (props.meta.warning && <span>{props.meta.warning}</span>))}
        </div>
      </div>
    );
  }
  return <div></div>;
};

export const renderselectapiusers = props => {
  const renderSelectOptions = (key, index) => {
    return (
      <option key={key._id} value={key._id}>
        {key.voornaam + " " + key.achternaam}
      </option>
    );
  };

  if (props && props.options) {
    return (
      <div>
        <label>{props.label}</label>
        <div>
          <select
            {...props.input}
            value={props.input.value._id}
            className="form-control selectpicker"
            data-selected-text-format="count"
          >
            <option value="">Maak een keuze</option>
            {props.options.map(renderSelectOptions)}
          </select>
          {props.meta.touched &&
            ((props.meta.error && (
              <span className="text-danger">{props.meta.error}</span>
            )) ||
              (props.meta.warning && <span>{props.meta.warning}</span>))}
        </div>
      </div>
    );
  }
  return <div></div>;
};

export const renderselectapititel = props => {
  const renderSelectOptions = (key, index) => {
    return (
      <option key={key._id} value={key._id}>
        {key.titel}
      </option>
    );
  };

  if (props && props.options) {
    return (
      <select
        {...props.input}
        className="form-control selectpicker"
        data-selected-text-format="count"
      >
        <option value="">Maak een keuze</option>
        {props.options.map(renderSelectOptions)}
      </select>
    );
  }
  return <div></div>;
};

export const renderselectsimple = props => {
  const renderSelectOptions = (key, index) => {
    return (
      <option key={`${index}-${key}`} value={key}>
        {props.options[key]}
      </option>
    );
  };

  if (props && props.options) {
    return (
      <div>
        <select {...props.input} className="form-control">
          <option value="">Select</option>
          {Object.keys(props.options).map(renderSelectOptions)}
        </select>
        {props.meta.touched &&
          ((props.meta.error && (
            <span className="text-danger">{props.meta.error}</span>
          )) ||
            (props.meta.warning && <span>{props.meta.warning}</span>))}
      </div>
    );
  }
  return <div></div>;
};

export const renderFieldsimple = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <input {...input} className="form-control" placeholder={label} type={type} />
);
