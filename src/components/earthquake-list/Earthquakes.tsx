import React, { useState, useEffect } from "react";
import "./Earthquakes.css";
import EarthquakeComment from "./earthquake-comment/EarthquakeComment";
import { Row, Col, Card } from "react-bootstrap";

import { IEarthquake, IPaging, getFeatures } from "../api/user";

function Earthquakes() {
  const [features, setFeatures] = useState<IEarthquake[]>([]);
  const [page, setPage] = useState(1);
  const [paginationFromApi, setPaginationFromApi] = useState<IPaging>({
    total_pages: 0,
    current_page: 1,
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
    getFeatures({ page, perPage: 10 }).then((res) => {
      setFeatures(res.data);
      setPaginationFromApi(res.pagging);
    });
  }, [page]);

  return (
    <>
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
    </>
  );
}

export default Earthquakes;
