export class Task {
  constructor(id, title, finished = false, index) {
    this.id = id
    this.title = title
    this.finished = finished
    this.index = index
  }
  toString() {
    return this.id + ', ' + this.title
  }
}

// Firestore data converter
export const taskConverter = {
  toFirestore: function (task) {
    return {
      id: task.id,
      title: task.title,
      finished: task.finished,
      index: task.index
    }
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options)
    return new Task(data.id, data.title, data.finished, data.index)
  }
}
