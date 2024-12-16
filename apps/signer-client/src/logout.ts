const url = new URL(window.location.href);
const redirect = url.searchParams.get("redirect");
if (redirect) window.location.href = redirect;
