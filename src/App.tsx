import { useEffect, useState } from 'react'
import './index.css'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Highlight } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

function App() {
  const initialItems = () => {
    const items = localStorage.getItem('items')
    if (items) {
      return JSON.parse(items)
    }
    else {
      return []
    }

  }

  const [items, setItems] = useState<any>(initialItems)
  const [gift, setGift] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    if (items.length != 0) {
      localStorage.setItem('items', JSON.stringify(items));
    }
  }, [items]);

  const deleteItem = (indexToDelete: number) => {
    const updatedItems = items.filter((item, index) => index !== indexToDelete);
    setItems(updatedItems);
  }

  const deleteAll = () => {
    setItems([])
  }

  const addGift = () => {
    if (gift.trim() !== "") {
      const existingItem = items.find((item: any) => item.gift.toLowerCase() === gift.toLowerCase());

      if (existingItem) {
        const updatedItems = items.map((item: any) => {
          if (item.gift.toLowerCase() === gift.toLowerCase()) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });

        setItems(updatedItems);
        setLink('')
        setGift("");
        setQuantity(1);
        setError("");
      } else {
        const newItem = { gift: gift, link: link, quantity: quantity };
        setItems([...items, newItem]);
        setGift("");
        setLink('')
        setQuantity(1);
        setError("");
      }
    } else {
      setError("El regalo no puede estar vacío");
    }
  };
  return (
    <>
      <div className="App">
        <div className='container'>
          <Heading as='h1' size='xl' noOfLines={1}>Regalos</Heading>
          <form style={{ paddingTop: '10px', display: 'flex' }}>
            <Input style={{ marginRight: '10px' }} htmlSize={15} width='auto' type="text" value={gift}
              placeholder='Remera'
              onChange={(e) => setGift(e.target.value)} />
            <Input style={{ marginRight: '10px' }} htmlSize={8} width='auto' type="text" value={link}
              placeholder='https://image...'
              onChange={(e) => setLink(e.target.value)} />
            <NumberInput size='md' maxW={24} defaultValue={quantity} min={1} onChange={(_, value) => setQuantity(value)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button colorScheme='orange' style={{ marginLeft: '5px' }} onClick={addGift}>Agregar</Button>
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
            {items.length !== 0 ?
              <ul className='list'>
                {
                  items.map((item: any, index: any) => (
                    <div key={index} className='containerLi'>
                      <li className='itemList'>
                        {/* <img src={item.link} width={'40px'} alt="" style={item.link ? { paddingRight: '5px' } : {paddingRight: '5px' ,backgroundColor:'gray'}} /> */}
                        <Image src={item.link} fallbackSrc='https://via.placeholder.com/40' alt='Imagen regalo' boxSize='40px' objectFit='cover' style={{ paddingRight: '5px' } } />
                        {item.gift} (Cantidad: {item.quantity})
                      </li>
                      <Button colorScheme='orange' size='xs' onClick={() => deleteItem(index)}>X</Button>
                    </div>
                  ))
                }
              </ul>
              :
              <div style={{ padding: '10px' }}>
                <Highlight query='Agrega algo!' styles={{ px: '1', py: '1', bg: 'orange.100', rounded: 'full' }}>
                  No hay regalos grinch! Agrega algo!
                </Highlight>

              </div>
            }
          </div>
          <Button colorScheme='orange' onClick={deleteAll}>Eliminar Todo</Button>
        </div>

      </div>
    </>
  )
}

export default App;
