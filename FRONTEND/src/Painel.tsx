import { cardsData } from "./_mocks_/Default";
import App from "./App";
import Card from "./components/Card/Card";

export const Panel = () => {
  return (
    <App>
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
    </App>
  );
};
