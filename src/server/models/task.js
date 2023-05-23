export class Task {
  constructor(id, title) {
    this.id = id
    this.title = title
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
      title: task.title
    }
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options)
    return new Task(data.id, data.title)
  }
}
