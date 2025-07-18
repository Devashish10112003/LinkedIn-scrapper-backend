export async function extractLinkedInId(url:string) {

  try {
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

    if (pathParts[0] === 'in' && pathParts.length >= 2) {
      return { type: 'profile', id: pathParts[1] };
    } else if (pathParts[0] === 'company' && pathParts.length >= 2) {
      return { type: 'company', id: pathParts[1] };
    } else {
      return { type: 'unknown', id: null };
    }
  } catch (err) {
    return { type: 'invalid', id: null };
  }
}
