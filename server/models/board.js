export class Board {
  constructor (id, title) {
    this.id = id
    this.title = title
  }
  toString() {
    return this.id + ', ' + this.title
  }
}

// Firestore data converter
export const boardConverter = {
  toFirestore: function(board) {
    return {
      id: board.id,
      title: board.title,
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new Board(data.id, data.title)
  }
}