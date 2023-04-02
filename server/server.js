// Import required packages
const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");

// Define constants
const PORT = 3002;

// Create Express app
const app = express();

// Configure app middleware
//parses incoming JSON data in the request body and makes it available in req.body.
app.use(express.json());

//part of the body-parser package and is used to parse incoming URL-encoded form data in the request body and make it available in req.body.

app.use(bodyParser.urlencoded({ extended: true }));
//part of the body-parser package and is used to parse incoming JSON data in the request body and make it available in req.body.
app.use(bodyParser.json());

//sets some HTTP response headers to allow cross-origin resource sharing (CORS). It sets the Access-Control-Allow-Origin header to * to allow requests from any origin, and sets the Access-Control-Allow-Methods header to specify the HTTP methods (GET, POST, PUT, and DELETE) that are allowed for the resource. Finally, it sets the Access-Control-Allow-Headers header to specify the request headers that are allowed.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


// GET - Define API routes with switch case type and send the information to client
app.get("/api/data/", async (req, res) => {
  const { dataType, value } = req.query;
  const data = await loadStaffJson();

  let filteredData = { staffs: [] };
  switch (dataType) {
    case "name":
      filteredData.staffs = data.staffs.filter(({ firstName }) =>
        firstName.toLowerCase().includes(value.toLowerCase())
      );
      break;

    case "id":
      filteredData.staffs = data.staffs.filter(({ staffID }) =>
        staffID.toLowerCase().includes(value.toLowerCase())
      );
      break;

    case "salary":
      if (value !== "") {
        const salaryValue = parseInt(value);
        filteredData.staffs = data.staffs.filter(
          ({ salary }) => salary === salaryValue
        );
      } else {
        filteredData.staffs = data.staffs;
      }
      break;

    case "all":
      filteredData = data;
      break;

    default:
      return res.status(400).send("Invalid data type requested");
  }

  res.json(filteredData);
});


// POST - The client information will be insert to the json file.
app.post("/api/staffs/register", async (req, res) => {
  const staff = req.body;

  // Load existing staff data from file
  const data = await loadStaffJson();

  // Generate new staff ID
  staff.staffID = generateID(data.staffs, "E");

  // Generate new user ID
  staff.userId = generateID(data.staffs, "u");

  // Add new staff to the data
  data.staffs.push({
    userId: staff.userId,
    jobTitleName: staff.jobTitleName,
    firstName: staff.firstName,
    lastName: staff.lastName,
    preferredFullName: staff.preferredFullName,
    staffID: staff.staffID,
    region: staff.region,
    phoneNumber: staff.phoneNumber,
    emailAddress: staff.emailAddress,
    salary: staff.salary
  });

  // Save updated staff data to file
  await saveStaffJson(data);

  // Return success response
  res.status(201).send("Staff record created successfully");
});


// Handle all other routes (Errors)
app.use("*", (req, res) => {
  res.status(404).send("API route not found");
});


// Load json file
const loadStaffJson = async () => {
  try {
    const data = await fs.readFile("./staffs.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Save the new json file (overwritten)
const saveStaffJson = async (data) => {
  try {
    await fs.writeFile("./staffs.json", JSON.stringify(data));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Auto increment userID and staffID
const generateID = (staffs, prefix) => {
  const lastStaff = staffs[staffs.length - 1];
  const lastID = lastStaff ? lastStaff.staffID : `${prefix}0`;
  const numericPart = parseInt(lastID.slice(1));
  if (isNaN(numericPart)) {
    throw new Error(`Invalid staff ID: ${lastID}`);
  }
  const nextNumericPart = numericPart + 1;
  return `${prefix}${nextNumericPart}`;
};

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
