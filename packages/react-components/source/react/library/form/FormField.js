import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { omit } from '../../helpers/statics';

import FormFieldElement, { supportedTypes } from './internal/FormFieldElement';
import FormFieldDescription from './internal/FormFieldDescription';

const propTypes = {
  /** The type of input to render. Can be either a string corresponding to a supported input type or a custom React component satisfying the input interface */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(supportedTypes),
    PropTypes.elementType,
  ]).isRequired,
  /** A unique identifier for this field */
  name: PropTypes.string.isRequired,
  /** A human-friendly identifier for this field */
  label: PropTypes.string.isRequired,
  /** The styling of the identifier for this field */
  labelType: PropTypes.oneOf(['primary', 'secondary']),
  /* Depending on the field, value can be any type */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Expanded explainer for the field */
  description: PropTypes.string,
  /* Is the field required */
  required: PropTypes.bool,
  /* The error message to display if the field is required but not present at validation */
  requiredFieldMessage: PropTypes.string,
  /* An optional validation function. Will be passed in order: the current field value, and the entire form value */
  validator: PropTypes.func,
  /* An optional nested path at which to access field data. Nested path can be delimted with `.` or with brackets `[]`. For example: my.nested.array[0] */
  path: PropTypes.string,
  /* Alternate inline display format */
  inline: PropTypes.bool,
  /** Width of the inline label */
  inlineLabelWidth: PropTypes.number,
  /** This will be used by the parent `Form` to track updates. */
  onChange: PropTypes.func,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline styles */
  style: PropTypes.shape({}),
  /** All additional props are propagated to the inner input elements. See each option for details. TODO: figure out how to get this set up in styleguidist */
};

const defaultProps = {
  labelType: null,
  value: undefined,
  error: '',
  description: '',
  required: false,
  requiredFieldMessage: 'Required field',
  validator() {},
  path: '',
  inline: false,
  inlineLabelWidth: null,
  onChange() {},
  className: '',
  style: {},
};

/**
 * The form input interface is the propTypes above, minus the ones that get stripped off
 */
export const formInputInterface = omit(
  [
    'requiredFieldMessage',
    'validator',
    'className',
    'description',
    'style',
    'labelType',
    'inline',
    'inlineLabelWidth',
  ],
  propTypes,
);

const getTypeName = type => (typeof type === 'string' ? type : null);

const getLabelStyle = (inlineLabelWidth, inline) => {
  if (inline && inlineLabelWidth) {
    return {
      width: inlineLabelWidth,
    };
  }

  return null;
};

const getFieldStyle = (style, inlineLabelWidth, tabbed) => {
  if (tabbed && inlineLabelWidth) {
    return {
      ...style,
      marginLeft: inlineLabelWidth,
    };
  }

  return style;
};

const FormField = props => {
  const {
    type,
    name,
    label,
    labelType,
    className,
    inline,
    inlineLabelWidth,
    error,
    description,
    style,
  } = props;
  const typeName = getTypeName(type);
  const tabbed = inline && (type === 'checkbox' || type === 'switch');
  const labelStyle = getLabelStyle(inlineLabelWidth, inline);
  const fieldStyle = getFieldStyle(style, inlineLabelWidth, tabbed);

  const element = <FormFieldElement {...props} />;

  if (type === 'hidden') {
    return element;
  }

  return (
    <div
      className={classNames(
        'rc-form-field',
        {
          'rc-form-field-inline': inline,
          'rc-form-field-tabbed': tabbed,
          [`rc-form-field-${typeName}`]: typeName,
          'rc-form-field-error': error,
        },
        className,
      )}
      style={fieldStyle}
    >
      <div className="rc-form-field-content">
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label
          htmlFor={name}
          className={classNames(
            'rc-form-field-label',
            `rc-form-field-label-${labelType}`,
          )}
          key="field-label"
          style={labelStyle}
        >
          {label}
        </label>
        <div className="rc-form-field-element">
          {element}
          {inline && (
            <FormFieldDescription error={error} description={description} />
          )}
        </div>
      </div>
      {!inline && (
        <FormFieldDescription error={error} description={description} />
      )}
    </div>
  );
};

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
