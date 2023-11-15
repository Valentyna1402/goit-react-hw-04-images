import { useState } from 'react';

import { ModalWindow } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, largeImageURL, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Item>
      <Image onClick={openModal} src={src} alt={alt} />
      <ModalWindow
        modalIsOpen={isModalOpen}
        closeModal={closeModal}
        largeImageURL={largeImageURL}
        alt={alt}
      />
    </Item>
  );
};
