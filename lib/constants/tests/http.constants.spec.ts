import {
  HTTP_MODULE_ID,
  HTTP_MODULE_OPTIONS,
  UNDICI_INSTANCE_TOKEN,
} from '../index';

describe('http.constants from index', () => {
  it('should be defined', () => {
    expect(UNDICI_INSTANCE_TOKEN).toBeDefined();
  });
  it('should be defined', () => {
    expect(HTTP_MODULE_ID).toBeDefined();
  });
  it('should be defined', () => {
    expect(HTTP_MODULE_OPTIONS).toBeDefined();
  });
});
