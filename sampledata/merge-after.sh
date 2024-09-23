# Usage: sh merge-after.sh data.geojson after.geojson >output.geojson

datafile=$1
afterfile=$2

# end: before closing of features: `]}`
size=$(wc -c < "$datafile")
endpos=$((size - 2))
head -c "$endpos" "$datafile"

echo ","

# begin: after `{"type":"FeatureCollection","features":[`
beginpos=$(grep -E -o '^.*?"features": *\[' "$afterfile" | wc -c)
cut -b "$beginpos-" "$afterfile"
