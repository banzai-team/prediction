CREATE table if not exists building_object (
	obj_key varchar PRIMARY KEY 
);

create table if not exists task_type (
	code varchar primary key,
	name varchar not null,
    is_critical boolean default false
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

CREATE INDEX task_type_code ON task ( task_type_code );
CREATE INDEX task_building_object_key ON task ( building_object_key );
alter table task add constraint obj_task_type_unique UNIQUE (task_type_code , building_object_key);

-- test upsert 1
CREATE OR REPLACE FUNCTION upsert_task(obj_keys text, task_types text, plan_start_dates timestamp, plan_end_dates timestamp) RETURNS VOID AS $$ 
    DECLARE 
    BEGIN 
        UPDATE task 
    	SET plan_start = plan_start_dates, plan_end =plan_end_dates  
   		WHERE task.building_object_key = obj_keys and task.task_type_code = task_types; 
        IF NOT FOUND THEN 
        	INSERT INTO task (building_object_key, task_type_code, plan_start, plan_end) values (obj_keys, task_types, plan_start_dates, plan_end_dates); 
        END IF; 
    END; 
$$ LANGUAGE 'plpgsql'; 

-- test upsert 2
CREATE OR REPLACE FUNCTION upsert_tasks(obj_keys text[], task_types text[], plan_start_dates timestamp[], plan_end_dates timestamp[]) RETURNS VOID AS $$ 
    DECLARE 
    BEGIN 
	    for i in 1..cardinality(obj_keys) loop
		    UPDATE task 
	    	SET plan_start = plan_start_dates[i], plan_end =plan_end_dates[i]  
	   		WHERE task.building_object_key = obj_keys[i] and task.task_type_code = task_types[i]; 
	        IF NOT FOUND THEN 
	        	INSERT INTO task (building_object_key, task_type_code, plan_start, plan_end) values (obj_keys[i], task_types[i], plan_start_dates[i], plan_end_dates[i]); 
	        END IF; 
		 end loop;
    END; 
$$ LANGUAGE 'plpgsql'; 