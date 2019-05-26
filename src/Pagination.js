import React from 'react';
function Pagination(props){
  return(
    <ul className="pagination justify-content-center">
        <button
          onClick = {()=>{props.changePage(-1)}}
          disabled = {props.page===1}
          >Previous</button>
        <button
          onClick={()=>{props.changePage(1)}}
          disabled = {props.page===props.maxPage}
          >Next</button>
    </ul>
  );
}
export default Pagination;
