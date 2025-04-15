class VirtualList{
  constructor(viewSelector,virtualListSelector,itemHeight){
    this.startIndex = 0
    this.endIndex = 0
    this.viewSelector = document.getElementById(viewSelector)
    this.virtualListSelector = document.getElementById(virtualListSelector)
    this.itemHeight = itemHeight

    this.maxViewCount = 0
    this.dataSource = []
    this.renderList = []

  }
  init(dataSource){
    this.dataSource = dataSource
    this.maxViewCount = Math.ceil(this.viewSelector.offsetHeight / this.itemHeight)+1

    this.bindEvent()
    this.render()
  }
  bindEvent(){
    this.viewSelector.addEventListener("scroll",this.handleScrollEvent.bind(this))
  }
  handleScrollEvent(){
    const scrollTop = this.viewSelector.scrollTop
    this.startIndex = Math.floor(scrollTop / this.itemHeight)
    
    this.computedEndIndex()
    this.computedRenderList()
    this.computedStyle()
    this.render()
  }
  computedEndIndex(){
    let endIndex = this.startIndex + this.maxViewCount
    this.endIndex = this.dataSource[endIndex] ? endIndex : this.dataSource.length
  }
  computedRenderList(){
    this.renderList = this.dataSource.slice(this.startIndex,this.endIndex)  
  }
  computedStyle(){
    this.virtualListSelector.style.height = `${this.dataSource.length * this.itemHeight - this.startIndex*this.itemHeight}px`
    this.virtualListSelector.style.transform = `translateY(${this.startIndex*this.itemHeight}px)`
  }
  render(){
    this.computedEndIndex()
    this.computedRenderList()
    
    let itemListDom = this.renderList.map((item)=>`<div class="virtual-list-item">${item}</div>`).join("")
    this.virtualListSelector.innerHTML = itemListDom;

    this.computedStyle()
  }
}