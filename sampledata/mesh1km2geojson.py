import fileinput
import json
import sys
import jismesh.utils as ju

YEAR = "2019"
MONTH = "08"
DAY = "15"
DAYFLAG = "1"  # "0":休日, "1":平日, "2":全日

meshdata = {}
for line in fileinput.input():
    line = line.rstrip("\n")
    meshcode, _, _, year, month, dayflag, timez, popul = line.split(",")
    if year != YEAR:
        continue
    if month != MONTH:
        continue
    if dayflag != DAYFLAG:
        continue
    if meshcode not in meshdata:
        meshdata[meshcode] = {}
    meshdata[meshcode][timez] = int(popul)

# timez: "0": 昼11:00-14:59平均, "1": 深夜01:00-04:59平均, "2": 終日00:00-23:59 平均
# DATE = f"{YEAR}-{MONTH}-{DAY}"
DATE = f"2024-{MONTH}-{DAY}"  # XXX:マージして表示するGBFSデータの日付に合わせる
TIMES = [
    f"{DATE}T00:02",  # 終日 平均値を使用  # XXX: GBFSデータの時刻に合わせて02
    f"{DATE}T01:02",  # 深夜
    f"{DATE}T05:02",  # 終日
    f"{DATE}T11:02",  # 昼
    f"{DATE}T15:02",  # 終日
]
features = []
for meshcode, v in meshdata.items():
    values = [
        v.get("2", 0),
        v.get("1", 0),
        v.get("2", 0),
        v.get("0", 0),
        v.get("2", 0),
    ]
    lat_s, lon_w = ju.to_meshpoint(meshcode, 0, 0)
    lat_n, lon_e = ju.to_meshpoint(meshcode, 1, 1)
    features.append({
        "type": "Feature",
        "properties": {
            "times": TIMES,
            "v": values,
            "style": {
                "stroke": False,
                "fillColor": "#00FF00",
            },
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [lon_w, lat_s],  # south west
                [lon_e, lat_s],  # south east
                [lon_e, lat_n],  # north east
                [lon_w, lat_n],  # north west
                [lon_w, lat_s],  # south west again
            ]],
        },
    })

geojson = {
    "type": "FeatureCollection",
    "features": features,
}
print(json.dumps(geojson, separators=(',', ':')))  # compact dump
