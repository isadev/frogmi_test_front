import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

function EarthquakePagination(/* props: earthquakeProp */) {
  return (
    <>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {Array.from({ length: 5 }).map((_, idx) => (
          <Pagination.Item>{idx + 1}</Pagination.Item>
        ))}
        <Pagination.Ellipsis />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
}

export default EarthquakePagination;
