const url = new URL(window.location.href);
export const APP_ID = url.searchParams.get("appId")!;
