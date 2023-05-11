/**
 * 全局代碼錯誤捕捉
 * 比如 null.length 就會被捕捉到
 */

export default (error, vm)=>{
  //過濾HTTP請求錯誤
  if(error.status) {
    return false
  }

  var errorMap = {
    InternalError: 'Javascript引擎內部錯誤',
    ReferenceError: '未找到對像',
    TypeError: '使用了錯誤的類型或對像',
    RangeError: '使用內置對像時，參數超範圍',
    SyntaxError: '語法錯誤',
    EvalError: '錯誤的使用了Eval',
    URIError: 'URI錯誤'
  }
  var errorName = errorMap[error.name] || '未知錯誤'

  console.warn(`[Error]: ${error}`)
  console.error(error)
  //throw error;

  vm.$nextTick(() => {
    vm.$notify.error({
      title: errorName,
      message: error
    })
  })
}
