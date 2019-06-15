
use $external
db.createUsers(
    {
      user: "reportingapp@EXAMPLE.NET", -- DO NOT CHANGE (see https://docs.mongodb.com/manual/tutorial/create-users/ for more info)
        id: 
      roles: [
       { role: "read", db: "clients" },
       { role: "read", db: "events" },
       { role: "read", db: "photos" },
       { role: "read", db: "jobs" },
       { role: "readWrite", db: "reviews" }
      ]
    }
)