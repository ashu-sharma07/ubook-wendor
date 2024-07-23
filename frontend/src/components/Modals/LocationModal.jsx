import React, { useState } from 'react'
import ModalComponent from './Modal'
import { useModalContext } from '../../context/ModalContext'
import { useAddressContext } from '../../context/AddressContext';

export default function LocationModal() {
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    pinCode: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };
  const { setLocationModalOpen, locationModalOpen } = useModalContext();
  const { address, updateUserAddress } = useAddressContext();
  return (
    <ModalComponent action={() => {
      updateUserAddress(formData);
      setLocationModalOpen(false);
    }} title='Add Address' isOpen={locationModalOpen} setIsOpen={setLocationModalOpen}>
      <div className='w-full flex gap-2 flex-col'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='street'>Street</label>
          <input onChange={handleInputChange} value={formData.street} className='border w-full rounded-md px-3 py-2 focus:outline-none' placeholder='Enter Street' name='street' id='street' type='text' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='city'>City</label>
          <input onChange={handleInputChange} value={formData.city} className='border w-full rounded-md px-3 py-2 focus:outline-none' placeholder='Enter your city' name='city' id='city' type='text' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='pinCode'>Pincode</label>
          <input maxLength={6} minLength={6} onChange={handleInputChange} value={formData.pinCode} className='border w-full rounded-md px-3 py-2 focus:outline-none' placeholder='Enter pincode' name='pinCode' id='pinCode' type='number' />
        </div>
      </div>
    </ModalComponent>
  )
}
