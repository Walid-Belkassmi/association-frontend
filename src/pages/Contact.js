import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Contact = () => {
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const [slug, setSlug] = useState("konexio");
  const navigate = useNavigate();

  const handleChangeObject = (e) => {
    setObject(e.target.value);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleChangeSelect = (e) => {
    setSlug(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedMessage = {
      object,
      slug,
      message,
    };

    const request = await fetch(`http://localhost:5000/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedMessage),
    });

    console.log(editedMessage);
    if (request.status === 200) {
      navigate(`/${slug}`);
    } else {
      alert("Bad request");
    }
  };

  return (
    <>
      <h1 className="text-center mb-5">Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Object
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your object"
            onChange={handleChangeObject}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="grid-association">Association</label>
          <div className="relative">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleChangeSelect}
              value={slug}
            >
              <option value="les-restos-du-coeur">Les Restos du Coeur</option>
              <option value="unicef">UNICEF</option>
              <option value="konexio">Konexio</option>
            </select>
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label mt-3"
          >
            Example textarea
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={handleChangeMessage}
          ></textarea>
        </div>
        <div>
          <button type="button" className="btn btn-light">
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
