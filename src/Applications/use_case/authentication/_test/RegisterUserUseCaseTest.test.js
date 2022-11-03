import dayjs from "dayjs";
import AuthToken from "../../../../Domains/authentications/schemas/AuthToken";
import GeneratedToken from "../../../../Domains/authentications/schemas/GeneratedToken";
import TokenRepository from "../../../../Domains/authentications/TokenRepository";
import UserRepository from "../../../../Domains/users/UserRepository";
import TokenManager from "../../../security/TokenManager";
import RegisterUserUseCase from "../RegisterUserUseCase";
import RegisterUser from '../../../../Domains/users/schemas/RegisterUser';
import RegisteredUser from '../../../../Domains/users/schemas/RegisteredUser';

describe('RegisterUserUseCase', () => { 
    it('should orchestrating the get authentication action correctly', async () => {
        // Arrange
        const useCasePayload = {
            fullname: 'Hermansyah',
            username: 'me@hermansyah.dev',
            email: 'me@hermansyah.dev',
            password: 'password'
        };
        const registerPayload = new RegisterUser(useCasePayload);
        const registeredUser = new RegisteredUser(registerPayload);

        const expectedAuthentication = new AuthToken({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        })
        const expectedGeneratedToken = new GeneratedToken({
            token: expectedAuthentication.refreshToken,
            expired_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
        const mockUserRepository = new UserRepository();
        const mockTokenRepository = new TokenRepository();
        const mockTokenManger = new TokenManager();

        // Mocking
        mockUserRepository.store = jest.fn().mockImplementation(() => Promise.resolve(registeredUser));
        mockTokenManger.createAccessToken = jest.fn().mockImplementation(() => (
            Promise.resolve(expectedAuthentication.accessToken)
        ));
        mockTokenManger.createRefreshToken = jest.fn().mockImplementation(() => (
            Promise.resolve(expectedAuthentication.refreshToken)
        ));
        mockTokenRepository.store = jest.fn().mockImplementation(() => Promise.resolve(expectedGeneratedToken));

        // create use case instance 
        const authLoginUseCase = new RegisterUserUseCase({
            tokenManager: mockTokenManger,
            tokenRepository: mockTokenRepository,
            userRepository: mockUserRepository,
        })

        // Action 
        const actualRegisterUser = await authLoginUseCase.execute(useCasePayload);

        // Assert
        expect(actualRegisterUser).toEqual({user: registeredUser, token: expectedAuthentication});
        expect(mockUserRepository.store).toBeCalled();
        expect(mockTokenManger.createAccessToken).toBeCalledWith({username: useCasePayload.username});
        expect(mockTokenManger.createRefreshToken).toBeCalledWith({username: useCasePayload.username});
        expect(mockTokenRepository.store).toBeCalled();
    })
 })