import React from 'react';

function Search(props) {
      return (
        <div className="search-bar row">
          <div className= "col-lg-6 col-xm-12 h3">
            <img src="nasa.jpg" alt="nasa" width="50px" height="40px"/>
            Meteorite Explorer</div>

          <div className="input-group mb-3 col-lg-6 col-xm-12">
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
