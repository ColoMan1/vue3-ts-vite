import xlsx from 'xlsx'

type Options = {
    data: any[]
    header?: []
    sheetName: string
    bookType: xlsx.BookType
}

export default (options: Options) => {
  // 创建工作簿
  const wb = xlsx.utils.book_new()
  // 创建工作表
  const ws = xlsx.utils.json_to_sheet(options.data)
  // 把工作表放到工作簿中
  xlsx.utils.book_append_sheet(wb, ws)
  // 生成数据保存
  xlsx.writeFile(wb, options.sheetName, {
    bookType: options.bookType
  })
}
