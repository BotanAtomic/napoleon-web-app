import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react';
import api, { executionCount } from '../api/api';
import { AxiosResponse } from 'axios';
import {
  CheckIcon,
  ClearIcon,
  ErrorIcon,
  LoadingIcon,
  StartIcon,
  Trash,
  ArrowDown,
  ArrowUp
} from './Icons';


interface Props {
  id: string,
  selected: boolean,
  onClick: () => void,
  onRemove: () => void,
  moveUp: () => void,
  moveDown: () => void,
  session: string,
  onReceivePlots: (plots: Array<string>) => void
}

interface ExecutionResult {
  compilationResult: {
    errors: Array<{
      type: string,
      start: {
        line: number,
        charPositionInLine: number,
      },
      expectedTokens: Array<string>,
    }>,

    time: number,
    success: boolean,
  },
  error: {
    lines: Array<any>,
    type: string,
    message: string,
  },
  time: number,
  content: string,
  success: boolean,
  result: string,
  plots: Array<string>
}

const Block = ({ id, selected, onClick, onRemove, moveUp, moveDown, session, onReceivePlots }: Props) => {

  const [source, setSource] = useState<string>(localStorage.getItem(id) || '');
  const [executed, setExecuted] = useState<boolean>(false);

  const [content, setContent] = useState<string>();

  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [executionOrder, setExecutionOrder] = useState<string>(" ");

  const execute = () => {
    if (session && session.length > 10) {
      localStorage.setItem(id, source);
      setLoading(true);
      api.execute(session, source).then((result: AxiosResponse<ExecutionResult>) => {
        const executionResult = result.data;

        let errorBuilder = '';

        if (!executionResult.compilationResult.success) {
          errorBuilder = 'Compilation failed.\n'
          executionResult.compilationResult.errors.forEach((grammarError) => {
            errorBuilder += `\tline ${grammarError.start?.line}:${grammarError.start?.charPositionInLine} -> ${grammarError.type}`

            if (grammarError.expectedTokens != null)
              errorBuilder += `, expecting ${grammarError.expectedTokens?.join()}`
            errorBuilder += "\n"
          })
        }

        if(!executionResult.success) {
          errorBuilder += executionResult.error?.type + " -> " + executionResult.error?.message;
          errorBuilder += ":\n"
          executionResult.error?.lines?.forEach((line: any) => {
            errorBuilder += ('\t')
              + `line ${line.start.line}:${line.start.charPositionInLine} -> ${line.highlight}`
              + ('\n');
          });
        }
        if(errorBuilder.length > 0)
          setContent(errorBuilder.endsWith("\n") ? errorBuilder.slice(0, -1) : errorBuilder);

        setHasError(errorBuilder.length > 0);

        if(executionResult.success && (result.data?.content?.length > 0 || executionResult.result)) {
            let newContent = result.data.content;
            if(executionResult.result) {
              if(!newContent.endsWith("\n") && result.data.content) newContent += "\n"
              newContent += executionResult.result;
            }
            setContent(newContent);
        } else {
          if(!errorBuilder.length)
            setContent(undefined);
        }
        setExecuted(true);
        setExecutionOrder(executionCount.toString())

        if(executionResult.plots && executionResult.plots.length) {
          onReceivePlots(executionResult.plots)
        }

      }).catch((error) => console.error(error)).finally(() => setLoading(false));
    }
  };

  const onUpdateSource = (source: string) =>{
    setExecuted(false);
    setSource(source);
  }

  return (
    <div className={'w-full flex'} >
      <div className={'h-full h-4 w-4'}
           style={{ paddingTop: 10, marginRight: 4 }}>
        {executed && !hasError && <CheckIcon />}
        {executed && hasError && <ErrorIcon />}
      </div>
      <div className={'flex flex-col relative'}
           onClick={onClick}
           style={{ width: "98%", boxShadow: '0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 40%)' }}>
        <div className={'w-full flex'}>
          {selected &&
              <div className={'absolute right-2 z-50 flex space-x-2 px-2 py-0.5 -top-2 rounded-lg border-gray-800'}
                   style={{ backgroundColor: 'rgb(56, 56, 56)' }}>
                  <ArrowUp onClick={moveUp} />
                  <ArrowDown onClick={moveDown} />
                  <Trash onClick={onRemove} />
              </div>}
          <div className={'h-full '}>
            <div
              style={{ backgroundColor: selected ? '#525252' : '#212121', padding: 8 }}
              className={'rounded-l-sm flex justify-center w-full h-full'}
            >
              {selected && !loading && <StartIcon onClick={execute} />}
              {loading && <LoadingIcon />}

              {(!selected && !loading) && <span className={'text-white text-gray-200 w-6 h-6'}
                                                style={{ fontSize: 14 }}>[{executionOrder}]</span>}
            </div>
          </div>
          <div className={'w-full h-full'}>
            <CodeEditor
              value={source}
              language="lua"
              onChange={(evn) => onUpdateSource(evn.target.value)}
              padding={8}
              style={{
                width: '100%',
                height: '100%',
                fontSize: 14,
                backgroundColor: '#212121',
              }}
            />
          </div>
        </div>
        {(content && content.length > 0) &&
            <div style={{paddingLeft: 40}} className={"relative"}>
              {selected && <div className={"absolute right-2 top-2 z-50"}>
                    <ClearIcon onClick={() => setContent(undefined)}/>
                </div>}
              <CodeEditor
                  value={content}
                  disabled={true}
                  style={{
                    width: '98%',
                    height: '100%',
                    maxHeight: 500,
                    fontSize: 14,
                    color: hasError ? 'red': 'white',
                    overflowY: 'auto',
                    backgroundColor: 'rgb(56, 56, 56)',
                  }}
              />
            </div>
        }
      </div>
    </div>
  );

};

export default Block;
