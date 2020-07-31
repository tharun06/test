import React from "react";
// import ReactDOM from "react-dom";
import axios from 'axios';
import Select from "react-select";
// import countries from "./countries.json";
import "./App.css";
import "@tradeshift/tradeshift-ui";
import "@tradeshift/tradeshift-ui/ts.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 550,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 52;
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function App() {
  const classes = useStyles();
  const required = true;
  const [countryType, setCountryType] = React.useState([]);
  const [CountryResult, setCountryResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [modalValues, setModalValues] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const intervalRef = React.useRef(null);
  const apiresults = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "http://localhost:8006/results",
    })
        .then((response) => {
          setResults(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
  }, [])
  React.useEffect(() => {
    apiresults()
  }, [apiresults])

  const CountryApiResults = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "http://localhost:8006/countries",
    })
        .then((response) => {
          setCountryResults(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
  }, [])
  React.useEffect(() => {
    CountryApiResults()
  }, [CountryApiResults])

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCountryChange = (e) => {
    setCountryType(e.value);
  };

  const handleOpen = (e) => {
    setModalValues(e);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Company Information</h2>
      <div id="simple-modal-description">
        {modalValues && modalValues.name}<br />
        Company Status: <p style={{ color: modalValues && modalValues.status === 'ACTIVE' ? 'green' : 'red'}}>{modalValues && modalValues.status}</p>
        COMPANY REGISTRATION NUMBER <br />
        {modalValues && modalValues.registrationNumber} <br /> <br />
        VAT NUMBER <br />
        {modalValues && modalValues.vatNumber} <br /> <br />
        REGISTERED ADDRESS <br />
        {modalValues && modalValues.address} <br /> <br />
        COUNTRY <br />
        {modalValues && modalValues.country} <br /> <br />
        ADDITIONAL STATUS DETAILS <br />
        {modalValues && modalValues.additionalStatusDetails} <br /> <br />
        COMPANY DESCRIPTION <br />
        {modalValues && modalValues.description} <br /> <br />
      </div>
    </div>
  );

  React.useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
    }
    if (searchTerm) {
      setIsSearching(true);
      intervalRef.current = setTimeout(() => {
        setIsSearching(false);
        const filteredResults = results.filter(
          (option) =>
            option.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
        const filteredResultsByCountry = countryType
          ? filteredResults.filter(
              (option) =>
                option.country
                  .toLowerCase()
                  .indexOf(countryType.toLowerCase()) > -1
            )
          : filteredResults;
        setSearchResults(filteredResultsByCountry);
      }, 1000);
    } else {
      setSearchResults([]);
      clearTimeout(intervalRef.current);
    }
    return () => clearTimeout(intervalRef.current);
  }, [searchTerm]);

  return (
    <div style={{ position: "absolute", right: "200px" }}>
      <h2>TradeShift Global Search</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua>
      </p>
      <div style={{ width: "200px" }}>
        <>
          <Select
            options={CountryResult}
            required={ required}
            placeholder="Please select"
            onChange={handleCountryChange}
          />
          { (
            <input
              tabIndex={-1}
              autoComplete="off"
              style={{ opacity: 0, height: 0 }}
              required={required}
            />
          )}
        </>
        <br />
        <br />
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleChange}
          style={{ width: "500px" }}
        />
      </div>
      <div>
        {isSearching && <div>Searching ...</div>}
        <br/>{searchResults.length > 0 && (
          <div>Search Results for "{searchTerm}" </div>
        )}
        {!isSearching && searchTerm && searchResults.length === 0 && (
          <div> No Search Results for "{searchTerm}" </div>
        )}{" "}
        <br />
        {searchResults.map((item) => (
          <>
            <div onClick={() => handleOpen(item)} key={item.id}>
              {item.name} <br />
              {item.address} <br />
              <br />
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
