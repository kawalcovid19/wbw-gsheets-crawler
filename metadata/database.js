const indexId = "wbw-gsheets-database";
const sheetId = "1RIcSiQqPCw-6H55QIYwblIQDPpFQmDNC73ukFa05J7c";
const worksheets = [
  "DKI Jakarta",
  "Banten",
  "Aceh",
  "Kepulauan Riau",
  "Sumatera Utara",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Riau",
  "Bangka Belitung",
  "Jambi",
  "Bengkulu",
  "Lampung",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "D.I. Yogyakarta",
  "Sulawesi Utara",
  "Gorontalo",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Bali ",
  "Nusa Tenggara Timur",
  "Nusa Tenggara Barat",
  "Kalimantan Utara",
  "Kalimantan Timur",
  "Kalimantan Tengah",
  "Kalimantan Barat",
  "Kalimantan Selatan",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
];

const schema = {
  name: indexId,
  fields: [
    {
      name: ".*",
      type: "string",
      facet: false,
    },
    {
      name: "sheet",
      type: "string",
      facet: true,
    },
  ],
};

module.exports = { indexId, schema, worksheets, sheetId };
