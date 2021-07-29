// Load required libraries
require("isomorphic-fetch");
require("dotenv").config();
const async = require("async");
const args = require("args-parser")(process.argv);
const { crawler } = require("./utils");
const fs = require("fs");
const scriptsDir = "./metadata/";

(async () => {
  let scripts = fs.readdirSync(scriptsDir);
  let dry_run = false;

  // Test for particular script only
  if ("test_script" in args) {
    scripts = scripts.filter((script) => {
      return script.includes(args.test_script);
    });
  }

  // Turn on dry run mode
  if (args.dry_run) {
    dry_run = true;
  }

  const fn = scripts.map((script) => {
    return async () => {
      try {
        const {
          indexId,
          schema,
          worksheets,
          sheetId,
        } = require(`${scriptsDir}${script}`);

        await crawler(worksheets, {
          dry_run: dry_run,
          indexId: indexId,
          schema: schema,
          sheetId: sheetId,
        });
        return script;
      } catch (e) {
        throw e;
      }
    };
  });

  async.series(fn, (error, script) => {
    if (error) throw error;
    console.log(`"${script}" executed`);
  });
})();
