import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import {
  IPaging,
  IResponseEarthquakes,
  getFeatures,
} from "../../api/earthquake-service";

interface EarthquakePaginateFn {
  pagginateEarthquakeData: (data: IResponseEarthquakes) => void;
  paginationFromApi: IPaging;
  magType: string[];
  maxPage: number;
}

function EarthquakePagination(props: EarthquakePaginateFn) {
  const [page, setPage] = useState(1);
  const [arrayPages, setArrayPages] = useState(1); // control the start number of the list pages

  const changeToPage = (pageNumber: number) => {
    if (pageNumber === 1) {
      setArrayPages(1);
    }

    if (pageNumber >= 10 && pageNumber % 10 === 0) {
      setArrayPages(pageNumber + 1);
    }

    if (pageNumber > 1 && pageNumber < page) {
      setArrayPages(arrayPages - props.maxPage < 0 ? 1 : page - props.maxPage);
    }

    if (pageNumber === props.paginationFromApi.total_pages) {
      setArrayPages(props.paginationFromApi.total_pages - props.maxPage);
    }

    setPage(pageNumber);
  };

  useEffect(() => {
    getFeatures({ page, perPage: 10, mag_type: props.magType }).then(
      (data: IResponseEarthquakes) => {
        props.pagginateEarthquakeData(data);
      }
    );
  }, [page]);

  return (
    <>
      <Pagination>
        {props.paginationFromApi.prev_page ? (
          <Pagination.First onClick={() => changeToPage(1)} />
        ) : (
          ""
        )}

        {props.paginationFromApi.prev_page ? (
          <Pagination.Prev onClick={() => changeToPage(page - 1)} />
        ) : (
          ""
        )}

        {Array.from({
          length: props.maxPage > 10 ? 10 : props.maxPage,
        }).map((_, index) => (
          <Pagination.Item
            key={index}
            onClick={() => changeToPage(arrayPages + index)}
          >
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
