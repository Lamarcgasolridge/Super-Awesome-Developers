create table Data(
	"rowid" INTEGER,
	"page_id" INTEGER,
  	"name" TEXT,
  	"urlslug" TEXT,
  	"ID" TEXT,
  	"ALIGN" TEXT,
  	"EYE" TEXT,
 	"HAIR" TEXT,
	"SEX" TEXT,
  	"GSM" TEXT,
  	"ALIVE" TEXT,
  	"APPEARANCES" INTEGER,
  	"FIRST APPEARANCE" TEXT,
  	"Year" INTEGER
);

Delete from data
where "ID" is null;

delete from data
where "ALIGN" is null;

Delete from data
where "HAIR" is null;

Delete from data
where "SEX" is null;

select "rowid", "page_id", "name", "urlslug", "ID", "ALIGN", "EYE", "HAIR", "SEX",
  	coalesce("GSM", 'Heterosexual Characters'), "ALIVE", "APPEARANCES", "FIRST APPEARANCE",
  	"Year" from data;

select count(*) from data;

select * from data;

