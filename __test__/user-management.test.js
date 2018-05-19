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
        let searchImage = testUserManager.searchImage;
        expect(searchImage).toBeInstanceOf(HTMLDivElement);
        expect(searchImage.className).toBe(className.SEARCH_IMG);
    });

    test('when called, sets searchInput to an editable div', () => {
        let searchInput = testUserManager.searchInput;
        expect(searchInput).toBeInstanceOf(HTMLDivElement);
        expect(searchInput.className).toContain(className.TEXT);
        expect(searchInput.className).toContain(className.SEARCH_INPUT);
        expect(searchInput.getAttribute('contenteditable')).toBe("true");
    });

    test('returns a list element', () => {
        expect(searchBox).toBeInstanceOf(HTMLLIElement)
    });

    test('the searchBox has the appropriate children nodes', () => {
        let searchContainer = searchBox.childNodes[0];
        expect(searchContainer.className).toBe(className.SEARCH);
        expect(searchContainer.childNodes[0].className).toBe(className.SEARCH_IMG);
        expect(searchContainer.childNodes[1].className).toContain(className.TEXT);
        expect(searchContainer.childNodes[1].className).toContain(className.SEARCH_INPUT);
    })
});
