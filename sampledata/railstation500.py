import geopandas as gpd
# geojson from https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2023.html
# TODO: 場所に応じた適切なCRSを使う
rails = gpd.read_file("N02-23_Station.geojson").to_crs('EPSG:6677')
# 駅から500mのPolygonのGeoJSONを生成
railstmp = rails[['N02_003', 'N02_005']]
railstmp['popup'] = rails['N02_005'] + '(' + rails['N02_003'] + ')'
railstmp = railstmp.drop(columns=['N02_003', 'N02_005'])
railsjson = gpd.GeoDataFrame(railstmp)
railsjson['times'] = '2024-08-15T00:02'
railsjson['times'] = railsjson['times'].str.split(',')  # convert to list
railsjson['geometry'] = rails['geometry'].buffer(500, cap_style='square').to_crs('EPSG:6668')
railsjson.to_file('railstation.geojson', driver='GeoJSON')

# python3 -m json.tool --no-ensure-ascii --compact railstation.geojson > railstaion-compact.geojson
# sh merge-population.sh 15-PT30M-capacity-icon0.geojson railstation-compact.geojson >15-PT30M-capacity-icon0-railstation.geojson
