import { PackageFactory } from './package.factory';

describe('PackageFactory', () => {
  it('should create an instance', () => {
    expect(new PackageFactory()).toBeTruthy();
  });
});
