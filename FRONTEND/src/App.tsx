import Card from "./components/Card/Card";
import { cardsData } from "./_mocks_/Default";
import logo from "./assets/logo-white.svg";

function App() {
  return (
    <div className="w-full h-screen max-w-none bg-[#DDEEEB] flex flex-col">
      <header
        className="
          bg-[#488C82]          
          p-4                  
          sm:px-8               
          lg:px-16              
          flex
          flex-rows                 
          items-center          
          shadow-xl             
          sticky                
          top-0
          justify-center
          gap-[1.5vw]
      "
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          <img
            className="w-sm h-5 w-sm sm:h-10 object-contain"
            src={logo}
            alt="image description"
          />
        </div>
        <h1 className="text-[#FFFFFF] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">
          Sistema de vendas
        </h1>
      </header>

      <main className="flex-grow p-[6vh] sm:p-[4vh] lg:p-[10vh]">
        <div
          className="
            flex
            flex-row
            flex-wrap
            justify-items-center 
            animate-fade-in
            justify-evenly
            gap-[5vw]
          "
        >
          {cardsData.map((card) => (
            <Card
              imageSrc={card.image}
              text={card.text}
              key={card.id}
              route={card.route}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
