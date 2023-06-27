import { useEffect, useState } from 'react'
import './index.css'
import { Button, Toast, useDisclosure } from '@chakra-ui/react'
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
  const [price, setPrice] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [isOpenSecondModal, setIsOpenSecondModal] = useState(false);

  useEffect(() => {
    if (items.length !== 0) {
      localStorage.setItem('items', JSON.stringify(items));
      calculateTotal(items); // Calcular el total al actualizar los elementos
    }
  }, [items]);

  useEffect(() => {
    const hidePrintButton = () => {
      const printButton = document.querySelector('.print-button');
      if (printButton) {
        printButton.style.display = 'none';
      }
    };
  
    window.addEventListener('beforeprint', hidePrintButton);
  
    return () => {
      window.removeEventListener('beforeprint', hidePrintButton);
    };
  }, []);

  const deleteItem = (indexToDelete: number) => {
    const updatedItems = items.filter((item, index) => index !== indexToDelete);
    setItems(updatedItems);
  }

  const deleteAll = () => {
    setItems([])
    setTotal(0);
  }

  const editItem = (item: any, index: any) => {
    setEdited(true)
    setGift(item.gift)
    setLink(item.link)
    setQuantity(item.quantity)
    setReceiver(item.receiver)
    setEditingIndex(index);
    setPrice(item.price)
  }
  const duplicated = (item: any) => {
    setGift(item.gift)
    setLink(item.link)
    setQuantity(item.quantity)
    setReceiver(item.receiver)
    setPrice(item.price)
  }

  const editGitf = () => {
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = {
        gift: gift,
        link: link,
        quantity: quantity,
        receiver: receiver,
        price: price
      };
      setItems(updatedItems);
      setEdited(false);
      setGift("");
      setLink("");
      setQuantity(1);
      setReceiver("");
      setPrice(0);
      setEditingIndex(null);
      calculateTotal(updatedItems[editingIndex].quantity * updatedItems[editingIndex].price);
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
        setPrice(0);
        setError("");
        calculateTotal(existingItem.quantity * existingItem.price);
      } else {
        const newItem = { gift: gift, link: link, quantity: quantity, receiver: receiver, price: price };
        setItems([...items, newItem]);
        setGift("");
        setLink('')
        setReceiver('')
        setQuantity(1);
        setPrice(0);
        setError("");
        calculateTotal(newItem.quantity * newItem.price);
      }
    } else {
      setError("El regalo no puede estar vacío");
    }
  };

  const calculateTotal = (total: number) => {
    const newTotal = items.reduce((total: number, item: any) => total + item.quantity * item.price, 0);
    const formattedTotal = newTotal.toLocaleString('es-AR');
    setTotal(formattedTotal);
  }
  const openSecondModal = () => {
    setIsOpenSecondModal(true);
  };

  const closeSecondModal = () => {
    setIsOpenSecondModal(false);
  };

  const print = () => {
    window.print();
  }

  return (
    <>
      <div className="App">
        <div className='container'>
          <div>
            <Heading as='h1' size='xl' noOfLines={1}>Regalos:</Heading>
          </div>
          <Button onClick={onOpen} style={{ marginTop: '10px' }} colorScheme='orange'>Agregar Regalo</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <form className='form'>
                  <div style={{ display: 'flex' }}>
                    <Input style={{ marginBottom: '10px', marginRight: '5px' }} htmlSize={15} width='auto' type="text" value={gift}
                      placeholder='Remera'
                      onChange={(e) => setGift(e.target.value)} />
                    <Button onClick={getRandomGiftName}>Sorprendeme!</Button>
                  </div>
                  <Input style={{ marginBottom: '10px' }} htmlSize={15} width='auto' type="text" value={link}
                    placeholder='https://image...'
                    onChange={(e) => setLink(e.target.value)} />
                  <Input style={{ marginBottom: '10px' }} htmlSize={15} width='auto' type="number" value={price}
                    placeholder='3000'
                    onChange={(e) => setPrice(parseInt(e.target.value))} />
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
          <Modal isOpen={isOpenSecondModal} onClose={closeSecondModal} size={'xs'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <div>
                  <Heading as='h1' size='xl' noOfLines={1}>Comprar:</Heading>
                </div>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {items.length !== 0 ?
                  <ul className='list'>
                    {
                      items.map((item: any, index: any) => (
                        <div key={index} className='listPrev'>
                          <li className='itemList'>
                            <Image src={item.link} fallbackSrc='https://via.placeholder.com/40' alt='Imagen regalo' boxSize='40px' objectFit='cover' style={{ paddingRight: '5px' }} />
                            <div style={{ width: '180px' }}>
                              <Text fontSize='lg' as='b'>{item.gift}</Text> x {item.quantity}
                              <Text fontSize='md'>{item.receiver}</Text>
                            </div>
                          </li>
                        </div>
                      ))
                    }
                    <Button colorScheme='orange' className='print-button' size='sm' onClick={() => print()}>Imprimir</Button>
                  </ul>
                  :
                  <div style={{ padding: '10px' }}>
                    <Highlight query='Agrega algo!' styles={{ px: '1', py: '1', bg: 'orange.100', rounded: 'full' }}>
                      No hay regalos grinch! Agrega algo!
                    </Highlight>
                  </div>
                }
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
                          <Text fontSize='lg' as='b'>{item.gift}</Text> x {item.quantity} - ${(item.quantity * item.price).toLocaleString('es-AR')}
                          <Text fontSize='md'>{item.receiver}</Text>
                        </div>
                      </li>
                      <Button colorScheme='orange' size='xs' onClick={() => { editItem(item, index), onOpen() }}>E</Button>
                      <Button colorScheme='orange' size='xs' onClick={() => { duplicated(item), onOpen() }}>D</Button>
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
          <div className="line-2"></div>
          <div className='containerTotal'>
            <Text fontSize='md' as='b'>Total: ${total}</Text>
          </div>
          <div className="line-2" style={{ paddingBottom: '10px' }}></div>
          <Button colorScheme='gray' style={{ marginBottom: '10px' }} onClick={deleteAll}>Eliminar Todo</Button>
          <Button colorScheme='gray' onClick={openSecondModal}>Previsualizar</Button>
        </div>
      </div>
    </>
  )
}

export default App;
