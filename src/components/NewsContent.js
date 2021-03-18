import React from "react";
import { Container } from "@material-ui/core";
import NewsCard from "./NewsCard";
import "./NewsContent.css";
import { NavLink } from "react-router-dom";

const NewsContent = ({ newsArray, newsResults, loadmore, setLoadmore, setStep }) => {

    const selectedNews = {
        width: "95%",
        display: "flex",
        alignItems: "center",
        background: "#f44336",
        height: "48px",
        padding: "0 48px",
        margin: "20px 0 35px 0",
        color: "white",
        boxShadow: "0 2px 5px 0 rgba(0,0,0, 0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
    }

    const content = {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }


    return (
        <>
            <Container maxWidth="md">
                <div style={content}>
                    <div className="downloadMessage" style={selectedNews}>
                        <div className="container-fluid nav_bg">
                            <div className="row">
                                <div className="col-10 mx-auto">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                        <div className="container-fluid">

                                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                                    <button variant="contained" color="primary">
                                                        <li className="nav-item">
                                                            <NavLink className="nav-link" to="/selectNews">Edit News</NavLink>
                                                        </li>
                                                    </button>
                                                    {"   "}

                                                    <button variant="contained" color="primary">
                                                        <li className="nav-item">
                                                            <NavLink className="nav-link" to="/selectCategory">Edit Category</NavLink>
                                                        </li>
                                                    </button>

                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {newsArray.map((newsItem) => (
                        <NewsCard newsItem={newsItem} key={newsItem.title} />
                    ))}


                    {
                        loadmore <= newsResults && (
                            <>
                                <hr />
                                <button onClick={() => { setLoadmore(loadmore + 5) }} className="loadMore">
                                    Load More
                            </button>
                            </>
                        )
                    }


                </div>
            </Container>
        </>
    )
}

export default NewsContent;
