import React, { Component } from "react";

class EmployerItem extends Component {
  render() {
    const { employer } = this.props;

    let styles = "";

    switch (employer[1]["status"]) {
      case "inuse":
        styles = "alert alert-success text-center";
        break;
      case "offline":
        styles = "alert alert-danger text-center";
        break;
      case "online":
        styles = "alert alert-info text-center";
        break;
      case "ringing":
        styles = "alert alert-warning text-center";
        break;
      default:
        break;
    }

    return (
      <div className="col-2">
        <div className={styles} role="alert">
          {employer[0]}
        </div>
      </div>
    );
  }
}

export default EmployerItem;
