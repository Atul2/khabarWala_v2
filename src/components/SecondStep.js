import React, { useContext, useState, useEffect } from "react";
import { Button, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import { multiStepContext } from "../StepContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const SecondStep = () => {
  const { setStep, userData, setUserData, submitData, innerdata, docID, UpdateCategory, setSecondStep } = useContext(
    multiStepContext
  );
  const [innerData, setInnerData] = useState(!innerdata ? [] : innerdata);
  // const { userData , setUser } = useState ()
  const boxStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  };
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setUserData({ ...userData, category: newChecked });
    console.log("value from list", newChecked);
  };

  useEffect(() => {
    if (innerData.category) {
      setChecked(innerData.category)
    }

    setInnerData(innerdata);
  }, [innerdata]);

  console.log("second wale me category--", innerData.category)
  return (
    <>
      <h2 align="center">Choose News Category here...</h2>
      <div align="center">
        {/* <div>
          <TextField
            label="Address"
            value={userData["address"]}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
            margin="normal"
            variant="outlined"
            color="secondary"
          />
        </div> */}

        <List className={classes.root}>
          {["health", "sports", "entertainment", "business"].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked?.includes(value) ? true : false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItem>
            );
          })}
        </List>
        <Box m={2} p={2} style={boxStyle}>
          {docID ? null : <Button
            variant="contained"
            onClick={() => setSecondStep('firstStep')}
            color="secondary"
          >
            Back
          </Button>
          }

          {
            docID === '' ?

              <Button
                variant="contained"
                onClick={submitData}
                color="primary"
              >Submit</Button>

              :
              <button variant="contained"
                onClick={UpdateCategory}
                color="Secondary" >
                Update
              </button>

          }
        </Box>
      </div>
    </>
  );
};
