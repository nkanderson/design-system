import React, { Component } from 'react';
import { func, any, string, shape, bool, node, arrayOf } from 'prop-types';
import classnames from 'classnames';
import { Checkbox } from '@puppet/react-components';

const propTypes = {
  columns: arrayOf(
    shape({
      /** Optional cell data getter method. By default it will grab data at the provided dataKey */
      cellDataGetter: func,
      /** Optional cell renderer method. */
      cellRenderer: func,
      /** Arbitrary additional data passed to the cell renderer for this column */
      columnData: any,
      /** Classname to apply to each data cell. Useful for setting explicit column widths */
      className: string,
      /** Unique string key defining this column */
      dataKey: string.isRequired,
      /** Column header text */
      label: node,
      /** Column header text */
      style: shape({}),
    }),
  ).isRequired,
  /** Boolean to render sorting icons in header */
  sortable: bool,
  /** Callback to return click action */
  columnHeaderCallBack: func,
  /** Object containing key fields of text describing which header should be active */
  sortedColumn: shape({
    /** The direction of the active icon */
    direction: string,
    /** The datakey of the active column */
    sortDataKey: string,
  }),
  /** Boolean to render select all checkbox */
  selectable: bool,
  /** Function which handles when the checkbox on click  */
  onHeaderChecked: func,
  /** Allows the state of the checkbox to be defined  */
  headerCheckState: bool,
  /** Allows users to show an dash instead of a tick  */
  headerIndeterminateState: bool,
};

const defaultProps = {
  sortable: false,
  columnHeaderCallBack: null,
  sortedColumn: { direction: '', sortDataKey: '' },
  selectable: false,
  onHeaderChecked: () => {},
  headerCheckState: false,
  headerIndeterminateState: false,
};

class ColumnHeader extends Component {
  onClick(e, direction, dataKey) {
    e.preventDefault();
    const { columnHeaderCallBack } = this.props;
    columnHeaderCallBack(direction, dataKey);
  }

  onClickToggle(e, direction, dataKey) {
    e.preventDefault();
    const { columnHeaderCallBack } = this.props;
    columnHeaderCallBack(direction, dataKey);
  }

  render() {
    const {
      columns,
      sortable,
      sortedColumn,
      selectable,
      onHeaderChecked,
      headerCheckState,
      headerIndeterminateState,
    } = this.props;
    const { direction, sortDataKey } = sortedColumn;

    return (
      <thead>
        <tr className="rc-table-header">
          {selectable ? (
            <th
              className={classnames(
                'rc-table-header-cell',
                `dg-table-header-checkbox`,
              )}
            >
              <Checkbox
                onChange={checked => onHeaderChecked(checked)}
                checked={headerCheckState}
                label=""
                name=""
                className="dg-table-header-checkbox-element"
                indeterminate={headerIndeterminateState}
              />
            </th>
          ) : null}
          {columns.map(
            ({ label, dataKey, className: cellClassName, style }) => (
              <th
                className={classnames(
                  'rc-table-header-cell',
                  `dg-table-header-${dataKey}`,
                  cellClassName,
                )}
                key={dataKey}
                style={style}
              >
                <span
                  as="h6"
                  color="medium"
                  className={classnames({
                    'dg-column-header-label-active': dataKey === sortDataKey,
                  })}
                >
                  {label}
                </span>

                {sortable === true ? (
                  <span
                    className={classnames(
                      {
                        [direction]: dataKey === sortDataKey,
                      },
                      'dg-column-header-icon-container',
                    )}
                  >
                    <div
                      className="dg-column-header-icon-up"
                      onClick={e => this.onClick(e, 'asc', dataKey)}
                      onKeyPress={e => this.onClick(e, 'asc', dataKey)}
                      size="large"
                      role="button"
                      tabIndex="-2"
                    >
                      ▲
                    </div>
                    <div
                      className="dg-column-header-icon-down"
                      onClick={e => this.onClick(e, 'desc', dataKey)}
                      onKeyPress={e => this.onClick(e, 'desc', dataKey)}
                      size="large"
                      role="button"
                      tabIndex="-1"
                    >
                      ▼
                    </div>
                  </span>
                ) : (
                  <div />
                )}
              </th>
            ),
          )}
        </tr>
      </thead>
    );
  }
}

ColumnHeader.propTypes = propTypes;
ColumnHeader.defaultProps = defaultProps;

export default ColumnHeader;
