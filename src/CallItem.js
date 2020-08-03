import React, { Component } from "react";
import income from "./img/incoming.png";
import outcome from "./img/outcoming.png";

class CallItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
    };
  }

  convertToDateFormat = (num) => {
    if (num !== null) {
      if (num < 10) return `00 : 0${num}`;
      if (num > 10 && num < 59) return `00 : ${num}`;
      if (num > 59) {
        let minuts = Math.trunc(num / 60);
        let seconds = num - minuts * 60;

        if (minuts < 10) {
          if (seconds < 10) {
            return `0${minuts} : 0${seconds}`;
          } else {
            return `0${minuts} : ${seconds}`;
          }
        } else {
          if (seconds < 10) {
            return `${minuts} : 0${seconds}`;
          } else {
            return `${minuts} : ${seconds}`;
          }
        }
      }
    }
  };

  componentDidMount() {
    if (this.props.call.isCallAnswer === true) {
      this.interval = setInterval(() => {
        let item = localStorage.getItem(`${this.props.call.call_id}`);

        if (item == undefined) {
          localStorage.setItem(`${this.props.call.call_id}`, 1);
        } else {
          localStorage.setItem(
            `${this.props.call.call_id}`,
            parseInt(item) + 1
          );
        }

        this.setState({ time: this.convertToDateFormat(item) });
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { call } = this.props;

    return (
      <tr
        className={`${call.isCallAnswer ? "alert-success" : "alert-warning"}`}
      >
        <td></td>
        <td>{call.customerName}</td>
        <td>
          {call.callType === 1 ? (
            <img src={income} className="phone" alt="income" />
          ) : (
            <img src={outcome} className="phone" alt="outcome" />
          )}{" "}
          {call.customerPhone}
        </td>
        <td>{call.operator}</td>
        <td>{this.state.time}</td>
      </tr>
    );
  }
}

export default CallItem;
