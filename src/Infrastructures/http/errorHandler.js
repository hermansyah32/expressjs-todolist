
import AuthenticationError from "../../Commons/exceptions/AuthenticationError";
import DatabaseError from "../../Commons/exceptions/DatabaseError";
import InvariantError from "../../Commons/exceptions/InvariantError";
import NotFoundError from "../../Commons/exceptions/NotFoundError";
import SessionError from "../../Commons/exceptions/SessionError";
import ValidationError from "../../Commons/exceptions/ValidationError";
import { BodyResponse } from "../../Commons/Response/BodyResponse";

// send response to user
export function response (err, req, res, next) {
    if (err){
        let responseJson = new BodyResponse().setResponseError('unexpected error');
        
        if (process.env.NODE_ENV === 'development'){
            console.log(err);
        }
        
        if (err instanceof AuthenticationError){
            responseJson = new BodyResponse().setAuthenticationError('authentication failed');
        }

        if (err instanceof NotFoundError){
            responseJson = new BodyResponse().setNotFoundError('your requested data is not found');
        }

        if (err instanceof ValidationError){
            responseJson = new BodyResponse().setValidationError('request is not valid', err.data);
        }

        if (err instanceof DatabaseError){
            responseJson = new BodyResponse().setResponseError('unexpected error', err.statusCode);
        }

        if (err instanceof InvariantError){
            responseJson = new BodyResponse().setResponseError('unexpected error', err.statusCode);
        }

        if (err instanceof SessionError){
            responseJson = new BodyResponse().setResponseError('unexpected error', err.statusCode);
        }

        res.status(responseJson.getCode());
        res.json(responseJson.build());
        res.end();
    }
}