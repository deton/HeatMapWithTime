# Usage: sh merge-before.sh data.geojson before.geojson >output.geojson

datafile=$1
beforefile=$2

# `{"type":"FeatureCollection","valuekeys":["bikes","docks","capacity"],"features":[`
headsize=$(grep -E -o '^.*?"features": *\[' "$datafile" | tr -d '\n' | wc -c)
head -c "$headsize" "$datafile"

# make polygons in before.geojson lower than circle markers in data.geojson.
# begin: after `{"type":"FeatureCollection","features":[`
beginpos=$(grep -E -o '^.*?"features": *\[' "$beforefile" | wc -c)
# end: before closing of features: `]}`
size=$(wc -c < "$beforefile")
endpos=$((size - 3))
cut -b "$beginpos-$endpos" "$beforefile"

echo ","

beginpos=$((headsize + 1))
cut -b "$beginpos-" "$datafile"
