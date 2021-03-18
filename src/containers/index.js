import React, { useState, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from '../components/login';
import { withRouter } from "react-router-dom";
import Home from '../layouts/Home';
import { db, fire } from "../helpers/db";
import { multiStepContext } from "../StepContext";


const SignInOutContainer = (props) => {
  console.log("signIn-->", props.authentiCation)
  const [value, setValue] = useState(0);
  const [user, setUser] = useState('');
  const [category, setCategory] = useState([]);
  const [existuser, setExistUser] = useState('');
  const [news, setNews] = useState([]);
  const { innerdata } = useContext(multiStepContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  useEffect(() => {
    userState();
    fetchCategory();
  }, [])

  const userState = () => {
    const data = localStorage.getItem('user');
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  }

  console.log("index me user---", user);
  console.log("index inner data --->", innerdata);

  const fetchCategory = () => {
    if (user) {
      db.collection("users_news_category").where("userId", "==", user.userId).onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => (
          console.log("index me user ka data--", doc.data()),
          setNews(doc.data().newsitem),
          setExistUser(doc.data().userId),
          setCategory(doc.data().category))
        )
      });
      // await fetchApi(category)
    }
  }


  // const fetchApi = () => {
  //   fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${ category }/in.json`)
  //     .then((result) => {
  //       result.json().then((resp) => {

  //         setNewsArray(resp.articles)
  //         setNewsResults(resp.totalResults)
  //         //console.warn("result------>", resp.articles)
  //        // console.log("total_result-->", resp.totalResults)
  //       })
  //   })
  // }



  console.log("index me category", category);

  return (
    <>
      {user !== null ? (
        <>
          <Home
            isAuthenticate={props.authentiCation}
            isData={innerdata}
            news={news}
            user={user}
            existuser={existuser}
            category={category}

            fetchCategory={fetchCategory}
            setUserState={() => setUser(null)}
          />
        </>) : (
        <>
          <Paper square>

            <TabPanel value={value} index={0}>
              <Login loggedIn={(user) => setUser(user)} auth={props.authentiCation} visit="/Signup" />
            </TabPanel>
          </Paper>
        </>
      )}

    </>
  )
}

export default withRouter(SignInOutContainer);