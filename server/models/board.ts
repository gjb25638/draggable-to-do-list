import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'

export class Board {
  id: string
  title: string
  constructor (id, title) {
    this.id = id
    this.title = title
  }
  toString() {
    return this.id + ', ' + this.title
  }
}

// Firestore data converter
export const boardConverter: any = {
  toFirestore: function(board: Board): DocumentData  {
    return {
      id: board.id,
      title: board.title,
    }
  },
  fromFirestore: function(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Board {
    const data = snapshot.data(options)
    return new Board(data.id, data.title)
  }
}