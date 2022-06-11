import {
  useEffect,
  useState,
} from 'react';
import Block from './Block';
import api from '../api/api';
import PlotPanel from './PlotPanel';

const generateId = () => `block-${Math.random()}`

const Notebook = () => {

  const [session, setSession] = useState<string>('');

  const [blocks, setBlocks] = useState<Array<string>>(localStorage.getItem("blocks")?.split(",") || [generateId()]);

  const [selectedBlockId, setSelectedBlockId] = useState<string>(blocks[0]);

  const [lastRemovedIndex, setLastRemovedIndex] = useState<number>(-1);

  const removeBlock = (id: string) =>  blocks.filter(b => b !== id)

  const [plots, setPlots] = useState<Array<string>>([]);

  const moveBlock = (lastBlocks: Array<string>, from: number, to: number) => {
    if(from < 0 || from >= lastBlocks.length) return lastBlocks;
    if(to < 0 || to >= lastBlocks.length) return lastBlocks;

    const newBlocks = [...lastBlocks];
    const element = newBlocks.splice(from, 1)[0];
    newBlocks.splice(to, 0, element);

    return newBlocks;
  }

  useEffect(() => {
    api.createSession()
      .then((result) => setSession(result.data["uuid"]))
      .catch(() => console.error("Failed to create session"))
  }, []);

  useEffect(() => {
    localStorage.setItem("blocks", blocks.join(","));

    if(!blocks.includes(selectedBlockId)) {
      setSelectedBlockId(lastRemovedIndex >= 0 ? blocks[lastRemovedIndex] : blocks[blocks.length - 1])
    }
  }, [blocks, selectedBlockId, lastRemovedIndex]);

  return  (
    <div id="container" style={{
      fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
    }}>
      <header className={"border-b border-gray-800 flex justify-start items-center"}>
        <div
          className={"flex items-center text-white px-2 my-2 ml-4 rounded-lg hover:bg-white hover:cursor-pointer hover:bg-opacity-10"}
          onClick={() => {
            const newBlockId = generateId();
            const currentIndex = blocks.indexOf(selectedBlockId);
            const newBlocks = [...blocks, newBlockId];

            if(currentIndex >= 0) setBlocks(moveBlock(newBlocks, newBlocks.length - 1, currentIndex + 1))
             else setBlocks([...blocks, newBlockId]);

            if(!blocks.length) {
              setSelectedBlockId(newBlockId);
            }
          }}
        >
          <svg className="w-5 h-5"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Code
        </div>
      </header>
      <main className={"flex h-full"}>
        <div className={"px-2 w-full py-4 flex flex-col space-y-4 overflow-y-auto"}>
          {blocks.map((block, index) => (
            <Block
              key={block}
              id={block}
              selected={selectedBlockId === block}
              onClick={() => setSelectedBlockId(block)}
              onRemove={() => {
                setLastRemovedIndex(index);
                setBlocks(removeBlock(block));
              }}
              moveDown={() => setBlocks(moveBlock(blocks, index, index + 1))}
              moveUp={() => setBlocks(moveBlock(blocks, index, index - 1))}
              session={session}
              onReceivePlots={(newPlots) => setPlots(newPlots.reverse().concat(plots)) }
            />
          ))}
        </div>
        <PlotPanel plots={plots} onRemovePlot={(id: string) => setPlots(plots.filter(p => p !== id))}/>
      </main>
      <footer className={"border-t border-gray-800 flex items-end justify-end"}>
        <div className={"rounded-full m-1.5"} style={{width: 12, height: 12, backgroundColor: session.length > 10 ? 'green' : 'red'}}/>
      </footer>
    </div>
  );
}

export default Notebook;
