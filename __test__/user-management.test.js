import UserManagement from '../src/js/elements/user-management'

let testUserManager = new UserManagement('test');

describe('new', () => {
    test('it can be instantiated', () => {
        expect(testUserManager).toBeInstanceOf(UserManagement);
    })
});
