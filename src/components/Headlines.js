import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../requests";
import moment from "moment";
import { Card, Typography, CardContent, CardHeader } from "@material-ui/core";

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
      console.log(data.data.articles);
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
      }}
    >
      {headlines.map((article) => (
        <div key={article.title}>
          <Card style={{ maxWidth: "300px", marginBottom: "50px" }}>
            <CardHeader
              title={article.author}
              subheader={moment(`${article.publsihedAt}`).format("YYYY-MM-DD")}
              // .toISOString()
              // .substring(0, 10)}
            ></CardHeader>
            <CardContent>
              <Typography
                paragraph
                variant="body2"
                color="textSecondary"
                component="p"
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
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Headlines;
