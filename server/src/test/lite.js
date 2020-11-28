const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './src/test/vocatech.db'
//
dbSchema = `CREATE TABLE contacts (
	contact_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	phone TEXT NOT NULL UNIQUE
);

CREATE TABLE groups (
    group_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
 );
 
 CREATE TABLE contact_groups(
    contact_id INTEGER,
    group_id INTEGER,
    PRIMARY KEY (contact_id, group_id),
    FOREIGN KEY (contact_id) 
       REFERENCES contacts (contact_id) 
          ON DELETE CASCADE 
          ON UPDATE NO ACTION,
    FOREIGN KEY (group_id) 
       REFERENCES groups (group_id) 
          ON DELETE CASCADE 
          ON UPDATE NO ACTION
 );`
//
const DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_PATH + ' database.')

// ADD THIS CODE BELOW
    DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
        if (error){
            console.error("Pragma statement didn't work.")
        } else {
            console.log("Foreign Key Enforcement is on.")
        }
    });
});
DB.exec(dbSchema,(err)=>{
    if(err){
        console.log(err);
    }
})
DB.close()