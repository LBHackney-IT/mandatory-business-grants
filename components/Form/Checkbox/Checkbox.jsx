const Checkbox = ({ label, name, register }) => (
  <div className="govuk-form-group">
    <div className="govuk-checkboxes">
      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          id={name}
          name={name}
          type="checkbox"
          ref={register}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  </div>
);

export default Checkbox;