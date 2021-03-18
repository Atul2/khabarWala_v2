import React, { useState, useContext, useEffect } from "react";

import {
  Button,
  TextField,
  Container,
  Card,
  Grid,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Box,
  Checkbox,
} from "@material-ui/core";
import { multiStepContext } from "../StepContext";
import { makeStyles } from "@material-ui/core/styles";
import { db, fire } from "../helpers/db";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
    height: "80vh",
    backgroundColor: theme.palette.grey[200],
    paddingTop: theme.spacing(5),
  },
  media: {
    height: "138px",
    width: "180px",
    paddingBottom: "12px",
  },
}));
export const FirstStep = (props) => {
  console.log("first step props me--", props);

  const { setStep, userData, setUserData, submitData, UpdateNews, docID, userID, setSecondStep, innerdata } = useContext(multiStepContext);
  console.log(useContext(multiStepContext));
  const classes = useStyles();
  const [newsitem, setNewsItem] = useState([]);
  const [innerData, setInnerData] = useState(!innerdata ? [] : innerdata)
  // const { toi, hindustantimes, indianExpress, ndtv } = userData;

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
    setNewsItem(newChecked);
    setUserData({ ...userData, newsitem: newChecked });

  };

  console.log(userID);

  useEffect(() => {


    if (innerData.newsitem) {
      setChecked(innerData.newsitem)
    } else {
      setChecked([])
    }

    console.log(innerdata);
    setInnerData(innerdata);
    // db.collection("users_news_category").where("userId", "==", userID).onSnapshot((snapshot) => {
    //   snapshot.docs.map((doc) => (

    //     setGetInner(doc.data())
    //   ))
    // });
  }, [innerdata]);
  console.log("first step me userData--", innerData.newsitem);
  return (
    <>
      {/* <div>
                <div>
                    <TextField label="first name" value={userData['firstname']} onChange={(e)=>setUserData({...userData, "firstname":e.target.value})} margin="normal" variant="outlined" color="secondary" />
                </div>
                <div>
                    <TextField label="last name"value={userData['lastname']} onChange={(e)=>setUserData({...userData, "lastname":e.target.value})} margin="normal" variant="outlined" color="secondary" />
                </div>
                <div>
                    <TextField label="Contact Number" value={userData['contact']} onChange={(e)=>setUserData({...userData, "contact":e.target.value})} margin="normal" variant="outlined" color="secondary" />
                </div>
                    <Button variant="contained" onClick={()=>setStep(2)} color="primary">Next</Button> 
            </div> */}
      <h2 align="center">Choose News here...</h2>
      <Container className={classes.root}>
        <Grid container align="center" spacing={3}>
          <Grid item sm={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={
                    process.env.PUBLIC_URL + "/news_images/TimesOfIndia1.png"
                  }
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    <Checkbox
                      checked={checked?.includes("The Times of India") ? true : false}
                      onChange={handleToggle("The Times of India")}
                      name="The Times of India"
                    />
                    The Times of India
                  </Typography>
                  {/* <Typography variant="subtitle1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item sm={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={
                    process.env.PUBLIC_URL + "/news_images/Hindustantimes.png"
                  }
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    <Checkbox
                      checked={checked?.includes("Hindustan Times") ? true : false}
                      onChange={handleToggle("Hindustan Times")}
                      name="Hindustan Times"
                    />
                    Hindustan Times
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item sm={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={
                    process.env.PUBLIC_URL + "/news_images/IndianExpress.jpg"
                  }
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    <Checkbox
                      checked={checked?.includes("The Indian Express") ? true : false}
                      onChange={handleToggle("The Indian Express")}
                      name="The Indian Express"
                    />
                    The Indian Express
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item sm={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={process.env.PUBLIC_URL + "/news_images/ndtv.jpg"}
                />
                <CardContent>
                  <Typography variant="subtitle1">
                    <Checkbox
                      checked={checked?.includes("NDTV News") ? true : false}
                      onChange={handleToggle("NDTV News")}
                      name="NDTV News"
                    />
                    NDTV News
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Box ml={2}>
            {
              docID === '' ?
                <Button
                  variant="contained"
                  onClick={() => setSecondStep('secondStep')}
                  color="primary"
                >
                  Next
            </Button> :

                <Button
                  variant="contained"
                  onClick={UpdateNews}
                  color="secondary"
                >
                  Update
            </Button>
            }


          </Box>
        </Grid>
      </Container>
    </>
  );
};
