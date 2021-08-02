import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import SearchResult from "../../components/searchResult";
import Container from "@material-ui/core/Container";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../../services/apiCall";
export default function SearchContainer() {
  const query = new URLSearchParams(useLocation().search);
  const searchText = query.get("searchText");
  const [searchResultArray, searchResultArraySetter] = useState(null);
  const [searchResultText, searchResultTextSetter] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    searchResultArraySetter(null);
    if (searchText) {
      (async function () {
        let { data, success, message } = await apiCall(
          "GET",
          `search/${searchText}`
        );
        searchResultTextSetter(message);
        if (success) {
          searchResultArraySetter(data.searchResult);
        } else {
          searchResultArraySetter([]);
        }
      })();
    } else {
      navigate(
        localStorage.getItem("lastRoute")
          ? localStorage.getItem("lastRoute")
          : "/"
      );
    }
  }, [searchText]);

  return (
    <div className="main-container">
      <Navbar />
      <Container maxWidth="sm">
        {searchResultArray ? (
          <div>
            <h3>{searchResultText}</h3>
            {searchResultArray.map((userDetails) => {
              return <SearchResult userDetails={userDetails} />;
            })}
          </div>
        ) : (
          <h1>loading</h1>
        )}
      </Container>
    </div>
  );
}
