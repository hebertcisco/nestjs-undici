import {
  HTTP_MODULE_ID,
  HTTP_MODULE_OPTIONS,
  UNDICI_INSTANCE_TOKEN,
} from '../index';

describe('http.constants from index', () => {
  it('should UNDICI_INSTANCE_TOKEN be defined', () => {
    expect(UNDICI_INSTANCE_TOKEN).toBeDefined();
  });
  it('should HTTP_MODULE_ID be defined', () => {
    expect(HTTP_MODULE_ID).toBeDefined();
  });
  it('should HTTP_MODULE_OPTIONS be defined', () => {
    expect(HTTP_MODULE_OPTIONS).toBeDefined();
  });
});
