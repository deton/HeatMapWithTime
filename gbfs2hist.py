# Make gbfshist.ndjson from GBFS files.
# Usage: python3 gbfs2hist.py $(ls 15/??{02,32}*_station_status.json) > 15-PT30M.ndjson
import datetime
import json
import os
import sys


def mkstatus(status1, stinfo):
    station_id = status1['station_id']
    capacity = stinfo[station_id][3]
    if capacity is None:
        return [
            station_id,
            status1['num_bikes_available'],
            status1['num_docks_available'],
        ]
    else:
        return [
            station_id,
            status1['num_bikes_available'],
            status1['num_docks_available'],
            int(capacity),
        ]


for stfname in sys.argv[1:]:
    basename = os.path.basename(stfname)
    hhmm = basename[:4]
    idx = basename.find('_station_status.json')
    if idx < 0:
        print('not expected file name:', stfname, file=sys.stderr)
        sys.exit(1)
    system_id = basename[4:idx]

    with open(stfname) as f:
        st = json.load(f)
    infofname = stfname.replace('_status', '_information')
    with open(infofname) as f:
        info = json.load(f)
    stinfo = {}
    for s in info['data']['stations']:
        capacity = s.get('capacity', s.get('vehicle_capacity'))
        stinfo[s['station_id']] = [s['lat'], s['lon'], s['name'], capacity]

    status = [mkstatus(s, stinfo) for s in st['data']['stations']]
    ts = datetime.datetime.fromtimestamp(st['last_updated'])
    tsstr = ts.strftime('%Y-%m-%d')
    outdic = {
        'ts': f'{tsstr}T{hhmm[:2]}:{hhmm[2:]}',
        'system_id': system_id,
        'status': status,
    }
    if hhmm <= '0005':
        outdic['stations'] = {k:v[:3] for k,v in stinfo.items()}  # no capacity

    print(json.dumps(outdic, ensure_ascii=False, separators=(',', ':')))
