import React, { Component, PropTypes } from "react";
/**
 * Material custom selector
 */
class MaterialSelect extends Component {
  static propTypes = {
    /**
     * mostly used for width col sizes
     */
    className: PropTypes.string,
    /**
     * the id of the <select> tag being passed as a child
     */
    selector: PropTypes.string.isRequired
  };
  componentDidMount() {
    const { selector } = this.props;
    jQuery(`#${selector}`).material_select();
  }
  render() {
    const { children, className } = this.props;
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}
export default MaterialSelect;
