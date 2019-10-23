const sql = require("sqlite");
createBackEnd = async () => {
  let tables = [
    {
      columns: [
        {
          columnName: "user_id",
          type: "INTEGER",
          notnull: "NOT NULL",
          pk: "PRIMAY KEY",
          ai: "AUTOINCREMENT",
          u: "",
          tr: "",
          fr: "",
          tableName: "users"
        },
        {
          columnName: "name",
          type: "TEXT",
          notnull: "NOT NULL",
          pk: "",
          ai: "",
          u: "",
          tr: "",
          fr: "",
          tableName: "users"
        },
        {
          columnName: "email",
          type: "TEXT",
          notnull: "NOT NULL",
          pk: "",
          ai: "",
          u: "UNIQUE",
          tr: "",
          fr: "",
          tableName: "users"
        }
      ],
      name: "users"
    },
    {
      columns: [
        {
          columnName: "blog_id",
          type: "INTEGER",
          notnull: "NOT NULL",
          pk: "PRIMARY KEY",
          ai: "AUTOINCREMENT",
          u: "UNIQUE",
          tr: "",
          fr: "",
          tableName: "blogs"
        },
        {
          columnName: "title",
          type: "TEXT",
          notnull: "NOT NULL",
          pk: "",
          ai: "",
          u: "",
          tr: "",
          fr: "",
          tableName: "blogs"
        },
        {
          columnName: "desc",
          type: "TEXT",
          notnull: "NOT NULL",
          pk: "",
          ai: "",
          u: "UNIQUE",
          tr: "",
          fr: "",
          tableName: "blogs"
        },
        {
          columnName: "user_id",
          type: "INTEGER",
          notnull: "NOT NULL",
          pk: "",
          ai: "",
          u: "",
          tr: "users",
          fr: "user_id",
          tableName: "blogs"
        }
      ],
      name: "blogs"
    },
    {
      columns: [
        {
          columnName: "image_id",
          type: "INTEGER",
          notnull: "NOT NULL",
          pk: "PRIMARY KEY",
          ai: "AUTOINCREMENT",
          u: "UNIQUE",
          tr: "",
          fr: "",
          tableName: "images"
        },
        {
          columnName: "image",
          type: "TEXT",
          notnull: "NOT NULL",
          pk: "",
          ai: "",
          u: "",
          tr: "",
          fr: "",
          tableName: "images"
        },
        {
          columnName: "blog_id",
          type: "INTEGER",
          notnull: "NOT NULL",
          pk: "",
          ai: "",
          u: "",
          tr: "blogs",
          fr: "blog_id",
          tableName: "images"
        },
        {
          columnName: "user_id",
          type: "INTEGER",
          notnull: "NOT NULL",
          pk: "",
          ai: "",
          u: "",
          tr: "users",
          fr: "user_id",
          tableName: "images"
        }
      ],
      name: "images"
    }
  ];
  let tempColumns = [];
  let tempTables = [];
  tables.map(i => {
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
      stmt += `${column["columnName"]} ${column["type"]} ${column["notnull"]} ${
        column["pk"]
      } ${column["ai"]} ${column["u"]}`;
      stmt += index1 + 1 === table.length ? ");" : ", ";
    });

    stmts.push(stmt);
    stmt = "";
  });
  let edit = "";
  let edits = [];
  columnsWithRelations.map((table, index) => {
    table.map((column, index1) => {
      edit += `ALTER TABLE ${column["tableName"]} ADD COLUMN ${
        column["columnName"]
      } REFERENCES ${column["tr"]} (${column["fr"]});`;
      edits.push(edit);
      edit = "";
    });
  });
  // let db = await sql.open(`../back-end/src/db.sqlite`);
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
};
createBackEnd();
