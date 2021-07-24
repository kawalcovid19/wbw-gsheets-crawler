## WBW GSheets Crawler

Crawler engine to ingest WBW gsheets into typesense-server for real-time search.

### INSTALLATION

You need typesense key with write access to ingest data into server.

```
cp .env.example .env
yarn install
```

Modify `TYPESENSE_HOST`, `TYPESENSE_PORT`, `TYPESENSE_PROTOCOL` and `TYPESENSE_KEY` afterwards. Then you're good to go.

### WRITING CRAWLER

> IMPORTANT:  
> Google sheets must be published to web in order to be crawled

Crawler will read all scripts in `metadata` directory to intepret sheet structure. Each script represent an index and must contains:

- **schema** (`object`) : typesense schema object. See [here](https://typesense.org/docs/0.21.0/api/collections.html#create-a-collection) for reference.
- **sheetId** (`string`) : a public google-sheets ID i.e.  
  `https://docs.google.com/spreadsheets/u/1/d/<SHEET_ID>/view`
- **indexId** (`string`) : typesense's index name.
- **worksheet** (`array`): List of worksheets in given gsheets

Every data row, `id` and `sheet` fields will be added to mark which worksheet it's originated.

Index will be made automatically when it's not present. To prevent server rejection, crawling process will be executed sequentially (not in parallel).

### DEVELOPMENT NOTES

We have two flags to make development easier:

1. `--test_script=SCRIPTNAME` will only execute given script in the `metadata/` directory
2. `--dry_run` to run as dry run mode / not inserting data into typesense

### CONTRIBUTING GUIDELINES

Please refers to [wargabantuwarga contributing guidelines](https://github.com/kawalcovid19/wargabantuwarga.com/blob/main/CONTRIBUTING.md)
