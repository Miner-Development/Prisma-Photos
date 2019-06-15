-- DROP DATABASE IF EXISTS photos_db;
-- CREATE DATABASE IF NOT EXISTS photos_db;

USE photos_db;

-- CREATE TABLE photos (
  id INT AUTO_INCREMENT,
  photo_name VARCHAR(30) NOT NULL,
  downloaded BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);


 db.createCollection("photos");
 db.photos.insert( { ident: "201906141059CO", status: "Updated" } ); 

 db.createCollection( "photos", {
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "id" ],
      properties: {
         phone: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         email: {
            bsonType : "string",
            pattern : "@mongodb\.com$",
            description: "must be a string and match the regular expression pattern"
         },
         status: {
            enum: [ "Unknown", "Incomplete" ],
            description: "can only be one of the enum values"
         }
      }
   } }
} )