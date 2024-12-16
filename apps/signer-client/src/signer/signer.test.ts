import { http, HttpResponse } from "msw";
import { describe, vi } from "vitest";

import { AbstractKeybanSigner } from "~/signer/signer";
import { apiUrl } from "~/utils/api";
import { beforeEach, test } from "~/vitest.fixtures";

class TestSigner extends AbstractKeybanSigner {
  async dkg() {
    return "CLIENT_SHARE";
  }
}

let auth: { getToken(): Promise<string> };
let signer: AbstractKeybanSigner;
beforeEach(({ accessToken }) => {
  auth = { getToken: vi.fn().mockResolvedValue(accessToken) };
  signer = new TestSigner(auth);
});

test("init should call implementation dkg", async ({
  expect,
  clientShareKey,
}) => {
  vi.spyOn(signer, "dkg");

  await signer.init(clientShareKey);

  expect(signer.dkg).toHaveBeenCalledWith();
});

describe("when server respond with an error", () => {
  beforeEach(({ server }) => {
    server.use(
      http.post(apiUrl("/client-share").toString(), () =>
        HttpResponse.json({ title: "Internal server error" }, { status: 500 }),
      ),
    );
  });

  test("init should throw back the error", async ({
    expect,
    clientShareKey,
  }) => {
    await expect(signer.init(clientShareKey)).rejects.toThrow();
  });
});

describe("when an encryption key is already stored", async () => {
  beforeEach(async ({ clientShareKey }) => {
    await signer.init(clientShareKey);
  });

  test("init should get encrypted client share from server", async ({
    expect,
    clientShareKey,
  }) => {
    vi.spyOn(signer, "dkg");

    await signer.init(clientShareKey);

    expect(signer.dkg).not.toHaveBeenCalled();
  });

  test("init should create new share when server does not have it anymore", async ({
    expect,
    clientShares,
    clientShareKey,
    jwtSubject,
  }) => {
    clientShares.delete(jwtSubject);

    vi.spyOn(signer, "dkg");

    await signer.init(clientShareKey);

    expect(signer.dkg).toHaveBeenCalledWith();
  });
});
