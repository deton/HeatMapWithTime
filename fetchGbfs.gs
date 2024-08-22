function fetchGbfs() {
  let url = "https://gbfs.lyft.com/gbfs/2.3/bay/en/station_information.json";
  //let url = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_information.json";
  const infoblob = UrlFetchApp.fetch(url).getBlob();
  url = "https://gbfs.lyft.com/gbfs/2.3/bay/en/station_status.json";
  //url = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_status.json";
  const statusblob = UrlFetchApp.fetch(url).getBlob();

  url = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json";
  //url = "https://api-public.odpt.org/api/v4/gbfs/hellocycling/station_information.json";
  const infoblob2 = UrlFetchApp.fetch(url).getBlob();
  url = "https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_status.json";
  //url = "https://api-public.odpt.org/api/v4/gbfs/hellocycling/station_status.json";
  const statusblob2 = UrlFetchApp.fetch(url).getBlob();

  const systemId1 = "fgb"; // TODO: get from system_information.json
  const systemId2 = "Paris";
  //const systemId1 = "docomo-cycle";
  //const systemId2 = "hellocycling";
  const date = new Date();
  const yearmonth = Utilities.formatDate(date, "UTC", "yyyyMM");
  const day = Utilities.formatDate(date, "UTC", "dd");
  const hhmm = Utilities.formatDate(date, "UTC", "HHmm");

  const topFolder = getOrCreateFolder(DriveApp.getRootFolder(), "gbfs");
  const ymFolder = getOrCreateFolder(topFolder, yearmonth);
  const dayFolder = getOrCreateFolder(ymFolder, day);

  //infoblob.setName(`${hhmm}${systemId1}_${infoblob.getName()}`);
  //statusblob.setName(`${hhmm}${systemId1}_${statusblob.getName()}`);
  //infoblob2.setName(`${hhmm}${systemId2}_${infoblob2.getName()}`);
  //statusblob2.setName(`${hhmm}${systemId2}_${statusblob2.getName()}`);
  //const zip = Utilities.zip([infoblob, statusblob, infoblob2, statusblob2], `${hhmm}${systemId1}_${systemId2}.zip`);
  //dayFolder.createFile(zip);

  const timezone1 = "America/Los_Angeles"; //"Asia/Tokyo"; // TODO: get from system_information.json
  const timezone2 = "Europe/Paris";
  const ts1 = Utilities.formatDate(date, timezone1, "yyyy-MM-dd'T'HH:mm");
  const ts2 = Utilities.formatDate(date, timezone2, "yyyy-MM-dd'T'HH:mm");
  const hhmm1 = Utilities.formatDate(date, timezone1, "HHmm");
  const mindata = minidata(ts1, systemId1, statusblob, hhmm1 <= "0005" ? infoblob : undefined);
  const hhmm2 = Utilities.formatDate(date, timezone2, "HHmm");
  const mindata2 = minidata(ts2, systemId2, statusblob2, hhmm2 <= "0005" ? infoblob2 : undefined);
  const ndjson = [JSON.stringify(mindata), JSON.stringify(mindata2)].join('\n') + '\n';
  const minblob = Utilities.newBlob(ndjson, 'application/x-ndjson');
  const minblobgz = Utilities.gzip(minblob, `${hhmm}${systemId1}_${systemId2}.ndjson.gz`);
  const dayFolder2 = getOrCreateFolder(ymFolder, `${day}-ndjson`);
  dayFolder2.createFile(minblobgz);
}

function getOrCreateFolder(parent, name) {
  const iter = parent.getFoldersByName(name);
  if (iter.hasNext()) {
    return iter.next();
  }
  return parent.createFolder(name);
}

function minidata(ts, system_id, statusblob, infoblob) {
  const data = JSON.parse(statusblob.getDataAsString());
  const status = data.data.stations.map(x => ([
    x.station_id, x.num_bikes_available, x.num_docks_available,
  ]));
  let stinfo;
  if (infoblob) {
    stinfo = {};
    const stdata = JSON.parse(infoblob.getDataAsString());
    stdata.data.stations.forEach(x => {
      stinfo[x.station_id] = [x.lat, x.lon, x.name];
    });
  }
  return {ts, system_id, status, stations: stinfo};
}

/*
function gbfs2newsheet() {
  information_json = get_gbfs("information");
  stInfoList = information_json.data.stations;
  status_json = get_gbfs("status");
  stStatusList = status_json.data.stations;
  console.log("stations length is " + stInfoList.length);

  const fname = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd'T'HH:mm");
  const ss = SpreadsheetApp.create(fname);
  const sheet4status = ss.getActiveSheet();
  const statusHeaders = [
    'station_id', 'num_bikes_available', 'num_docks_available',
    'is_renting', 'is_installed', 'is_returning', 'last_reported',
  ];
  addRows(sheet4status, statusHeaders, stStatusList);

  const sheet4info = ss.insertSheet('information');
  const infoHeaders = [
    'station_id', 'name', 'lat', 'lon', 'capacity', 'region_id',
  ];
  addRows(sheet4info, infoHeaders, stInfoList);
}

function addRows(sheet, headers, rows) {
  const addrows = rows.map(x => headers.map(colname => {
    if (colname === 'station_id') {
      return "'" + x[colname]; // force string
    } else {
      return x[colname];
    }
  }));
  let range = sheet.getRange(1, 1, 1, headers.length);
  range.setValues([headers]);
  range = sheet.getRange(2, 1, addrows.length, headers.length);
  range.setValues(addrows);
}

function get_gbfs(type) {
  const url = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_" + type + ".json";
  const response = UrlFetchApp.fetch(url).getContentText();
  const json = JSON.parse(response);
  return json;
}
*/
