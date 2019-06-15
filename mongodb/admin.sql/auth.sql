-- RUN THIS TO MANAGE AUTH DB:
-- mongo port 27017 -u "admin" --authenticationDatabase "admin" -p

use admin
db.createUser(
  {
    user: "admin",
    pwd: "abc123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
);

use test
db.createUser(
  {
    user: "client_test",
    pwd: "xyz123",
    roles: [ { role: "readWrite", db: "reviews" },
             { role: "read", db: "clients" } ]
  }
);