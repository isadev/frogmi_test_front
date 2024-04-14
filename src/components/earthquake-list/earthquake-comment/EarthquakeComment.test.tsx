import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { postComment } from "../../api/user";

jest.mock("../../api/user");
import EarthquakeComment from "./EarthquakeComment";

jest.mock("axios");

describe("EarthquakeComment component", () => {
  test("submits a new earthquake comment", async () => {
    const mockedResponse = { data: { body: "un comentario" } };
    const earthquakeMock = {
      id: 1,
      type: "Feature",
      attributes: {
        external_url: "string",
        external_id: "string",
        magnitude: 0,
        place: "string",
        time: "string",
        tsunami: false,
        mag_type: "string",
        title: "string",
        coordinates: {
          longitude: 10,
          latitude: 1.0,
        },
      },
    };
    const postEarthquakeCommentMock = postComment as jest.Mock;
    postEarthquakeCommentMock.mockResolvedValue(mockedResponse.data.body);

    const { getByText, getByRole } = render(
      <EarthquakeComment earthquake={earthquakeMock} />
    );

    // TODO: agregar test de api post comment
    // const saveCommentButton = getByText("Enviar");
    // fireEvent.click(saveCommentButton);

    const commentTextArea = getByRole("textbox", {
      name: /userComments/i,
    }) as HTMLTextAreaElement;
    fireEvent.change(commentTextArea, {
      target: { value: mockedResponse.data.body },
    });

    await waitFor(() => {
      // TODO: Property 'value' does not exist on type 'HTMLElement'.
      expect(commentTextArea.value).toBe(mockedResponse.data.body);
    });
  });
});
