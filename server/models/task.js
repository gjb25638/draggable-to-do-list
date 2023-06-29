export class Task {
  constructor(id, title, index) {
    this.id = id
    this.title = title
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
      index: task.index
    }
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options)
    return new Task(data.id, data.title, data.index)
  }
}
