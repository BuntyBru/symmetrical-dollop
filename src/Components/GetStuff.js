import React, { useEffect, useState } from "react";

function GetStuff() {
  const [list, setList] = useState([]);
  const [formObj, setFormObj] = useState({});
  const [order, setOrder] = useState([
    "greater-than",
    "less-than",
    "percent-change",
  ]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/f794766c-e84b-4888-8802-e39c5959b2ea")
      .then((res) => res.json())
      .then((res) => {
        setList(res);
      });
  }, []);

  const sortValues = () => {
    let t = [...list].sort(
      (x, y) =>
        order.indexOf(x.threshold_condition) -
        order.indexOf(y.threshold_condition)
    );
    setList(t);
  };

  const openForm = (item) => {
    console.log("openForm", item);
    setFormObj(item);
  };

  return (
    <div>
      <table className="myTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th onClick={sortValues}>Threshold Condition</th>
            <th>Threshold Value</th>
            <th>Edit Link</th>
          </tr>
        </thead>
        <tbody>
          {list.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td> {x.name}</td>
              <td> {x.threshold_condition}</td>
              <td>{x.threshold_value}</td>
              <td>
                <button onClick={() => openForm(x)}>Open Form</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-parent">
        <form>
          <div>
            <label>ID</label>
            <input value={formObj.id}></input>
          </div>

          <div>
            <label>Name</label>
            <input value={formObj.name}></input>
          </div>

          <div>
            <label>Threshold Condition</label>
            <input value={formObj.threshold_condition}></input>
          </div>

          <div>
            <label>Threshold Value</label>
            <input value={formObj.threshold_value}></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GetStuff;
