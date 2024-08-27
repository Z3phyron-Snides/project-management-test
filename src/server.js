const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

// Sync database
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
