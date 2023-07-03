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
  // addedCalcIndex just service task
  const addedCalcIndex = <T extends { id: string, title: string, finished: boolean, index: number }>(newIndex: number, el: T, boardId: string, list: T[], addFunc: Function, updateFunc: Function) => {
    if (!list || list.length < 0) return

    if (list.length > 0 && list.length > newIndex) {
      for(let i = 1; i <= list.length - newIndex; i++) {
        const item = list.find(item => item.index === list.length - i)
        if (!item) continue
        item.index += 1
        updateFunc(item)
      }
    }
    addFunc({ title: el.title, finished: el.finished, index: newIndex })(boardId)
    return
  }
  // addedCalcIndex just service task
  const removedCalcIndex = async <T extends { id: string, index: number }>(oldIndex: number, el: T, boardId: string, list: T[], deleteFunc: Function, updateFunc: Function) => {
    if (!list || list.length < 1) return

    await deleteFunc({ taskId: el.id })(boardId)
    if (list.length !== 1 && oldIndex !== list.length - 1) {
      for (let i = 1; i <= list.length - oldIndex - 1; i++) {
        const item = list.find(item => item.index === oldIndex + i)
        if (!item) continue
        item.index -= 1
        updateFunc(item)
      }
    }
    return
  }
  return {
    movedCalcIndex,
    addedCalcIndex,
    removedCalcIndex
  }
}