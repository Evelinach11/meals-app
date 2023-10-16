const mockExecuteSql = jest.fn();

const mockDatabase = {
  transaction: jest.fn(),
  executeSql: mockExecuteSql,
};

export const openDatabase = jest.fn(() => mockDatabase);

module.exports = { openDatabase };
