import "./App.css";
import React from "react";
import TodoFirestore from "./components/TodoFirestore";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import SimpleTodo from "./components/Simpletodo";

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#630330" }}>
          <Toolbar>
            <Typography
              variant="h6"
              textAlign="center"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <span style={{ cursor: "pointer" }}>Advanced Todo App</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <TodoFirestore />
        {/* <SimpleTodo /> */}
      </Box>
    </>
  );
}

export default App;
