db.users("admin").createUser(
  {
    "user" : "{{ $username }}",
    "pwd" : "{{ $password }}",
    "name" : "{{ $name }}",
    "email" : "{{ $user_email }}",
    "phone" : "{{ $user_phone }}",
    "roles" : [
      { "db" : "photos", "role" : "readWrite" },
      { "db" : "employees", "role" : "readWrite" }
      { "db" : "employees", "role" : "readWrite" }
    ]
  }
)
