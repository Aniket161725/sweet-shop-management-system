const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => mockAxios), // IMPORTANT FIX
};

export default mockAxios;
