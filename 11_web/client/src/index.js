import axios from "axios";
class Request{
  constructor(maxCount) {
    this.taskQueue = [];
    this.maxCount = maxCount;
    queueMicrotask(() => {
      this.doRequest()
    })
  }
  push(task) {
    this.taskQueue.push(task)
  }
  doRequest() {
    if (!this.taskQueue.length) return;
    const minLen = Math.min(this.maxCount, this.taskQueue.length);
    for (let i = 0; i < minLen; i++){
      const task = this.taskQueue.shift();
      this.maxCount--;
      this.run(task);
    }
  }
  run(task) {
    task().then((data) => {
      console.log(data);
    }).catch((e) => {
      console.log(e)
    }).finally(() => {
      this.maxCount++
      this.doRequest()
    })
  }
}

function req1(){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test1").then((data) => {
      resolve(data.data);
    },2000)
  })
  })
}
function req2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test2").then((data) => {
      resolve(data.data);
    })
    },2000)
  })
}
function req3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test3").then((data) => {
      resolve(data.data);
    })
    },2000)
  })
}
function req4() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test4").then((data) => {
      resolve(data.data);
    })
    },2000)
  })
}
function req5() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test5").then((data) => {
      resolve(data.data);
    })
    },2000)
  })
}
function req6() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test6").then((data) => {
      resolve(data.data);
    })
    },2000)
  })
}
function req7() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test7").then((data) => {
      resolve(data.data);
    })
    },2000)
  })
}
function req8() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test8").then((data) => {
      resolve(data.data);
    })
    },2000)
  })
}
function req9() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get("http://localhost:8888/test9").then((data) => {
      resolve(data.data);
    })
    },2000)
  })
}
const queue = [
  req1,
  req2,
  req3,
  req4,
  req5,
  req6,
  req7,
  req8,
  req9,
]
const req = new Request(2);
for (let item of queue) {
  req.push(item);
}