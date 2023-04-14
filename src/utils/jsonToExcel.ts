import * as xlsx from 'xlsx'

type Options = {
  data: any[]
  header?: Record<string, any>
  sheetName: string
  bookType: xlsx.BookType
}

export default (options: Options) => {
  // 创建工作簿
  const table = document.getElementsByClassName('el-table')[0]
  const wb = xlsx.utils.table_to_book(table, { sheet: 'Sheet JS' })
  // 创建工作表
  // const data2 = options.data.map(item => {
  //   const obj: Record<string, any> = {}
  //   for (const key in options.header) {
  //     if (key === 'is_show') {
  //       obj[options.header[key]] = item[key] ? '上架' : '下架'
  //     } else {
  //       obj[options.header[key]] = item[key]
  //     }
  //   }
  //   return obj
  // })
  // const ws = xlsx.utils.json_to_sheet(data2)
  // 把工作表放到工作簿中
  // xlsx.utils.book_append_sheet(wb, ws)
  // 生成数据保存
  xlsx.writeFile(wb, 'x发')
}
