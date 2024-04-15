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
  const [magnitudeType, setMagnitudeType] = useState<string[]>([]);
  const [magnitudeTypePaggin, setMagnitudeTypePaggin] = useState<string[]>([]);
  const [maxPageByMagType, setMaxPageByMagType] = useState(10);

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

  const reloadEarthquakeData = (
    data: IResponseEarthquakes,
    magType: string[]
  ) => {
    setFeatures(data.data);
    setPaginationFromApi(data.pagging);

    setMagnitudeType(magType);
  };

  const pagginateEarthquakeData = (data: IResponseEarthquakes) => {
    setFeatures(data.data);
    setPaginationFromApi(data.pagging);
  };

  useEffect(() => {
    setMagnitudeTypePaggin(magnitudeType);
  }, [magnitudeType]);

  useEffect(() => {
    setMaxPageByMagType(paginationFromApi.total_pages);
  }, [paginationFromApi]);

  return (
    <>
      <EarthquakeFilter loadEarthquakeData={reloadEarthquakeData} />

      <Row xs={1} md={2} lg={3} className="mb-4 g-4">
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

      <EarthquakePagination
        pagginateEarthquakeData={pagginateEarthquakeData}
        paginationFromApi={paginationFromApi}
        magType={magnitudeTypePaggin}
        maxPage={maxPageByMagType}
      />
    </>
  );
}

export default Earthquakes;
