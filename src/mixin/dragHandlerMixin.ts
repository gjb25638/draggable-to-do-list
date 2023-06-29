export default function() {
  const movedCalcIndex = <T extends { index: number }>(newIndex: number, oldIndex: number, list: T[], updateFunc: Function) => {
    if (!list || list.length < 2) return

    const offset = Math.abs(newIndex - oldIndex)
    const draggedItem = list.find(item => item.index === oldIndex)
    const targetItem = list.find(item => item.index === newIndex)

    if (!draggedItem || !targetItem) return

    if (offset === 1) {
      draggedItem.index = -1
      targetItem.index = oldIndex
      draggedItem.index = newIndex
      updateFunc(draggedItem)
      updateFunc(targetItem)
    } else if (offset > 1) {
      draggedItem.index = -1
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
      draggedItem.index = newIndex
      updateFunc(draggedItem)
    }
    return
  }
  return {
    movedCalcIndex
  }
}