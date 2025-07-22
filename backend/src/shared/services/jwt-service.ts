import jwt, {JwtPayload} from "jsonwebtoken";

export class JwtService {
  private static accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "";
  private static refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? "";
  private static hashingAlgorithm = process.env.HASH_ALGO ?? "HS256";
  private static serviceIssuer = process.env.PROVIDER_NAME ?? "my_server";
  private static clientName = process.env.RECEIVER_NAME ?? "you";

  public static signAccessToken(email: string){
    return jwt.sign({
    }, this.accessTokenSecret , {
      header : {
        alg : this.hashingAlgorithm,
        typ : "access"
      },
      expiresIn : "1d",
      issuer: this.serviceIssuer,
      audience: this.clientName,
      subject: email
    });
  }

  public static signRefreshToken(email: string) {
    return jwt.sign({
    }, this.refreshTokenSecret , {
      header : {
        alg : this.hashingAlgorithm,
        typ : "refresh"
      },
      expiresIn : "30d",
      issuer: this.serviceIssuer,
      audience: this.clientName,
      subject: email
    });
  }

  public static verifyToken(token: string, tokenType : "access" | "refresh"){
    if (token.trim() === "")
      return undefined;
    try {
      const result = jwt.verify(
        token,
        tokenType === "access" ? this.accessTokenSecret : this.refreshTokenSecret,
        {
          issuer : this.serviceIssuer,
          audience : this.clientName,
          complete : true
        }
      );
      if (result.header.typ === tokenType)
        return result.payload as JwtPayload;
      else
        return undefined;
    }
    catch (error){
      return undefined;
    }

  }

}