import Element from '../src/js/elements/elements';
import ChatSection from '../src/js/elements/chat-section';

let el = new Element();
let dummyWidget = el.createDiv();
let chatSection = new ChatSection(dummyWidget);

describe('new', () => {
    test('it can be instantiated', () => {
        expect(chatSection).toBeInstanceOf(ChatSection);
    });
    test('uses a div to reference itself', () => {
        expect(chatSection.self).toBeInstanceOf(HTMLDivElement);
    });
    test("sets it's class name to chat-section", () =>{
        expect(chatSection.self.className).toBe('chat-section');
    });
    test('gets appended to the widget we pass in the constructor', () => {
        expect(dummyWidget.childNodes[0].className).toBe('chat-section');
    });
});

