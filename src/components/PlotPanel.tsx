import {
  createRef,
  useEffect,
  useState,
} from 'react';
import api from '../api/api';
import { CloseIcon } from './Icons';

interface Props {
  plots: Array<string>,
  onRemovePlot: (id: string) => void,
}

const PlotPanel = ({ plots, onRemovePlot }: Props) => {

  const resizableRef = createRef<HTMLDivElement>();

  const [open, setOpen] = useState<boolean>(false);

  const [initialPos, setInitialPos] = useState<number>(0);
  const [initialSize, setInitialSize] = useState<number>(0);

  const [width, setWidth] = useState<number>(22);

  const initial = (e: { clientX: number }) => {
    if (resizableRef.current) {
      setInitialPos(e.clientX);
      setInitialSize(resizableRef.current.offsetWidth);
    }
  };

  const resize = (e: { clientX: number }) => {

    if (resizableRef.current) {
      setWidth(initialSize - (e.clientX - initialPos));
    }
  };

  useEffect(() => {
    if(plots.length) {
      setOpen(true);
    } else setOpen(false)
  }, [plots]);

  return (
    <div className={'h-full flex items-start unselectable'}>

      {open &&
          <div className={'flex h-full '}>
              <div
                  className={'cursor-col-resize h-full w-1'}
                  draggable={true}
                  onDragStart={initial}
                  onDragEnd={resize}
              />
              <div
                  ref={resizableRef}
                  className={'h-full  overflow-y-auto'}
                  style={{
                    boxShadow: '0 4px 0px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 40%)',
                    width: Math.max(300, width),
                  }}
              >
                <div className={"flex flex-col items-center py-4 px-1 space-y-4"}>

                  {plots.map((plot) => (
                    <div key={plot} className={"relative"}>
                      <div className={"absolute top-0 right-0 cursor-pointer  z-50"}>
                        <CloseIcon onClick={() => onRemovePlot(plot)}/>
                      </div>
                      <img  src={api.plot(plot)} alt={"plot"} className={"rounded-lg"}/>
                    </div>
                    ))
                  }

                  {!plots.length && <div className={"text-white"}>No plot</div>}
                </div>
              </div>
          </div>

      }


      <div className={'h-full flex items-start resize'}
           style={{
             boxShadow: '0 4px 0px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 40%)',
           }}>

        <div
          className={'font-medium text-sm py-3 text-white rotate-180 transform cursor-pointer resize-x'}
          style={{ backgroundColor: '#212121', writingMode: 'vertical-rl' }}
          onClick={() => setOpen(!open)}>
          Plot
        </div>

      </div>
    </div>
  );

};

export default PlotPanel;
