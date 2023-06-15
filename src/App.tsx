import { useState } from 'react'
import './index.css'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Highlight } from '@chakra-ui/react'

function App() {
  const [items, setItems] = useState(['Medias', 'Microondas', 'Remera'])
  const [gift, setGift] = useState("");
  const [error, setError] = useState('');

  const deleteItem = (itemToDelete: string) => {
    const updatedItems = items.filter((item) => item !== itemToDelete);
    setItems(updatedItems);
  }

  const deleteAll = () => {
    setItems([])
  }

  const addGift = () =>{
    if (gift.trim() !== "") {
      setItems([...items, gift]);
      setGift("");
      setError('');
    } else {
      setError('El regalo no puede estar vacío');
    }
  }

  return (
    <>
      <div className="App">
        <div className='container'>
          <Heading as='h1' size='xl' noOfLines={1}>Regalos</Heading>
          <form action="" style={{ paddingTop: '10px' }}>
            <Input htmlSize={20} width='auto' type="text" onChange={(e) => setGift(e.target.value)} />
            <Button colorScheme='orange' style={{ marginLeft: '5px' }} onClick={()=>addGift()}>Agregar</Button>
          </form>
          {error && (
            <div style={{ paddingTop: '5px' }}>
              <Highlight
                query={error}
                styles={{ px: '1', py: '1', bg: 'red.100', rounded: 'full' }}
              >
                {error}
              </Highlight>
            </div>
          )}
          <div>
            {items.length != 0 ?
              <ul className='list'>
                {
                  items.map((i, index) => (
                    <div key={index} className='containerLi'>
                      <li>{i}</li> <Button colorScheme='orange' size='xs' onClick={() => deleteItem(i)} >X</Button>
                    </div>
                  ))
                }
              </ul>
              :
              <div style={{padding:'10px'}}>
                <Highlight query='Agrega algo!' styles={{ px: '1', py: '1', bg: 'orange.100', rounded: 'full' }}>
                  No hay regalos grinch! Agrega algo!
                </Highlight>

              </div>
            }
          </div>
          <Button colorScheme='orange' onClick={deleteAll} >Eliminar Todo</Button>
        </div>

      </div>
    </>
  )
}

export default App
