const indexId = "wbw-gsheets-telemedicine";
const sheetId = "1yd8_JJLvFR5qsLeAohFN1sL2l0ANWpP3Al0zSc33DlY";
const worksheets = ["Telemedicine"];

const schema = {
  name: indexId,
  fields: [
    {
      name: ".*",
      type: "string",
      facet: false,
    },
    {
      name: "order",
      type: "int32",
      facet: true,
    },
    {
      name: "platform_telemedicine",
      type: "string",
      facet: true,
      optional: true,
    },
  ],
};

module.exports = { indexId, schema, worksheets, sheetId };
