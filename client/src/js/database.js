import { openDB } from 'idb'

const initdb = async () =>
  openDB('jate', 1, {
    upgrade (db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists')
        return
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true })
      console.log('jate database created')
    }
  })

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async content => {
  console.log('GET from the database')

  // connect db and versioon number
  const contentDb = await openDB('jate', 1)

  // Create a new transaction and specify the database. readonly or readandwrite
  const tx = contentDb.transaction('jate', 'readwrite')

  // Open object store.
  const store = tx.objectStore('jate')

  // get all data in the database.
  const request = store.put({jate: content });

  const result = await request
  // Get confirmation of the request.
  console.log('result.value', result)
  return result

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database')

  // connect db and versioon number
  const contentDb = await openDB('jate', 1)

  // Create a new transaction and specify the database. readonly or readandwrite
  const tx = contentDb.transaction('jate', 'readonly')

  // Open object store.
  const store = tx.objectStore('jate')

  // get all data in the database.
  const request = store.getAll()

  const result = await request
  // Get confirmation of the request.
  console.log('result.value', result)
  return result
}

initdb();
