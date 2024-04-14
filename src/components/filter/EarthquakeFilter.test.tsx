import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { getFeatures } from "../api/earthquake-service";
import EarthquakeComment from "./EarthquakeFilter";

jest.mock("axios");

describe("EarthquakeComment component", () => {});
