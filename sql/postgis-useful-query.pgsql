SELECT Find_SRID('public', 'mytable', 'geom');
SELECT UpdateGeometrySRID('mytable','geom',4326);
INSERT INTO mytable (geom,name) VALUES (
  ST_GeomFromText('POINT(13.051100 80.281319)', 4326),'marina'
);
SELECT id, name
FROM mytable  
WHERE ST_DWithin(geom, ST_MakePoint(78.910316,10.542730)::geography, 300000); //distance in meters
SELECT AddGeometryColumn('mytable', 'geom2', 4326, 'POINT', 2); 
SELECT ST_AsGeoJSON(geom) FROM mytable;  //geom column as json