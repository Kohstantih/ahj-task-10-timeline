export default class CounterTime {
  constructor(element) {
    this.element = element;

    this.intervalId = null;
  }

  startCounter() {
    let minutesTen = 0;
    let minutesUnit = 0;
    let secondsTen = 0;
    let secondsUnit = 0;
    this.element.textContent = `${minutesTen}${minutesUnit}:${secondsTen}${secondsUnit}`;

    this.intervalId = setInterval(() => {
      secondsUnit += 1;
      if (secondsUnit === 10) {
        secondsUnit = 0;
        secondsTen += 1;
      }

      if (secondsTen === 6) {
        secondsTen = 0;
        minutesUnit += 1;
      }

      if (minutesUnit === 10) {
        minutesUnit = 0;
        minutesTen += 1;
      }

      if (minutesTen === 6) this.element.textContent = 'end';
      this.element.textContent = `${minutesTen}${minutesUnit}:${secondsTen}${secondsUnit}`;
    }, 1000);
  }

  stopCounter() {
    this.element.textContent = '';
    clearInterval(this.intervalId);
  }
}
