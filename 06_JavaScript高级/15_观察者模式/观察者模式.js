class Observe{
  constructor(name) {
    this.name = name;
  }
  sub(status) {
    console.log("目标发生了变化,通知给: ",this.name,`变化为${status}`);
  }
}
class Subject{
  constructor(status) {
    this.status = status;
    this.observeList = new Set();
  }
  setStatus(value) {
    if (value !== this.status) {
      this.setStatus = value;
      this.trigger();
    }
  }
  track(observe) {
    if (!this.observeList.has(observe)) {
      this.observeList.add(observe);
    }
  }
  trigger() {
    if (this.observeList.size !== 0) {
      this.observeList.forEach((observe) => {
        observe.sub(this.setStatus);
      })
    } 
  }
}
let target = new Subject("pending");
let ob1 = new Observe("ob1");
let ob2 = new Observe("ob2");

target.track(ob1);
target.track(ob2);

target.setStatus("fullied")
