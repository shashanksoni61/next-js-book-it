const { dbConnect } = require("@config/db/dbForSeeder");
const Room = require("@models/Room");
const dummyData = require("./dummyData.json");

const seedData = async () => {
  try {
    await dbConnect();
    // First Clearing Previous Data
    await Room.deleteMany();

    // Now Insert Dummy dummyData
    await Room.insertMany(dummyData);
    console.log("data inserted successfully");
  } catch (error) {
    console.log(error.message);
  }
};

seedData();
