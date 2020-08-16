import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../requests";
import {
  Card,
  Typography,
  CardContent,
  CardHeader,
  Paper,
} from "@material-ui/core";

const Headlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [query, setQuery] = useState("in");
  const API_KEY = requests;

  useEffect(() => {
    const fetchHeadLines = async () => {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${query}&apiKey=${API_KEY}`
      );

      const data = await res;
      //   console.log(data.data.articles);
      setHeadlines(data.data.articles);
    };
    fetchHeadLines();
  });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginLeft: "20px",
      }}
    >
      {headlines.map((article) => (
        <div key={article.title}>
          <Card style={{ maxWidth: "300px", marginBottom: "50px" }}>
            <Paper>
              <CardHeader
                title={article.author}
                //   subheader={`${article.publsihedAt}`.toDateString()}
                // .toISOString()
                // .substring(0, 10)}
              ></CardHeader>
              <CardContent>
                <Typography
                  paragraph
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  align="left"
                >
                  {article.description}
                </Typography>
                <p>{article.title}</p>
              </CardContent>
              <a target="_blank" href={article.url} rel="noopener noreferrer">
                <img
                  src={article.urlToImage}
                  width="100%"
                  height="200"
                  alt={article.author}
                />
              </a>
            </Paper>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Headlines;
