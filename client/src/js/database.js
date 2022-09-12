import { openDB } from 'idb'
//initialize connection to the db with idb.
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

//async function to add content to the database.
export const putDb = async content => {
  console.log('GET from the database')

  // connect db and version number
  const contentDb = await openDB('jate', 1)

  // Create a new transaction and specify the database. readonly or readandwrite
  const tx = contentDb.transaction('jate', 'readwrite')

  //variable golds stored transaction object. Opens object store.
  const store = tx.objectStore('jate')

  // requests to put stored content in jate db.
  const request = store.put({ jate: content })

  //await the request and store to variable
  const result = await request
  // confirms request
  console.log('result.value', result)
  //return the result
  return result
}

//gets content from the database.
export const getDb = async () => {
  console.log('GET from the database')

  // connect db and versioon number
  const contentDb = await openDB('jate', 1)

  // Create a new transaction and specify the database. readonly or readandwrite
  const tx = contentDb.transaction('jate', 'readonly')

  // Open object store.
  const store = tx.objectStore('jate')

  // get all data in the jate database.
  const request = store.getAll()

  const result = await request
  // Get confirmation of the request.
  console.log('result.value', result)
  return result
}

//hoisted function that invokes the db connection 
initdb();
