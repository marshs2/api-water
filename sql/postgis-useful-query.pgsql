SELECT Find_SRID('public', 'mytable', 'geom');
SELECT UpdateGeometrySRID('mytable','geom',4326);

-- insert latitude longitude value as geomtric type into geometric column
-- point input format point(long,lat)

INSERT INTO mytable (geom,name) VALUES (
  ST_GeomFromText('POINT(80.2336651 13.0997511)', 4326),'aynavaram'
);

-- select table by specific distance from latitude , longitude
-- Note: input of long,lat -> ST_MakePoint(long,lat)
-- Note: ST_DWithin(geom,point,dist_in_meters)
SELECT id, name
FROM mytable  
WHERE ST_DWithin(geom, ST_MakePoint(78.910316,10.542730)::geography, 1000); //distance in meters

-- add geometric type column to existing table
SELECT AddGeometryColumn('mytable', 'geom2', 4326, 'POINT', 2); 

-- select geometric value as latitude,longitide json
SELECT ST_AsGeoJSON(geom) FROM mytable;  //geom column as json

UPDATE public.agency
	SET geom =  ST_GeomFromText('POINT(80.2336651 13.0997511)', 4326)
	WHERE agency_id=1;
