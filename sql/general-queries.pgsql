To change integer to bigserial sequence
=======
CREATE SEQUENCE agency_id_seq;
ALTER TABLE agency ALTER COLUMN agency_id SET NOT NULL;
ALTER TABLE agency ALTER COLUMN agency_id SET DEFAULT nextval('agency_id_seq');
ALTER SEQUENCE agency_id_seq OWNED BY agency.agency_id;

=======
agency sample data INSERT

INSERT INTO public.agency(
	 agency_name, agency_address, mobile_no, supporting_radius, auto_enable, no_of_available_cans, filling_availabity_duration, agency_code,  availabilty, geom)
	VALUES ('thiruvalluvar agency', 'vivekanda street perambur ', 90909090, 5, true, 100, '10-5', 1, true, ST_GeomFromText('POINT(80.2453592 13.1080631)', 4326));

