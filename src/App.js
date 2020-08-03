import React from "react";
import "./App.css";
import CallItem from "./CallItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { calls: [] };
  }

  connection = new WebSocket("wss://ws.binotel.com:9002");

  Receiver = (data) => {
    let json = JSON.parse(data);

    switch (json.eventName) {
      case "callStart":
        this.setState({
          calls: this.state.calls.concat({
            id: this.state.calls.length,
            call_id: json.generalCallID,
            eventName: json.eventName,
            customerName: json.customerName,
            customerPhone: json.externalNumber,
            operator: json.callType === 1 ? json.internalNumbers[0] : " ",
            callType: json.callType,
            isCallAnswer: false,
            answeredAt: null,
          }),
        });
        console.log("%c CallStart: %o", "color: #46af91;", json);
        break;
      case "callAnswer":
        this.state.calls.map((call) => {
          if (call.call_id === json.generalCallID) {
            let arr = this.state.calls;
            if (arr[call.id] !== undefined) {
              arr[call.id].eventName = "callAnswer";
              arr[call.id].isCallAnswer = true;
              arr[call.id].operator = json.internalNumber;
              arr[call.id].answeredAt = json.answeredAt;
              this.setState({
                calls: arr,
              });
            }
          }
        });
        console.log("%c CallAnswer: %o", "color: #46af91;", json);
        break;
      case "callStop":
        this.state.calls.map((call) => {
          if (call.call_id === json.generalCallID) {
            localStorage.removeItem(`${call.call_id}`);
            let arr = this.state.calls;
            arr.splice(call.id, call.id);
            this.setState({
              calls: arr,
            });
          }
        });
        console.log("%c CallStop: %o", "color: #46af91;", json.generalCallID);
        break;
      default:
        console.log("%c %o", "color: #46af91;", json);
    }
  };

  componentDidMount() {
    localStorage.clear();
    this.connection.onopen = function () {
      console.log("Connected");
    };

    this.connection.onmessage = (evt) => {
      this.Receiver(evt.data);

      if (
        evt.data.indexOf(
          "Connected to Binotel WebSocket. Please, authorise!"
        ) !== -1
      ) {
        this.connection.send(
          JSON.stringify({
            task: "authLikeService",
            key: "6ed549-0ec1b6a",
            secret: "c39d79-94f9ae-149a17-061172-47470169",
          })
        );
      }
    };
  }

  render() {
    let calls;

    if (this.state.calls.length > 0) {
      calls = this.state.calls.map((call) => (
        <CallItem key={Math.random()} call={call} />
      ));
    } else {
      calls = (
        <tr>
          <td>There are no one phone calls</td>
        </tr>
      );
    }
    return (
      <div>
        <nav className="navbar navbar-light bg-dark">
          <span className="navbar-brand mb-0 h1 text-light">Navbar</span>
        </nav>
        <div className="container-fluid mt-3 bg-light">
          <div className="row">
            <div className="col-6">
              <div className="row overflow-auto vh-88">
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-secondary" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
                <div className="col-4">
                  <div className="alert alert-success" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>

                <div className="col-4">
                  <div className="alert alert-danger" role="alert">
                    Оператор Тетяна
                    <hr />
                    +38 (098) 65-19-23 <br />
                    +38 (050) 77-89-77
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Operator</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>{calls}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
