import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";

const Product = () => {
  return (
    <section className="flex items-center gap-16 px-36 py-20 max-lg:flex-col max-sm:py-10 max-sm:px-5 mb-10">
      <ImageGallery />
      <Description />
    </section>
  );
};

export default Product;
