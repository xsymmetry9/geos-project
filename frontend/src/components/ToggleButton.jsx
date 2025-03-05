import "../styles/components/toggleButton.scss";
import PropTypes from "prop-types";
import React, { Component } from "react";

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(e) {
    const { id } = e.currentTarget;
    const newState = !this.state.isOn;
    this.setState({ isOn: newState });

    this.props.onToggle((prev) => ({
      ...prev,
      [id]: !prev.id,
    }));
  }

  render() {
    const { isOn } = this.state;
    return (
      <>
        <button
          id="display_target"
          className={`toggle-button ${isOn ? "on" : "off"}`}
          onClick={this.handleToggle}
        >
          <span className={`toggle-circle ${isOn ? "on" : "off"}`}></span>
        </button>
      </>
    );
  }
}

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired, // Validate that toggle is a function and is required
};

export default ToggleButton;
