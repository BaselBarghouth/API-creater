const sqlite = require("sqlite");
//const createConstants = require("../back-end/src/config");

const doThat = async (stmts, edits, dataBaseName, id_es, API) => {
  // let db = await sqlite.open(`./${dataBaseName}.sqlite`);
  // for (let key in stmts) {
  //   try {
  //     let sql = await db.run(stmts[key]);
  //     console.log(sql);
  //   } catch (err) {
  //     console.log("===e===>", err);
  //   }
  //   for (let key in edits) {
  //     try {
  //       let sql = await db.run(edits[key]);
  //       console.log(sql);
  //     } catch (err) {
  //       console.log("===e1===>", err);
  //     }
  //   }
  // }
  // createConstants(id_es, API, dataBaseName);
};
export default doThat;
