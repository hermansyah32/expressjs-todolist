import { BodyResponse } from "../BodyResponse"

describe('BodyResponse', () => { 
    it('should running correctly', () =>{
        const authenticationMessage = 'Authentication is not valid';
        const bodyResponse = new BodyResponse().setAuthenticationError(authenticationMessage).build();
        expect(bodyResponse.body).toBeTruthy();
        expect(bodyResponse.body.message).toEqual(authenticationMessage);
        expect(bodyResponse.response.status).toEqual('BAD');
        expect(bodyResponse.response.code).toEqual(401);
    })
 })