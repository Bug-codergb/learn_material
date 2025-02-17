class Task {
  constructor(options) {
    const { queue, maxCount } = options;
    this.taskQueue = queue || [];
    this.maxCount = maxCount || 3;
  }
  run() {
    if (!this.taskQueue.length) return;

    let count = Math.min(this.maxCount, this.taskQueue.length);
    for (let i = 0; i < count; i++) {
      let task = this.taskQueue.shift();
      this._runTask(task);
      this.maxCount--;
    }
  }
  _runTask(task) {
    task()
      .then((res) => {})
      .catch((er) => {})
      .finally(() => {
        this.maxCount++;
        this.run();
      });
  }
}
