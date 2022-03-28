const _toString = Object.prototype.toString

export default new (class {
  private getType(value: any) {
    return _toString.call(value).slice(8, -1)
  }
  null(value: any): value is null {
    return this.getType(value) === "Object" && value === null
  }
})()
