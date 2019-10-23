import React, { useState } from "react";
import Modal from "../../component/card/card";
import { MDBBtn } from "mdbreact";
import Table from "../../Table";
const HomePage = props => {
  const [databaseName, setDatabaseName] = useState("");
  const [numberOfTables, setNumberOfTables] = useState("");

  const createDataBase = () => {
    let tables = [];
    for (let index = 1; index <= numberOfTables; index++) {
      let newTable = new Table(`Table ${index}`);
      tables = [...tables, newTable];
    }

    props.history.push({
      pathname: "/v1",
      state: {
        databaseName: databaseName,
        tables: tables
      }
    });
  };

  return (
    <Modal>
      <h2>Let's create the database first!</h2>

      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Database name:</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          value={databaseName}
          onChange={e => setDatabaseName(e.target.value)}
        />
        <label htmlFor="formGroupExampleInput">Number of tables:</label>
        <input
          type="number"
          className="form-control"
          id="formGroupExampleInput"
          value={numberOfTables}
          min={0}
          onChange={e => setNumberOfTables(e.target.value)}
        />
      </div>
      <MDBBtn
        color="primary"
        onClick={() =>
          databaseName && numberOfTables
            ? createDataBase()
            : alert("Plz provid the data base name!")
        }
      >
        NEXT
      </MDBBtn>
    </Modal>
  );
};

export default HomePage;
