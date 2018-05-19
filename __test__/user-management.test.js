import UserManagement from '../src/js/elements/user-management';
import { className } from "../src/js/consts";

describe('new', () => {
    let testUserManager = new UserManagement('test');
    test('it can be instantiated', () => {
        expect(testUserManager).toBeInstanceOf(UserManagement);
    });

    test('it initializes member variables correctly', () => {
        expect(testUserManager.role).toBe('test');
        expect(testUserManager.searchImage).toBeNull();
        expect(testUserManager.searchInput).toBeNull();
        expect(testUserManager.emptySearchResults).toBeNull();
    });
});

describe('createSearchBox', () => {
    let testUserManager = new UserManagement('test');
    let searchBox = testUserManager.createSearchBox();

    test('when called, sets searchImage to a div', () => {
        expect(testUserManager.searchImage).toBeInstanceOf(HTMLDivElement)
    });

    test('when called, sets searchInput to an editable div', () => {
        let searchInput = testUserManager.searchInput;
        expect(searchInput).toBeInstanceOf(HTMLDivElement);
        expect(searchInput.className).toContain(className.TEXT);
        expect(searchInput.getAttribute('contenteditable')).toBe("true");
    });
});
