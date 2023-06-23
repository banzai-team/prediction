CREATE table if not exists building_object (
	obj_key varchar PRIMARY KEY 
);

create table if not exists task_type (
	code varchar primary key,
	name varchar not null
);

create table if not exists task (
	id bigserial primary key,
	building_object_key varchar not null,
	task_type_code varchar not null,
	plan_start timestamp not null,
	plan_end timestamp not null
);

create table if not exists task_history (
	id bigserial primary key,
	task_id int8 not null,
	progress int2 default 0,
	doc_start timestamp,
	doc_end timestamp
);

ALTER TABLE task ADD CONSTRAINT fk_task_building_object FOREIGN KEY (building_object_key) REFERENCES building_object (obj_key);
ALTER TABLE task ADD CONSTRAINT fk_task_task_type FOREIGN KEY (task_type_code) REFERENCES task_type (code);
ALTER TABLE task_history ADD CONSTRAINT fk_task_history_task FOREIGN KEY (task_id) REFERENCES task (id);
