head -c 19824385 15-PT30M-capacity-icon0.geojson > 15-PT30M-capacity-icon0-population.geojson
echo "," >> 15-PT30M-capacity-icon0-population.geojson
tail -c +41 population.geojson >> 15-PT30M-capacity-icon0-population.geojson
