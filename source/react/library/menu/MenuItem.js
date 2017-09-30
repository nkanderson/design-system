import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

const propTypes = {
  onClick: React.PropTypes.func,
  selected: React.PropTypes.bool,
  option: React.PropTypes.object.isRequired,
  multiple: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};

const defaultProps = {
  onClick: () => {},
  selected: false,
  multiple: false,
  disabled: false,
};

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (!this.props.option.disabled) {
      this.props.onClick(this.props.option, !this.props.selected);
    }
  }

  renderIcon() {
    const option = this.props.option;
    let jsx;

    if (this.props.selected && this.props.multiple) {
      jsx = <Icon type="checkmark" height="16px" width="16px" />;
    } else if (option.icon) {
      jsx = <Icon type={ option.icon } height="16px" width="16px" />;
    }

    return jsx;
  }

  render() {
    const option = this.props.option;
    const icon = this.renderIcon();
    const className = classnames('rc-menu-item', {
      'rc-menu-item-with-icon': icon || this.props.multiple,
      'rc-menu-item-selected': this.props.selected,
      'rc-menu-item-disabled': this.props.option.disabled,
    });

    return (
      <li className={ className }>
        <a href={ option.id } onClick={ this.onClick }>{ icon }{ option.value }</a>
      </li>
    );
  }
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
