-- psql
create table if not exists projects (
    id serial primary key,
    name varchar(255) not null,
    description text,
    created_at timestamp default current_timestamp,
    finished_at timestamp default null
);

create table if not exists tipps(
    id serial primary key,
    name varchar(255) not null,
    cls varchar(7) not null,
    prof_link varchar(255) not null,
    msg text,
);

create table if not exists gyulesek(
    id serial primary key,
    desc text,
    gy_date date not null,
);