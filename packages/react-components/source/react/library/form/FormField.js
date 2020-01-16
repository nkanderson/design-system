import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { omit } from '../../helpers/statics';
import Input, {
  SUPPORTED_TYPES as INPUT_SUPPORTED_TYPES,
} from '../input/Input';
import Select from '../select';
import Switch from '../switch';
import Checkbox from '../checkbox';
import Icon from '../icon';

const supportedTypes = [
  ...INPUT_SUPPORTED_TYPES,
  'checkbox',
  'switch',
  'select',
  'autocomplete',
];

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
  inline: null,
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

const isReactComponent = c =>
  (c && c.prototype && c.prototype.isReactComponent) || typeof c === 'function';

const mapTypeToElement = type => {
  if (isReactComponent(type)) {
    return type;
  }

  switch (type) {
    case 'checkbox':
      return Checkbox;
    case 'switch':
      return Switch;
    case 'select':
    case 'autocomplete':
    case 'multiselect':
      return Select;
    default:
      return Input;
  }
};
/**
 * `FormField`s are meant to be rendered as children either within a `Form` or a `FormSection`.
 */
class FormField extends React.Component {
  getTypeName() {
    const { type } = this.props;
    let name;

    if (typeof type === 'string') {
      name = type;
    }

    return name;
  }

  renderDescription() {
    const { error, description } = this.props;
    // Note: error can be a string or boolean
    const message = error && typeof error === 'string' ? error : description;
    const iconType = error ? 'alert' : 'info-circle';
    let jsx;

    if (message) {
      jsx = (
        <div className="rc-form-field-description">
          <Icon
            className="rc-form-field-description-icon"
            size="small"
            type={iconType}
          />
          {message}
        </div>
      );
    }

    return jsx;
  }

  renderElement() {
    const { type } = this.props;

    const elementProps = omit(
      [
        'labelType',
        'inline',
        'inlineLabelWidth',
        'description',
        'className',
        'style',
        'requiredFieldMessage',
        'validator',
      ],
      this.props,
    );

    const Element = mapTypeToElement(type);

    return <Element {...elementProps} />;
  }

  render() {
    const {
      type,
      name,
      label,
      labelType,
      className,
      inline,
      inlineLabelWidth,
      error,
      style,
    } = this.props;
    const description = this.renderDescription();
    const typeName = this.getTypeName();
    const element = this.renderElement();
    const tabbed = inline && (type === 'checkbox' || type === 'switch');

    if (type === 'hidden') {
      return element;
    }

    let formFieldStyles = style;
    let formFieldLabelStyles;

    if (inlineLabelWidth && inline) {
      formFieldLabelStyles = { width: `${inlineLabelWidth}px` };
    }

    if (inlineLabelWidth && tabbed) {
      formFieldStyles = {
        ...formFieldStyles,
        marginLeft: `${inlineLabelWidth}px`,
      };
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
        style={formFieldStyles}
      >
        <div className="rc-form-field-content">
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label
            htmlFor={name}
            title={label}
            className={classNames('rc-form-field-label', {
              [`rc-form-field-label-${labelType}`]: labelType,
            })}
            key="field-label"
            style={formFieldLabelStyles}
          >
            {label}
          </label>
          <div className="rc-form-field-element">
            {element}
            {inline && description}
          </div>
        </div>
        {!inline && description}
      </div>
    );
  }
}

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
