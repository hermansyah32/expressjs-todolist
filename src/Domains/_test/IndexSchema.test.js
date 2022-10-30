import IndexSchema from '../IndexSchema';

describe('IndexSchema', () => {
  it('should called correctly', () => {
    // Arrange
    const indexSchema = new IndexSchema();
    // Action and Assert
    expect(indexSchema.page).toEqual(1);
    expect(indexSchema.count).toEqual(15);
    expect(indexSchema.search).toEqual([]);
  });
});
