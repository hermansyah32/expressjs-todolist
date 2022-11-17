import TokenManager from "../../Applications/security/TokenManager";
import AuthenticationError from "../../Commons/exceptions/AuthenticationError";

export default function authenticationRefresh(container){
    return async function (req, res, next){
        try {
            // authenticate incoming request;
            const access_token = req.headers.authorization?.split(' ')[1];
            const refresh_token = req.headers.refresh_token;

            if (!refresh_token || !access_token) throw new AuthenticationError()
            req.dataPayload = await container.getInstance(TokenManager.name).verifyRefreshToken(refresh_token);
            req.accessToken = access_token;
            req.refreshToken = refresh_token;
            next();
        } catch (error) {
            if (error.message.includes('token is invalid')){
                next(new AuthenticationError());
            }else{
                next(error);
            }
        }
    }
}