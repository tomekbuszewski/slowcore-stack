import { getEnv } from "@env";
import { http, HttpResponse } from "msw";

import data from "../items";

export default [
  http.get(`${getEnv("VITE_API_URL")}/objects`, () => {
    return HttpResponse.json(data);
  }),

  http.post(`${getEnv("VITE_API_URL")}/objects`, async ({ request }) => {
    const post = await request.json();
    return HttpResponse.json([...data, post]);
  }),
];
