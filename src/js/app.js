import PostControl from './PostControl';
import TimelineWidget from './TimelineWidget';
import Curtain from './Curtain';
import ShowErrorMessage from './ShowErrorMessage';
import ToolTip from './ToolTip';
import PreviewWidget from './PreviewWidget';
import ShowInform from './ShowInform';

const container = document.querySelector('.container');
const curtainEl = document.querySelector('.curtain');

const widget = new TimelineWidget(container);
const curtain = new Curtain(curtainEl);
const showErrorMessage = new ShowErrorMessage(container, 'error-message_box', 'error-message_text', 'error-message_ok', 'hidden', curtain);
const toolTip = new ToolTip('tooltip');
const previewWidget = new PreviewWidget(container, showErrorMessage);
const showInform = new ShowInform(container, curtain);
const controller = new PostControl(widget, showErrorMessage, toolTip, previewWidget, showInform);

controller.activation();
