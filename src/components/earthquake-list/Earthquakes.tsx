import React, { useState, useEffect } from "react";
import "./Earthquakes.css";
import EarthquakeComment from "./earthquake-comment/EarthquakeComment";
import { Row, Col } from "react-bootstrap";
import { IEarthquake, IPaging, getFeatures } from "../api/user";

function Earthquakes() {
  console.log("asd");
  const [features, setFeatures] = useState<IEarthquake[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<IPaging>({
    total_pages: 0,
    current_page: 1,
    next_page: null,
    prev_page: null,
    total_entries: 0,
  });

  useEffect(() => {
    console.log("cuantas veces");

    const fetchData = async () => {
      try {
        const response = await getFeatures({ page: 1, perPage: 10 });
        setFeatures(response.data);
        setPagination(response.pagging);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getFeatures({ page, perPage: 10 }).then((res) => {
      setFeatures(res.data);
      setPagination(res.pagging);
    });
  }, [page]);

  return (
    <>
      <div className="earthquakes">
        <Row
          className="mx-0 earthquakes__head"
          style={{ alignItems: "center" }}
        >
          <Col style={{ textAlign: "center" }}>place</Col>
          <Col style={{ textAlign: "center" }}>title</Col>
          <Col style={{ textAlign: "center" }}>time</Col>
          <Col style={{ textAlign: "center" }}>magnitude</Col>
          <Col className="d-none d-lg-block" style={{ textAlign: "center" }}>
            leave a comment
          </Col>
        </Row>
        {features.map((feature, index) => {
          return (
            <Row
              className="mx-0 earthquakes__body"
              style={{ alignItems: "center" }}
              key={index}
            >
              <Col>
                {" "}
                <span>place</span> {feature.attributes.place}
              </Col>
              <Col>
                {" "}
                <span>title</span> {feature.attributes.title}
              </Col>
              <Col>
                {" "}
                <span>time</span> {feature.attributes.time}
              </Col>
              <Col>
                {" "}
                <span>magnitude</span> {feature.attributes.magnitude}
              </Col>
              <Col>
                <EarthquakeComment
                  earthquakeId={`${feature.id}`}
                  key={feature.id}
                />
              </Col>
            </Row>
          );
        })}
      </div>
    </>
  );
}

export default Earthquakes;
