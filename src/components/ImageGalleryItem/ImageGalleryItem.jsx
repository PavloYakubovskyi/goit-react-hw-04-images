import { useState } from 'react';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   // this.setState({ isModalOpen: true });
  //   isModalOpen(true);
  // };

  // const closeModal = () => {
  //   // this.setState({ isModalOpen: false });
  //   isModalOpen(false);
  // };

  const { webformatURL, largeImageURL, tags } = item;

  return (
    <li className="ImageGalleryItem" onClick={() => setIsModalOpen(true)}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <img src={largeImageURL} alt={tags} loading="lazy" />;
        </Modal>
      )}
    </li>
  );
};

export default ImageGalleryItem;
