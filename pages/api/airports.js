// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function airports(req, res) {
  const data=  [
      {
        "code": "DEL",
        "name": "Indira Gandhi International Airport",
        "fullName": "Indira Gandhi International Airport",
        "city": "Delhi",
        "country": "India",
        "flags": ["international", "major"],
        "details": {
          "terminal": "3",
          "runways": 3,
          "passengerCapacity": 68000000
        }
      },
      {
        "code": "BOM",
        "name": "Chhatrapati Shivaji Maharaj International Airport",
        "fullName": "Chhatrapati Shivaji Maharaj International Airport",
        "city": "Mumbai",
        "country": "India",
        "flags": ["international", "major"],
        "details": {
          "terminal": "2",
          "runways": 2,
          "passengerCapacity": 45000000
        }
      },
      {
        "code": "BLR",
        "name": "Kempegowda International Airport",
        "fullName": "Kempegowda International Airport",
        "city": "Bangalore",
        "country": "India",
        "flags": ["international", "major"],
        "details": {
          "terminal": "2",
          "runways": 1,
          "passengerCapacity": 25000000
        }
      },
      {
        "code": "MAA",
        "name": "Chennai International Airport",
        "fullName": "Chennai International Airport",
        "city": "Chennai",
        "country": "India",
        "flags": ["international"],
        "details": {
          "terminal": "4",
          "runways": 2,
          "passengerCapacity": 22300000
        }
      },
      {
        "code": "CCU",
        "name": "Netaji Subhas Chandra Bose International Airport",
        "fullName": "Netaji Subhas Chandra Bose International Airport",
        "city": "Kolkata",
        "country": "India",
        "flags": ["international", "major"],
        "details": {
          "terminal": "2",
          "runways": 1,
          "passengerCapacity": 32200000
        }
      }
    ];

  // appending count of airports
  // data.count= data.airports.length;
  res.status(200).json(data);
}
