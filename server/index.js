const express = require('express');
const app = express();

app.use(express.json());

// Function to fetch random useless fact
async function fetchFactData() {
  const url = "https://uselessfacts.jsph.pl/api/v2/facts/random";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    }
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  console.log("Data fetched successfully");
  return response.json(); // Return the JSON response
}

app.get("/data", async (req, res) => {
  console.log("Fetching new useless fact");

  try {
    const uselessFact = await fetchFactData();
    res.json(uselessFact); // Send the result back to the client
  } catch (error) {
    console.log("Fetch error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});
