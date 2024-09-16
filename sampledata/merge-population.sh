# Usage: sh merge-population.sh <data.geojson> <population.geojson> >output.geojson

datafile=$1
populfile=$2

# `{"type":"FeatureCollection","valuekeys":["bikes","docks","capacity"],"features":[`
headsize=$(grep -E -o '^.*?"features": *\[' "$datafile" | tr -d '\n' | wc -c)
head -c "$headsize" "$datafile"

# make population polygon lower than circle marker.
# begin: after `{"type":"FeatureCollection","features":[`
beginpos=$(grep -E -o '^.*?"features": *\[' "$populfile" | wc -c)
# end: before closing of features: `]}`
size=$(wc -c < "$populfile")
endpos=$((size - 3))
cut -b "$beginpos-$endpos" "$populfile"

echo ","

beginpos=$((headsize + 1))
cut -b "$beginpos-" "$datafile"
