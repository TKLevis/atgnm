import "./index.css";
import { Suspense, useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Environment, useGLTF } from "@react-three/drei";

import ReliefModel from './ReliefGNM3.glb'

import black from './images/black.png'
import RekonstruktionFoto from './images/RekonstruktionFoto.jpg'
import RekonstruktionFotoRelief from './images/RekonstruktionFotoRelief.jpg'
import RekonstruktionFotoSchrift from './images/RekonstruktionFotoSchrift.jpg'

//RELIEF
function Relief({
  highlightTuch,
  setHighlightTuch,
  highlightJesus,
  setHighlightJesus,
  highlightHeads,
  highlightBroken,
  setInfoText,
  canHighlight,
  cameraPosition,
  cameraRotation,
}) {
  const { nodes, materials } = useGLTF(ReliefModel);

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
    <group dispose={null} rotation={[2.4, -0.05, -0.05]}>
      <PerspectiveCamera position={cameraPosition} rotation={cameraRotation}>
        <mesh
          geometry={nodes.Model_1.geometry}
          material={materials.material0}
        />
        <mesh
          // TODO delete?
          onPointerEnter={() => setHighlightTuch(true)}
          onPointerLeave={() => setHighlightTuch(false)}
          onClick={() => {
            setInfoText(
              "Das Schweisstuch, in das sich das Gesicht Jesu eingedrückt hat. Vera Ikon."
            );
          }}
          geometry={nodes.Model_2.geometry}
          material={highlightTuch ? materials.HoverJesus : materials.material0}
        />
        <mesh
          onPointerEnter={() => setHighlightJesus(true)}
          onPointerLeave={() => setHighlightJesus(false)}
          onClick={() =>
            setInfoText(
              "Dies ist Jesus. Er wurde vor 2000 Jahren geboren und wird von manchen als der Messiahs angesehen. War sicher ein cooler Dude."
            )
          }
          geometry={nodes.Model_3.geometry}
          material={highlightHeads || highlightJesus ? materials.HoverJesus : materials.material0}
        />
        <mesh
          geometry={nodes.Model_4.geometry}
          material={highlightHeads ? materials.HoverVeronika : materials.material0}
        />
        <mesh
          geometry={nodes.Model_5.geometry}
          material={highlightHeads ? materials.HoverLeft : materials.material0}
        />
        <mesh
          geometry={nodes.Model_6.geometry}
          material={highlightHeads ? materials.HoverMiddle : materials.material0}
        />
        <mesh
          geometry={nodes.Model_7.geometry}
          material={highlightHeads ? materials.HoverRightBack : materials.material0}
        />
        <mesh
          geometry={nodes.Model_8.geometry}
          material={highlightHeads ? materials.HoverRightFront : materials.material0}
        />
        <mesh
          geometry={nodes.Model_9.geometry}
          material={highlightBroken ? materials.HoverBroken : materials.material0}
        />
        <mesh
          geometry={nodes.Model_10.geometry}
          // TODO ?
          //material={materials.HoverSchwertreste}
          material={materials.material0}
        />
      </PerspectiveCamera>
    </group>
  );
}

// "inspired" from https://www.codevertiser.com/quiz-app-using-reactjs/
function QuizUI({
  setHighlightTuch,
  setHighlightHeads,
  setHighlightBroken,
  cameraPositionStart,
  cameraRotationStart,
  setCameraPosition,
  setCameraRotation,
  setImage,
}) {
  const questions = [
    {
      question: "Wann wurde das Relief erstellt?",
      choices: ["ca. 1400", "ca. 1500", "ca. 1600", "ca. 1700"],
      type: "MCQ",
      correctAnswer: 1,
      info: (
        <div>
          Das Relief wurde <b>1506-1508</b> vom Nürnberger Bildhauer und
          Baumeister Adam Kraft geschaffen.
          <br />
          Es ist Teil des{" "}
          <a
            href={"https://de.wikipedia.org/wiki/N%C3%BCrnberger_Kreuzweg"}
            target={"_blank"}
          >
            Nürnberger Kreuzwegs
          </a>
          , dessen 7 Stationen sich einst entlang der Burgschmietstraße zum
          Johannisfriedhof erstreckten. Zwischen 1889 und 1954 wurden die
          Originale ins{" "}
          <a
            href={
              "https://www.gnm.de/ausstellungen/sonderausstellungen-rueckblick/adam-kraft/"
            }
            target="_blank"
          >
            {" "}
            Germanischen Nationalmuseum
          </a>{" "}
          gebracht. An den ursprünglichen Standorten haben Repliken ihre
          Positionen eingenommen und ermöglichen somit weiterhin die Begehung des
          dem Kreuzweg nachempfundenen Weges.
        </div>
      ),
      preHook: () => {
        // clear everything in case quiz is restarted
        setCameraPosition(cameraPositionStart);
        setCameraRotation(cameraRotationStart);
        setHighlightTuch(false);
        setHighlightHeads(false);
        setHighlightBroken(false);
        setImage(null);
      },
      postHook: null,
    },
    {
      question: "Woraus ist dieses Relief gemacht?",
      choices: [
        "Bamberger Lehm",
        "Weimarer Travertin (Kalkstein)",
        "Nürnberger Burgsandstein",
        "Griechischer Marmor",
      ],
      type: "MCQ",
      correctAnswer: 2,
      info: (
        <div>
          Die sieben monumentalen Reliefs aus <b>Nürnberger Burgssandstein</b>{" "}
          stellen eines der ältesten Beispiele der Bildgattung des Kreuzwegs im
          deutschen Sprachraum dar. Sie sind ein ganz und gar lokales Produkt und
          zeigen die wichtigsten Stationen des in der Bibel beschriebenen
          Kreuzweges Jesu.
        </div>
      ),
      preHook: null,
      postHook: null,
    },
    {
      question: "Wie nennt man das markierte Objekt?",
      choices: [
        "Marientuch",
        "Schweißtuch der Veronika",
        "Christus Druck",
        "Römischer Lappen",
      ],
      type: "MCQ",
      correctAnswer: 1,
      info: (
        <div>
          Das <b>Schweißtuch der Veronika</b> oder auch Schweißtuch Christi
          genannt ist Teil der christlichen Überlieferung des Kreuzwegs. Christus
          soll sein Gesicht in das Tuch gedrückt haben und durch zurückbleibenden
          Schweiß und Blut ein Abbild seinerselbst darauf hinterlassen haben. Das
          Objekt selbst gilt als eine der kostbarsten und am meisten verehrten
          Reliquien der Christenheit und wird im Petersdom in Rom aufbewahrt.
        </div>
      ),
      preHook: () => {
        setCameraPosition([6, 15, 2]);
        setCameraRotation([0.0, 0.5, 0.5]);
        setHighlightTuch(true);
      },
      postHook: null,
    },
    {
      question:
        "Wie heißt der mit dem Objekt verbundene Bildmotiv in der Ikonographie?",
      choices: ["imprimo simulacrum", "Marienbild", "Vera Ikon"],
      type: "MCQ",
      correctAnswer: 2,
      info: (
        <div>
          Der Name der Veronika wird in der westlichen Lesart als Zusammensetzung
          des lateinischen Wortes <i>vera</i> für "wahr" und des griechischen{" "}
          <i>Εικών (ikon)</i> für "Bild" gedeutet. Gleichzeitig ist der Begriff
          "Vera Ikon" auch ein Anagramm des Namens der heiligen Veronika. Das{" "}
          <i>Vera Ikon</i> gilt als das "wahre Abbild" Christi und ist als Motiv
          Gegenstand vieler Kunstwerke geworden.
        </div>
      ),
      preHook: () => {
        // unset because of previous question
        setHighlightTuch(false);
      },
      postHook: null,
    },
    {
      question: "Wie viele Köpfe siehst du im Relief?",
      choices: ["6", "7", "8", "9", "10"],
      type: "MCQ",
      correctAnswer: 0,
      info: (
        <div>
          Einige Körper scheinen die dazugehörigen Köpfe verloren zu haben. Das im
          GNM zu sehende Relief enthält nach jetzigem Stand noch <b>6 Köpfe</b>.
          Neben der heiligen Victoria, die mit einer Magd aus einem Haus tritt,
          befinden sich auch eine Reihe von Söldnern in der Szene.
        </div>
      ),
      preHook: () => {
        setCameraPosition(cameraPositionStart);
        setCameraRotation(cameraRotationStart);
      },
      postHook: () => {
        setHighlightHeads(true);
      },
    },
    {
      question:
        "Wie viele Köpfe siehst du in der rekonstruierten Version des Reliefs?",
      choices: ["6", "7", "8", "9", "10"],
      type: "MCQ",
      correctAnswer: 4,
      info: (
        <div>
          Für die Anfertigung der Repliken wurde anhand von historischen Quellen
          versucht, der ursprüngliche Zustand der Werke wiederherzustellen. Durch
          die Gegenüberstellung wird deutlich wie viele Elemente der Szene in den
          fast 500 Jahren der Witterung und Zerstörung zum Opfer fielen - so
          scheinbar auch viele Söldnerfiguren, die sich eigentlich im Hintergrund
          befanden.
        </div>
      ),
      preHook: () => {
        // unset because of previous question
        setHighlightHeads(false);
        setImage(RekonstruktionFotoRelief);
      },
      postHook: () => {
        setImage(RekonstruktionFotoReliefKoepfe);
      },
    },
    {
      question: "Versuche die Inschrift zu übersetzen: fülle die Lücken",
      choices: ["6", "7", "8", "9"],
      type: "MCQ", // TODO lueckentext
      correctAnswer: 0,
      info: (
        <div>
          "Hier hat Cristus sein heiligs Angesicht der heiligen Fraw Veronica auf
          iren Slayr gedruckt vor irem Haus Vc Srytt von Pilatus Haws"
          <br />
          Unterhalb der Relief befanden sich ursprünglich auch Inschriften, die
          die Szene beschreiben und noch heute an den Stationen des Nürnberger
          Kreuzwegs unter den Repliken zu lesen sind.
        </div>
      ),
      preHook: () => {
        setImage(RekonstruktionFotoSchrift);
      },
      postHook: null,
    },
  ];

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [badAnswer, setBadAnswer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const { question, choices, type, correctAnswer, info, preHook, postHook } =
    questions[activeQuestion];

  const onClickNext = () => {
    if (selectedAnswer === correctAnswer) {
      if (showInfo) {
        setSelectedAnswer(null);
        setActiveQuestion((prev) => (prev + 1) % questions.length);
        setShowInfo(false);
      }
      setShowInfo(!showInfo);
      setBadAnswer(false);
    } else {
      setBadAnswer(true);
    }
  };

  const onAnswerSelected = (index) => {
    setSelectedAnswer(index);
  }

  useEffect(() => {
    if (!showInfo && preHook != null) {
      preHook();
    }
    if (showInfo && postHook != null) {
      postHook();
    }
  }, [activeQuestion, showInfo]);

  return (
    <div className="quiz-container">
      <div>
        <span className="active-question-no">
          {activeQuestion + 1}
        </span>
        <span className="total-question">
          /{questions.length}
        </span>
      </div>
      <h2>{question}</h2>
      {(() => {
        switch (type) {
          case 'MCQ':
            return (
              <ul>
                {choices.map((answer, index) => (
                  <li
                    // if the info is shown, we effectively disable the buttons
                    onClick={showInfo ? null : () => onAnswerSelected(index)}
                    key={answer}
                    className={
                      selectedAnswer === index ? 'selected-answer' : null
                    }>
                    {answer}
                  </li>
                ))}
              </ul>
            )
          case 'slider': // TODO this is shit?
            return (
              <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
                )
          default:
            return ('you fucked up lol')
        }
      })()}
      <div className="flex-right">
        <button onClick={onClickNext} disabled={selectedAnswer === null}>
          {!showInfo ? 'Stimmts?' : activeQuestion === questions.length - 1 ? 'Nochmal' : 'Weiter'}
        </button>
      </div>

      {badAnswer && (
        <div className="infoText">
          Leider nicht richtig, versuche es nochmal!
        </div>
      )}
      {showInfo && (
        <div className="infoText">
          {info}
        </div>
      )}
    </div>
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
              onClick={() => setLernState("Quizmodus")}
            >
              {" "}
              Quizmodus{" "}
            </Button>
            <Button
              type="button"
              className="button1"
              onClick={() => setLernState("Anschaumodus")}
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
              onClick={() => {
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
              onClick={() => {
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
              onClick={() => {
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
              onClick={() => setLernState("Quizmodus")}
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
  const frage = fragen[questionCounter].frage;
  const richtigeAntworten = fragen[questionCounter].richtigeAntworten;

  function handleAntwortChange(event) {
    console.log(this);
    const { value } = event.target;
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
  const [highlightHeads, setHighlightHeads] = useState(false);
  const [highlightBroken, setHighlightBroken] = useState(false);
  const [canHighlight, setCanHighlight] = useState(true);
  const [fragen, setFragen] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);

  const cameraPositionStart = [6, 5, 13];
  const cameraRotationStart = [0.0, 0.05, 0.0];
  const [cameraPosition, setCameraPosition] = useState(cameraPositionStart);
  const [cameraRotation, setCameraRotation] = useState(cameraRotationStart);
  const [image, setImage] = useState(null);

  // FRAGEN LADEN VON JSON
  useEffect(() => {
    fetch("/Quiz.json")
      .then((response) => response.json())
      .then((data) => setFragen(data));
  }, []);

  // TODO initially show that model is movable?

  //Hier werden alle JSX-Elemente(ähnlich html) und Components(z.B. Relief und TextUI) zusammengeführt die in index.js gerendert werden
  // außerdem werden den child-components state & update-function als props gegeben
  return (
    <div className="wrapper">
      <div className="card wrapper-column">
        <div className="relief">
          <Suspense>
            <Canvas>
              <Environment preset="warehouse" background blur={0.6}/>
              <Relief
                infoText={infoText}
                setInfoText={setInfoText}
                canHighlight={canHighlight}
                setCanHighlight={setCanHighlight}
                highlightTuch={highlightTuch}
                setHighlightTuch={setHighlightTuch}
                highlightJesus={highlightJesus}
                setHighlightJesus={setHighlightJesus}
                highlightHeads={highlightHeads}
                highlightBroken={highlightBroken}
                cameraPosition={cameraPosition}
                cameraRotation={cameraRotation}
              />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
              />
            </Canvas>
          </Suspense>
        </div>

        {image && (
          <img src={image}/>
        )}
      </div>

      <div className="card table">
        <div className="quiz">
          <QuizUI
            setHighlightTuch={setHighlightTuch}
            setHighlightHeads={setHighlightHeads}
            setHighlightBroken={setHighlightBroken}
            cameraPositionStart={cameraPositionStart}
            cameraRotationStart={cameraRotationStart}
            setCameraPosition={setCameraPosition}
            setCameraRotation={setCameraRotation}
            setImage={setImage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
