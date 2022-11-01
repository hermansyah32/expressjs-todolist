import dayjs from 'dayjs';
import GeneratedToken from '../GeneratedToken';

describe('GeneratedToken', () => {
  it('should throw error when payload not contain needed property', () => {
    expect(() => new GeneratedToken({})).toThrowError(
      'SCHEMA_GENERATED_TOKEN.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      token: 'token',
      expired_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    const generatedToken = new GeneratedToken(payload);

    expect(generatedToken.token).toEqual(payload.token);
    expect(generatedToken.expired_at).toBeTruthy();
    expect(generatedToken.created_at).toBeTruthy();
    expect(generatedToken.updated_at).toBeTruthy();
  });
});
