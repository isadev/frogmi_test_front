import React, { useState, useEffect } from "react";
import "./Earthquakes.css";
import EarthquakeComment from "./earthquake-comment/EarthquakeComment";
import { Row, Col, Card } from "react-bootstrap";
import {
  IEarthquake,
  IPaging,
  IResponseEarthquakes,
  getFeatures,
} from "../api/earthquake-service";
import EarthquakeFilter from "../filter/EarthquakeFilter";
import EarthquakePagination from "./earthquake-pagination/EarthquakePagination";

function Earthquakes() {
  const [features, setFeatures] = useState<IEarthquake[]>([]);
  const [paginationFromApi, setPaginationFromApi] = useState<IPaging>({
    total_pages: 0,
    current_page: 0,
    next_page: null,
    prev_page: null,
    total_entries: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeatures({ page: 1, perPage: 10 });
        setFeatures(response.data);
        setPaginationFromApi(response.pagging);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("cambiamos ac");
    /* setPaginationFromApi({
      total_pages: 0,
      current_page: 1,
      next_page: null,
      prev_page: null,
      total_entries: 0,
    }); */
  }, [paginationFromApi]);

  const reloadEarthquakeData = (data: IResponseEarthquakes) => {
    setFeatures(data.data);
    setPaginationFromApi(data.pagging);
  };

  const moveToAnotherPage = (pageNumber: number) => {
    console.log("en el padre" + pageNumber);
  };

  return (
    <>
      <EarthquakeFilter loadEarthquakeData={reloadEarthquakeData} />

      <Row xs={1} md={2} lg={3} className="g-4">
        {features.map((feature, idx) => (
          <Col key={idx}>
            <Card style={{ width: "18rem", height: "14rem" }}>
              <Card.Header>
                Magnitude: {feature.attributes.magnitude}
              </Card.Header>
              <Card.Body style={{ position: "relative" }}>
                <Card.Title>Location: {feature.attributes.place}</Card.Title>
                <Card.Text>#comments</Card.Text>
                <EarthquakeComment earthquake={feature} key={feature.id} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* {paginationFromApi ? ( */}
      <EarthquakePagination
        loadEarthquakeData={reloadEarthquakeData}
        paginationFromApi={paginationFromApi}
        // totalPages={paginationFromApi?.total_pages}
        // currentPage={paginationFromApi?.current_page}
        // nextPage={paginationFromApi?.next_page}
        // prevPage={paginationFromApi?.prev_page}
        // totalEntries={paginationFromApi?.total_entries}
        // currentPage={paginationFromApi.total_pages}
      />
      {/* ) : (
        ""
      )} */}
    </>
  );
}

export default Earthquakes;
