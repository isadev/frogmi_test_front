import axios from "axios";

export const postComment = async (
  commentText: string,
  earthquakeId: number
) => {
  try {
    const params = {
      method: "POST",
      url: `http://localhost:3000/api/features/${earthquakeId}/comments`,
      data: {
        body: commentText,
      },
    };
    return await axios(params).then((res) => {
      console.log(res);
      return res.data.authorization;
    });
  } catch (error: any) {
    console.error(
      `Failed to post a comment in earthquakeId: ${earthquakeId}, with error: ${error}`
    );
    throw new Error(error.data.statusCode);
  }
};

interface IRequestComment {
  page: number;
  perPage: number;
  mag_type?: string | string[];
}

export interface IEarthquake {
  id: number;
  type: string;
  attributes: {
    external_url: string;
    external_id: string;
    magnitude: number;
    place: string;
    time: string;
    tsunami: boolean;
    mag_type: string;
    title: string;
    coordinates: {
      longitude: number;
      latitude: number;
    };
  };
}

export interface IPaging {
  total_pages: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_entries: number;
}

export interface IResponseEarthquakes {
  data: Array<IEarthquake>;
  pagging: IPaging;
}

export const getFeatures = async ({
  page,
  perPage,
  mag_type,
}: IRequestComment): Promise<IResponseEarthquakes> => {
  try {
    const params = {
      method: "GET",
      url: `http://localhost:3000/api/features`,
      params: { page, per_page: perPage, mag_type },
    };

    return axios(params).then((res) => {
      const { total_pages, current_page, next_page, prev_page, total_entries } =
        res.data;
      const pagging = {
        total_pages,
        current_page,
        next_page,
        prev_page,
        total_entries,
      };
      res.data.pagging = pagging;
      return res.data;
    });
  } catch (error) {
    throw new Error(`Failed to get list of earthquakes, with error: ${error}`);
  }
};
