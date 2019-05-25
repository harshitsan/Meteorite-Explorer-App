import React from 'react';

function TableRows(props){
  let data = props.data;
  // console.log(typeof data.year);
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.id}</td>
      <td>{data.nametype}</td>
      <td>{data.recclass}</td>
      <td>{data.mass}</td>
      <td>{data.fall}</td>
      <td>{data.year}</td>
      <td>{data.reclat}</td>
      <td>{data.reclong}</td>
    </tr>
  );
}
export default TableRows;
