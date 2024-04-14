import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import {
  IPaging,
  IResponseEarthquakes,
  getFeatures,
} from "../../api/earthquake-service";

interface EarthquakePaginateFn {
  loadEarthquakeData: (data: IResponseEarthquakes) => void;
  paginationFromApi: IPaging;
}

function EarthquakePagination(props: EarthquakePaginateFn) {
  const [page, setPage] = useState(1);
  const [arrayPages, setArrayPages] = useState(1);

  const changeToPage = (pageNumber: number) => {
    console.log("change to another page in son: " + pageNumber);
    if (pageNumber > page) {
      setArrayPages(pageNumber);
    }
    if (pageNumber < arrayPages) {
      setArrayPages(arrayPages - 10);
    }
    setPage(pageNumber);
  };

  useEffect(() => {
    getFeatures({ page, perPage: 10 /* , mag_type: props.magType */ }).then(
      (data: IResponseEarthquakes) => {
        // setPaginationFromApi(data.pagging);
        props.loadEarthquakeData(data);
      }
    );
  }, [page]);

  return (
    <>
      <Pagination>
        <Pagination.First onClick={() => changeToPage(1)} />

        {props.paginationFromApi.prev_page ? (
          <Pagination.Prev
            onClick={() => changeToPage(props.paginationFromApi.prev_page!)}
          />
        ) : (
          ""
        )}

        {Array.from({ length: 10 }).map((_, index) => (
          <Pagination.Item onClick={() => changeToPage(arrayPages + index)}>
            {arrayPages + index}
          </Pagination.Item>
        ))}

        {props.paginationFromApi.next_page ? (
          <Pagination.Next
            onClick={() => changeToPage(props.paginationFromApi.next_page!)}
          />
        ) : (
          ""
        )}
        {props.paginationFromApi.current_page !==
        props.paginationFromApi.total_pages ? (
          <Pagination.Last
            onClick={() => changeToPage(props.paginationFromApi.total_pages)}
          />
        ) : (
          ""
        )}
      </Pagination>
    </>
  );
}

export default EarthquakePagination;
