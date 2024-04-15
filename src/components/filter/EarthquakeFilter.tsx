import React, { useEffect, useState } from "react";
import "./EarthquakeFilter.css";
import { getFeatures, IResponseEarthquakes } from "../api/earthquake-service";
import { Form } from "react-bootstrap";

interface LoadEarthquakeDataFn {
  loadEarthquakeData: (data: IResponseEarthquakes, magType: string[]) => void;
}

function EarthquakeFilter(props: LoadEarthquakeDataFn) {
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
    getFeatures({ page: 1, perPage: 10, mag_type: magnitudeType }).then(
      (data: IResponseEarthquakes) => {
        props.loadEarthquakeData(data, magnitudeType);
      }
    );
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
