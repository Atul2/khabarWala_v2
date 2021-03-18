import { Box } from "@material-ui/core";
import { Component } from "react";
import "./style.css";

export default class PreferenceCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: props.logo,
      title: props.title,
      selected: false,
    };
  }

  render() {
    const { title, selected } = this.state;
    return (
      <Box className={`preference-card ${selected ? "selected" : ""}`}>
        <span>{title}</span>
      </Box>
    );
  }
}
