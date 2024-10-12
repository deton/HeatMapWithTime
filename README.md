# HeatMapWithTime

* HeatMapWithTime: Heatmap with Leaflet.TimeDimension (based on folium.plugins.HeatMapWithTime)
* MarkerStyleWithTime:
  * Change radius of circle marker with Leaflet.TimeDimension (based on folium.plugins.TimestampedGeoJson)
  * Line chart in marker popup
* GeoJsonLayer: deck.gl version of MarkerStyleWithTime
  * deck.gl GeoJsonLayer with time slider for TimestampedGeoJson data
  * Change radius of circle
* cmp.html: Dual maps of GeoJsonLayer
* HexagonLayer: deck.gl HexagonLayer with time slider for heatmap json data

## HeatMapWithTime
Heatmap with Leaflet.TimeDimension (based on folium.plugins.HeatMapWithTime).

* [heatmapwithtime.html](https://deton.github.io/HeatMapWithTime/heatmapwithtime.html?latlon=35.5490,139.6806&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M.json)

![heatmapwithtime.png](https://github.com/user-attachments/assets/f215a354-90b7-43d6-bcc2-0840c27a1255)

* [Show diff data](https://deton.github.io/HeatMapWithTime/heatmapwithtime.html?latlon=35.5490,139.6806&negative=1&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M_diff.json)

## MarkerStyleWithTime
* Change radius of circle marker with Leaflet.TimeDimension (based on folium.plugins.TimestampedGeoJson)
* Line chart in marker popup

![MarkerStyleWithTime.png](https://github.com/user-attachments/assets/4901d79c-3dfc-4ae9-b982-90be2151790c)

* Demo1 (Kawasaki GBFS)
  * with capacity line: https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=35.5490,139.6806&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity.geojson&color=red&color=blue&color=green
  * with population: https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=35.5490,139.6806&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity-icon0-population.geojson&opacitykey=v&opacityRange=all
  * with landuse: https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=35.5490,139.6806&zoom=14&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity-icon0-landuse.geojson
  * with railstation: https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=35.5854,139.5767&zoom=12&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity-icon0-railstation.geojson
  * Voronoi diagram (docomo-cycle): https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=35.6355,139.6561&zoom=11&opacitykey=bikes&opacityRange=atTime&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity-docomo-cycle.voronoi.geojson
  * Voronoi diagram (hellocycling): https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=35.6355,139.6561&zoom=11&opacitykey=bikes&opacityRange=atTime&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity-hellocycling.voronoi.geojson
* Demo2 (San Francisco GBFS): https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=37.7662,-122.3854&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata2/fgb-0821-PT30M.geojson&color=red&color=blue
* Demo3 (Paris GBFS): https://deton.github.io/HeatMapWithTime/MarkerStyleWithTime.html?latlon=48.8557,2.3334&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata3/Paris-0822-PT30M.geojson&color=red&color=blue
* URL parameters
  * latlon: map center. (default: fitBounds() for geojson)
  * zoom (default: 13). zoom is ignored if latlon is not specified.
  * jsonurl: geojson URL to load
  * radiuskey: key in feature.properties to change radius of circle marker
    * (default: .valuekeys[0] in geojson)
  * opacitykey: key in feature.properties to change fillOpacity of Polygon.
  * opacityRange: Use opacitykey value's min and max value in this range.
    * `attime`: min and max at each time.
    * (default: `all`: min and max thorough all time range)
  * color: line colors in line chart in marker popup (default: [Chart.js color palette](https://www.chartjs.org/docs/latest/general/colors.html#default-color-palette))
  * filter: filter config.
    * `0`: show only features with radiuskey value === 0.

## GeoJsonLayer
deck.gl version of MarkerStyleWithTime.
* deck.gl GeoJsonLayer with time slider for TimestampedGeoJson data
* Change radius of circle

* [geojsonlayer.html](https://deton.github.io/HeatMapWithTime/geojsonlayer.html?latlon=35.7574,139.7293&zoom=11&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity-icon0.geojson)

![geojsonlayer.png](https://github.com/user-attachments/assets/af727798-a78e-419f-a143-9faf39be6885)

* [Show diff of two TimestampedGeoJson files](https://deton.github.io/HeatMapWithTime/geojsonlayer.html?latlon=35.6434,139.7612&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/1005-PT30M_diff.geojson)

* URL parameters
  * latlon: map center. (default: first latlon in json data)
  * zoom (default: 11)
  * pitch (default: 0)
  * [mapStyle](https://deck.gl/docs/api-reference/core/deckgl#mapstyle) (default: `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json`)
  * intervalMs: animation timer interval in milliseconds. (default: 1000)
  * jsonurl: TimestampedGeoJson file URL to load
    * (default: `https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity.geojson`)
  * radiuskey: key in feature.properties to change radius of circle marker
    * (default: .valuekeys[0] in geojson)
  * [radiusScale](https://deck.gl/docs/api-reference/layers/scatterplot-layer#radiusscale) (default: 10)

## cmp.html
Dual maps of GeoJsonLayer.

[Two TimestampedGeoJson files: 2024-08-15 and 2024-10-05](https://deton.github.io/HeatMapWithTime/cmp.html?jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity-icon0.geojson&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/1005-PT30M-icon0.geojson&latlon=35.6261,139.7036&zoom=11)

![cmp-twofiles](https://github.com/user-attachments/assets/7d454255-9973-4519-b0e1-c9d3e35cfb03)

[Different times](https://deton.github.io/HeatMapWithTime/cmp.html?jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M-capacity-icon0.geojson&latlon=35.6331,139.7276&zoom=11)

![cmp-differenttimes](https://github.com/user-attachments/assets/9cf273df-bfd6-48dd-aca6-ab637aa27159)

## HexagonLayer
deck.gl HexagonLayer with time slider for heatmap json data.

* [hexagonlayer.html](https://deton.github.io/HeatMapWithTime/hexagonlayer.html?latlon=35.6434,139.7612&jsonurl=https://deton.github.io/HeatMapWithTime/sampledata/15-PT30M.json)

![hexagonlayer.png](https://github.com/user-attachments/assets/83a835a8-48ab-4d8f-b830-a20a125e0ca0)

* URL parameters
  * latlon: map center. (default: first latlon in json data)
  * zoom (default: 10)
  * pitch (default: 20)
  * [mapStyle](https://deck.gl/docs/api-reference/core/deckgl#mapstyle) (default: `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json`)
  * [radius](https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer#radius) (default: 500)
  * [elevationScale](https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer#elevationscale) (default: 20)
  * colorRanges: array of [colorRange](https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer#colorrange)
    * (default: [
        [[165,15,21],[222,45,38],[251,106,74],[252,146,114],[252,187,161],[254,229,217]],
        [[0,109,44],[49,163,84],[116,196,118],[161,217,155],[199,233,192],[237,248,233]]
      ]) (6-class Reds reverse, 6-class Greens reverse)
  * intervalMs: animation timer interval in milliseconds. (default: 1000)
  * jsonurl: heatmap json URL to load

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
* [diffTimestampedGeoJson.html](https://deton.github.io/HeatMapWithTime/diffTimestampedGeoJson.html): Make diff data json for geojsonlayer.html from two TimestampedGeoJson files
  * Sample input: sampledata/15-PT30M.geojson and 1005-PT30M-icon0.geojson
  * Sample output: sampledata/1005-PT30M_diff.geojson
* fetchGbfs.gs: Google Apps Script to fetch GBFS files and save gbfshist.ndjson (run every 5 minutes)
  * Sample output: sampledata/15-PT30M.ndjson
* gbfs2hist.py: Make gbfshist.ndjson from GBFS files.
  * Sample output: sampledata/15-PT30M-capacity.ndjson

## License
* html and *.{py,gs} script files are distributed under the terms of the MIT license.
  * sampledata/landuse.py uses [https://www.fttsus.org/worldgrids/?page_id=158&lang=en](worldmesh.py)
* Icons (`close_{blue,red}.svg`) are from [Material Symbols](https://fonts.google.com/icons), licensed under Apache License Version 2.0.
* sampledata/*.{ndjson,geojson,json} used in the demo:
  * These sample data use the following copyrighted material with modifications.
    * DOCOMO BIKESHARE, INC. / Association for Open Data of Public Transportation, [Bikeshare information of DOCOMO BIKESHARE, INC.](https://ckan.odpt.org/dataset/c_bikeshare_gbfs-d-nationwide-bikeshare), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en).
    * OpenStreet Corp. / Association for Open Data of Public Transportation, [Bikeshare information of OpenStreet](https://ckan.odpt.org/dataset/c_bikeshare_gbfs-openstreet), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en), [ODC BY 1.0](https://opendatacommons.org/licenses/by/1-0/), [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/).
  * 15-PT30M-capacity-icon0-population.geojson file also uses the following copyrighted material with modifications.
    * MLIT Japan. [全国の人流オープンデータ](https://www.geospatial.jp/ckan/dataset/mlit-1km-fromto). [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
  * 15-PT30M-capacity-icon0-railstation.geojson file also uses the following copyrighted material with modifications.
    * MLIT Japan. [国土数値情報 鉄道データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2023.html). [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
  * 15-PT30M-capacity-icon0-landuse.geojson file also uses the following copyrighted material with modifications.
    * MLIT Japan. [国土数値情報 土地利用詳細メッシュデータ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-L03-b-c-2021.html). [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
* sampledata2/ : Bay Wheels
* sampledata3/ : Vélib' Metropole
