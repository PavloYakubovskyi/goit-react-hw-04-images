import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ items }) => {
  return (
    <ul className="ImageGallery">
      {items.map((item) => (
        <ImageGalleryItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default ImageGallery;
