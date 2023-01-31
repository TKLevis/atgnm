import "./index.css";
import { Suspense, useRef, useState } from "react";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { Button, Col, Form } from "react-bootstrap";

//RELIEF
function Relief(props) {
  const { nodes, materials } = useGLTF("/ReliefGNM3.glb");
  const [highlightTuch, setHighlightTuch] = [
    props.highlightTuch,
    props.setHighlightTuch,
  ];
  const [highlightJesus, setHighlightJesus] = [
    props.highlightJesus,
    props.setHighlightJesus,
  ];
  const [infoText, setInfoText] = [props.infoText, props.setInfoText];
  const [canHighlight, setCanHighlight] = [
    props.canHighlight,
    props.setCanHighlight,
  ];
  var currentMatTuch = materials.material0;
  var currentMatJesus = materials.material0;

  //Check Conditions for Highlighting different parts of the mesh with the highlight material(materials.hoverJesus works for every part of the mesh, don't be confused by the name)
  if (highlightTuch === true && canHighlight) {
    currentMatTuch = materials.HoverJesus;
  } else {
    currentMatTuch = materials.material0;
  }

  if (highlightJesus === true && canHighlight) {
    currentMatJesus = materials.HoverJesus;
  } else {
    currentMatJesus = materials.material0;
  }

  return (
    <group {...props} dispose={null}>
      <group rotation={[2.4, -0.05, -0.05]}>
        <mesh
          geometry={nodes.Model_1.geometry}
          material={materials.material0}
        ></mesh>
        <mesh
          onPointerEnter={(e) => setHighlightTuch(true)}
          onPointerLeave={(e) => setHighlightTuch(false)}
          onClick={(e) => {
            setInfoText(
              "Das Schweisstuch, in das sich das Gesicht Jesu eingedrückt hat. Vera Ikon."
            );
          }}
          geometry={nodes.Model_2.geometry}
          material={currentMatTuch}
        ></mesh>
        <mesh
          onPointerEnter={(e) => setHighlightJesus(true)}
          onPointerLeave={(e) => setHighlightJesus(false)}
          onClick={(e) =>
            setInfoText(
              "Dies ist Jesus. Er wurde vor 2000 Jahren geboren und wird von manchen als der Messiahs angesehen. War sicher ein cooler Dude."
            )
          }
          geometry={nodes.Model_3.geometry}
          material={currentMatJesus}
        ></mesh>
        <mesh
          geometry={nodes.Model_4.geometry}
          material={materials.HoverVeronika}
        />
        <mesh
          geometry={nodes.Model_5.geometry}
          material={materials.HoverLeft}
        />
        <mesh
          geometry={nodes.Model_6.geometry}
          material={materials.HoverMiddle}
        />
        <mesh
          geometry={nodes.Model_7.geometry}
          material={materials.HoverRightBack}
        />
        <mesh
          geometry={nodes.Model_8.geometry}
          material={materials.HoverRightFront}
        />
        <mesh
          geometry={nodes.Model_9.geometry}
          material={materials.HoverBroken}
        />
        <mesh
          geometry={nodes.Model_10.geometry}
          material={materials.HoverSchwertreste}
        />
      </group>
    </group>
  );
}

//TEXT UI unterhalb des 3D Modells | Unterteilt in 3 States die über Buttons geändert werden (Besser wären Radiobuttons)
function TextUI(props) {
  const [lernState, setLernState] = [props.lernState, props.setLernState];
  const [canHighlight, setCanHighlight] = [
    props.canHighlight,
    props.setCanHighlight,
  ];
  const [infoText, setInfoText] = [props.infoText, props.setInfoText];
  const [highlightTuch, setHighlightTuch] = [
    props.highlightTuch,
    props.setHighlightTuch,
  ];
  const [highlightJesus, setHighlightJesus] = [
    props.highlightJesus,
    props.setHighlightJesus,
  ];
  const [fragen, setFragen] = [props.fragen, props.setFragen];
  const [questionCounter, setQuestionCounter] = [
    props.questionCounter,
    props.setQuestionCounter,
  ];

  //LERNMODUS
  if (lernState === "Lernmodus") {
    setCanHighlight(true);
    console.log(lernState);
    return (
      <div>
        <h2>Lernmodus: Relief aus dem Germanischen Nationalmuseum</h2>
        <h3>Info: {infoText}</h3>
        <div>
          <Col className="button-column">
            <Button
              type="button"
              className="button1"
              onClick={(e) => setLernState("Quizmodus")}
            >
              {" "}
              Quizmodus{" "}
            </Button>
            <Button
              type="button"
              className="button1"
              onClick={(e) => setLernState("Anschaumodus")}
            >
              {" "}
              Anschaumodus{" "}
            </Button>
          </Col>
        </div>
      </div>
    );
  }

  //QUIZMODUS
  //aktuell ist der Jesus highlight hardcoded -> todo: durch json steuern
  //aktuell muss hier für jedes mesh individuell highlight=false in den button gesetzt werden
  else if (lernState === "Quizmodus") {
    setCanHighlight(true);
    setHighlightJesus(true);
    console.log(lernState + ", Frage 1");
    return (
      <div>
        <h2>Quizmodus: Relief aus dem Germanischen Nationalmuseum</h2>
        <InputField
          fragen={fragen}
          setFragen={setFragen}
          questionCounter={questionCounter}
          setQuestionCounter={setQuestionCounter}
        />
        <div>
          <Col className="button-column">
            <Button
              className="button1"
              type="button"
              onClick={(e) => {
                setHighlightJesus(false);
                setHighlightTuch(false);
                setInfoText(
                  "Klick auf einen hervorgehobenen Bereich um mehr zu lernen!"
                );
                setLernState("Lernmodus");
                setQuestionCounter(0);
              }}
            >
              {" "}
              Lernmodus{" "}
            </Button>
            <Button
              className="button1"
              type="button"
              onClick={(e) => {
                setLernState("Anschaumodus");
                setQuestionCounter(0);
              }}
            >
              {" "}
              Anschaumodus{" "}
            </Button>
          </Col>
        </div>
      </div>
    );
  }

  //ANSCHAUMODUS
  else if (lernState === "Anschaumodus") {
    setCanHighlight(false);

    return (
      <div>
        <h2>Anschaumodus: Relief aus dem Germanischen Nationalmuseum</h2>
        <div>
          <Col className="button-column">
            <Button
              type="button"
              className="button1"
              onClick={(e) => {
                setHighlightJesus(false);
                setHighlightTuch(false);
                setInfoText(
                  "Klick auf einen hervorgehobenen Bereich um mehr zu lernen!"
                );
                setLernState("Lernmodus");
              }}
            >
              {" "}
              Lernmodus{" "}
            </Button>
            <Button
              type="button"
              className="button1"
              onClick={(e) => setLernState("Quizmodus")}
            >
              {" "}
              Quizmodus{" "}
            </Button>
          </Col>
        </div>
      </div>
    );
  }
}

//INPUTFIELD FÜR QUIZ
function InputField(props) {
  const [questionCounter, setQuestionCounter] = [
    props.questionCounter,
    props.setQuestionCounter,
  ];
  const [antwortText, setAntwortText] = useState("");
  const fragen = props.fragen.fragen;
  const type = fragen[questionCounter].type;
  const frage = fragen[questionCounter].frage;
  const richtigeAntworten = fragen[questionCounter].richtigeAntworten;

  function handleAntwortChange(event) {
    console.log(this);
    const { name, value } = event.target;
    setAntwortText(value);
  }

  function afterSubmission() {
    if (richtigeAntworten.includes(antwortText)) {
      if (questionCounter < fragen.length - 1) {
        alert("Richtig!");
        console.log(questionCounter + " < " + fragen.length);
        console.log("Warum TU ICH DAS????");
        setQuestionCounter(questionCounter + 1);
      } else {
        alert("Richtig! Das war die letzte Frage. Bitte beende den Quizmodus");
      }
    } else {
      alert("Falsch!");
    }
  }

  return (
    <div>
      <h3> Frage: {frage} </h3>
      <form>
        <label>
          {" "}
          Antwort:
          <input
            onChange={handleAntwortChange}
            type="text"
            name="antwortText"
            value={antwortText}
          />
        </label>
        <input
          type="button"
          onClick={afterSubmission}
          value=">"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        />
      </form>
    </div>
  );
}

// App-Component nutzt den State-Hook von react. useState returns current state & function that updates it
// App-Component passes state and update-function down to child-components (z.B. TextUI, Relief)
// -> state kann von überall geupdated und gelesen werden über props die der Component von parent gegeben werden
// !!!Schlecht skalierbar: für neue highlightable meshes muss ein state + update-function definiert werden, und zu Relief & TextUI gepasst werden, und dort updates callen
function App() {
  const [infoText, setInfoText] = useState(
    "Klick auf einen hervorgehobenen Bereich um mehr zu lernen!"
  );
  const [lernState, setLernState] = useState("Lernmodus");
  const [highlightTuch, setHighlightTuch] = useState(false);
  const [highlightJesus, setHighlightJesus] = useState(false);
  const [canHighlight, setCanHighlight] = useState(true);
  const [fragen, setFragen] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);

  // FRAGEN LADEN VON JSON
  React.useEffect(() => {
    fetch("/Quiz.json")
      .then((response) => response.json())
      .then((data) => setFragen(data));
  }, []);

  //Hier werden alle JSX-Elemente(ähnlich html) und Components(z.B. Relief und TextUI) zusammengeführt die in index.js gerendert werden
  // außerdem werden den child-components state & update-function als props gegeben
  return (
    <div className="App">
      <div className="wrapper">
        <div className="card">
          <div className="object-canvas">
            <Suspense>
              <Canvas>
                <Environment preset="warehouse" background blur={0.6} />
                <Relief
                  infoText={infoText}
                  setInfoText={setInfoText}
                  canHighlight={canHighlight}
                  setCanHighlight={setCanHighlight}
                  highlightTuch={highlightTuch}
                  setHighlightTuch={setHighlightTuch}
                  highlightJesus={highlightJesus}
                  setHighlightJesus={setHighlightJesus}
                />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                />
              </Canvas>
            </Suspense>
            <TextUI
              questionCounter={questionCounter}
              setQuestionCounter={setQuestionCounter}
              fragen={fragen}
              setFragen={setFragen}
              infoText={infoText}
              setInfoText={setInfoText}
              lernState={lernState}
              setLernState={setLernState}
              canHighlight={canHighlight}
              setCanHighlight={setCanHighlight}
              highlightTuch={highlightTuch}
              setHighlightTuch={setHighlightTuch}
              highlightJesus={highlightJesus}
              setHighlightJesus={setHighlightJesus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
