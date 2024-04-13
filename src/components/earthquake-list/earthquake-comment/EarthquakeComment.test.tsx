import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { postComment } from "../../api/user";

jest.mock("../../api/user");
import EarthquakeComment from "./EarthquakeComment";

jest.mock("axios");

describe("EarthquakeComment component", () => {
  test("submits a new earthquake comment", async () => {
    const mockedResponse = { data: { body: "un comentario" } };
    const postEarthquakeCommentMock = postComment as jest.Mock;
    postEarthquakeCommentMock.mockResolvedValue(mockedResponse.data.body);

    const { getByText, getByRole } = render(
      <EarthquakeComment earthquakeId="1" />
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
