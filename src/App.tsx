import { useState } from 'react'
import './index.css'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'

function App() {
  const [items, setItems] = useState(['Medias','Microondas','Remera'])

  const deleteItem =(itemToDelete: string) =>{
    const updatedItems = items.filter((item) => item !== itemToDelete);
    setItems(updatedItems);
  }

  return (
    <>
      <div className="App">
        <div className='container'>
          <Heading as='h1' size='xl' noOfLines={1}>Regalos:</Heading>
          <form action="" style={{paddingTop: '10px'}}>
            <Input htmlSize={20} width='auto' type="text" />
            <Button colorScheme='orange'>Agregar</Button>
          </form>
          <div>
            <ul className='list'>
              {
                items.map((i,index)=>(
                  <div key={index} className='containerLi'>
                    <li>{i}</li> <Button colorScheme='orange' size='xs' onClick={() => deleteItem(i)} >X</Button>
                  </div>
                ))
              }
            </ul>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
