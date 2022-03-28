import is from "@/utils/is"
export default new (class {
  /**
   * @description 获取样式标签内容及属性
   */
  getStyleStr(source: string) {
    return [this.getTagStrFn("style")(source), this.getTagAttr("style")(source)]
  }
  /**
   * @description 获取脚本标签内容及属性
   */
  getScriptStr(source: string) {
    return [
      this.getTagStrFn("script")(source),
      this.getTagAttr("script")(source),
    ]
  }
  /**
   * @description 获取模板标签内容及属性
   */
  getBlockStr(source: string) {
    return [this.getTagStrFn("block")(source), this.getTagAttr("block")(source)]
  }
  /**
   * @description 高阶函数 返回一个获取特定标签内容及属性的函数
   */
  private getTagStrFn(tagName: string) {
    const tagNameLen = tagName.length
    const tagRex = new RegExp(`<\/?${tagName}>`, "g")
    const tagAttrEmptyRex = new RegExp(`<${tagName}(.+)>`)

    return (source: string) => {
      source = source.replace(tagAttrEmptyRex, `<${tagName}>`)
      const [first, second] = [...(source.matchAll(tagRex) as any)]
      const startIdx = first?.index + tagNameLen + 2 || 0
      const endIdx = second?.index || source.length
      const tagStr = source.slice(startIdx, endIdx)
      return tagStr
    }
  }
  /**
   * @description 将标签上的属性字符串转换成属性对象
   */
  private tagAttrStrToObject(tagAttrStr: string) {
    if (!tagAttrStr) {
      return {}
    }
    let obj: Record<string, string | boolean> = {}
    const tagAttrStrings = tagAttrStr.split(/\s+/)
    for (let tagStr of tagAttrStrings) {
      if (!tagStr) {
        continue
      }
      const [key, value] = tagStr.split("=")
      obj[key] = value ? value.replace(/\"/g, "") : true
    }
    return obj
  }
  /**
   * @description 获取标签上的属性
   */
  private getTagAttr(tagName: string) {
    const tagRex = new RegExp(`<\/?${tagName}(.+)>`)
    return (source: string) => {
      const matches = source.match(tagRex)
      return this.tagAttrStrToObject(is.null(matches) ? "" : matches[1])
    }
  }
})()
