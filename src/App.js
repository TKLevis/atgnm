import "./index.css";
import { Suspense, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, Environment, useGLTF } from "@react-three/drei";

import ReliefModel from './ReliefGNM7.glb'

import RekonstruktionFotoRelief from './images/RekonstruktionFotoRelief.jpg'
import RekonstruktionFotoReliefKoepfe from './images/RekonstruktionFotoReliefKoepfe.jpg'
import RekonstruktionFotoSchrift from './images/RekonstruktionFotoSchrift.jpg'

//RELIEF
function Relief({
  highlightTuch,
  highlightHeads,
  highlightBroken,
  cameraPosition,
  cameraRotation,
}) {
  const { nodes, materials } = useGLTF(ReliefModel);
  const matHeads = highlightHeads ? materials.HoverJesus : materials.material0;

  return (
    <group dispose={null} rotation={[2.4, -0.05, -0.05]}>
      <OrthographicCamera position={cameraPosition} rotation={cameraRotation}>
        <mesh
          geometry={nodes.Model_1.geometry}
          material={materials.material0}
        />
        <mesh
          geometry={nodes.Model_2.geometry}
          material={highlightTuch ? materials.HoverJesus : materials.material0}
        />
        <mesh
          geometry={nodes.Model_3.geometry}
          material={matHeads}
        />
        <mesh
          geometry={nodes.Model_4.geometry}
          material={matHeads}
        />
        <mesh
          geometry={nodes.Model_5.geometry}
          material={matHeads}
        />
        <mesh
          geometry={nodes.Model_6.geometry}
          material={matHeads}
        />
        <mesh
          geometry={nodes.Model_7.geometry}
          material={matHeads}
        />
        <mesh
          geometry={nodes.Model_8.geometry}
          material={matHeads}
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
      </OrthographicCamera>
    </group>
  );
}

function Intro({ setStartedQuiz }) {
  return (
    <div className="introText">
      <h2>Nürnberger Kreuzweg</h2>
      <div>
        <br />
        In der{" "}
        <a
          href={"http://veranstaltung.gnm.de/raeume/kartaeuserkirche/"}
          target={"_blank"}
          rel="noreferrer"
        >
          Kartäuserkirche
        </a>{" "}
        im Herzen des Germanischen Nationalmuseums schmücken unter anderem sieben steinerne Reliefs die hohen Wände. Mit Hilfe von{" "}
        <a
          href={"https://de.wikipedia.org/wiki/Photogrammetrie"}
          target={"_blank"}
          rel="noreferrer"
        >
          Fotogrammetrie
        </a>{" "}
        konnten diese als 3D-Modelle in den digitalen Raum
        transportiert werden. Nun könnt ihr hier mit einem kleinen Quiz die
        vierte dieser Stationen erkunden und auch kleine versteckte Details in
        der beweglichen Ansicht entdecken!
      </div>
      <br />

      <h3>Die vierte Station</h3>
      <div>
        <br />
        Einer Legende zufolge soll sich das Szenario während des
        Weges Christi zu seiner Kreuzigung zugetragen haben. Es geht um eine
        Frau, die angeblich seit 12 Jahren an einem nicht aufhörenden
        Blutfluss litt und der Meinung war, dass sie, wenn sie Jesus berühre,
        gesund werden würden. Der Bildhauer Adam Kraft erschuf in Nürnberg auf
        Grundlage dieser Legende eine seiner sieben Kreuzwegstationen.
        <br />
        Um mehr über die Geschichte und das Bildmotiv zu erfahren, klickt euch durch
        das Quiz!
      </div>

      <div className="flex-right">
        <button onClick={() => { setStartedQuiz(true); }}>
          {'Starte Quiz'}
        </button>
      </div>
    </div>
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
  setStartedQuiz,
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
            rel="noreferrer"
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
            rel="noreferrer"
          >
            {" "}
            Germanische Nationalmuseum
          </a>{" "}
          gebracht. An den ursprünglichen Standorten haben Repliken ihre
          Positionen eingenommen und ermöglichen somit weiterhin die Begehung des
          dem Kreuzweg nachempfundenen Weges.
        </div>
      ),
      preHook: () => {
        // clear everything in case quiz is restarted
        //setCameraPosition(cameraPositionStart);
        //setCameraRotation(cameraRotationStart);
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
          Schweiß und Blut ein Abbild seiner Selbst darauf hinterlassen haben. Das
          Objekt selbst gilt als eine der kostbarsten und am meisten verehrten
          Reliquien der Christenheit und wird im Petersdom in Rom aufbewahrt.
        </div>
      ),
      preHook: () => {
        // TODO setting camera-position/-rotation fucks everything up if the
        // camera has been moved before by the user
        //setCameraPosition([6, 15, 2]);
        //setCameraRotation([0.0, 0.5, 0.5]);
        setHighlightTuch(true);
      },
      postHook: null,
    },
    {
      question:
        "Wie heißt das mit dem Objekt verbundene Bildmotiv in der Ikonographie?",
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
          Germanischen Nationalmuseum zu sehende Relief enthält nach jetzigem
          Stand noch <b>6 Köpfe</b>. Neben der heiligen Veronika, die mit einer
          Magd aus einem Haus tritt, befinden sich auch eine Reihe von Söldnern in
          der Szene.
        </div>
      ),
      preHook: () => {
        //setCameraPosition(cameraPositionStart);
        //setCameraRotation(cameraRotationStart);
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
          die Gegenüberstellung wird deutlich, wie viele Elemente der Szene in den
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
      question: "Versuche die Inschrift zu übersetzen: fülle die Lücken.",
      choices: [], // irrelevant
      type: "gapfill",
      correctAnswer: 0, // irrelevant
      info: (
        <div>
          "Hier hat Cristus sein heiligs Angesicht der heiligen Fraw Veronika auf
          iren Slayr gedruckt vor irem Haus Vc Srytt von Pilatus Haws"
          <br />
          Unterhalb der Reliefe befanden sich ursprünglich auch Inschriften, die
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

  const dropdownSelectRefs = useRef([]);

  const onClickNext = () => {
    if (type === 'gapfill') {
      const elems = dropdownSelectRefs.current;

      for (let i = 0; i < elems.length; ++i) {
        if (elems[i].value !== "1") {
          console.log(i + " is wrong");
          setBadAnswer(true);
          return;
        }
      }

      if (showInfo) {
        setSelectedAnswer(null);
        if (activeQuestion === questions.length - 1) {
          setStartedQuiz(false);
        }
        setActiveQuestion((prev) => (prev + 1) % questions.length);
        setShowInfo(false);
      }
      setShowInfo(!showInfo);
      setBadAnswer(false);
    } else if (selectedAnswer === correctAnswer) {
      if (showInfo) {
        setSelectedAnswer(null);
        if (activeQuestion === questions.length - 1) {
          setStartedQuiz(false);
        }
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
  };

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
          case 'gapfill':
            return (
              <div className="gapfilltext">
                Hier hat
                <Form.Select ref={el => dropdownSelectRefs.current[0] = el}>
                  <option value="0"></option>
                  <option value="2">Christuslein</option>
                  <option value="1">Christus</option>
                  <option value="3">Ceilstus</option>
                  <option value="4">Greiffus</option>
                </Form.Select>
                sein heiliges
                <Form.Select ref={el => dropdownSelectRefs.current[1] = el}>
                  <option value="0"></option>
                  <option value="1">Angesicht</option>
                  <option value="3">Angesucht</option>
                  <option value="2">Ungelicht</option>
                </Form.Select>
                der heiligen
                <Form.Select ref={el => dropdownSelectRefs.current[2] = el}>
                  <option value="0"></option>
                  <option value="1">Frau</option>
                  <option value="3">Year</option>
                  <option value="2">Jahr</option>
                  <option value="4">Yeaw</option>
                </Form.Select>
                Veronika
                <Form.Select ref={el => dropdownSelectRefs.current[3] = el}>
                  <option value="0"></option>
                  <option value="2">aus</option>
                  <option value="1">auf</option>
                  <option value="3">als</option>
                </Form.Select>
                <Form.Select ref={el => dropdownSelectRefs.current[4] = el}>
                  <option value="0"></option>
                  <option value="3">ihr</option>
                  <option value="2">irisch</option>
                  <option value="1">ihren</option>
                </Form.Select>
                <Form.Select ref={el => dropdownSelectRefs.current[5] = el}>
                  <option value="0"></option>
                  <option value="3">Sklaven</option>
                  <option value="2">Slane</option>
                  <option value="1">Schleier</option>
                </Form.Select>
                <Form.Select ref={el => dropdownSelectRefs.current[6] = el}>
                  <option value="0"></option>
                  <option value="3">gedruckt</option>
                  <option value="2">geprügelt</option>
                  <option value="1">gedrückt</option>
                  <option value="4">gebrüllt</option>
                </Form.Select>
                <Form.Select ref={el => dropdownSelectRefs.current[7] = el}>
                  <option value="0"></option>
                  <option value="1">vor</option>
                  <option value="2">nor</option>
                  <option value="3">von</option>
                </Form.Select>
                ihrem Haus
                <Form.Select ref={el => dropdownSelectRefs.current[8] = el}>
                  <option value="0"></option>
                  <option value="2">250</option>
                  <option value="3">300</option>
                  <option value="1">500</option>
                  <option value="4">11c</option>
                </Form.Select>
                <Form.Select ref={el => dropdownSelectRefs.current[9] = el}>
                  <option value="0"></option>
                  <option value="3">Sept</option>
                  <option value="1">Schritt</option>
                  <option value="2">Seytt</option>
                </Form.Select>
                <Form.Select ref={el => dropdownSelectRefs.current[10] = el}>
                  <option value="0"></option>
                  <option value="3">vor</option>
                  <option value="2">nor</option>
                  <option value="1">von</option>
                </Form.Select>
                <Form.Select ref={el => dropdownSelectRefs.current[11] = el}>
                  <option value="0"></option>
                  <option value="3">Dilatus</option>
                  <option value="2">Pilates</option>
                  <option value="1">Pilatus</option>
                  <option value="4">Pilafust</option>
                </Form.Select>
                <Form.Select ref={el => dropdownSelectRefs.current[12] = el}>
                  <option value="0"></option>
                  <option value="2">Hans</option>
                  <option value="4">Gaus</option>
                  <option value="1">Haus</option>
                  <option value="3">Gans</option>
                </Form.Select>
              </div>
            )
          default:
            return ('we fucked up lol sorry')
        }
      })()}
      <div className="flex-right">
        <button onClick={onClickNext} disabled={selectedAnswer === null && type !== 'gapfill'}>
          {!showInfo
            ? "Stimmts?"
            : activeQuestion === questions.length - 1
              ? "Zurück zum Anfang"
              : "Weiter"}
        </button>
      </div>

      {badAnswer && (
        <div className="infoText">
          Leider nicht richtig. Versuche es nochmal!
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

// App-Component nutzt den State-Hook von react. useState returns current state & function that updates it
// App-Component passes state and update-function down to child-components (z.B. TextUI, Relief)
// -> state kann von überall geupdated und gelesen werden über props die der Component von parent gegeben werden
// !!!Schlecht skalierbar: für neue highlightable meshes muss ein state + update-function definiert werden, und zu Relief & TextUI gepasst werden, und dort updates callen
function App() {
  const [highlightTuch, setHighlightTuch] = useState(false);
  const [highlightHeads, setHighlightHeads] = useState(false);
  const [highlightBroken, setHighlightBroken] = useState(false);

  const cameraPositionStart = [6, 5, 13];
  const cameraRotationStart = [0.0, 0.05, 0.0];
  const [cameraPosition, setCameraPosition] = useState(cameraPositionStart);
  const [cameraRotation, setCameraRotation] = useState(cameraRotationStart);
  const [image, setImage] = useState(null);

  const [startedQuiz, setStartedQuiz] = useState(false);

  useEffect(() => {
    // in case quiz is restarted
    if (!startedQuiz) {
      setHighlightTuch(false);
      setHighlightHeads(false);
      setHighlightBroken(false);
      setImage(null);
    }
  }, [startedQuiz]);

  // TODO initially show that model is movable?

  // Hier werden alle JSX-Elemente(ähnlich html) und Components(z.B. Relief und TextUI) zusammengeführt die in index.js gerendert werden
  // außerdem werden den child-components state & update-function als props gegeben
  return (
    <div className="wrapper">
      <div className="card wrapper-column">
        <div className="relief">
          <Suspense>
            <Canvas>
              <Environment preset="warehouse" background blur={0.6}/>
              <Relief
                highlightTuch={highlightTuch}
                highlightHeads={highlightHeads}
                highlightBroken={highlightBroken}
                cameraPosition={cameraPosition}
                cameraRotation={cameraRotation}
              />
              <OrbitControls />
            </Canvas>
          </Suspense>
        </div>

        {image && (
          <img src={image}/>
        )}
      </div>

      <div className="card table">
        <div className="quiz">
          {!startedQuiz ? (
            <Intro
              setStartedQuiz={setStartedQuiz}
            />
          ) : (
            <QuizUI
              setHighlightTuch={setHighlightTuch}
              setHighlightHeads={setHighlightHeads}
              setHighlightBroken={setHighlightBroken}
              cameraPositionStart={cameraPositionStart}
              cameraRotationStart={cameraRotationStart}
              setCameraPosition={setCameraPosition}
              setCameraRotation={setCameraRotation}
              setImage={setImage}
              setStartedQuiz={setStartedQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
