import React, { useState, useEffect } from "react";
import { db } from "./../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const todoCol = collection(db, "todo");

function TodoFirestore() {
  const [inputText, setInputText] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    // RealTime getting Item and delete
    const q = query(todoCol, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let arr = [];
      snapshot.forEach((doc) => {
        let id = doc.id;
        let data = doc.data();
        arr.unshift({
          id: id,
          value: data.value,
        });
      });
      setTodo(arr);
    });
    return () => {
      unsubscribe();
      // console.log("cleanup");
    };
    // simple getting item
    // const getData = async () => {
    //   const querySnapshot = await getDocs(todoCol);
    //   let arr = [];
    //   querySnapshot.forEach((docs) => {
    //     // console.log(docs.id, " and ", docs.data());
    //     arr.push(docs.data());
    //   });
    //   setTodo(arr);
    // };
    // getData();
    // return () => {
    //   console.log("cleanup");
    // };
  }, []);

  // update
  const edit = (e) => {
    e.target.disabled = true;
    e.target.parentElement.children[0].innerHTML = `<input type="text" size="28" style=" width: auto;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;" value="${e.target.parentElement.children[0].innerText}"/>`;
    e.target.parentElement.children[0].children[0].addEventListener(
      "blur",
      async (c) => {
        await updateDoc(doc(todoCol, c.target.parentElement.id), {
          value: `${c.target.value}`,
        });
        e.target.disabled = false;
      }
    );
  };

  //Submit
  const submit = async (e) => {
    e.preventDefault();
    if (inputText !== "") {
      try {
        let obj = {
          value: inputText,
          timestamp: serverTimestamp(),
        };
        await addDoc(todoCol, obj);
        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        // console.error("Error adding document: ", e);
      }
      setInputText("");
    }
  };

  const changingOn = (e) => {
    setInputText(e.target.value);
  };

  const deleteLi = async (id) => {
    await deleteDoc(doc(todoCol, id));
  };

  const deleteAll = () => {
    todo.forEach(async (element) => {
      await deleteDoc(doc(todoCol, element.id));
    });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#953553",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      <form
        onSubmit={submit}
        style={{ margin: "0px 10px", marginTop: "40px", marginBottom: "20px" }}
      >
        <TextField
          fullWidth
          color="primary"
          id="outlined-basic"
          label="Type your list Here"
          variant="outlined"
          tabIndex="1"
          type="text"
          value={inputText}
          onChange={changingOn}
        />
        <Button
          variant="contained"
          onClick={submit}
          style={{
            margin: "0px 4px",
            marginTop: "9px",
            backgroundColor: "#009E60",
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          style={{
            margin: "0px 4px",
            marginTop: "9px",
            backgroundColor: "#811331",
          }}
          onClick={deleteAll}
        >
          Delete All
        </Button>
      </form>
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ textAlign: "center " }}>
                  Your Todo List
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todo.map((eachTodo, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    &#9734;&nbsp;&nbsp;
                    <span id={eachTodo.id}>{eachTodo.value}</span>
                    <Button
                      onClick={edit}
                      variant="contained"
                      style={{
                        margin: "6px",
                        marginLeft: "14px",
                        backgroundColor: "#009E60",
                      }}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        deleteLi(eachTodo.id);
                      }}
                      style={{
                        backgroundColor: "#811331",
                      }}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default TodoFirestore;
