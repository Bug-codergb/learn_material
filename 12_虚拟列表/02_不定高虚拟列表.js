const binarySearch = (list, value) => {
  let left = 0,
    right = list.length - 1,
    templateIndex = -1;
  while (left < right) {
    const midIndex = Math.floor((left + right) / 2);
    const midValue = list[midIndex].bottom;
    if (midValue === value) return midIndex + 1;
    else if (midValue < value) left = midIndex + 1;
    else if (midValue > value) {
      if (templateIndex === -1 || templateIndex > midIndex) templateIndex = midIndex;
      right = midIndex;
    }
  }
  return templateIndex;
}

class VirtualList{
  constructor(contentSelector,listSelector,estimateHeight){
    this.viewHeight = 0
    this.listHeight = 0
    this.startIndex =  0
    this.endIndex = 0
    this.maxCount = 0
    this.estimateHeight = estimateHeight
    this.offsetDis = 0

    this.dataSource = []
    this.renderList = []

    this.position = []

    this.contentDom = document.getElementById(contentSelector)
    this.listDom = document.getElementById(listSelector)
  }
  init(dataSource){
    this.viewHeight = this.contentDom.offsetHeight
    this.dataSource = dataSource || []
    this.maxCount = Math.ceil(this.viewHeight/this.estimateHeight)+1
    

    this.initPosition()
    
    this.bindEvent()

    this.computedEndIndex()
    this.computedRenderList()
    this.computedOffsetDis()
    this.computedStyle()
    this.render()
    queueMicrotask(()=>{
      this.setPosition()
      console.log(this.position)
    })
    
  }
  initPosition(){
    const pos = []
    for(let i=0;i<this.dataSource.length;i++){
      const item = this.dataSource[i]
      pos.push({
        index: item.id,
        height: this.estimateHeight,
        top: i*this.estimateHeight,
        bottom:(i+1)*this.estimateHeight,
        dHeight:0
      })
    }
    this.position = [...this.position,...pos]
  }
  setPosition(){
    const nodes = this.listDom.children;
    if(!nodes || !nodes.length) return;
    [...nodes].forEach((node)=>{
      const rect = node.getBoundingClientRect()
      
      const id = node.getAttribute("data-id")
      const itemPos = this.position[Number(id)]
      const dHeight = itemPos.height - rect.height;//预测高度 - 实际高度
      if(dHeight){
        itemPos.height = rect.height
        itemPos.bottom = itemPos.bottom - dHeight
        itemPos.dHeight = dHeight
      }
    })

    const firstId = Number(nodes[0].getAttribute("data-id"))
    const len = this.position.length
    let firstDtHeight = this.position[firstId].dHeight  
    
    this.position[firstId].dHeight = 0

    for(let i=firstId+1;i<len;i++){
      const pos = this.position[i]
      pos.top = this.position[i-1].bottom
      pos.bottom =  pos.bottom - firstDtHeight

      if(pos.dHeight!==0){
        firstDtHeight+=pos.dHeight

        pos.dHeight =0 
      }
    }
    this.listHeight = this.position[len-1].bottom;
  }
  bindEvent(){
    this.contentDom.addEventListener("scroll",this.handleScroll.bind(this))
  }
  handleScroll(){
    const { scrollTop, clientHeight,scrollHeight } = this.contentDom
    
    this.startIndex = binarySearch(this.position,scrollTop);

   
    this.computedEndIndex()
    this.computedRenderList()
    this.computedOffsetDis()
    this.computedStyle()

    this.setPosition()
    this.render()
  }
  computedRenderList(){
    this.renderList = this.dataSource.slice(this.startIndex,this.endIndex)
  }
  computedEndIndex(){
    let endIndex = this.startIndex + this.maxCount
    this.endIndex = this.dataSource[endIndex] ? endIndex:this.dataSource.length
  }
  computedOffsetDis(){
    this.offsetDis = this.startIndex > 0 ? this.position[this.startIndex - 1].bottom : 0
  }
  computedStyle(){
    this.listDom.style.height = `${this.listHeight - this.offsetDis}px`
    this.listDom.style.transform = `translate3d(0,${this.offsetDis}px,0)`
  }
  render(){
    const template = this.renderList.map((item)=>`<div class="fs-estimated-virtuallist-list-item" data-id="${item.id}">${item.id}-${item.content}</div>`).join("")
    this.listDom.innerHTML = template;
  }
}