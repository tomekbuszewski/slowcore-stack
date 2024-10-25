import { handlers } from "@mocks/handlers";
import { setupServer } from "msw/node";

export const nodeServer = setupServer(...handlers);
