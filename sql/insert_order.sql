ALTER TABLE public.can
    ALTER COLUMN company_id TYPE integer ;
ALTER TABLE public.can
    ALTER COLUMN company_id DROP NOT NULL;
ALTER TABLE public.agency
    ALTER COLUMN mobile_no TYPE bigint ;
ALTER TABLE public.agency
    ALTER COLUMN covered_street_id TYPE bigint ;
ALTER TABLE public.agency
    ALTER COLUMN supporting_radius TYPE double precision ;
ALTER TABLE public.agency
    ALTER COLUMN supporting_radius DROP NOT NULL;
ALTER TABLE public.agency
    ALTER COLUMN street_id TYPE bigint ;
ALTER TABLE public.agency
    ALTER COLUMN filling_cost TYPE double precision ;
ALTER TABLE public.agency
    ALTER COLUMN filling_cost DROP NOT NULL;
ALTER TABLE public.agency
    ALTER COLUMN ratings TYPE double precision ;
ALTER TABLE public.agency
    ALTER COLUMN ratings DROP NOT NULL;
ALTER TABLE public.agency
    ALTER COLUMN geo_location TYPE character varying ;
ALTER TABLE public.agency
    ALTER COLUMN geo_location DROP NOT NULL;
ALTER TABLE public.agency
    RENAME "price-id" TO price_id;
ALTER TABLE public.agency
    ALTER COLUMN price_id TYPE integer ;
ALTER TABLE public."user"
    ALTER COLUMN agency_id TYPE integer ;
ALTER TABLE public."user"
    ALTER COLUMN agency_id DROP NOT NULL;
ALTER TABLE public."user"
    ALTER COLUMN street_id TYPE integer ;
ALTER TABLE public."user"
    ALTER COLUMN street_id DROP NOT NULL;
ALTER TABLE public."user"
    ALTER COLUMN member_id TYPE integer ;
ALTER TABLE public."user"
    ALTER COLUMN member_id DROP NOT NULL;
ALTER TABLE public."user"
    ALTER COLUMN address TYPE text ;
ALTER TABLE public."user"
    ALTER COLUMN address DROP NOT NULL;
ALTER TABLE public."user"
    ALTER COLUMN recurring_time TYPE time without time zone ;
ALTER TABLE public."user"
    ALTER COLUMN recurring_time DROP NOT NULL;
ALTER TABLE public."user"
    ALTER COLUMN mobile_no TYPE bigint ;
ALTER TABLE public."user"
    ALTER COLUMN mobile_no DROP NOT NULL;
ALTER TABLE public."user"
    ALTER COLUMN blocked_agencies TYPE bigint ;
ALTER TABLE public."user"
    ALTER COLUMN blocked_agencies DROP NOT NULL;
ALTER TABLE public."user"
    ALTER COLUMN ratings TYPE double precision ;
ALTER TABLE public."user"
    ALTER COLUMN ratings DROP NOT NULL;
ALTER TABLE public."user"
    ALTER COLUMN mail_id TYPE character varying ;
ALTER TABLE public."user"
    ALTER COLUMN google_id TYPE character varying ;
ALTER TABLE public."user"
    ALTER COLUMN fb_id TYPE character varying ;		
ALTER TABLE public.can
    ALTER COLUMN company_id TYPE integer ;
ALTER TABLE public.can
    ALTER COLUMN company_id DROP NOT NULL;
ALTER TABLE public.agency
    RENAME availability TO availabilty;
ALTER TABLE public.agency
    ALTER COLUMN availabilty TYPE character varying ;	
ALTER TABLE public."user"
    ALTER COLUMN fb_id TYPE character varying ;
ALTER TABLE public."user"
    ALTER COLUMN fb_id DROP NOT NULL;	
INSERT INTO public.countries_id(
	country_id, country_code, country_name)
	VALUES (1, 1, 1);
ALTER TABLE public.agency
    ALTER COLUMN mobile_no TYPE bigint ;
ALTER TABLE public."user"
    ALTER COLUMN google_id TYPE character varying ;
ALTER TABLE public."user"
    ALTER COLUMN google_id DROP NOT NULL;	
INSERT INTO public.state(
	state_id, country_id)
	VALUES (1, 1);

INSERT INTO public.street(
	street_id, sub_area_id, area_id, district_id, state_id, country_id)
	VALUES (1, 1, 1, 1, 1, 1);
INSERT INTO public.agency_street_map(
	street_id, agency_id)
	VALUES (1, 1);
INSERT INTO public.units(
	units_id, units)
	VALUES (1, 'litres');
INSERT INTO public.agency_category(
	agency_type, agency_name)
	VALUES (1, 'agency');
INSERT INTO public.agency_category(
	agency_type, agency_name)
	VALUES (2, 'filling_station');
INSERT INTO public.company(
	company_id, company_name)
	VALUES (1, 'bisleri');  
INSERT INTO public.can(
	can_id, company_id, can_type, units_id, is_default)
	VALUES (1, null, 1, 1, true);
INSERT INTO public.agency(
	agency_id, agency_name, agency_address, mobile_no, covered_street_id, supporting_radius, auto_enable, no_of_available_cans, street_id, agency_type, filling_cost, filling_availabity_duration, agency_code, ratings, availabilty, can_id, geo_location)
	VALUES (1, 'agency_1', '23 agency street chennai 600039', '9090909090', 1, 2 ,false, 100, 1, 1, 10, '8-12~2-3~4-7', 1, 4, '9-12~2-3~4-7', 1, '100,100');            
INSERT INTO public.membership_detail(
	membership_id, membership_price, feature_id)
	VALUES (1, 20, 1);
INSERT INTO public.payment_mode(
	mode_id, mode_name)
	VALUES (1, 'COD');    
INSERT INTO public."user"(
	user_id, agency_id, street_id, last_transaction_id, member_id, address, recurring_transaction_id, recurring_time, mobile_no, blocked_agencies, ratings, is_guest, mail_id, google_id, fb_id, geo_location)
	VALUES (1, 1, 1, null, 1, '10 user address', null, '08:00:00', '9999999999', null, 5, true, null, null, null, '100,100');    
INSERT INTO public.price_units(
	price_id, price_units)
	VALUES (1, 'usd');	