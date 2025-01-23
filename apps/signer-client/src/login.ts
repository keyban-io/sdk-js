for (let i = 0; i < window.opener.frames.length; i++) {
  try {
    const frame = window.opener.frames[i];
    const frameUrl = new URL(frame.location.href);
    if (frameUrl.origin !== window.location.origin) continue;

    frame.postMessage(
      { __KEYBAN_AUTH: true, url: window.location.href },
      window.location.origin,
    );

    window.close();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    continue;
  }
}
