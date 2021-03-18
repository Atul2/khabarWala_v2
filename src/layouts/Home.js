import React, { Component, useContext, useState, useEffect } from "react";
import {
  Stepper,
  StepLabel,
  Step,
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";
import { FirstStep } from "../components/FirstStep";
import { SecondStep } from "../components/SecondStep";
import { multiStepContext } from "../StepContext";
import { RepeatRounded } from "@material-ui/icons";
import { db, fire } from "../helpers/db";
import Navigation from "../Navigation";
import axios from "axios";
import NewsContent from "../components/NewsContent";
import userEvent from "@testing-library/user-event";
import { withRouter, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ user, existuser, category, news, isAuthenticate }) => {

  const [auth, setAuth] = React.useState(true);
  const { currentStep, finalData, setSecondStep, secondStep, innerdata, userID, isData } = useContext(multiStepContext);
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadmore, setLoadmore] = useState(3);
  const [category1, setCategory1] = useState([]);
  const [news1, setNews1] = useState([]);
  const [existuser1, setExist1] = useState("");
  const history = useHistory();


  useEffect(() => {
    getUser();
    fetchApi();
    isAuthenticate.onAuthentication();
    // setNewsArray(a.getData);
    // setNewsResults(a.getData.length);


  }, [userID, category1]);

  const getUser = () => {
    if (userID) {
      db.collection("users_news_category").where("userId", "==", userID)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            setExist1(doc.data().userId);
            setCategory1(doc.data().category);
            setNews1(doc.data().newsitem);
          })
        })
    } else {
      console.log("kuch ni mila fir se dekh..le");
    }
  }

  console.log("category 1---", category1);

  console.log("News 1---", news1);

  console.log("exist user 1---", existuser1);

  //category ["business", "sports","health"]

  // news ["Hindustan Times", "The Indian Express", "NDTV News"]

  const fetchApi = async () => {
    const arr = [];
    const filterItem = [];

    const urls = category1.map((data) => {
      return fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${data}/in.json`).then(resp => resp.json());
    });

    const results = await Promise.all(urls);

    arr.push(...results);

    const articles = arr.map((data) => data.articles);

    const mergeData = filterItem.concat(...articles);

    const getData = mergeData.filter((item) => { return news1.includes(item.source.name) });

    if (getData.length > 1) {
      setNewsArray(getData);
      setNewsResults(getData.length);
    } else {
      console.log("home page no data in array ");
    }
  }

  console.log("news array--", newsArray);

  const handleClose = () => {
    fire
      .signOut()
      .then(() => {
        localStorage.removeItem("user");
        window.location.reload();
        Navigation.history.replace("/");
      })
      .catch(console.error);
  };

  var showComponent;



  if (userID === existuser1) {
    showComponent = <NewsContent
      setLoadmore={setLoadmore}
      loadmore={loadmore}
      newsArray={newsArray}
      newsResults={newsResults}
    />;
  } else {

    showComponent = <FirstStep />;

  }

  if (secondStep === 'secondStep') {
    showComponent = <SecondStep />;
  }
  if (secondStep === 'firstStep') {
    showComponent = <FirstStep />;
  }



  return (
    <>
      {auth && (
        <>
          <ToastContainer />
          <div style={{ flexGrow: 1 }}>
            <AppBar position="sticky">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  <b>KhabarWala</b>
                </Typography>
                <Button color="inherit" onClick={handleClose}>
                  <b>Logout</b>
                </Button>
              </Toolbar>
            </AppBar>
          </div>





          {showComponent}

        </>
      )}
    </>
  );
};

export default withRouter(Home);
