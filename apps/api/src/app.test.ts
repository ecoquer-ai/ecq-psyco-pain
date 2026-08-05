import { describe, expect, it } from "vitest";
import { buildApp } from "./app";

describe("Neuropi API", () => {
  it("GET /health returns ok", async () => {
    const app = await buildApp();
    const res = await app.inject({ method: "GET", url: "/health" });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.status).toBe("ok");
    expect(body.brand).toBe("Neuropi");
    await app.close();
  });

  it("GET /me/dashboard accepts Bearer demo in memory mode", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/me/dashboard",
      headers: { authorization: "Bearer demo" },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.user.isDemo).toBe(true);
    expect(body.mockFriendly).toBe(true);
    await app.close();
  });
});
