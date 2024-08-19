function fetchGbfs() {
  let url = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_information.json";
  const infoblob = UrlFetchApp.fetch(url).getBlob();
  url = "https://api-public.odpt.org/api/v4/gbfs/docomo-cycle/station_status.json";
  const statusblob = UrlFetchApp.fetch(url).getBlob();

  url = "https://api-public.odpt.org/api/v4/gbfs/hellocycling/station_information.json";
  const infoblob2 = UrlFetchApp.fetch(url).getBlob();
  url = "https://api-public.odpt.org/api/v4/gbfs/hellocycling/station_status.json";
  const statusblob2 = UrlFetchApp.fetch(url).getBlob();

  const date = new Date();
  const yearmonth = Utilities.formatDate(date, "Asia/Tokyo", "yyyyMM");
  const day = Utilities.formatDate(date, "Asia/Tokyo", "dd");
  const hhmm = Utilities.formatDate(date, "Asia/Tokyo", "HHmm");

  const topFolder = getOrCreateFolder(DriveApp.getRootFolder(), "gbfs");
  const ymFolder = getOrCreateFolder(topFolder, yearmonth);
  const dayFolder = getOrCreateFolder(ymFolder, day);

  // save original gbfs files.
  //infoblob.setName(`${hhmm}docomo-cycle_${infoblob.getName()}`);
  //statusblob.setName(`${hhmm}docomo-cycle_${statusblob.getName()}`);
  //infoblob2.setName(`${hhmm}hellocycling_${infoblob2.getName()}`);
  //statusblob2.setName(`${hhmm}hellocycling_${statusblob2.getName()}`);
  //const zip = Utilities.zip([infoblob, statusblob, infoblob2, statusblob2], `${hhmm}.zip`);
  //dayFolder.createFile(zip);

  const ts = Utilities.formatDate(date, "Asia/Tokyo", "yyyy-MM-dd'T'HH:mm");
  // XXX: run every 5 minutes.
  const mindata = minidata(ts, 'docomo-cycle', statusblob, hhmm <= "0005" ? infoblob : undefined);
  const mindata2 = minidata(ts, 'hellocycling', statusblob2, hhmm <= "0005" ? infoblob2 : undefined);
  const ndjson = [JSON.stringify(mindata), JSON.stringify(mindata2)].join('\n') + '\n';
  const minblob = Utilities.newBlob(ndjson, 'application/x-ndjson');
  const minblobgz = Utilities.gzip(minblob, `${hhmm}.ndjson.gz`);
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
