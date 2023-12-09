import GetDate from './GetDate';
import conversionUserCoords from './conversionUserCoords';

export default class PostControl {
  constructor(widget, showErrorMessage, toolTip, previewWidget, showInform, counter) {
    this.widget = widget;
    this.showErrorMessage = showErrorMessage;
    this.toolTip = toolTip;
    this.previewWidget = previewWidget;
    this.showInform = showInform;
    this.counter = counter;

    this.chunks = null;
    this.objPost = null;
    this.recorder = null;
    this.stream = null;
    this.canselStatus = true;

    this.addTextPost = this.addTextPost.bind(this);
    this.getUserCoords = this.getUserCoords.bind(this);
    this.recAudio = this.recAudio.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.recVideo = this.recVideo.bind(this);
    this.canselRecord = this.canselRecord.bind(this);
  }

  activation() {
    this.widget.formAddPost.addEventListener('submit', this.addTextPost);
    this.widget.enterCoords.addEventListener('input', () => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
    });
    this.widget.btnAddAudio.addEventListener('click', this.recAudio);
    this.widget.btnAddVideo.addEventListener('click', this.recVideo);
    this.widget.btnEndRec.addEventListener('click', this.stopRecord);
    this.widget.btnCansel.addEventListener('click', this.canselRecord);
  }

  createObjPost() {
    this.objPost = {};
    this.objPost.date = GetDate.getFormatDate();
  }

  addTextPost(e) {
    e.preventDefault();

    this.createObjPost();
    this.objPost.text = this.widget.enterText.value;
    this.objPost.type = 'text';
    this.addPost();
  }

  addPost() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          const { latitude, longitude } = data.coords;
          this.objPost.coords = `[${latitude}, ${longitude}]`;

          this.widget.createPost(this.objPost);
          this.objPost = null;
        },

        (err) => {
          console.log(err.message);
          this.showForm();
        },

        { enableHighAccuracy: true },
      );
    } else {
      this.showInform.showMessage('Используйте другой браузер, определение геолокации недоступно');
    }
  }

  showForm() {
    this.widget.formCoords.classList.remove('hidden');
    this.widget.formCoords.addEventListener('submit', this.getUserCoords);

    this.widget.formCoords.style.left = `${this.widget.timelineBox.offsetWidth / 2 - this.widget.enterCoords.offsetWidth / 2}px`;
  }

  getUserCoords(e) {
    e.preventDefault();

    const coords = conversionUserCoords(this.widget.enterCoords.value);
    if (coords) {
      this.objPost.coords = coords;
      this.widget.createPost(this.objPost);
      this.objPost = null;
      this.widget.formCoords.classList.add('hidden');
      this.widget.formCoords.reset();
    } else {
      const message = 'Введите координаты в виде: 51.50851, -0.12572';
      this.toolTip.showToolTip(this.widget.enterCoords, message);
    }
  }

  recAudio() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.stream = stream;
          this.recorder = new MediaRecorder(stream);

          this.recorder.addEventListener('start', () => {
            this.chunks = [];
            this.widget.toggleBtnBox();
            this.counter.startCounter();
          });

          this.recorder.addEventListener('dataavailable', (event) => {
            this.chunks.push(event.data);
          });

          this.recorder.addEventListener('stop', () => {
            if (this.canselStatus) {
              const blob = new Blob(this.chunks);
              const src = URL.createObjectURL(blob);
              this.addAudioPost(src);
            }

            this.widget.toggleBtnBox();
            this.chunks = null;
            this.canselStatus = true;
            this.counter.stopCounter();
          });

          this.recorder.start();
        })
        .catch((err) => {
          console.log(err.message);
          this.showInform.showMessage('Предоставьте доступ к микрофону');
        });
    } else {
      this.showInform.showMessage('Используйте другой браузер, невозможно получить доступ к микрофону');
    }
  }

  addAudioPost(src) {
    this.createObjPost();
    this.objPost.src = src;
    this.objPost.type = 'audio';
    this.addPost();
  }

  stopRecord() {
    this.recorder.stop();
    this.stream.getTracks().forEach((track) => track.stop());
    this.recorder = null;
    this.stream = null;
  }

  canselRecord() {
    this.canselStatus = false;
    this.stopRecord();
  }

  recVideo() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true }).then((stream) => {
          this.stream = stream;
          this.recorder = new MediaRecorder(this.stream);

          this.recorder.addEventListener('start', () => {
            this.chunks = [];
            this.widget.toggleBtnBox();
            this.previewWidget.showPreview(this.widget.listPosts, stream);
            this.counter.startCounter();
          });

          this.recorder.addEventListener('dataavailable', (event) => {
            this.chunks.push(event.data);
          });

          this.recorder.addEventListener('stop', () => {
            if (this.canselStatus) {
              const blob = new Blob(this.chunks);
              const src = URL.createObjectURL(blob);
              this.addVideoPost(src);
            }

            this.widget.toggleBtnBox();
            this.previewWidget.hidePreview();
            this.chunks = null;
            this.canselStatus = true;
            this.counter.stopCounter();
          });

          this.recorder.start();
        }).catch((err) => {
          console.log(err.message);
          this.showInform.showMessage('Предоставьте доступ к камере и  микрофону');
        });
    } else {
      this.showInform.showMessage('Используйте другой браузер, невозможно получить доступ к камере');
    }
  }

  addVideoPost(src) {
    this.createObjPost();
    this.objPost.src = src;
    this.objPost.type = 'video';
    this.addPost();
  }
}
