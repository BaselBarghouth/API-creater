import React from "react";
import Card from "../../component/card/card";
import { MDBBtn } from "mdbreact";
import ColumnDb from "../../Column";
import Column from "../../component/column/Column";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import doThat from "../../DataBaseCreater";
class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnsName: [],
      tables: this.props.location.state.tables,
      tableNumber: 0
    };
  }

  addNewColumn = (event, index) => {
    if (this.state.columnsName[index]) {
      let newColumn = new ColumnDb(
        this.state.columnsName[index],
        this.props.location.state.tables[index]["name"]
      );
      this.props.location.state.tables[index]["columns"] = [
        ...this.props.location.state.tables[index]["columns"],
        newColumn
      ];
      let columnsName = this.state.columnsName;
      columnsName[index] = "";
      this.setState({ columnsName });
    } else {
      alert("Plz provid a column name");
    }
  };
  onChange = (e, index) => {
    let columnsName = this.state.columnsName;
    columnsName[index] = e.target.value;
    this.setState({ columnsName });
  };
  onChangeColumn = (event, tableId, columnId) => {
    let tables = this.state.tables;
    tables[tableId]["columns"][columnId][event.target.name] =
      event.target.value;
    this.setState({ tables });
  };
  onCheckedColumn = (event, tableId, columnId) => {
    if (event.target.checked === true) {
      let tables = this.state.tables;
      tables[tableId]["columns"][columnId][event.target.name] =
        event.target.value;
      this.setState({ tables });
    } else {
      let tables = this.state.tables;
      tables[tableId]["columns"][columnId][event.target.name] = "";
      this.setState({ tables });
      this.setState({
        tables
      });
    }
  };
  next = () => {
    if (this.state.tableNumber === this.state.tables.length - 1) {
      alert("done");
    } else {
      let tableNumber = this.state.tableNumber + 1;
      this.setState({ tableNumber });
    }
  };
  back = () => {
    if (this.state.tableNumber === 0) {
      alert("done");
    } else {
      let tableNumber = this.state.tableNumber - 1;
      this.setState({ tableNumber });
    }
  };
  createDataBaseAndBackEnd = async () => {
    let tempColumns = [];
    let tempTables = [];
    this.state.tables.map(i => {
      tempTables = [...tempTables, i.name];
      tempColumns = [...tempColumns, i.columns];
    });
    let columnsWithRelations = tempColumns
      .map(i => {
        return i.filter(o => {
          return o.tr.length > 0;
        });
      })
      .filter(m => m.length > 0);
    let columnsWithOutRelations = tempColumns
      .map(i => {
        return i.filter(o => {
          return o.tr.length == 0;
        });
      })
      .filter(m => m.length > 0);
    let stmt = "";
    let stmts = [];
    columnsWithOutRelations.map((table, index) => {
      stmt += `CREATE TABLE ${tempTables[index]} (`;
      table.map((column, index1) => {
        stmt += `${column["columnName"]} ${column["type"]} ${
          column["notnull"]
        } ${column["pk"]} ${column["ai"]} ${column["u"]}`;
        stmt += index1 + 1 === table.length ? ");" : ", ";
      });

      stmts.push(stmt);
      stmt = "";
    });
    let edit = "";
    let edits = [];
    columnsWithRelations.map((table, index) => {
      console.log(table);
      table.map((column, index1) => {
        edit += `ALTER TABLE ${column["tableName"]} ADD COLUMN ${
          column["columnName"]
        } REFERENCES ${column["tr"]} (${column["fr"]});`;
        edits.push(edit);
        edit = "";
      });
    });
    let id_es = {};
    let pk = tempColumns.filter((table, index) => {
      table.filter(i => {
        if (i["pk"].length > 0) {
          id_es[i["tableName"]] = i["columnName"];
        }
      });
    });
    let tablesApi = tempTables.map(i => {
      return `app.use("/${i}",router);\n`;
    });
    let relationsApi = [];
    columnsWithRelations.map((i, index) => {
      i.map((o, index1) => {
        relationsApi.push(
          `app.use("/v1/${o["tableName"]}/${o["tr"]}",router);\n`
        );
      });
    });
    let allApi = relationsApi.concat(tablesApi);
    let API = "";
    allApi.forEach(element => {
      API += element;
    });
    doThat(stmts, edits, this.props.location.state.databaseName, id_es, API);
    // let db = await this.sql.open(
    //   `../../../back-end/src/${this.props.location.state.databaseName}.sqlite`
    // );
    // for (let key in stmts) {
    //   try {
    //     let sql = await db.run(stmts[key]);
    //     console.log(sql);
    //   } catch (err) {
    //     console.log("===e===>", err);
    //   }
    // }

    // for (let key in edits) {
    //   try {
    //     let sql = await db.run(edits[key]);
    //     console.log(sql);
    //   } catch (err) {
    //     console.log("===e1===>", err);
    //   }
    // }
    // let id_es = {};
    // let pk = tempColumns.filter((table, index) => {
    //   table.filter(i => {
    //     if (i["pk"].length > 0) {
    //       id_es[i["tableName"]] = i["columnName"];
    //     }
    //   });
    // });
    // let tablesApi = tempTables.map(i => {
    //   return `app.use("/${i}",router);\n`;
    // });
    // let relationsApi = [];
    // columnsWithRelations.map((i, index) => {
    //   i.map((o, index1) => {
    //     relationsApi.push(
    //       `app.use("/v1/${o["tableName"]}/${o["tr"]}",router);\n`
    //     );
    //   });
    // });
    // let allApi = relationsApi.concat(tablesApi);
    // let API = "";
    // allApi.forEach(element => {
    //   API += element;
    // });
    //createConstants(id_es, API, this.props.location.state.databaseName);
  };

  render() {
    return (
      <Card>
        <div>
          <h2>
            Let's add columns in your{" "}
            {this.state.tables[this.state.tableNumber]["name"]}{" "}
          </h2>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Table name:</label>
            <input
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.tables[this.state.tableNumber]["name"]}
              onChange={e => {
                let tables = this.state.tables;
                tables[this.state.tableNumber]["name"] = e.target.value;
                this.setState({ tables });
              }}
            />
            <label htmlFor="formGroupExampleInput">Column name:</label>
            <input
              value={
                this.state.columnsName[this.state.tableNumber]
                  ? this.state.columnsName[this.state.tableNumber]
                  : ""
              }
              onChange={e => this.onChange(e, this.state.tableNumber)}
              type="text"
              className="form-control"
              id="formGroupExampleInput"
            />
          </div>
          <MDBBtn
            color="primary"
            onClick={event => this.addNewColumn(event, this.state.tableNumber)}
          >
            Add column!
          </MDBBtn>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Column name</th>
                <th>Type</th>
                <th>Not Null</th>
                <th>P K</th>
                <th>A I</th>
                <th>U</th>

                <th>Table refrence</th>
                <th>Foreign key</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.tables[this.state.tableNumber]["columns"].map(
                (column, index1) => {
                  return (
                    <Column
                      item={column}
                      key={index1}
                      onChange={this.onChangeColumn}
                      tables={this.state.tables}
                      tableIndex={this.state.tableNumber}
                      columnIndex={index1}
                      onChecked={this.onCheckedColumn}
                    />
                  );
                }
              )}
            </MDBTableBody>
          </MDBTable>

          <MDBBtn color="primary" onClick={() => this.next()}>
            Next
          </MDBBtn>
          <MDBBtn color="primary" onClick={() => this.back()}>
            Back
          </MDBBtn>
          {this.state.tableNumber === this.state.tables.length - 1 ? (
            <MDBBtn onClick={() => this.createBackEnd()} color="primary">
              Create database and back end
            </MDBBtn>
          ) : null}
        </div>
      </Card>
    );
  }
}

export default SecondPage;
