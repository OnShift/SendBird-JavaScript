import SBWidget from '../src/js/widget';
import Element from '../src/js/elements/elements';
import WidgetBtn from '../src/js/elements/widget-btn';
import Spinner from '../src/js/elements/spinner';
import Popup from '../src/js/elements/popup';
import ListBoard from '../src/js/elements/list-board';
import ChatSection from '../src/js/elements/chat-section';

test('the widget can be instantiated', () => {
    let widget = new SBWidget();
    expect(widget).toBeInstanceOf(SBWidget);
});

describe('_init', () => {
    let widget = new SBWidget();
    widget.widget = new Element().createDiv();
    widget._init();

    test('initializes the elements needed for a functional chat widget', () => {
        expect(widget.popup).toBeInstanceOf(Popup);
        expect(widget.spinner).toBeInstanceOf(Spinner);
        expect(widget.listBoard).toBeInstanceOf(ListBoard);
        expect(widget.chatSection).toBeInstanceOf(ChatSection);
    });

    test('the widget itself is not initialized until later in the start up process', () => {
        expect(widget.widgetBtn).toBe(undefined)
    })

    test('initializes member variables to sane empty states', () => {
        expect(widget.activeChannelSetList).toEqual([]);
        expect(widget.extraChannelSetList).toEqual([]);
    });
});
