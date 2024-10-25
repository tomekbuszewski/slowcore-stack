import "@testing-library/jest-dom";
import { nodeServer } from "@mocks/server";

beforeAll(() => nodeServer.listen());
afterEach(() => nodeServer.resetHandlers());
afterAll(() => nodeServer.close());
