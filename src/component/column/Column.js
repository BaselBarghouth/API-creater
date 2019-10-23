import React, { useState } from "react";
const Column = props => {
  const [refTable, setRefTable] = useState("");
  return (
    <tr>
      <td>
        <input
          name="columnName"
          value={props.item["columnName"]}
          onChange={event =>
            props.onChange(event, props.tableIndex, props.columnIndex)
          }
        />
      </td>
      <td>
        <select
          name="type"
          onChange={event =>
            props.onChange(event, props.tableIndex, props.columnIndex)
          }
        >
          <option>---</option>
          <option value="INTEGER">Integer</option>
          <option value="TEXT">text</option>
          <option value="BLOB">Blob</option>
          <option value="REAL">Real</option>
          <option value="NUMERIC">Numeric</option>
        </select>
      </td>
      <td>
        <input
          name="notnull"
          type="checkbox"
          value="NOT NULL"
          onChange={event =>
            props.onChecked(event, props.tableIndex, props.columnIndex)
          }
        ></input>
      </td>
      <td>
        <input
          name="pk"
          type="checkbox"
          value="PRIMARY KEY"
          onChange={event =>
            props.onChecked(event, props.tableIndex, props.columnIndex)
          }
        ></input>
      </td>
      <td>
        <input
          name="ai"
          type="checkbox"
          value="AUTOINCREMENT"
          onChange={event =>
            props.onChecked(event, props.tableIndex, props.columnIndex)
          }
        ></input>
      </td>
      <td>
        <input
          name="u"
          type="checkbox"
          value="UNIQUE"
          onChange={event =>
            props.onChecked(event, props.tableIndex, props.columnIndex)
          }
        ></input>
      </td>
      <td>
        <select
          onChange={event => {
            setRefTable(event.target.value);
            props.onChange(event, props.tableIndex, props.columnIndex);
          }}
          name="tr"
        >
          <option value="">---</option>
          {props.tables.map((table1, index1) => {
            return index1 !== props.tableIndex ? (
              <option key={index1} value={table1["name"]}>
                {table1["name"]}
              </option>
            ) : null;
          })}
        </select>
      </td>
      <td>
        {refTable ? (
          <select
            onChange={event =>
              props.onChange(event, props.tableIndex, props.columnIndex)
            }
            name="fr"
          >
            <option value="">---</option>
            {props.tables
              .find(item => {
                // console.log(re);
                return item.name === refTable;
              })
              .columns.map((i, u) => (
                <option key={u} value={i.columnName}>
                  {i.columnName}
                </option>
              ))}
          </select>
        ) : null}
      </td>
    </tr>
  );
};

export default Column;
