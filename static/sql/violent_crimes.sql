create table violent_crimes (
	id serial primary key,
	Date date, 
	Primary_Type varchar,
	Description varchar, 
	Arrest boolean,
	Domestic boolean,
	District int,
	Year int,
	Latitude float,
	Longitude float
);

select * from violent_crimes;