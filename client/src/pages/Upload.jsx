import { useState } from "react";
import API from "../services/api";
function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [previewImage, setPreviewImage] = useState(null);
  const [slideFile, setSlideFile] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);

      formData.append(
        "previewImage",
        previewImage
      );

      formData.append(
        "slideFile",
        slideFile
      );

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/slides",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Slide Uploaded Successfully");

      console.log(res.data);

    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-10">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">
          Upload Case Study
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <div>
            <label className="block mb-1 font-medium">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border p-3 rounded"
              rows="4"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Tags
            </label>

            <input
              type="text"
              value={tags}
              onChange={(e) =>
                setTags(e.target.value)
              }
              placeholder="finance, consulting"
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Preview Image
            </label>

            <label className="cursor-pointer inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-lg hover:bg-slate-900 transition">
              📷 Choose Image

              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setPreviewImage(e.target.files[0])
                }
              />
            </label>

            {previewImage && (
              <p className="mt-2 text-sm text-gray-600">
                {previewImage.name}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              PDF File
            </label>

            <label className="cursor-pointer inline-flex items-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition">
              📄 Choose PDF

              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setSlideFile(e.target.files[0])
                }
              />
            </label>

            {slideFile && (
              <p className="mt-2 text-sm text-gray-600">
                {slideFile.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Upload
          </button>

        </form>

      </div>

    </div>
  );
}

export default Upload;