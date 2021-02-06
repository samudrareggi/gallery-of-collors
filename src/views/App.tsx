import React, { useEffect, useState } from "react";
import color from "../assets/colors.json";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../assets/css/App.css"

function App() {
  const [colors, setColors] = useState<any>(null);
  const [filter, setFilter] = useState<any>([]);
  const [pick, setPick] = useState("");
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    setColors(color.colors);
  }, []);

  const onClick = (e: any): void => {
    document.execCommand("copy");
  };

  const onCopy = (): void => {
    setCopy(!copy);
    setTimeout(() => {
      setCopy(false);
    }, 500);
  };

  const onChange = (e: any): void => {
    const val = e.target.value;
    const currentColors = [...colors];
    const filtered = currentColors.filter((el) =>
      el["color"].toLowerCase().includes(val.toLowerCase())
    );
    setFilter(filtered);
    console.log(val);
    console.log(filtered);
    
  };

  if (!colors) return <h1>Loading</h1>;

  return (
    <div className="App">
      <div className="container-nav">Gallery of collors</div>
      <div className="container-app">
        <div
          style={{
            marginBottom: 35,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            style={{ width: 500, height: 35 }}
            type="text"
            placeholder="Search"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="container-card">
          {filter.length
            ? filter.map((el: any, id: number) => (
                <div
                  onMouseEnter={() => setPick(el["hex"])}
                  onMouseLeave={() => setPick("")}
                  onClick={() => onClick(el["hex"])}
                  className="card"
                  key={id}
                  style={{ backgroundColor: el["hex"] }}
                >
                  <CopyToClipboard text={el["hex"]} onCopy={() => onCopy()}>
                    <div
                      className={
                        pick === el["hex"] ? "tooltip text-show" : "text-hide"
                      }
                    >
                      {el["color"] + el["hex"]}
                      {copy && <span className="tooltiptext">Copied</span>}
                    </div>
                  </CopyToClipboard>
                </div>
              ))
            : colors.map((el: any, id: number) => (
                <div
                  onMouseEnter={() => setPick(el["hex"])}
                  onMouseLeave={() => setPick("")}
                  onClick={() => onClick(el["hex"])}
                  className="card"
                  key={id}
                  style={{ backgroundColor: el["hex"] }}
                >
                  <CopyToClipboard text={el["hex"]} onCopy={() => onCopy()}>
                    <div
                      className={
                        pick === el["hex"] ? "tooltip text-show" : "text-hide"
                      }
                    >
                      {el["color"] + el["hex"]}
                      {copy && <span className="tooltiptext">Copied</span>}
                    </div>
                  </CopyToClipboard>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
