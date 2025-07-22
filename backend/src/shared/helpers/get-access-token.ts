export const getAccessToken = (authorization : string | undefined) => {
  if (authorization === undefined)
    return "";

  const accessTokenHeader = authorization.match(/^Bearer (\S*\.\S*\.\S*)$/);

  if (accessTokenHeader === null)
    return "";

  const accessToken = authorization.match(/(\S*\.\S*\.\S*)$/);
  if (accessToken === null)
    return "";

  return accessToken[0];
}