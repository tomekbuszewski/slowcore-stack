import { getEnv } from "@env";
import { http, HttpResponse } from "msw";

import data from "../items";

export default [
  http.get(`${getEnv("VITE_API_URL")}/random/10`, () =>
    HttpResponse.json(data),
  ),
];
