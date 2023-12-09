import PostControl from './PostControl';
import TimelineWidget from './TimelineWidget';
import Curtain from './Curtain';
import ShowErrorMessage from './ShowErrorMessage';
import ToolTip from './ToolTip';
import PreviewWidget from './PreviewWidget';
import ShowInform from './ShowInform';
import CounterTime from './CounterTime';

const container = document.querySelector('.container');
const curtainEl = document.querySelector('.curtain');
const time = document.querySelector('.timer_rec');

const widget = new TimelineWidget(container);
const curtain = new Curtain(curtainEl);
const errMessage = new ShowErrorMessage(container, 'error-message_box', 'error-message_text', 'error-message_ok', 'hidden', curtain);
const toolTip = new ToolTip('tooltip');
const previewWidget = new PreviewWidget(container, errMessage);
const showInform = new ShowInform(container, curtain);
const counter = new CounterTime(time);
const controller = new PostControl(widget, errMessage, toolTip, previewWidget, showInform, counter);

controller.activation();
