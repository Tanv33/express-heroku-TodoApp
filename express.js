const express = require("express");
const app = express();
const Port = process.env.Port || 5000;
const path = require("path");

app.use("/", express.static(path.join(__dirname, "web/build")));

app.get("/api/v1/tanveer", (req, res) =>
    res.send(
        "<h1>Welcome to get request of Tanveer hey you know on / there is todo app</h1>"
    )
);

app.post("/api/v1/tanveer", (req, res) =>
    res.send("<h1>Create Post Successfully</h1>")
);

app.put("/api/v1/tanveer", (req, res) =>
    res.send("<h1>Post has been Updated</h1>")
);

app.delete("/api/v1/tanveer", (req, res) =>
    res.send("<h1>Post has been Deleted</h1>")
);

app.get("/**", (req, res) =>
    res.send("<h1><center>Error: 404 <br/>Page Not Found</center></h1>")
);

// app.use((req, res) => res.send("<h1><center>Page Not Found</center></h1>"));

// app.use((req, res, next) => res.redirect("/404"));
// app.use((req, res) =>
//     res.sendFile(path.join(__dirname, "web/build/index.html"))
// );
// app.use("/**", (req, res) =>
//     res.sendFile(path.join(__dirname, "web/build/index.html"))
// );

app.listen(Port, () =>
    console.log(`Example app listening on port port! http://localhost:${Port}`)
);