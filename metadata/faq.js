const indexId = "wbw-gsheets-faq";
const sheetId = "1yd8_JJLvFR5qsLeAohFN1sL2l0ANWpP3Al0zSc33DlY";
const worksheets = ["FAQ"];

const schema = {
  name: indexId,
  fields: [
    {
      name: ".*",
      type: "string",
      facet: false,
    },
    {
      name: "kategori_pertanyaan",
      type: "string",
      facet: true,
    },
  ],
};

module.exports = { indexId, schema, worksheets, sheetId };
