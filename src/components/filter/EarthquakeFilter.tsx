import React, { useEffect, useState } from "react";
import "./EarthquakeFilter.css";
import {
  IEarthquake,
  postComment,
  getFeatures,
} from "../api/earthquake-service";
import { Form } from "react-bootstrap";

function EarthquakeFilter() {
  const earthquakeMagnitudeType = [
    "ml",
    "md",
    "mb",
    "mww",
    "mwr",
    "mlr",
    "mw",
    "mb_lg",
    "mh",
  ];

  const [magnitudeType, setMagnitudeType] = useState<string[]>([]);

  const submitForm = async () => {
    await getFeatures({ page: 1, perPage: 10, mag_type: magnitudeType });
  };

  const addMagnitude = (e: unknown) => {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    const checkId = event.target.id;

    const checked = event.target.checked;
    if (checked) {
      setMagnitudeType((prevMagnitudeTypes) => [
        ...prevMagnitudeTypes,
        checkId,
      ]);
    } else {
      setMagnitudeType((prevMagnitudeTypes) =>
        prevMagnitudeTypes.filter((magnitude) => magnitude !== checkId)
      );
    }
  };

  useEffect(() => {
    submitForm();
  }, [magnitudeType]);

  return (
    <>
      <h3>Select the magnitude type of earthquakes</h3>
      <Form>
        <div key={`inline-checkbox`} className="mb-3">
          {earthquakeMagnitudeType.map((type) => (
            <Form.Check
              inline={true}
              label={type}
              name="group1"
              type="checkbox"
              id={type}
              key={type}
              onClick={(e) => addMagnitude(e)}
            />
          ))}
        </div>
      </Form>
    </>
  );
}

export default EarthquakeFilter;
