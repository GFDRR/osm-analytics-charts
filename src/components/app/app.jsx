import React, { Component } from "react";
import styles from "./app.scss";

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <h1 className="linterror-with-longstringtochecklinewrapping">hola</h1>
      </div>
    );
  }
}

export default App;
