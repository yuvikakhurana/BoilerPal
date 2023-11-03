const users =
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "s3cretPassword123!",
      "verified": false,
      "reservations": [
        {
          "date": "2023-11-10",
          "time_slot": "14:00-15:00",
          "building": "Main Hall",
          "room_num": "101A" 
        },
        {
          "date": "2023-11-12",
          "time_slot": "09:00-10:00",
          "building": "Science Wing",
          "room_num": "201B" 
        }
      ],
      "classes": [
        {
          "name": "Introduction to Psychology",
          "date": "2023-11-13",
          "time_slot": "08:00-09:30", 
          "location": "Room 204, Arts Building",
          "by_weekday": [
            {"day": "M"},
            {"day": "W"},
            {"day": "F"}
          ]
        }
      ],
      "events": [
        {
          "date": "2023-11-15",
          "time_slot": "18:00-20:00",
          "name": "Welcome Event"
        }
      ]
    }
;
  
export default users;
  