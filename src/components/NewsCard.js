import React,{useEffect} from 'react';
import "./NewsCard.css";

const NewsCard = ({ newsItem }) => {
    const fullDate = new Date(newsItem.publishedAt);
    var date = fullDate.toString().split(" ");
    const hour = parseInt(date[4].substring(0, 2));
    const time = hour > 12 ? true : false;

    const newsCard = {
        display: "flex",
        width: "100%",
        boxShadow:"0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
        padding: "10px",
        marginBottom: "25px",
        borderRadius: "5px"
    }

    const newsText = {
        padding: "0 0 0 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }

    const author = {
        fontSize: "12px",
        fontWeight: 300,
        lineHeight: "22px",
        color: "#808290"
    }

    const lowerNewsText = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        padding: "10px 0"
    }
      
    const readmore = { fontSize: "12px", fontWeight: 400, paddingTop: "10px" }
    const newsImage = { objectFit: "cover", width: "320px", height: "268px" }
    const title = {
        fontSize: "22px",
        lineHeight: "27px",
        fontFamily: '"Roboto", sans-serif'
    }
    const muted = { fontWeight: 100 }
    const description = { fontSize: "16px", lineHeight: "22px", color: "#44444d" }
    return (
        <div className="newsCard" style={newsCard}>
            <img className="newsImage" style={newsImage}
                alt={newsItem.title}
                src={newsItem.urlToImage
                    ? newsItem.urlToImage
                    : "https://i2.wp.com/vibrant-technik.com/wp-content/uploads/2018/01/placeholder-image.png?ssl=1"}
            />
            <div style={newsText}>
                <div>
                    <span style={title}>{newsItem.title}</span>{" "}
                    <span style={author}>
                        <a href={newsItem.url} target="_blank">
                            <b>published</b>
                        </a>{" "}
                        <span style={muted}>
                            by {newsItem.author ? newsItem.author : "unknown"}/{" "}
                            {
                                time
                                ? `${hour - 12}:${date[4].substring(3, 5)} pm`
                                : `${hour}:${date[4].substring(3, 5)} am`
                            }{" "}
                            on {date[2]} {date[1]} {date[3]}, {date[0]}
                        </span>
                    </span>
                </div>
                <div style={lowerNewsText}>
                    <div style={description}>
                        {newsItem.description}
                    </div>
                    <span style={readmore}>
                        Read more at{" "}
                        <a href={newsItem.url} target="_blank">
                            <b>{newsItem.source.name}</b>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;
