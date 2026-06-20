import API from "../services/api";
function SlideCard({ slide }) {
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slide?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `/slides/${slide._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Slide Deleted Successfully");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={`http://localhost:5000/${slide.previewImage.replace(/\\/g, "/")}`}
        alt={slide.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">
          {slide.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {slide.description}
        </p>

        <a
          href={`http://localhost:5000/${slide.slideFile.replace(/\\/g, "/")}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View PDF
        </a>

        <button
          onClick={handleDelete}
          className="mt-2 ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SlideCard;