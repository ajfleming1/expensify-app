const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "..", "dist");

app.use(express.static(publicPath));

app.get("*", (req: any, res: { sendFile: (arg0: any) => void; }) => {
  res.sendFile(path.join(publicPath, "index.html"))
});

app.listen(3000, () => console.log("Server is up."));