# HeatMapWithTime

* HeatMapWithTime: Heatmap with Leaflet.TimeDimension (based on folium.plugins.HeatMapWithTime)
* MarkerStyleWithTime:
  * Change radius of circle marker with Leaflet.TimeDimension (based on folium.plugins.TimestampedGeoJson)
  * Line chart in marker popup

## HeatMapWithTime
* [heatmapwithtime.html](https://deton.github.io/HeatMapWithTime/heatmapwithtime.html?latlon=35.5490,139.6806&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M.json)

![heatmapwithtime.png](https://github.com/user-attachments/assets/f215a354-90b7-43d6-bcc2-0840c27a1255)

* [Show diff data](https://deton.github.io/HeatMapWithTime/heatmapwithtime.html?latlon=35.5490,139.6806&negative=1&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M_diff.json)

![heatmapwithtime_diff.png](https://github.com/user-attachments/assets/4c70259c-9c3a-48af-96e0-941b8088f9b7)

## MarkerStyleWithTime
![MarkerStyleWithTime.png](https://github.com/user-attachments/assets/4901d79c-3dfc-4ae9-b982-90be2151790c)

* Demo: https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=35.5490,139.6806&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M.geojson&color=red&color=blue
* URL parameters
  * latlon: map center. (default: fitBounds() for geojson)
  * zoom (default: 13). zoom is ignored if latlon is not specified.
  * jsonurl: geojson URL to load
  * radiuskey: key in feature.properties to change radius of circle marker
    * (default: .valuekeys[0] in geojson)
  * color: line colors in line chart in marker popup (default: [Chart.js color palette](https://www.chartjs.org/docs/latest/general/colors.html#default-color-palette))

## Other files
* [gbfshist2heatmap.html](https://deton.github.io/HeatMapWithTime/gbfshist2heatmap.html): Make heatmap json for heatmapwithtime.html from gbfshist.ndjson
  * Sample input: sampledata/15-PT30M.ndjson
  * Sample output: sampledata/15-PT30M.json
* [heatmapdiffdata.html](https://deton.github.io/HeatMapWithTime/heatmapdiffdata.html): Make diff data json for heatmapwithtime.html from heatmap json
  * Sample input: sampledata/15-PT30M.json
  * Sample output: sampledata/15-PT30M_diff.json
* [gbfshist2TimestampedGeoJson.html](https://deton.github.io/HeatMapWithTime/gbfshist2TimestampedGeoJson.html): Make geojson for MarkerStyleWithTime.html from gbfshist.ndjson
  * Sample input: sampledata/15-PT30M.ndjson
  * Sample output: sampledata/15-PT30M.geojson
* fetchGbfs.gs: Google Apps Script to fetch GBFS files and save gbfshist.ndjson (run every 5 minutes)
  * Sample output: sampledata/15-PT30M.ndjson

## License
* html files are distributed under the terms of the MIT license.
* sample data used in the demo:
  * These sample data use the following copyrighted material with modifications.
    * DOCOMO BIKESHARE, INC. / Association for Open Data of Public Transportation, [Bikeshare information of DOCOMO BIKESHARE, INC.](https://ckan.odpt.org/dataset/c_bikeshare_gbfs-d-nationwide-bikeshare), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en).
    * OpenStreet Corp. / Association for Open Data of Public Transportation, [Bikeshare information of OpenStreet](https://ckan.odpt.org/dataset/c_bikeshare_gbfs-openstreet), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en), [ODC BY 1.0](https://opendatacommons.org/licenses/by/1-0/), [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/).
