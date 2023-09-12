import { expect, test } from "bun:test";

const URL_API = process.env.URL_API;

test("API return 200 status", async () => {
  const response = await fetch(`${URL_API}`);
  expect(response.status).toBe(200);
});
