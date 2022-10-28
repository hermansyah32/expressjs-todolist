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
    };
    const generatedToken = new GeneratedToken(payload);

    expect(generatedToken.token).toEqual(payload.token);
    expect(generatedToken.created_at).not.toBeUndefined();
    expect(generatedToken.updated_at).not.toBeUndefined();
  });
});
