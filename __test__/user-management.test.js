import UserManagement from '../src/js/elements/user-management';
import { className } from "../src/js/consts";
import { mixedUserList } from "./__data__/users";

let defaultCheck = () => { return true };

describe('new', () => {
    let userManager = new UserManagement('test');
    test('it can be instantiated', () => {
        expect(userManager).toBeInstanceOf(UserManagement);
    });

    test('it initializes member variables correctly', () => {
        expect(userManager.role).toBe('test');
        expect(userManager.searchImage).toBeNull();
        expect(userManager.searchInput).toBeNull();
        expect(userManager.emptySearchResults).toBeNull();
    });
});

describe('createSearchBox', () => {
    let userManager = new UserManagement('test');
    let searchBox = userManager.createSearchBox();

    test('when called, sets searchImage to a div', () => {
        let searchImage = userManager.searchImage;
        expect(searchImage).toBeInstanceOf(HTMLDivElement);
        expect(searchImage.className).toBe(className.SEARCH_IMG);
    });

    test('when called, sets searchInput to an editable div', () => {
        let searchInput = userManager.searchInput;
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
    });
});

describe('filteredList', () => {
    describe('userManager in a "test" role', () => {
        let userManager = new UserManagement('test');
        let filteredList = userManager.filteredList(mixedUserList, defaultCheck);

        function filterAlteredList(baseList, action) {
            let copiedList = Object.assign([], baseList);
            action(copiedList);
            return userManager.filteredList(copiedList, defaultCheck);
        }

        test('does no filtering based on metadata', () => {
            expect(filteredList.length).toBe(mixedUserList.length)
        });

        test('alphabetizes the list based on nickname', () => {
            let isAlphabetized = true;
            let firstLetterOfNicknames = filteredList.map((u) => { return u.nickname[0]; });
            for(let i = 0; i <= firstLetterOfNicknames; i++) {
                if(firstLetterOfNicknames[i + 1] && firstLetterOfNicknames[i] > firstLetterOfNicknames[i + 1]) {
                    isAlphabetized = false
                }
            }
            expect(isAlphabetized).toBeTruthy();
        });

        test('filters out people who do not have a nickname', () => {
            let copiedFilteredList = filterAlteredList(mixedUserList, (list) => { list[0].nickname = undefined });
            expect(copiedFilteredList.length).toBe(mixedUserList.length - 1);
        });

        test('filters out people who do not have a user id', () => {
            let copiedFilteredList = filterAlteredList(mixedUserList, (list) => { list[0].userId = undefined });
            expect(copiedFilteredList.length).toBe(mixedUserList.length - 1);
        });

        test('filters out people whose nickname begins with a blank space', () => {
            let copiedFilteredList = filterAlteredList(mixedUserList, (list) => { list[0].nickname = ' blank' });
            expect(copiedFilteredList.length).toBe(mixedUserList.length - 1);
        });

        test('processes any additional req we pass in', () => {
            let disallowedNickname = mixedUserList[0].nickname;
            let additionalCheck = (user) => { return user.nickname !== disallowedNickname };
            let filteredList = userManager.filteredList(mixedUserList, additionalCheck);
            expect(filteredList.length).toBe(mixedUserList.length - 1);
        });
    });

    describe('userManager in an "employee" role', () => {
        let userManager = new UserManagement('employee');
        let filteredList = userManager.filteredList(mixedUserList, defaultCheck);

        test('filters out all users who are not employees', () => {
            let employeeCount = mixedUserList.filter((u) => { return u.metadata && u.metadata.role === 'employee' }).length;
            expect(filteredList.length).toBe(employeeCount);
        })
    })
});
