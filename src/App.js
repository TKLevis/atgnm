import "./index.css";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Environment, useGLTF } from "@react-three/drei";

import ReliefModel from './ReliefGNM3.glb'

import RekonstruktionFotoRelief from './images/RekonstruktionFotoRelief.jpg'
import RekonstruktionFotoReliefKoepfe from './images/RekonstruktionFotoReliefKoepfe.jpg'
import RekonstruktionFotoSchrift from './images/RekonstruktionFotoSchrift.jpg'

//RELIEF
function Relief({
  highlightTuch,
  setHighlightTuch,
  highlightHeads,
  highlightBroken,
  cameraPosition,
  cameraRotation,
}) {
  const { nodes, materials } = useGLTF(ReliefModel);

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
          geometry={nodes.Model_2.geometry}
          material={highlightTuch ? materials.HoverJesus : materials.material0}
        />
        <mesh
          geometry={nodes.Model_3.geometry}
          material={highlightHeads ? materials.HoverJesus : materials.material0}
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

function Intro({ setStartedQuiz }) {
  return (
    <div className="introText">
      <h2>Nürnberger Kreuzweg - Station 4</h2>
      <div>
        Im Germanischen Nationalmuseum in der Kartäuserkirche schmücken unter
        anderem sieben steinerne Reliefs die hohen Wände. Mit Hilfe von
        Fotogrammetrie konnten diese als 3D-Modelle in den digitalen Raum
        transportiert werden. Nun könnt ihr hier mit einem kleinen Quiz die
        vierte dieser Stationen erkunden und auch kleine versteckte Details in
        der beweglichen Ansicht entdecken!
      </div>
      <br />

      <h3>Die vierte Station</h3>
      <div>
        Einer biblischen Legende zufolge soll sich das Szenario während des
        Weges Christi zu seiner Kreuzigung zugetragen haben. Es geht um eine
        Frau, die angeblich seit 12 Jahren an einem nicht aufhörenden
        Blutfluss litt und der Meinung war, dass sie, wenn sie Jesus berühre,
        gesund werden würden. Der Künstler Adam Kraft erschuf in Nürnberg auf
        Grundlage dieser Legende eine seiner sieben Kreuzwegstationen Christi.
        <br />
        Um den weiteren Fortgang der Legende zu erfahren, klickt euch durch
        das Quiz! Darin erfahrt ihr alle Einzelheiten, auch zu der Umsetzung
        des Künstlers Adam Kraft in Nürnberg.
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
          {!showInfo
            ? "Stimmts?"
            : activeQuestion === questions.length - 1
              ? "Zurück zum Anfang"
              : "Weiter"}
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
                setHighlightTuch={setHighlightTuch}
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
