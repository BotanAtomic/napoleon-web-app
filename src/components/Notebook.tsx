import {
  ChangeEvent,
  ChangeEventHandler,
  EventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Block from './Block';
import api from '../api/api';
import PlotPanel from './PlotPanel';
import {
  CodeButton,
  ExportButton,
  ImportButton,
} from '../buttons/Buttons';

const generateId = () => `block-${Math.random()}`;

const Notebook = () => {

  const [session, setSession] = useState<string>('');

  const [blocks, setBlocks] = useState<Array<string>>(localStorage.getItem('blocks')?.split(',') || [generateId()]);

  const [selectedBlockId, setSelectedBlockId] = useState<string>(blocks[0]);

  const [lastRemovedIndex, setLastRemovedIndex] = useState<number>(-1);

  const removeBlock = (id: string) => blocks.filter(b => b !== id);

  const [plots, setPlots] = useState<Array<string>>([]);

  const inputFile = useRef<HTMLInputElement>(null);


  const moveBlock = (lastBlocks: Array<string>, from: number, to: number) => {
    if (from < 0 || from >= lastBlocks.length) return lastBlocks;
    if (to < 0 || to >= lastBlocks.length) return lastBlocks;

    const newBlocks = [...lastBlocks];
    const element = newBlocks.splice(from, 1)[0];
    newBlocks.splice(to, 0, element);

    return newBlocks;
  };

  useEffect(() => {
    api.createSession()
      .then((result) => setSession(result.data['uuid']))
      .catch(() => console.error('Failed to create session'));
  }, []);

  useEffect(() => {
    localStorage.setItem('blocks', blocks.join(','));

    if (!blocks.includes(selectedBlockId)) {
      setSelectedBlockId(lastRemovedIndex >= 0 ? blocks[lastRemovedIndex] : blocks[blocks.length - 1]);
    }
  }, [blocks, selectedBlockId, lastRemovedIndex]);

  const downloadNotebook = () => {
    const element = document.createElement('a');

    const cells: { [key: string]: string } = {};

    blocks.forEach(id => {
      cells[id] = localStorage.getItem(id) || '';
    });


    const data = {
      blocks,
      cells,
    };

    const file = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'notebook.json';
    document.body.appendChild(element);
    element.click();
  };

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e?.target?.files;

    if (files) {
      const file = files[0];

      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = event => {
        const data = JSON.parse(event?.target?.result as string || '{}')

        const cells = data["cells"];

        Object.entries(cells).forEach(([key, value]) => {
           localStorage.setItem(key , value as string);
        });

        setBlocks(data["blocks"]);
      };
    }
  };

  return (
    <div id="container"
         style={{
           fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
         }}>
      <input type="file"
             id="file"
             accept={'application/json'}
             ref={inputFile}
             style={{ display: 'none' }}
             onChange={onFileUpload}
      />

      <header className={'border-b border-gray-800 flex justify-start items-center'}>
        <CodeButton onClick={() => {
          const newBlockId = generateId();
          const currentIndex = blocks.indexOf(selectedBlockId);
          const newBlocks = [...blocks, newBlockId];

          if (currentIndex >= 0) setBlocks(moveBlock(newBlocks, newBlocks.length - 1, currentIndex + 1));
          else setBlocks([...blocks, newBlockId]);

          if (!blocks.length) {
            setSelectedBlockId(newBlockId);
          }
        }} />
        <ImportButton onClick={() => inputFile?.current?.click()} />
        <ExportButton onClick={() => downloadNotebook()} />

      </header>
      <main className={'flex h-full'}>
        <div className={'px-2 w-full py-4 flex flex-col space-y-4 overflow-y-auto'}>
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
              onReceivePlots={(newPlots) => setPlots(newPlots.reverse().concat(plots))}
            />
          ))}
        </div>
        <PlotPanel plots={plots}
                   onRemovePlot={(id: string) => setPlots(plots.filter(p => p !== id))} />
      </main>
      <footer className={'border-t border-gray-800 flex items-end justify-end'}>
        <div className={'rounded-full m-1.5'}
             style={{
               width: 12,
               height: 12,
               backgroundColor: session.length > 10 ? 'green' : 'red',
             }} />
      </footer>
    </div>
  );
};

export default Notebook;
