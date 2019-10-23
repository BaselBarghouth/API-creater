export default class Column {
  constructor(columnName, tableName) {
    this.columnName = columnName;
    this.tableName = tableName;
  }

  type = "";
  notnull = "";
  pk = "";
  ai = "";
  u = "";
  tr = "";
  fr = "";
}
