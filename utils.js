const Typesense = require("typesense");
let typesense = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: process.env.TYPESENSE_PORT,
      protocol: "http", // Use http for data ingestion
    },
  ],
  apiKey: process.env.TYPESENSE_KEY,
  connectionTimeoutSeconds: 5,
});
const gsheets = require("gsheets");

// Helper: rename object keys into `snack_case`
const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

/**
 * Crawler function
 * @param {array} worksheets worksheets
 * @param {object} config configurations
 */
const crawler = async (
  worksheets,
  { dry_run = false, indexId, schema, sheetId }
) => {
  if (indexId === undefined || schema === undefined || sheetId === undefined) {
    throw "Provide all mandatory configuration";
  }

  if (!dry_run) {
    try {
      // Check if index is available
      await typesense.collections().create(schema);
      console.log(`Index ${schema.name} created`);
    } catch (e) {
      console.log(`Index ${schema.name} available`);
    }
  }

  // Loop through each worksheets and ingest into typesense
  for (const sheet of worksheets) {
    try {
      console.log(`...fetching ${sheet}`);

      let data = await gsheets.getWorksheet(sheetId, sheet);
      data = data.data;

      /**
       * Construct new object keys to be transformed into snake_case i.e.
       * {
       *    "Update Terakhir" : "update_terakhir",
       *    ...
       * }
       * */
      const keys = Object.keys(data[0]);
      const renamedKey = {};
      for (const key of keys) {
        renamedKey[key] = key.toLowerCase().replace(/ /g, "_");
      }

      // Store each row to typesense
      let idx = 1;
      for (const row of data) {
        let doc = renameKeys(row, renamedKey);

        // Add `id` and `sheet` fields
        doc["id"] = `${sheet.replace(/ /g, "_")}_${idx}`.toLowerCase();
        doc["sheet"] = sheet;
        idx += 1;

        if (!dry_run) {
          // Push to typesense
          typesense.collections(indexId).documents().upsert(doc);
        }
      }
    } catch (e) {
      throw e;
    }
  }
};

module.exports = { crawler };
