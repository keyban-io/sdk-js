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

test("init should call implementation dkg", async ({
  expect,
  appId,
  accessToken,
}) => {
  const signer = new TestSigner();
  vi.spyOn(signer, "dkg");

  await signer.init(appId, accessToken);

  expect(signer.dkg).toHaveBeenCalledWith(appId, accessToken);
});

describe("when server respond with an error", () => {
  beforeEach(({ server }) => {
    server.use(
      http.post(apiUrl("/client-shares/:appId").toString(), () => {
        return HttpResponse.json(
          { title: "Internal server error" },
          { status: 500 },
        );
      }),
    );
  });

  test.only("init should throw back the error", async ({
    expect,
    appId,
    accessToken,
  }) => {
    const signer = new TestSigner();

    await expect(signer.init(appId, accessToken)).rejects.toThrow();
  });
});

describe("when an encryption key is already stored", async () => {
  beforeEach(async ({ appId, accessToken }) => {
    await new TestSigner().init(appId, accessToken);
  });

  test("init should get encrypted client share from server", async ({
    expect,
    appId,
    accessToken,
  }) => {
    const signer = new TestSigner();
    vi.spyOn(signer, "dkg");

    await signer.init(appId, accessToken);

    expect(signer.dkg).not.toHaveBeenCalled();
  });

  test("init should create new share when server does not have it anymore", async ({
    expect,
    clientShares,
    appId,
    jwtSubject,
    accessToken,
  }) => {
    clientShares.delete([appId, jwtSubject].join(":"));

    const signer = new TestSigner();
    vi.spyOn(signer, "dkg");

    await signer.init(appId, accessToken);

    expect(signer.dkg).toHaveBeenCalledWith(appId, accessToken);
  });
});
