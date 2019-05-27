import React from 'react';
function Pagination(props){
  return(
    <ul className="pagination justify-content-center">
        <button
          onClick = {()=>{props.changePage(-1)}}
          disabled = {props.page===1}
          className="btn btn-outline-dark"
          >Previous</button>
        <button
          onClick={()=>{props.changePage(1)}}
          disabled = {props.page===props.maxPage}
          className="btn btn-outline-dark"
          >Next</button>
    </ul>
  );
}
export default Pagination;
