import json
import sys
# https://www.fttsus.org/worldgrids/?page_id=29&lang=ja
import worldmesh


MESHCODE_CONV = {
    "1": "00",
    "2": "01",
    "3": "10",
    "4": "11",
}
def meshcode50m(lat, lon):
    # https://www.fttsus.org/worldgrids/?page_id=1830&lang=ja
    meshcode = worldmesh.cal_meshcode_ex50m_13(lat, lon)[2:]
    digit50m = meshcode[-1]
    return meshcode[:-1] + MESHCODE_CONV[digit50m]


codes = set()
with open("15-PT30M-capacity-icon0.geojson") as f:
    geojson = json.load(f)
    for feature in geojson["features"]:
        lon, lat = feature["geometry"]["coordinates"]
        meshcode = meshcode50m(lat, lon)
        codes.add(meshcode)


LANDUSE2NAME = {
    "0100": "田",
    "0200": "農地",
    "0500": "森",
    "0600": "荒地",
    "0700": "建物",  # 都市地域外
    "0701": "高層建物",
    "0702": "工場",
    "0703": "宅地",
    "0704": "密集宅地",
    "0901": "道",
    "0902": "鉄道",
    "1000": "施設等",  # 都市地域外
    "1001": "施設",
    "1002": "空地",
    "1003": "公園",
    "1100": "川",
    "1400": "浜",
    "1500": "海",
    "1600": "ゴルフ場",
}
LANDUSE2COLOR = {
    "0100": "#ffff00",
    "0200": "#ffd37f",
    "0500": "#38a800",
    "0600": "#e64c00",
    "0700": "#ff73df",  # 都市地域外
    "0701": "#ff0000",
    "0702": "#73b2ff",
    "0703": "#ffbee8",
    "0704": "#ff73df",
    "0901": "#b2b2b2",
    "0902": "#343434",
    "1000": "#a8a800",  # 都市地域外
    "1001": "#a8a800",
    "1002": "#ffd374",
    "1003": "#d3ffbe",
    "1100": "#73dfff",
    "1400": "#ffff99",
    "1500": "#bee8ff",
    "1600": "#55ff00",
}

features = []
# geojson from https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-L03-b-c-2021.html
for fname in sys.argv[1:]:
    with open(fname, encoding="utf-8") as f:
        geojson = json.load(f)
        for feature in geojson["features"]:
        #for line in f:
        #    line = line.removesuffix(",\n")
        #    if '"Feature"' not in line:
        #        continue
        #    feature = json.loads(line)
            prop = feature["properties"]
            meshcode = prop["詳細メッシュコード"]
            if meshcode in codes:
                use = prop["土地利用種別"]
                # iscity = prop["都市地域範囲"]  # 都市地域="1", 都市地域外="0"
                features.append({
                    "type": "Feature",
                    "properties": {
                        "popup": f"{LANDUSE2NAME[use]} {meshcode}",
                        "style": {
                            "stroke": False,
                            "fillColor": LANDUSE2COLOR[use],
                            "fillOpacity": 1,
                        },
                    },
                    "geometry": feature["geometry"],
                })

geojson = {
    "type": "FeatureCollection",
    "features": features,
}
print(json.dumps(geojson, ensure_ascii=False, separators=(',', ':')))  # compact dump
