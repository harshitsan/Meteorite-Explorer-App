import React from 'react';
function Search(props) {
      return (
        <div>
          <div className="input-group mb-3">
            <input
              type  = "text"
              name  = "search-bar"
              value = {props.query}
              onChange = {props.handleQuery}
              className="form-control"
              placeholder="Enter Meteorite"
             />
           <div className="input-group-append">
            <button onClick={props.searchData}
              className = "btn btn-outline-secondary"
              >
            Search</button>
            </div>
          </div>
        </div>
      );
  }
export default Search;
