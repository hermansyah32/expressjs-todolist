import dayjs from "dayjs";
import AuthToken from "../../../Domains/authentications/schemas/AuthToken";
import GeneratedToken from "../../../Domains/authentications/schemas/GeneratedToken";
import TokenRepository from "../../../Domains/authentications/TokenRepository";
import PasswordUser from "../../../Domains/users/schemas/PasswordUser";
import UserRepository from "../../../Domains/users/UserRepository";
import PasswordHash from "../../security/PasswordHash";
import TokenManager from "../../security/TokenManager";
import AuthLoginUseCase from "../AuthLoginUseCase";


describe('AuthLoginUseCase', () => { 
    it('should orchestrating the get authentication action correctly', async () => {
        // Arrange
        const useCasePayload = {
            username: 'me@hermansyah.dev',
            password: 'password'
        };
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
        const mockPasswordHash = new PasswordHash();

        // Mocking
        mockUserRepository.getPasswordBy = jest.fn().mockImplementation(() => (
            Promise.resolve(new PasswordUser({
                id: 'id',
                password: 'hashed_password'
            }))
        ));
        mockPasswordHash.compare = jest.fn().mockImplementation(() => Promise.resolve(true));
        mockTokenManger.createAccessToken = jest.fn().mockImplementation(() => (
            Promise.resolve(expectedAuthentication.accessToken)
        ));
        mockTokenManger.createRefreshToken = jest.fn().mockImplementation(() => (
            Promise.resolve(expectedAuthentication.refreshToken)
        ));
        mockTokenRepository.store = jest.fn().mockImplementation(() => Promise.resolve(expectedGeneratedToken));

        // create use case instance 
        const authLoginUseCase = new AuthLoginUseCase({
            tokenManager: mockTokenManger,
            tokenRepository: mockTokenRepository,
            userRepository: mockUserRepository,
            passwordHash: mockPasswordHash
        })

        // Action 
        const actualAuthentication = await authLoginUseCase.execute(useCasePayload);

        // Assert
        expect(actualAuthentication).toEqual(expectedAuthentication);
        expect(mockUserRepository.getPasswordBy).toBeCalledWith('username', useCasePayload.username);
        expect(mockPasswordHash.compare).toBeCalledWith(useCasePayload.password, 'hashed_password');
        expect(mockTokenManger.createAccessToken).toBeCalledWith({username: useCasePayload.username});
        expect(mockTokenManger.createRefreshToken).toBeCalledWith({username: useCasePayload.username});
        expect(mockTokenRepository.store).toBeCalledTimes(1)
    })
 })