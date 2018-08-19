CREATE TABLE "user" (
	"user_id" serial NOT NULL UNIQUE,
	"agency_id" integer NOT NULL,
	"street_id" integer NOT NULL,
	"last_transaction_id" VARCHAR(255),
	"member_id" integer NOT NULL,
	"address" TEXT NOT NULL,
	"recurring_transaction_id" VARCHAR(255),
	"recurring_time" TIME NOT NULL,
	"mobile_no" integer NOT NULL,
	"blocked_agencies" integer NOT NULL,
	"ratings" FLOAT NOT NULL,
	"is_guest" BOOLEAN NOT NULL,
	"mail_id" VARCHAR(255) NOT NULL UNIQUE,
	"google_id" integer NOT NULL UNIQUE,
	"fb_id" VARCHAR(255) NOT NULL UNIQUE,
	"geo_location" VARCHAR(255) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "agency" (
	"agency_id" serial NOT NULL,
	"agency_name" VARCHAR(255),
	"agency_address" VARCHAR(255),
	"mobile_no" integer UNIQUE,
	"covered_street_id" integer,
	"supporting_radius" FLOAT NOT NULL,
	"auto_enable" BOOLEAN NOT NULL,
	"no_of_available_cans" integer NOT NULL,
	"street_id" integer,
	"agency_type" integer,
	"filling_cost" FLOAT NOT NULL,
	"filling_availabity_duration" VARCHAR(255) NOT NULL,
	"agency_code" integer NOT NULL,
	"ratings" FLOAT NOT NULL,
	"availability" VARCHAR(255) NOT NULL,
	"can_id" integer,
	"geo_location" VARCHAR(255) NOT NULL,
	"price-id" integer,
	CONSTRAINT agency_pk PRIMARY KEY ("agency_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "countries_id" (
	"country_id" serial NOT NULL,
	"country_code" integer NOT NULL,
	"country_name" VARCHAR(255) NOT NULL,
	CONSTRAINT countries_id_pk PRIMARY KEY ("country_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "state" (
	"state_id" serial NOT NULL,
	"country_id" integer NOT NULL,
	CONSTRAINT state_pk PRIMARY KEY ("state_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "street" (
	"street_id" integer NOT NULL,
	"sub_area_id" integer NOT NULL,
	"area_id" integer NOT NULL,
	"district_id" integer NOT NULL,
	"state_id" integer NOT NULL,
	"country_id" integer NOT NULL,
	CONSTRAINT street_pk PRIMARY KEY ("street_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "transaction" (
	"transaction_id" VARCHAR(255) NOT NULL,
	"user_id" integer,
	"agency_id" integer,
	"transaction_date" TIME NOT NULL,
	"payment_mode" integer NOT NULL,
	"payment_medium" integer NOT NULL,
	"no_of_cans" integer NOT NULL,
	"can_id" integer,
	"payment_gateway_id" VARCHAR(255) NOT NULL,
	"payment_status" integer NOT NULL,
	"recurring" BOOLEAN NOT NULL,
	"delivery_time_preference" TIME NOT NULL,
	"delivered_time" TIME NOT NULL,
	"delivery_accepted_time" TIME NOT NULL,
	"agency_approved" BOOLEAN NOT NULL,
	"status" integer NOT NULL,
	"emergency_booking" BOOLEAN NOT NULL,
	CONSTRAINT transaction_pk PRIMARY KEY ("transaction_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "can" (
	"can_id" integer NOT NULL,
	"company_id" integer NOT NULL,
	"can_type" integer NOT NULL,
	"units_id" integer NOT NULL,
	"is_default" BOOLEAN NOT NULL,
	CONSTRAINT can_pk PRIMARY KEY ("can_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "company" (
	"company_id" integer NOT NULL,
	"company_name" VARCHAR(255) NOT NULL,
	CONSTRAINT company_pk PRIMARY KEY ("company_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "membership_detail" (
	"membership_id" serial NOT NULL,
	"membership_price" FLOAT NOT NULL,
	"feature_id" FLOAT NOT NULL,
	CONSTRAINT membership_detail_pk PRIMARY KEY ("membership_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "agency_street_map" (
	"street_id" integer,
	"agency_id" integer
) WITH (
  OIDS=FALSE
);



CREATE TABLE "issues" (
	"issue_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"agency_id" integer NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	"feedback_taken" BOOLEAN NOT NULL,
	"feedback_implemented" BOOLEAN NOT NULL,
	CONSTRAINT issues_pk PRIMARY KEY ("issue_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "transaction_issues" (
	"issue_id" integer,
	"transaction_id" VARCHAR(255),
	"user_id" integer,
	"agency_id" integer,
	"timestamp" TIMESTAMP NOT NULL,
	"feedback_taken" BOOLEAN NOT NULL,
	"feedback_implemented" BOOLEAN NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "units" (
	"units_id" integer NOT NULL,
	"units" VARCHAR(255) NOT NULL,
	CONSTRAINT units_pk PRIMARY KEY ("units_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "agency_category" (
	"agency_type" serial NOT NULL,
	"agency_name" VARCHAR(255) NOT NULL,
	CONSTRAINT agency_category_pk PRIMARY KEY ("agency_type")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "payment_mode" (
	"mode_id" serial NOT NULL,
	"mode_name" VARCHAR(255) NOT NULL,
	CONSTRAINT payment_mode_pk PRIMARY KEY ("mode_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "price_units" (
	"price_id" serial NOT NULL,
	"price_units" VARCHAR(255) NOT NULL,
	CONSTRAINT price_units_pk PRIMARY KEY ("price_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("agency_id") REFERENCES "agency"("agency_id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk1" FOREIGN KEY ("street_id") REFERENCES "street"("street_id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk2" FOREIGN KEY ("last_transaction_id") REFERENCES "transaction"("transaction_id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk3" FOREIGN KEY ("member_id") REFERENCES "membership_detail"("membership_id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk4" FOREIGN KEY ("recurring_transaction_id") REFERENCES "transaction"("transaction_id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk5" FOREIGN KEY ("blocked_agencies") REFERENCES "agency"("agency_id");

ALTER TABLE "agency" ADD CONSTRAINT "agency_fk0" FOREIGN KEY ("covered_street_id") REFERENCES "street"("street_id");
ALTER TABLE "agency" ADD CONSTRAINT "agency_fk1" FOREIGN KEY ("street_id") REFERENCES "street"("street_id");
ALTER TABLE "agency" ADD CONSTRAINT "agency_fk2" FOREIGN KEY ("agency_type") REFERENCES "agency_category"("agency_type");
ALTER TABLE "agency" ADD CONSTRAINT "agency_fk3" FOREIGN KEY ("can_id") REFERENCES "can"("can_id");
ALTER TABLE "agency" ADD CONSTRAINT "agency_fk4" FOREIGN KEY ("price-id") REFERENCES "price_units"("price_id");



ALTER TABLE "street" ADD CONSTRAINT "street_fk0" FOREIGN KEY ("state_id") REFERENCES "state"("state_id");
ALTER TABLE "street" ADD CONSTRAINT "street_fk1" FOREIGN KEY ("country_id") REFERENCES "countries_id"("country_id");

ALTER TABLE "transaction" ADD CONSTRAINT "transaction_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_fk1" FOREIGN KEY ("agency_id") REFERENCES "agency"("agency_id");
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_fk2" FOREIGN KEY ("payment_mode") REFERENCES "payment_mode"("mode_id");
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_fk3" FOREIGN KEY ("can_id") REFERENCES "can"("can_id");

ALTER TABLE "can" ADD CONSTRAINT "can_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("company_id");
ALTER TABLE "can" ADD CONSTRAINT "can_fk1" FOREIGN KEY ("units_id") REFERENCES "units"("units_id");



ALTER TABLE "agency_street_map" ADD CONSTRAINT "agency_street_map_fk0" FOREIGN KEY ("street_id") REFERENCES "street"("street_id");
ALTER TABLE "agency_street_map" ADD CONSTRAINT "agency_street_map_fk1" FOREIGN KEY ("agency_id") REFERENCES "agency"("agency_id");

ALTER TABLE "issues" ADD CONSTRAINT "issues_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");
ALTER TABLE "issues" ADD CONSTRAINT "issues_fk1" FOREIGN KEY ("agency_id") REFERENCES "agency"("agency_id");

ALTER TABLE "transaction_issues" ADD CONSTRAINT "transaction_issues_fk0" FOREIGN KEY ("issue_id") REFERENCES "issues"("issue_id");
ALTER TABLE "transaction_issues" ADD CONSTRAINT "transaction_issues_fk1" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("transaction_id");
ALTER TABLE "transaction_issues" ADD CONSTRAINT "transaction_issues_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");
ALTER TABLE "transaction_issues" ADD CONSTRAINT "transaction_issues_fk3" FOREIGN KEY ("agency_id") REFERENCES "agency"("agency_id");





