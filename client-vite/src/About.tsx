import CustomNavbar from "./CustomNavbar";

export default function About() {
  return (
    <>
      <CustomNavbar />
      <div className="py-16">
        <div className="container m-auto px-6 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-8/12">
              <video
                autoPlay={true}
                muted
                loop
                width={1920}
                height={1080}
                src="https://pja.edu.pl/wp-content/uploads/2023/02/2022-HIGHLIGHTS-20-SEKUND-2023-01-30.mp4"
              ></video>
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl font-bold md:text-4xl">
                Single Layer Neural Network
              </h2>
              <p className="mt-6">
                The aim of this project was to create a single layer neural
                network that would be able to recognize the language of the
                given text. The network was trained on 4 languages: Polish,
                English, Spanish and German. The network was trained on 7 files
                with 250 words each.
              </p>
              <p className="mt-5">
                The project was made as a part of the Neural Networks course at
                the
                <a className="hover:text-secondary" href="https://pja.edu.pl/">
                  {" "}
                  Polish-Japanese Academy of Information Technology
                </a>{" "}
                (
                <a className="hover:text-secondary" href="https://pja.edu.pl/">
                  PJAIT
                </a>
                ).
                <br/>
                <br/>
                <a className="hover:text-secondary" href="https://github.com/SirCypkowskyy/Single-Layer-Neural-Network-LR">Project's Github Repository</a>
              </p>
              <p className="mt-6">
                <div className="text-center">
                  <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tigh">
                    Tech Stack
                  </h3>
                </div>
                {/* CLient Tech Stack */}
                <div className="h-auto p-8 rounded shadow-lg flex flex-col justify-between">
                  <div
                    id="title"
                    className="text-2xl text-center font-bold mb-4"
                  >
                    Client
                  </div>
                  <div
                    id="list"
                    className="w-5/6 h-auto flex flex-wrap justify-center items-center m-auto"
                  >
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      React
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      React Router
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      React-use
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Typescript
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Tailwindcss
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      DaisyUI
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Flags-Icons
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Apexcharts
                    </div>
                  </div>
                </div>
        
                {/* Server Tech Stack */}
                <div className="h-auto p-8 rounded shadow-lg flex flex-col justify-between">
                  <div
                    id="title"
                    className="text-2xl text-center font-bold mb-4"
                  >
                    Server
                  </div>
                  <div
                    id="list"
                    className="w-5/6 h-auto flex flex-wrap justify-center items-center m-auto"
                  >
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Python 3.10 
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Unidecode
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Requests
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Rich
                    </div>
                    <div
                      id="item"
                      className="w-auto h-8 bg-secondary text-secondary-content font-bold flex items-center px-4 rounded shadow-md m-2"
                    >
                      Urllib
                    </div>
                  </div>
                </div>
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
