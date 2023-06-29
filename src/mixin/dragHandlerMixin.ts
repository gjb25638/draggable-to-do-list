export default function() {
  const dragCalcIndex = <T extends { index: number }>(newIndex: number, oldIndex: number, list: T[], updateFunc: Function) => {
    if (!list || list.length < 2) return

    const offset = Math.abs(newIndex - oldIndex)
    const dragItem = list.find(item => item.index === oldIndex)
    const targetItem = list.find(item => item.index === newIndex)

    if (!dragItem || !targetItem) return

    if (offset === 1) {
      dragItem.index = -1
      targetItem.index = oldIndex
      dragItem.index = newIndex
      updateFunc(dragItem)
      updateFunc(targetItem)
    } else if (offset > 1) {
      dragItem.index = -1
      if (newIndex > oldIndex) {
        for (let i = 1; i <= offset; i++) {
          const item = list.find(item => item.index === oldIndex + i)
          if (!item) continue
          item.index -= 1
          updateFunc(item)
        }
      } else if (newIndex < oldIndex) {
        for (let i = 1; i <= offset; i++) {
          const item = list.find(item => item.index === oldIndex - i)
          if (!item) continue
          item.index += 1
          updateFunc(item)
        }
      }
      dragItem.index = newIndex
      updateFunc(dragItem)
    }
    return
  }
  return {
    dragCalcIndex
  }
}