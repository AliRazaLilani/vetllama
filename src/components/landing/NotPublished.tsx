import NotPublishedImg from '/images/notpublishedimg.png';

const NotPublished = () => {
  return (
    <div className="min-h-[400px] h-screen bg-[#EFF9F9] flex flex-col items-center justify-center font-sans text-gray-900 overflow-x-hidden">
      <img src={NotPublishedImg} alt="Not Published" className="w-full" />
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] tracking-tight text-center my-4">
        This page is not published yet.
        <h4 className="text-md sm:text-lg md:text-xl lg:text-2xl tracking-tight text-center my-4">
          Please check back later.
        </h4>
      </h2>
    </div>
  );
};

export default NotPublished;
