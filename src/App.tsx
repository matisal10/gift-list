import { useEffect, useState } from 'react'
import './index.css'
import { Button, useDisclosure } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Highlight } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

const giftNames = [
  'Camiseta',
  'Libro',
  'Flores',
  'Perfume',
  'Reloj',
  'Bolso',
  'Juego de mesa',
  'Taza',
  'Peluche',
  'Gafas de sol',
  'Joyas',
  'Pañuelo',
  'Cartera',
  'Zapatillas',
  'Lámpara',
  'Agenda',
  'Bufanda',
  'Maquillaje',
  'Botella de vino',
  'Altavoz Bluetooth',
  'Auriculares',
  'Portátil',
  'Tablet',
  'Batería externa',
  'Videojuego',
  'Cámara',
  'Póster',
  'Sudadera',
  'Pantalones',
  'Calcetines',
];

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
  const [receiver, setReceiver] = useState('');
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [edited, setEdited] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const editItem = (item: any, index: any) => {
    setEdited(true)
    setGift(item.gift)
    setLink(item.link)
    setQuantity(item.quantity)
    setReceiver(item.receiver)
    setEditingIndex(index);
  }

  const editGitf = () => {
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = {
        gift: gift,
        link: link,
        quantity: quantity,
        receiver: receiver,
      };
      setItems(updatedItems);
      setEdited(false);
      setGift("");
      setLink("");
      setQuantity(1);
      setReceiver("");
      setEditingIndex(null);
    }
  }

  const getRandomGiftName = () => {
    const randomIndex = Math.floor(Math.random() * giftNames.length);
    setGift(giftNames[randomIndex]);
  };

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
        setReceiver('')
        setError("");
      } else {
        const newItem = { gift: gift, link: link, quantity: quantity, receiver: receiver };
        setItems([...items, newItem]);
        setGift("");
        setLink('')
        setReceiver('')
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
          <Heading as='h1' size='xl' noOfLines={1}>Regalos:</Heading>
          <Button onClick={onOpen} style={{ marginTop: '10px' }} colorScheme='orange'>Agregar Regalo</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <form className='form'>
                  <div style={{ display: 'flex' }}>
                    <Input style={{ marginBottom: '10px', marginRight:'5px'}} htmlSize={15} width='auto' type="text" value={gift}
                      placeholder='Remera'
                      onChange={(e) => setGift(e.target.value)} />
                    <Button onClick={getRandomGiftName}>Sorprendeme!</Button>
                  </div>
                  <Input style={{ marginBottom: '10px' }} htmlSize={15} width='auto' type="text" value={link}
                    placeholder='https://image...'
                    onChange={(e) => setLink(e.target.value)} />
                  <NumberInput size='md' style={{ marginBottom: '10px' }} maxW='320px' defaultValue={quantity} min={1} onChange={(_, value) => setQuantity(value)}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Input style={{ marginBottom: '10px' }} htmlSize={15} width='auto' type="text" value={receiver}
                    placeholder='Destinatario'
                    onChange={(e) => setReceiver(e.target.value)} />
                  {
                    edited ? <Button colorScheme='orange' style={{ marginLeft: '5px' }} onClick={() => { editGitf(), onClose() }}>Editar</Button>
                      :
                      <Button colorScheme='orange' style={{ marginLeft: '5px' }} onClick={addGift}>Agregar</Button>
                  }
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
              </ModalBody>
            </ModalContent>
          </Modal>
          <div>
            {items.length !== 0 ?
              <ul className='list'>
                {
                  items.map((item: any, index: any) => (
                    <div key={index} className='containerLi'>
                      <li className='itemList'>
                        <Image src={item.link} fallbackSrc='https://via.placeholder.com/40' alt='Imagen regalo' boxSize='40px' objectFit='cover' style={{ paddingRight: '5px' }} />
                        <div style={{ width: '180px' }}>
                          <Text fontSize='lg' as='b'>{item.gift}</Text> X{item.quantity}
                          <Text fontSize='md'>{item.receiver}</Text>
                        </div>
                      </li>
                      <Button colorScheme='orange' size='xs' onClick={() => { editItem(item, index), onOpen() }}>E</Button>
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
