import { CharacterMetadata, CompositeDecorator, ContentBlock, ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Immutable from 'immutable';
import { useEffect, useState } from 'react';

const timeout = 5000

function FadingSpan(props: any) {
  const [style, setStyle] = useState<any>({
    display: 'inline-block',
    transition: `opacity ${timeout / 1000}s, textSize ${timeout / 1000}s`,
    textSize: 'auto',  // Start at normal height
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      // Start shrinking and fading after timeout
      setStyle({
        ...style,
        opacity: 0,
        textSize: 0,
      });
    }, timeout);

    return () => clearTimeout(timer);
  }, []);

  return <span style={style}>{props.children}</span>;
}


const decorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      const text = contentBlock.getText();
      for (let i = 0; i < text.length; i++) {
        callback(i, i + 1);
      }
    },
    component: FadingSpan,
  },
]);


export default function Home() {
  const [blocks, setBlocks] = useState(new Map());
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const newBlocks = new Map(blocks);
      let shouldUpdate = false;

      newBlocks.forEach((value, key) => {
        const [text, timestamp] = value;

        if (currentTime - timestamp >= timeout * 2) {
          newBlocks.set(key, ['', timestamp]);
          shouldUpdate = true;
        }
      });

      if (shouldUpdate) {
        const newContentState = ContentState.createFromBlockArray(
          Array.from(newBlocks, ([key, [text]]) => new ContentBlock({
            key: key,
            type: 'unstyled',
            text: text,
            characterList: Immutable.List(
              Array(text.length).fill(
                CharacterMetadata.create(),
              ),
            ),
          })),
        );
        const newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');
        setEditorState(newEditorState);
        setBlocks(newBlocks);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [blocks, editorState]);

  const handleEditorChange = (newEditorState: EditorState) => {
    const newBlocks = new Map();
    const currentTime = new Date().getTime();

    newEditorState.getCurrentContent().getBlocksAsArray().forEach(block => {
      const oldBlockValue = blocks.get(block.getKey());
      const newText = block.getText();

      if (oldBlockValue) {
        const [oldText] = oldBlockValue;

        if (oldText === newText) {
          newBlocks.set(block.getKey(), oldBlockValue);
        } else {
          newBlocks.set(block.getKey(), [newText, currentTime]);
        }
      } else {
        newBlocks.set(block.getKey(), [newText, currentTime]);
      }
    });

    setBlocks(newBlocks);
    setEditorState(newEditorState);
  };


  return (
    <div className="flex flex-col items-center justify-between p-24 h-screen">
      <div className="flex flex-col mt-2 pt-2 w-[600px] h-full items-start">
        <p className='text-black opacity-60 mb-2.5 font-semibold'>Ephemeral Notes</p>
        <Editor editorState={editorState} onChange={handleEditorChange} placeholder="Just like your thoughts, your notes here don't stick around forever..."
        // blockRenderMap={extendedBlockRenderMap}
        />
      </div>
    </div>
  );
}
